#!/usr/bin/env python3
import concurrent.futures
import datetime as dt
import html
import json
import pathlib
import re
import subprocess
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
TARGET = 100
SEARCH_LIMIT = 2500
UA = "Cineyah/1.0 comedy-batch"

LICENSES = [
    "https://creativecommons.org/licenses/by/2.0/",
    "https://creativecommons.org/licenses/by/2.5/",
    "https://creativecommons.org/licenses/by/3.0/",
    "https://creativecommons.org/licenses/by/4.0/",
    "https://creativecommons.org/licenses/by-sa/2.0/",
    "https://creativecommons.org/licenses/by-sa/2.5/",
    "https://creativecommons.org/licenses/by-sa/3.0/",
    "https://creativecommons.org/licenses/by-sa/4.0/",
    "https://creativecommons.org/publicdomain/zero/1.0/",
]

BAD_TERMS = {
    "trailer", "teaser", "clip", "short film", "shorts", "episode", "tv episode",
    "porn", "erotic", "xxx", "adult", "compilation", "collection of",
}


def fetch_json(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def clean_text(value):
    if isinstance(value, list):
        value = " ".join(str(x) for x in value)
    value = html.unescape(re.sub(r"<[^>]+>", " ", str(value or "")))
    return re.sub(r"\s+", " ", value).strip()


def parse_year(info):
    for key in ("year", "date"):
        text = clean_text(info.get(key))
        m = re.search(r"\b(19\d{2}|20\d{2})\b", text)
        if m:
            return int(m.group(1))
    return 0


def license_name(url):
    if "publicdomain/zero" in url:
        return "CC0 1.0"
    m = re.search(r"licenses/(by(?:-sa)?)/(\d\.\d)/", url)
    if not m:
        return "Creative Commons"
    return f"CC {m.group(1).upper()} {m.group(2)}"


def normalize_subjects(info):
    raw = info.get("subject", [])
    if not isinstance(raw, list):
        raw = [raw]
    return [clean_text(x) for x in raw if clean_text(x)]


def reported_seconds(file_obj):
    try:
        value = float(file_obj.get("length", 0))
        return value if value > 0 else 0
    except Exception:
        return 0


def source_rank(file_obj):
    name = str(file_obj.get("name", "")).lower()
    fmt = str(file_obj.get("format", "")).lower()
    size = int(file_obj.get("size") or 0)
    score = 0
    if name.endswith(".mp4"):
        score += 100
    if "h.264" in fmt or "h264" in fmt or "mpeg4" in fmt or "mpeg-4" in fmt:
        score += 40
    if "512kb" in name or "512kb" in fmt:
        score += 25
    if 150_000_000 <= size <= 2_500_000_000:
        score += 15
    if "original" in fmt:
        score -= 10
    return score


def ffprobe_ok(url):
    cmd = [
        "ffprobe", "-v", "error", "-rw_timeout", "15000000",
        "-show_entries", "stream=codec_name,codec_type",
        "-of", "json", url,
    ]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=25)
        if p.returncode != 0:
            return False, None
        data = json.loads(p.stdout or "{}")
        streams = data.get("streams", [])
        v = [s.get("codec_name") for s in streams if s.get("codec_type") == "video"]
        a = [s.get("codec_name") for s in streams if s.get("codec_type") == "audio"]
        if not v or v[0] != "h264":
            return False, {"video": v, "audio": a}
        if a and a[0] not in {"aac", "mp3"}:
            return False, {"video": v, "audio": a}
        return True, {"video": v, "audio": a}
    except Exception:
        return False, None


def inspect(identifier):
    safe = urllib.parse.quote(identifier, safe="")
    try:
        meta = fetch_json(f"https://archive.org/metadata/{safe}")
        info = meta.get("metadata", {})
        title = clean_text(info.get("title"))
        description = clean_text(info.get("description"))
        subjects = normalize_subjects(info)
        haystack = " ".join([title, description, *subjects]).lower()
        if not title or any(term in haystack for term in BAD_TERMS):
            return None
        if not any(term in haystack for term in ("comedy", "comed", "slapstick", "farce", "romantic comedy")):
            return None

        lic = clean_text(info.get("licenseurl"))
        if lic not in LICENSES:
            return None

        files = [f for f in meta.get("files", []) if str(f.get("name", "")).lower().endswith(".mp4")]
        files = [f for f in files if reported_seconds(f) >= 5400]
        if not files:
            return None
        files.sort(key=source_rank, reverse=True)

        chosen = files[0]
        media_name = chosen["name"]
        media_url = f"https://archive.org/download/{safe}/{urllib.parse.quote(media_name, safe='/')}"
        ok, codecs = ffprobe_ok(media_url)
        if not ok:
            return None

        year = parse_year(info)
        if year < 1900 or year > 2100:
            year = 2000
        runtime = int(round(reported_seconds(chosen) / 60))
        if runtime < 90:
            return None

        creator = clean_text(info.get("creator")) or "Internet Archive contributor"
        lang = clean_text(info.get("language")) or "Unknown"
        desc_en = description[:520].strip()
        if len(desc_en) < 80:
            desc_en = f"{title} is a feature-length comedy from {year}, presented from an openly licensed source. The film is included in Cineyah after passing the runtime and browser-playback checks."
        desc_ar = f"فيلم كوميدي طويل بعنوان «{title}» من عام {year}. أُدرج في سينياه بعد التحقق من أن مدته تتجاوز ساعة ونصف وأن ملف الفيديو يعمل بصيغة متوافقة مع المشغل."
        return {
            "id": re.sub(r"[^a-z0-9]+", "-", identifier.lower()).strip("-")[:90],
            "type": "movie",
            "genres": ["comedy"],
            "titleAr": title,
            "titleEn": title,
            "year": year,
            "languageAr": lang,
            "languageEn": lang,
            "runtimeMinutes": runtime,
            "poster": f"https://archive.org/download/{safe}/__ia_thumb.jpg",
            "descriptionAr": desc_ar,
            "descriptionEn": desc_en,
            "publishedAt": dt.date.today().isoformat(),
            "sources": [{"label": "480p", "url": media_url}],
            "subtitles": [],
            "sourceUrl": f"https://archive.org/details/{safe}",
            "licenseName": license_name(lic),
            "licenseUrl": lic,
            "attribution": f"{title} ({year}) — {creator}",
            "downloadAllowed": True,
            "_verifiedCodecs": codecs,
        }
    except Exception:
        return None


def discover_ids():
    license_q = " OR ".join(f'\"{x}\"' for x in LICENSES)
    query = (
        'mediatype:movies AND licenseurl:(' + license_q + ') AND '
        '(subject:(comedy OR comedic OR slapstick OR farce) OR '
        'title:(comedy OR comedic OR slapstick OR farce) OR '
        'description:(comedy OR comedic OR slapstick OR farce))'
    )
    ids = []
    for page in range(1, 26):
        rows = min(100, SEARCH_LIMIT - len(ids))
        if rows <= 0:
            break
        params = urllib.parse.urlencode({"q": query, "fl[]": "identifier", "rows": rows, "page": page, "output": "json"})
        payload = fetch_json("https://archive.org/advancedsearch.php?" + params)
        docs = payload.get("response", {}).get("docs", [])
        ids.extend(x["identifier"] for x in docs if x.get("identifier"))
        if len(docs) < rows:
            break
    return list(dict.fromkeys(ids))


def main():
    ids = discover_ids()
    print(json.dumps({"stage": "discovery", "candidates": len(ids)}), flush=True)
    found = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        for item in pool.map(inspect, ids):
            if item:
                found.append(item)
                print(json.dumps({"verified": len(found), "title": item["titleEn"]}), flush=True)
                if len(found) >= TARGET:
                    break

    if len(found) < TARGET:
        pathlib.Path("work").mkdir(exist_ok=True)
        (ROOT / "work/comedy-batch-report.json").write_text(json.dumps({"target": TARGET, "verified": len(found), "candidates": len(ids)}, indent=2) + "\n")
        raise SystemExit(f"Only {len(found)} technically verified open-license comedy films found; need {TARGET}")

    published = []
    for item in found[:TARGET]:
        item.pop("_verifiedCodecs", None)
        published.append(item)
    out = ROOT / "content/generated-comedy.json"
    out.write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n")
    report = {"target": TARGET, "verified": len(published), "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat()}
    (ROOT / "content/comedy-batch-report.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report), flush=True)


if __name__ == "__main__":
    main()
