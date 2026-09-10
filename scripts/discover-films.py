#!/usr/bin/env python3
"""Batch discovery only: host metadata never grants publication permission.

Resumable cache, capped concurrency, atomic reports. Run on GitHub Actions or
locally where archive.org is reachable. No secrets or paid API required.
"""
import argparse
import concurrent.futures
import datetime
import json
import pathlib
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    tmp.replace(path)


def fetch_json(url):
    request = urllib.request.Request(url, headers={"User-Agent": "Cineyah/1.0 (licensed feature discovery)"})
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def discover(limit, workers, refresh, genre):
    cache = ROOT / "work/discovery-cache"
    licenses = [f'"{scheme}://creativecommons.org/licenses/{kind}/{version}/"' for scheme in ("http", "https") for kind in ("by", "by-sa") for version in ("2.0", "2.5", "3.0", "4.0")]
    query = 'mediatype:movies AND year:[2005 TO 2100] AND licenseurl:(' + ' OR '.join(licenses) + ')'
    query += ' AND (collection:feature_films OR title:("feature film" OR "full movie" OR "full film" OR largometraje OR "long métrage") OR subject:("feature film" OR "feature films"))'
    if genre == "horror":
        terms = 'horror OR supernatural OR ghost OR haunted OR witchcraft OR djinn OR jinn OR demonic OR possession OR رعب OR جن OR سحر'
        query += ' AND (title:(' + terms + ') OR subject:(' + terms + ') OR description:(' + terms + '))'
    candidates, errors = [], []
    for page in range(1, (limit + 99) // 100 + 1):
        params = urllib.parse.urlencode({"q": query, "fl[]": "identifier", "rows": min(100, limit - len(candidates)), "page": page, "output": "json"})
        try:
            payload = fetch_json("https://archive.org/advancedsearch.php?" + params)
            if "response" not in payload:
                raise ValueError("Search API rejected query: " + json.dumps(payload)[:1500])
            docs = payload["response"]["docs"]
        except Exception as error:
            errors.append({"stage": "discovery", "page": page, "error": str(error)})
            break
        candidates.extend(item["identifier"] for item in docs)
        print(json.dumps({"stage": "search", "genre": genre, "page": page, "candidates": len(candidates)}), flush=True)
        if len(docs) < 100 or len(candidates) >= limit:
            break

    def inspect(identifier):
        # IA identifiers are data, never executable paths or shell fragments.
        safe = urllib.parse.quote(identifier, safe="")
        cached = cache / (safe + ".json")
        try:
            if cached.exists() and not refresh:
                return json.loads(cached.read_text())
            metadata = fetch_json("https://archive.org/metadata/" + safe)
            info = metadata.get("metadata", {})
            files = metadata.get("files", [])
            sources = [{"name": item["name"], "url": "https://archive.org/download/" + safe + "/" + urllib.parse.quote(item["name"], safe="/"), "reportedLength": item.get("length"), "format": item.get("format")} for item in files if item.get("name", "").lower().endswith((".mp4", ".webm", ".mkv"))]
            record = {"id": identifier, "status": "needs_review", "title": info.get("title"), "reportedYear": info.get("year"), "reportedLicense": info.get("licenseurl"), "creator": info.get("creator"), "subjects": info.get("subject"), "sourceUrl": "https://archive.org/details/" + safe, "sources": sources, "subtitleFiles": [item["name"] for item in files if item.get("name", "").lower().endswith((".vtt", ".srt"))], "reasons": ["Creator authority and commercial streaming rights require item-level evidence", "Feature classification and actual runtime require verification", "Playback, synopsis and subtitle rights require verification"]}
            atomic_json(cached, record)
            return record
        except Exception as error:
            return {"id": identifier, "status": "needs_review", "error": str(error)}

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        results = list(pool.map(inspect, dict.fromkeys(candidates)))
    report = {"generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "genre": genre, "publishedTarget": 100, "requested": limit, "discovered": len(results), "publishedByDiscovery": 0, "errors": errors, "items": results}
    atomic_json(ROOT / "work/discovery-report.json", report)
    print(json.dumps({key: value for key, value in report.items() if key != "items"}))
    return 1 if errors else 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=1000)
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--genre", choices=("horror", "all"), default="horror")
    args = parser.parse_args()
    if not 1 <= args.limit <= 10000 or not 1 <= args.workers <= 8:
        parser.error("limit must be 1–10000 and workers 1–8")
    raise SystemExit(discover(args.limit, args.workers, args.refresh, args.genre))
