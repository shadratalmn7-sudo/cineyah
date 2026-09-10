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
TARGET_PER_GENRE = 12
ROWS = 90
MAX_PAGES = 4
MAX_UNIQUE = 140
UA = "Cineyah/3.0 legal-free-fiction"
CURRENT_YEAR = 2026

GENRES = {
    "action": ["action", "martial arts", "kung fu", "combat"],
    "horror": ["horror", "supernatural", "ghost", "haunted", "demon", "possession", "vampire", "zombie", "witchcraft"],
    "comedy": ["comedy", "slapstick", "farce", "satire", "humor", "humour"],
    "drama": ["drama", "dramatic"],
    "romance": ["romance", "romantic", "love story"],
    "thriller": ["thriller", "suspense"],
    "crime": ["crime", "gangster", "heist", "detective"],
    "mystery": ["mystery", "detective", "whodunit"],
    "adventure": ["adventure", "quest", "journey"],
    "scifi": ["science fiction", "sci-fi", "science-fiction", "space opera", "futuristic", "dystopian"],
    "fantasy": ["fantasy", "fairy tale", "magic", "magical"],
    "war": ["war film", "war movie", "military drama", "battle"],
    "western": ["western", "cowboy", "frontier"],
    "family": ["family film", "family movie", "children's film", "kids movie"],
    "animation": ["animation", "animated", "cartoon"],
    "musical": ["musical", "music film", "song and dance"],
    "history": ["historical drama", "period film", "period drama"],
    "biography": ["biographical film", "biopic"],
    "sport": ["sports film", "sport film", "boxing drama", "racing film"],
}

LICENSES = [
    f"https://creativecommons.org/licenses/{kind}/{version}/"
    for kind in ("by", "by-sa")
    for version in ("2.0", "2.5", "3.0", "4.0")
] + ["https://creativecommons.org/publicdomain/zero/1.0/"]

# Cineyah is a fiction-only catalog. Anything that signals documentary/non-fiction,
# episodic content, a clip, piracy release naming, or adult material is rejected.
BAD = (
    "documentary", "documentaries", "nonfiction", "non-fiction", "docudrama",
    "interview", "lecture", "conference", "news report", "newsreel", "reportage",
    "educational video", "tutorial", "behind the scenes", "making of", "video essay",
    "trailer", "teaser", "clip", "short film", "shorts", "episode", "episodes",
    "season ", "full season", "compilation", "collection", "boxset", "marathon",
    "gameplay", "walkthrough", "podcast", "radio show", "commercial break",
    "channel archive", "livestream", "live stream", "playlist", "complete series",
    "movie collection", "adult film", "porn", "xxx"
)
RIP = ("yts", "rarbg", "webrip", "web-dl", "brrip", "dvdrip", "camrip", "hdrip", "torrent", "xvid")


def fetch_json(url, timeout=18):
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.load(response)


def clean(value):
    if isinstance(value, list):
        value = " ".join(str(x) for x in value)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", str(value or "")))).strip()


def canonical_license(value):
    value = clean(value).strip().replace("http://creativecommons.org/", "https://creativecommons.org/")
    if value and not value.endswith("/"):
        value += "/"
    return value


def year_of(info):
    for key in ("year", "date", "publicdate"):
        match = re.search(r"\b(20\d{2})\b", clean(info.get(key)))
        if match:
            year = int(match.group(1))
            if 2000 <= year <= CURRENT_YEAR:
                return year
    return None


def norm_title(value):
    value = re.sub(r"\b20\d{2}\b", " ", value.lower())
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def safe_id(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")[:100]


def lic_name(url):
    if "publicdomain/zero" in url:
        return "CC0 1.0"
    match = re.search(r"licenses/(by(?:-sa)?)/(\d\.\d)/", url)
    return f"CC {match.group(1).upper()} {match.group(2)}" if match else "Creative Commons"


def infer_genres(haystack):
    low = haystack.lower()
    return [genre for genre, terms in GENRES.items() if any(term in low for term in terms)]


def coverage(records):
    return {genre: sum(genre in record["genres"] for record in records.values()) for genre in GENRES}


def search_ids(genre, page):
    license_query = " OR ".join(f'\"{url}\"' for url in LICENSES)
    terms = " OR ".join(f'\"{term}\"' if " " in term else term for term in GENRES[genre])
    feature = '(collection:feature_films OR collection:opensource_movies OR subject:("feature film" OR "feature films" OR "fiction film" OR "narrative film") OR title:("full movie" OR "feature film"))'
    query = f'mediatype:movies AND licenseurl:({license_query}) AND {feature} AND (subject:({terms}) OR title:({terms}) OR description:({terms}))'
    params = urllib.parse.urlencode({"q": query, "fl[]": "identifier", "rows": ROWS, "page": page, "output": "json"})
    result = fetch_json("https://archive.org/advancedsearch.php?" + params)
    return [doc["identifier"] for doc in result.get("response", {}).get("docs", []) if doc.get("identifier")]


def fiction_confident(info, title, description, genres):
    subjects = info.get("subject", [])
    subjects = subjects if isinstance(subjects, list) else [subjects]
    collections = info.get("collection", [])
    collections = collections if isinstance(collections, list) else [collections]
    hay = " ".join([title, description, *map(clean, subjects), *map(clean, collections)]).lower()
    if any(term in hay for term in BAD):
        return False
    if any(term in hay for term in RIP):
        return False
    score = 0
    if "feature_films" in hay:
        score += 3
    if "feature film" in hay or "fiction film" in hay or "narrative film" in hay:
        score += 3
    if genres:
        score += 2
    if any(term in hay for term in ("full movie", "feature-length", "feature length", "independent film", "indie film")):
        score += 1
    return score >= 2


def candidate_files(meta):
    files = []
    for file in meta.get("files", []):
        name = str(file.get("name", ""))
        low = name.lower()
        fmt = str(file.get("format", "")).lower()
        if not low.endswith(".mp4"):
            continue
        if any(term in low for term in RIP):
            continue
        try:
            length = float(file.get("length") or 0)
            size = int(file.get("size") or 0)
        except Exception:
            continue
        if length and not (3600 <= length <= 14400):
            continue
        if size and not (80_000_000 <= size <= 3_500_000_000):
            continue
        score = 0
        if "512kb" in low:
            score += 25
        if ".ia.mp4" in low:
            score += 30
        if any(codec in fmt for codec in ("h.264", "h264", "mpeg4", "mpeg-4")):
            score += 30
        if "1080" in low:
            score += 15
        elif "720" in low:
            score += 10
        if size and size > 2_500_000_000:
            score -= 20
        files.append((score, file))
    files.sort(key=lambda item: item[0], reverse=True)
    return [file for _, file in files[:4]]


def subtitle_tracks(meta, safe_identifier):
    result = []
    files = meta.get("files", [])
    for language, tokens in (("ar", (".ar.", "_ar.", "-ar.", "arabic")), ("en", (".en.", "_en.", "-en.", "english"))):
        found = None
        for file in files:
            name = str(file.get("name", ""))
            low = name.lower()
            if not low.endswith(".vtt"):
                continue
            if any(token in low for token in tokens):
                found = name
                break
        if found:
            result.append({
                "lang": language,
                "labelAr": "العربية" if language == "ar" else "الإنجليزية",
                "labelEn": "Arabic" if language == "ar" else "English",
                "url": f"https://archive.org/download/{safe_identifier}/{urllib.parse.quote(found, safe='/')}"
            })
    return result


def prefilter(identifier):
    safe = urllib.parse.quote(identifier, safe="")
    try:
        meta = fetch_json("https://archive.org/metadata/" + safe)
        info = meta.get("metadata", {})
        title = clean(info.get("title"))
        description = clean(info.get("description"))
        if not title or len(title) > 150:
            return None
        license_url = canonical_license(info.get("licenseurl"))
        if license_url not in LICENSES:
            return None
        year = year_of(info)
        if year is None:
            return None
        creator = clean(info.get("creator"))
        if "licenses/" in license_url and not creator:
            return None
        subjects = info.get("subject", [])
        subjects = subjects if isinstance(subjects, list) else [subjects]
        collections = info.get("collection", [])
        collections = collections if isinstance(collections, list) else [collections]
        hay = " ".join([identifier, title, description, *map(clean, subjects), *map(clean, collections)])
        genres = infer_genres(hay)
        if not fiction_confident(info, title, description, genres):
            return None
        files = candidate_files(meta)
        if not files:
            return None
        return {
            "identifier": identifier,
            "safe": safe,
            "meta": meta,
            "info": info,
            "title": title,
            "description": description,
            "year": year,
            "creator": creator,
            "license": license_url,
            "hay": hay,
            "genres": genres,
            "files": files,
        }
    except Exception:
        return None


def probe_url(url):
    try:
        process = subprocess.run(
            ["ffprobe", "-v", "error", "-rw_timeout", "9000000", "-show_entries", "format=duration:stream=codec_name,codec_type,height", "-of", "json", url],
            capture_output=True, text=True, timeout=14
        )
        if process.returncode:
            return None
        data = json.loads(process.stdout or "{}")
        streams = data.get("streams", [])
        video = [stream for stream in streams if stream.get("codec_type") == "video"]
        audio = [stream for stream in streams if stream.get("codec_type") == "audio"]
        if not video or not audio:
            return None
        if video[0].get("codec_name") not in {"h264", "avc1"}:
            return None
        if audio[0].get("codec_name") not in {"aac", "mp3"}:
            return None
        duration = float(data.get("format", {}).get("duration") or 0)
        if not 3600 <= duration <= 14400:
            return None
        request = urllib.request.Request(url, headers={"User-Agent": UA, "Range": "bytes=0-4095"})
        with urllib.request.urlopen(request, timeout=10) as response:
            response.read(4096)
            status = response.getcode()
            accepts = (response.headers.get("Accept-Ranges") or "").lower()
            content_range = response.headers.get("Content-Range") or ""
            if status != 206 and "bytes" not in accepts and not content_range.lower().startswith("bytes"):
                return None
        return duration, int(video[0].get("height") or 0)
    except Exception:
        return None


def validate(candidate):
    if not candidate:
        return None
    for file in candidate["files"]:
        url = f"https://archive.org/download/{candidate['safe']}/{urllib.parse.quote(file['name'], safe='/')}"
        probe = probe_url(url)
        if not probe:
            continue
        duration, height = probe
        runtime = int(round(duration / 60))
        label = "1080p" if height >= 900 else "720p" if height >= 650 else "480p" if height >= 430 else "360p"
        source_page = f"https://archive.org/details/{candidate['safe']}"
        language = clean(candidate["info"].get("language")) or "Unknown"
        description = candidate["description"][:650].strip() or f"{candidate['title']} is a feature-length fiction film from {candidate['year']}."
        poster = f"https://archive.org/download/{candidate['safe']}/__ia_thumb.jpg"
        tracks = subtitle_tracks(candidate["meta"], candidate["safe"])
        subtitle_ar = any(track["lang"] == "ar" for track in tracks)
        subtitle_en = any(track["lang"] == "en" for track in tracks)
        return {
            "id": safe_id(candidate["identifier"]),
            "type": "movie",
            "genres": candidate["genres"] or ["drama"],
            "titleAr": candidate["title"],
            "titleEn": candidate["title"],
            "titleOriginal": candidate["title"],
            "year": candidate["year"],
            "languageAr": language,
            "languageEn": language,
            "runtimeMinutes": runtime,
            "poster": poster,
            "backdrop": poster,
            "descriptionAr": f"فيلم روائي طويل من عام {candidate['year']}، مدته نحو {runtime} دقيقة.",
            "descriptionEn": description,
            "publishedAt": dt.date.today().isoformat(),
            "sources": [{"label": label, "url": url, "mimeType": "video/mp4", "sizeBytes": int(file.get("size") or 0)}],
            "subtitles": tracks,
            "subtitleStatusAr": "ترجمة عربية متاحة من المصدر." if subtitle_ar else ("يتوفر مسار ترجمة إنجليزي من المصدر، والعربية غير منشورة بعد." if subtitle_en else "لا توجد ترجمة عربية مرخّصة منشورة حاليًا."),
            "subtitleStatusEn": "Arabic subtitles are available from the source." if subtitle_ar else ("An English subtitle track is available; Arabic is not published yet." if subtitle_en else "No licensed Arabic subtitle track is currently published."),
            "contentSourceName": "Internet Archive",
            "contentSourceUrl": source_page,
            "metadataSourceName": "Internet Archive",
            "metadataSourceUrl": source_page,
            "licenseName": lic_name(candidate["license"]),
            "licenseUrl": candidate["license"],
            "attribution": f"{candidate['title']} ({candidate['year']}) — {candidate['creator']}",
            "downloadAllowed": True,
            "downloadUrl": url,
            "rightsStatusAr": "تم التحقق آليًا من مصدر التشغيل والرخصة التجارية والمدة والصوت والترميز ودعم طلبات النطاق. لا تُقبل تراخيص NC أو ND في هذه الدفعة.",
            "rightsStatusEn": "Playback and commercial-use source verified by Cineyah pipeline.",
            "legalLinks": [{"kind": "info", "labelAr": "المصدر والترخيص", "labelEn": "Source and license", "url": source_page}],
        }
    return None


def patch_catalog(records):
    path = ROOT / "lib/catalog.ts"
    source = path.read_text()
    source = re.sub(r"\n  // GENERATED PLAYABLE START\n.*?\n  // GENERATED PLAYABLE END\n", "\n", source, flags=re.S)
    existing_ids = set(re.findall(r'id:\s*"([^"]+)"', source))
    records = [record for record in records if record["id"] not in existing_ids]
    lines = []
    for record in records:
        text = json.dumps(record, ensure_ascii=False, indent=2)
        lines.append("  " + text.replace("\n", "\n  ") + ",")
    block = "\n  // GENERATED PLAYABLE START\n" + "\n".join(lines) + "\n  // GENERATED PLAYABLE END\n"
    marker = "\n];\n\nexport const discoverableMovies"
    if marker not in source:
        raise SystemExit("catalog insertion marker not found")
    source = source.replace(marker, block + "];\n\nexport const discoverableMovies", 1)
    source = source.replace(
        "export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);",
        "export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 60);"
    )
    source = source.replace(
        "export const publicMovies = discoverableMovies;\nexport const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);",
        "export const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);\nexport const publicMovies = playableMovies;"
    )
    path.write_text(source)
    return records


def main():
    records = {}
    cache = {}
    seen_pairs = set()
    for genre in GENRES:
        if len(records) >= MAX_UNIQUE:
            break
        if coverage(records)[genre] >= TARGET_PER_GENRE:
            continue
        for page in range(1, MAX_PAGES + 1):
            try:
                identifiers = search_ids(genre, page)
            except Exception as error:
                print(json.dumps({"genre": genre, "searchError": str(error)}), flush=True)
                break
            identifiers = [identifier for identifier in identifiers if (identifier, genre) not in seen_pairs]
            for identifier in identifiers:
                seen_pairs.add((identifier, genre))
            if not identifiers:
                break

            def get(identifier):
                if identifier not in cache:
                    cache[identifier] = validate(prefilter(identifier))
                return cache[identifier]

            with concurrent.futures.ThreadPoolExecutor(max_workers=14) as pool:
                for item in pool.map(get, identifiers):
                    if not item:
                        continue
                    if genre not in item["genres"]:
                        item["genres"].insert(0, genre)
                    key = norm_title(item["titleEn"])
                    if not key:
                        continue
                    if key in records:
                        records[key]["genres"] = list(dict.fromkeys(records[key]["genres"] + item["genres"]))
                    elif len(records) < MAX_UNIQUE:
                        records[key] = item
            cov = coverage(records)
            print(json.dumps({"genre": genre, "page": page, "coverage": cov[genre], "unique": len(records)}, ensure_ascii=False), flush=True)
            if cov[genre] >= TARGET_PER_GENRE or len(identifiers) < ROWS or len(records) >= MAX_UNIQUE:
                break

    items = list(records.values())
    items.sort(key=lambda item: (item["titleEn"].lower(), item["year"]))
    published = patch_catalog(items)
    (ROOT / "content/generated-playable.json").write_text(json.dumps(published, ensure_ascii=False, indent=2) + "\n")
    cov = coverage({norm_title(item["titleEn"]): item for item in published})
    report = {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "policy": {"yearMin": 2000, "runtimeMinMinutes": 60, "documentaries": False, "licenses": ["CC BY", "CC BY-SA", "CC0"], "browserVideo": "H.264 MP4 with audio and byte-range support"},
        "targetPerGenre": TARGET_PER_GENRE,
        "uniqueMovies": len(published),
        "withArabicSubtitles": sum(any(track["lang"] == "ar" for track in item["subtitles"]) for item in published),
        "withEnglishSubtitles": sum(any(track["lang"] == "en" for track in item["subtitles"]) for item in published),
        "coverage": cov,
        "missing": {genre: TARGET_PER_GENRE - count for genre, count in cov.items() if count < TARGET_PER_GENRE},
    }
    (ROOT / "content/playable-coverage.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
