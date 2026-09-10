#!/usr/bin/env python3
import json
import pathlib
import re
import subprocess
import urllib.parse
import urllib.request

ID = "ulises-largometraje-abel-amador-2012"
ROOT = pathlib.Path(__file__).resolve().parents[1]
CAT = ROOT / "lib/catalog.ts"
UA = "Mozilla/5.0 CineyahPlaybackCheck/1.0"


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def as_float(value):
    try:
        return float(value or 0)
    except Exception:
        return 0.0


def probe(url):
    p = subprocess.run(
        [
            "ffprobe", "-v", "error", "-rw_timeout", "20000000",
            "-show_entries", "format=duration:stream=codec_name,codec_type,height,width,profile",
            "-of", "json", url,
        ],
        capture_output=True,
        text=True,
        timeout=45,
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
        "width": int(video[0].get("width") or 0),
        "video": video[0].get("codec_name"),
        "profile": video[0].get("profile"),
        "audio": audio[0].get("codec_name") if audio else None,
        "duration": as_float((data.get("format") or {}).get("duration")),
    }


def range_test(url):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Range": "bytes=0-1048575", "Accept": "*/*"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        chunk = r.read(256 * 1024)
        status = getattr(r, "status", None)
        content_type = r.headers.get("Content-Type", "")
        accept_ranges = r.headers.get("Accept-Ranges", "")
        content_range = r.headers.get("Content-Range", "")
    if len(chunk) < 65536:
        raise RuntimeError(f"range response too small: {len(chunk)} bytes")
    if status not in {200, 206}:
        raise RuntimeError(f"unexpected HTTP status {status}")
    return {
        "status": status,
        "contentType": content_type,
        "acceptRanges": accept_ranges,
        "contentRange": content_range,
        "sampleBytes": len(chunk),
    }


def decode_test(url):
    # This is an actual media decode, not only a HEAD/metadata check. It seeks into
    # the remote file and decodes several seconds, exercising HTTP range/seek,
    # container parsing, H.264 video and the audio codec.
    p = subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-loglevel", "error",
            "-rw_timeout", "20000000", "-ss", "30", "-i", url,
            "-t", "4", "-map", "0:v:0", "-map", "0:a:0?", "-f", "null", "-",
        ],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if p.returncode:
        raise RuntimeError((p.stderr or p.stdout or "ffmpeg decode failed")[-1800:])
    return {"passed": True, "decodedSeconds": 4, "seekSeconds": 30}


def candidate_score(name, info, size):
    lname = name.lower()
    # Prefer generated web renditions over camera-master files. They are normally
    # much quicker to start on mobile while retaining acceptable picture quality.
    web_derivative = any(token in lname for token in ("512kb", "h.264", "h264", "720", "480"))
    height = info.get("height", 0)
    useful_height = min(height, 1080)
    oversized_penalty = 1 if size > 3_000_000_000 else 0
    return (1 if web_derivative else 0, -oversized_penalty, useful_height, -size)


meta = get_json(f"https://archive.org/metadata/{ID}")
candidates = []
for file_obj in meta.get("files", []):
    name = str(file_obj.get("name", ""))
    if not name.lower().endswith(".mp4"):
        continue
    source_duration = as_float(file_obj.get("length"))
    if source_duration and source_duration < 5400:
        continue
    url = f"https://archive.org/download/{ID}/" + urllib.parse.quote(name, safe="/")
    try:
        info = probe(url)
    except Exception:
        info = None
    if not info:
        continue
    runtime = source_duration or info.get("duration", 0)
    if runtime < 5400:
        continue
    size = int(as_float(file_obj.get("size")))
    candidates.append((candidate_score(name, info, size), name, url, runtime, size, info))

if not candidates:
    raise SystemExit("No H.264 browser-compatible >=90m MP4 rendition found for Ulises")

candidates.sort(reverse=True, key=lambda x: x[0])
errors = []
selected = None
for _, name, url, runtime, size, info in candidates:
    try:
        http_result = range_test(url)
        decode_result = decode_test(url)
        selected = (name, url, runtime, size, info, http_result, decode_result)
        break
    except Exception as exc:
        errors.append({"file": name, "error": str(exc)[:900]})

if not selected:
    raise SystemExit("All compatible Ulises renditions failed real range/decode tests: " + json.dumps(errors, ensure_ascii=False))

name, url, secs, size, info, http_result, decode_result = selected
h = info["height"]
label = "1080p" if h >= 1000 else "720p" if h >= 650 else "480p" if h >= 430 else "360p"

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
    "sizeBytes": size,
    "label": label,
    "codecs": info,
    "httpRange": http_result,
    "decodePlayback": decode_result,
    "sourceChanged": source_changed,
    "rejectedCandidates": errors,
}
(ROOT / "content").mkdir(exist_ok=True)
(ROOT / "content/ulises-playback-verified.json").write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(json.dumps(report, ensure_ascii=False))
