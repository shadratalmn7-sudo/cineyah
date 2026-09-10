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
SEARCH_LIMIT = 1800
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
BAD_TERMS = {"trailer","teaser","clip","short film","shorts","episode","tv episode","porn","erotic","xxx","adult","compilation","collection of"}


def fetch_json(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def clean_text(value):
    if isinstance(value, list): value = " ".join(str(x) for x in value)
    value = html.unescape(re.sub(r"<[^>]+>", " ", str(value or "")))
    return re.sub(r"\s+", " ", value).strip()


def parse_year(info):
    for key in ("year","date"):
        m = re.search(r"\b(19\d{2}|20\d{2})\b", clean_text(info.get(key)))
        if m: return int(m.group(1))
    return 2000


def license_name(url):
    if "publicdomain/zero" in url: return "CC0 1.0"
    m = re.search(r"licenses/(by(?:-sa)?)/(\d\.\d)/", url)
    return f"CC {m.group(1).upper()} {m.group(2)}" if m else "Creative Commons"


def reported_seconds(f):
    try: return max(0.0, float(f.get("length", 0)))
    except Exception: return 0.0


def source_rank(f):
    name, fmt = str(f.get("name","")).lower(), str(f.get("format","")).lower()
    size = int(f.get("size") or 0)
    score = 100 if name.endswith(".mp4") else 0
    if any(x in fmt for x in ("h.264","h264","mpeg4","mpeg-4")): score += 40
    if "512kb" in name or "512kb" in fmt: score += 25
    if 150_000_000 <= size <= 2_500_000_000: score += 15
    return score


def ffprobe_ok(url):
    try:
        p = subprocess.run(["ffprobe","-v","error","-rw_timeout","12000000","-show_entries","stream=codec_name,codec_type","-of","json",url],capture_output=True,text=True,timeout=20)
        if p.returncode: return False
        streams = json.loads(p.stdout or "{}").get("streams",[])
        video = [s.get("codec_name") for s in streams if s.get("codec_type") == "video"]
        audio = [s.get("codec_name") for s in streams if s.get("codec_type") == "audio"]
        return bool(video and video[0] == "h264" and (not audio or audio[0] in {"aac","mp3"}))
    except Exception:
        return False


def inspect(identifier):
    safe = urllib.parse.quote(identifier, safe="")
    try:
        meta = fetch_json(f"https://archive.org/metadata/{safe}")
        info = meta.get("metadata",{})
        title, description = clean_text(info.get("title")), clean_text(info.get("description"))
        subjects = info.get("subject",[]); subjects = subjects if isinstance(subjects,list) else [subjects]
        haystack = " ".join([title,description,*[clean_text(x) for x in subjects]]).lower()
        if not title or any(term in haystack for term in BAD_TERMS): return None
        if not any(term in haystack for term in ("comedy","comed","slapstick","farce","romantic comedy")): return None
        lic = clean_text(info.get("licenseurl"))
        if lic not in LICENSES: return None
        files = [f for f in meta.get("files",[]) if str(f.get("name","")).lower().endswith(".mp4") and reported_seconds(f) >= 5400]
        if not files: return None
        files.sort(key=source_rank, reverse=True)
        chosen = files[0]
        media_url = f"https://archive.org/download/{safe}/{urllib.parse.quote(chosen['name'], safe='/')}"
        if not ffprobe_ok(media_url): return None
        runtime = int(round(reported_seconds(chosen)/60))
        if runtime < 90: return None
        year = parse_year(info)
        creator = clean_text(info.get("creator")) or "Internet Archive contributor"
        lang = clean_text(info.get("language")) or "Unknown"
        desc_en = description[:520].strip()
        if len(desc_en) < 80:
            desc_en = f"{title} is a feature-length comedy from {year}, presented from an openly licensed source. Cineyah verified the runtime and browser-compatible H.264 media before adding it to the catalog."
        return {
            "id": re.sub(r"[^a-z0-9]+","-",identifier.lower()).strip("-")[:90],
            "type":"movie","genres":["comedy"],"titleAr":title,"titleEn":title,"year":year,
            "languageAr":lang,"languageEn":lang,"runtimeMinutes":runtime,
            "poster":f"https://archive.org/download/{safe}/__ia_thumb.jpg",
            "descriptionAr":f"فيلم كوميدي طويل بعنوان «{title}» من عام {year}. أُضيف إلى سينياه بعد التحقق من أن مدته لا تقل عن ساعة ونصف وأن ملف الفيديو H.264 يعمل مع المشغل.",
            "descriptionEn":desc_en,"publishedAt":dt.date.today().isoformat(),
            "sources":[{"label":"480p","url":media_url}],"subtitles":[],
            "sourceUrl":f"https://archive.org/details/{safe}","licenseName":license_name(lic),"licenseUrl":lic,
            "attribution":f"{title} ({year}) — {creator}","downloadAllowed":True
        }
    except Exception:
        return None


def discover_ids():
    license_q = " OR ".join(f'\"{x}\"' for x in LICENSES)
    query = 'mediatype:movies AND licenseurl:(' + license_q + ') AND (subject:(comedy OR comedic OR slapstick OR farce) OR title:(comedy OR comedic OR slapstick OR farce) OR description:(comedy OR comedic OR slapstick OR farce))'
    ids=[]
    for page in range(1,20):
        rows=min(100,SEARCH_LIMIT-len(ids))
        if rows<=0: break
        params=urllib.parse.urlencode({"q":query,"fl[]":"identifier","rows":rows,"page":page,"output":"json"})
        docs=fetch_json("https://archive.org/advancedsearch.php?"+params).get("response",{}).get("docs",[])
        ids.extend(x["identifier"] for x in docs if x.get("identifier"))
        if len(docs)<rows: break
    return list(dict.fromkeys(ids))


def main():
    ids=discover_ids(); print(json.dumps({"stage":"discovery","candidates":len(ids)}),flush=True)
    found=[]
    for start in range(0,len(ids),96):
        chunk=ids[start:start+96]
        with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
            for item in pool.map(inspect,chunk):
                if item:
                    found.append(item); print(json.dumps({"verified":len(found),"title":item["titleEn"]}),flush=True)
        if len(found)>=TARGET: break
    if len(found)<TARGET:
        (ROOT/"work").mkdir(exist_ok=True)
        (ROOT/"work/comedy-batch-report.json").write_text(json.dumps({"target":TARGET,"verified":len(found),"candidates":len(ids)},indent=2)+"\n")
        raise SystemExit(f"Only {len(found)} verified open-license comedy films found; need {TARGET}")
    published=found[:TARGET]
    (ROOT/"content/generated-comedy.json").write_text(json.dumps(published,ensure_ascii=False,indent=2)+"\n")
    report={"target":TARGET,"verified":len(published),"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat()}
    (ROOT/"content/comedy-batch-report.json").write_text(json.dumps(report,indent=2)+"\n")
    print(json.dumps(report),flush=True)

if __name__=="__main__": main()
