#!/usr/bin/env python3
import html
import json
import pathlib
import re
import shutil
import subprocess
import tempfile
import urllib.parse
import urllib.request

ID = "ulises-largometraje-abel-amador-2012"
ROOT = pathlib.Path(__file__).resolve().parents[1]
CAT = ROOT / "lib/catalog.ts"


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Cineyah/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def duration(file_obj):
    try:
        return float(file_obj.get("length") or 0)
    except Exception:
        return 0


def probe(url):
    p = subprocess.run(
        [
            "ffprobe", "-v", "error", "-rw_timeout", "15000000",
            "-show_entries", "stream=codec_name,codec_type,height",
            "-of", "json", url,
        ],
        capture_output=True,
        text=True,
        timeout=35,
    )
    if p.returncode:
        return None
    data = json.loads(p.stdout or "{}")
    streams = data.get("streams", [])
    video = [x for x in streams if x.get("codec_type") == "video"]
    audio = [x for x in streams if x.get("codec_type") == "audio"]
    if not video or video[0].get("codec_name") != "h264":
        return None
    if audio and audio[0].get("codec_name") not in {"aac", "mp3"}:
        return None
    return {
        "height": int(video[0].get("height") or 0),
        "video": video[0].get("codec_name"),
        "audio": audio[0].get("codec_name") if audio else None,
    }


def browser_playback_test(url):
    browser = next(
        (p for p in (shutil.which("google-chrome"), shutil.which("google-chrome-stable"), shutil.which("chromium")) if p),
        None,
    )
    if not browser:
        raise SystemExit("No Chrome/Chromium binary available for browser playback test")

    safe_url = html.escape(url, quote=True)
    page = f"""<!doctype html><meta charset='utf-8'>
<body data-result='PENDING'>
<video id='v' src='{safe_url}' muted playsinline preload='auto'></video>
<script>
const v = document.getElementById('v');
let finished = false;
function finish(ok, msg) {{
  if (finished) return;
  finished = true;
  document.body.dataset.result = ok ? 'PASS' : 'FAIL';
  document.body.textContent = (ok ? 'PASS ' : 'FAIL ') + msg;
}}
v.addEventListener('error', () => finish(false, 'media-error-' + (v.error ? v.error.code : 'unknown')));
v.addEventListener('loadedmetadata', async () => {{
  try {{
    await v.play();
    setTimeout(() => {{
      const ok = v.currentTime > 0.25 && v.readyState >= 2 && v.videoWidth > 0 && v.videoHeight > 0;
      finish(ok, `time=${{v.currentTime.toFixed(2)}} ready=${{v.readyState}} size=${{v.videoWidth}}x${{v.videoHeight}}`);
    }}, 2500);
  }} catch (e) {{ finish(false, 'play-rejected-' + e); }}
}});
setTimeout(() => finish(false, `timeout ready=${{v.readyState}} network=${{v.networkState}}`), 12000);
</script>
</body>"""

    with tempfile.TemporaryDirectory() as td:
        path = pathlib.Path(td) / "playback.html"
        path.write_text(page, encoding="utf-8")
        proc = subprocess.run(
            [
                browser,
                "--headless=new",
                "--no-sandbox",
                "--disable-gpu",
                "--autoplay-policy=no-user-gesture-required",
                "--virtual-time-budget=15000",
                "--dump-dom",
                path.as_uri(),
            ],
            capture_output=True,
            text=True,
            timeout=35,
        )
    output = (proc.stdout or "") + "\n" + (proc.stderr or "")
    passed = 'data-result="PASS"' in output or "data-result='PASS'" in output
    if not passed:
        tail = output[-3000:]
        raise SystemExit("Real browser playback test failed:\n" + tail)
    match = re.search(r"PASS ([^<\n]+)", output)
    return {"browser": pathlib.Path(browser).name, "passed": True, "details": match.group(1) if match else "played"}


meta = get_json(f"https://archive.org/metadata/{ID}")
files = []
for file_obj in meta.get("files", []):
    name = str(file_obj.get("name", ""))
    if not name.lower().endswith(".mp4") or duration(file_obj) < 5400:
        continue
    url = f"https://archive.org/download/{ID}/" + urllib.parse.quote(name, safe="/")
    try:
        info = probe(url)
    except Exception:
        info = None
    if info:
        files.append((info["height"], duration(file_obj), name, url, info))

if not files:
    raise SystemExit("No browser-compatible >=90m MP4 rendition found for Ulises")

files.sort(reverse=True)
h, secs, name, url, info = files[0]
label = "1080p" if h >= 1000 else "720p" if h >= 650 else "480p" if h >= 430 else "360p"

# This is the decisive test: Chrome must actually load and advance playback.
browser_result = browser_playback_test(url)

text = CAT.read_text(encoding="utf-8")
marker = 'id:"ulises-2012"'
start = text.find(marker)
if start < 0:
    raise SystemExit("Ulises movie block not found in catalog")
end = text.find("sourceUrl:", start)
if end < 0:
    raise SystemExit("Ulises sourceUrl boundary not found in catalog")
segment = text[start:end]
source_re = re.compile(r'sources:\[\{label:"(?:1080p|720p|480p|360p)",url:"[^"]+"\}\]')
match = source_re.search(segment)
if not match:
    raise SystemExit("Ulises sources field not found in catalog block")
replacement = f'sources:[{{label:"{label}",url:"{url}"}}]'
updated_segment = segment[: match.start()] + replacement + segment[match.end() :]
text2 = text[:start] + updated_segment + text[end:]
source_changed = text2 != text
if source_changed:
    CAT.write_text(text2, encoding="utf-8")

report = {
    "id": ID,
    "file": name,
    "url": url,
    "runtimeMinutes": round(secs / 60, 1),
    "label": label,
    "codecs": info,
    "sourceChanged": source_changed,
    "browserPlayback": browser_result,
}
(ROOT / "content").mkdir(exist_ok=True)
(ROOT / "content/ulises-playback-verified.json").write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(json.dumps(report, ensure_ascii=False))
