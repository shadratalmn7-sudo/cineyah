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
SEARCH_LIMIT = 10000
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
    "https://creativecommons.org/licenses/by-nd/2.0/",
    "https://creativecommons.org/licenses/by-nd/2.5/",
    "https://creativecommons.org/licenses/by-nd/3.0/",
    "https://creativecommons.org/licenses/by-nd/4.0/",
    "https://creativecommons.org/publicdomain/zero/1.0/",
    "https://creativecommons.org/publicdomain/mark/1.0/",
]

BAD_TERMS = {
    "trailer","teaser","clip","short film","shorts","episode","episodes","tv episode",
    "porn","erotic","xxx","adult","compilation","collection","boxset","box set","franchise",
    "duology","trilogy","marathon","gameplay","walkthrough","commercials","commercial break",
    "podcast","radio show","news","festival","performance","concert","improv","showcase",
    "vhs recording","woc recording","greatest hits","complete series","season ","series one","series two",
    "lightning talks","channel archive","livestream","live stream","full season","all episodes",
    "movie collection","movies 1-","movies 1–","full vhs","parody thomas & friends",
    "vlc record","cctv recording","cctv recordings","tv recording","tv recordings","recital",
    "talent night","broadcast recording","broadcast recordings","vhs ajánló","vhs ajanlo",
    "dead and buried treasures","laserdisc","channel recording","channel recordings","playlist",
    "bumper","bumpers","rebrand","channel ident","idents","dvd iso","blu-ray iso","bluray iso",
    "sing-along edition","tv broadcast","youtube channel","twitch","documentary","docu-series",
    "covid","plandemic","game show","talk show","music video","video essay","fan edit","fanedit",
    "workprint","demo vhs","camera test","screen test","behind the scenes","making of","bonus feature",
    "cctv","recordings","recording","moviemax comedy","bogus"
}
COMEDY_TERMS = ("comedy","comed","slapstick","farce","romantic comedy","romcom","satire","humor","humour")
FEATURE_TERMS = ("feature film","feature films","feature-length","feature length","full movie","full film","motion picture","feature movie")
FEATURE_COLLECTIONS = {"feature_films","featurefilms","moviesandfilms"}


def fetch_json(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def clean_text(value):
    if isinstance(value, list):
        value = " ".join(str(x) for x in value)
    value = html.unescape(re.sub(r"<[^>]+>", " ", str(value or "")))
    return re.sub(r"\s+", " ", value).strip()


def values(value):
    return value if isinstance(value, list) else ([value] if value else [])


def parse_year(info):
    for key in ("year", "date"):
        m = re.search(r"\b(18\d{2}|19\d{2}|20\d{2})\b", clean_text(info.get(key)))
        if m:
            return int(m.group(1))
    return 0


def license_name(url):
    if "publicdomain/zero" in url:
        return "CC0 1.0"
    if "publicdomain/mark" in url:
        return "Public Domain Mark 1.0"
    m = re.search(r"licenses/(by(?:-sa|-nd)?)/(\d\.\d)/", url)
    return f"CC {m.group(1).upper()} {m.group(2)}" if m else "Creative Commons"


def reported_seconds(f):
    try:
        return max(0.0, float(f.get("length", 0)))
    except Exception:
        return 0.0


def source_rank(f):
    name, fmt = str(f.get("name", "")).lower(), str(f.get("format", "")).lower()
    size = int(f.get("size") or 0)
    score = 100 if name.endswith(".mp4") else 80 if name.endswith(".webm") else 0
    if any(x in fmt for x in ("h.264", "h264", "mpeg4", "mpeg-4")):
        score += 40
    if any(x in fmt for x in ("vp9", "vp8", "webm")):
        score += 25
    if "512kb" in name or "512kb" in fmt:
        score += 20
    if 120_000_000 <= size <= 3_000_000_000:
        score += 15
    return score


def probe_media(url):
    try:
        p = subprocess.run(
            ["ffprobe", "-v", "error", "-rw_timeout", "12000000", "-show_entries", "format=duration:stream=codec_name,codec_type", "-of", "json", url],
            capture_output=True, text=True, timeout=22,
        )
        if p.returncode:
            return None
        data = json.loads(p.stdout or "{}")
        streams = data.get("streams", [])
        video = [s.get("codec_name") for s in streams if s.get("codec_type") == "video"]
        audio = [s.get("codec_name") for s in streams if s.get("codec_type") == "audio"]
        if not video or video[0] not in {"h264", "vp8", "vp9", "av1"}:
            return None
        if audio and audio[0] not in {"aac", "mp3", "opus", "vorbis"}:
            return None
        try:
            duration = float(data.get("format", {}).get("duration") or 0)
        except Exception:
            duration = 0
        if duration < 5400 or duration > 12600:
            return None
        return duration
    except Exception:
        return None


def normalized_title(title):
    title = re.sub(r"\[[^\]]*\]|\([^)]*(?:rip|dub|sub|1080|720|vhs|dvd)[^)]*\)", " ", title, flags=re.I)
    title = re.sub(r"\b(18\d{2}|19\d{2}|20\d{2})\b", " ", title)
    title = re.sub(r"\b(full movie|full film|feature film|movie|film)\b", " ", title, flags=re.I)
    return re.sub(r"[^a-z0-9]+", " ", title.lower()).strip()


def has_comedy_evidence(title, subjects):
    evidence = f"{title} {' '.join(subjects)}".lower()
    return any(term in evidence for term in COMEDY_TERMS)


def looks_like_single_feature(info, title, description, subjects, files):
    low = f"{title} {description} {' '.join(subjects)}".lower()
    if any(term in low for term in BAD_TERMS):
        return False
    if re.search(r"\b(ep\.?\s*\d+|episode\s*\d+|part\s*[2-9]\d*)\b", title, re.I):
        return False
    if re.search(r"\b(on ch\.?\s*\d+|youtube channel|twitch|playlist|movies?\s+\d+[-–]\d+)\b", low, re.I):
        return False
    if re.match(r"^(vlc|record|capture|tape|disc\s*\d+|volume\s*\d+)", title.strip(), re.I):
        return False
    if re.search(r"\b(and|&)\b.*\b(and|&)\b", title, re.I):
        return False

    collections = {clean_text(x).lower() for x in values(info.get("collection"))}
    explicit_feature = any(term in low for term in FEATURE_TERMS)
    curated_feature = bool(collections & FEATURE_COLLECTIONS)
    if not (explicit_feature or curated_feature):
        return False
    if not has_comedy_evidence(title, subjects):
        return False

    plausible_files = [f for f in files if str(f.get("name", "")).lower().endswith((".mp4", ".webm"))]
    long_hints = [reported_seconds(f) for f in plausible_files if reported_seconds(f) >= 5400]
    if len(long_hints) > 2 and not explicit_feature:
        return False
    return True


def inspect(identifier):
    safe = urllib.parse.quote(identifier, safe="")
    try:
        meta = fetch_json(f"https://archive.org/metadata/{safe}")
        info = meta.get("metadata", {})
        title, description = clean_text(info.get("title")), clean_text(info.get("description"))
        subjects = [clean_text(x) for x in values(info.get("subject"))]
        all_files = meta.get("files", [])
        if not title or not looks_like_single_feature(info, title, description, subjects, all_files):
            return None
        lic = clean_text(info.get("licenseurl"))
        if lic not in LICENSES:
            return None
        files = [f for f in all_files if str(f.get("name", "")).lower().endswith((".mp4", ".webm"))]
        files.sort(key=source_rank, reverse=True)
        chosen = None
        seconds = 0
        for f in files[:7]:
            hinted = reported_seconds(f)
            if hinted and not (5400 <= hinted <= 12600):
                continue
            media_url = f"https://archive.org/download/{safe}/{urllib.parse.quote(f['name'], safe='/')}"
            verified = probe_media(media_url)
            if verified:
                chosen = f
                seconds = verified
                break
        if not chosen:
            return None
        media_url = f"https://archive.org/download/{safe}/{urllib.parse.quote(chosen['name'], safe='/')}"
        runtime = int(round(seconds / 60))
        year = parse_year(info)
        creator = clean_text(info.get("creator")) or "Internet Archive contributor"
        lang = clean_text(info.get("language")) or "Unknown"
        desc_en = description[:520].strip()
        if len(desc_en) < 80:
            desc_en = f"{title} is a feature-length comedy, presented from an openly licensed source. Cineyah verified the runtime and browser-compatible media before adding it to the catalog."
        return {
            "id": re.sub(r"[^a-z0-9]+", "-", identifier.lower()).strip("-")[:90],
            "type": "movie", "genres": ["comedy"], "titleAr": title, "titleEn": title, "year": year,
            "languageAr": lang, "languageEn": lang, "runtimeMinutes": runtime,
            "poster": f"https://archive.org/download/{safe}/__ia_thumb.jpg",
            "descriptionAr": f"فيلم كوميدي طويل بعنوان «{title}». أُضيف إلى سينياه بعد التحقق من أن مدته لا تقل عن ساعة ونصف وأن ملف الفيديو يعمل مع المشغل.",
            "descriptionEn": desc_en, "publishedAt": dt.date.today().isoformat(),
            "sources": [{"label": "480p", "url": media_url}], "subtitles": [],
            "sourceUrl": f"https://archive.org/details/{safe}", "licenseName": license_name(lic), "licenseUrl": lic,
            "attribution": f"{title} — {creator}", "downloadAllowed": True,
        }
    except Exception:
        return None


def discover_ids():
    license_q = " OR ".join(f'\"{x}\"' for x in LICENSES)
    terms = " OR ".join(COMEDY_TERMS)
    queries = [
        'mediatype:movies AND licenseurl:(' + license_q + ') AND collection:(feature_films OR featurefilms OR moviesandfilms) AND (subject:(' + terms + ') OR title:(' + terms + '))',
        'mediatype:movies AND licenseurl:(' + license_q + ') AND (title:("full movie" OR "full film" OR "feature film") OR subject:("feature film" OR "feature films")) AND (subject:(' + terms + ') OR title:(' + terms + '))',
    ]
    ids = []
    for query in queries:
        for page in range(1, 101):
            if len(ids) >= SEARCH_LIMIT:
                break
            rows = min(100, SEARCH_LIMIT - len(ids))
            params = urllib.parse.urlencode({"q": query, "fl[]": "identifier", "rows": rows, "page": page, "output": "json"})
            docs = fetch_json("https://archive.org/advancedsearch.php?" + params).get("response", {}).get("docs", [])
            ids.extend(x["identifier"] for x in docs if x.get("identifier"))
            if len(docs) < rows:
                break
        if len(ids) >= SEARCH_LIMIT:
            break
    return list(dict.fromkeys(ids))


def main():
    ids = discover_ids()
    print(json.dumps({"stage": "discovery", "candidates": len(ids)}), flush=True)
    found = []
    seen = set()
    for start in range(0, len(ids), 160):
        chunk = ids[start:start + 160]
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as pool:
            for item in pool.map(inspect, chunk):
                if item:
                    key = normalized_title(item["titleEn"])
                    if not key or key in seen:
                        continue
                    seen.add(key)
                    found.append(item)
                    print(json.dumps({"verified": len(found), "title": item["titleEn"]}), flush=True)
        if len(found) >= TARGET:
            break
    if len(found) < TARGET:
        (ROOT / "work").mkdir(exist_ok=True)
        (ROOT / "work/comedy-batch-report.json").write_text(json.dumps({"target": TARGET, "verified": len(found), "candidates": len(ids)}, indent=2) + "\n")
        raise SystemExit(f"Only {len(found)} verified distinct comedy feature films found; need {TARGET}")
    published = found[:TARGET]
    assert len({normalized_title(x["titleEn"]) for x in published}) == TARGET
    assert all(90 <= x["runtimeMinutes"] <= 210 for x in published)
    assert all(x["sources"] and x["sources"][0]["url"].startswith("https://") for x in published)
    (ROOT / "content/generated-comedy.json").write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n")
    report = {"target": TARGET, "verified": len(published), "distinct": TARGET, "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat()}
    (ROOT / "content/comedy-batch-report.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report), flush=True)


if __name__ == "__main__":
    main()
