#!/usr/bin/env python3
import concurrent.futures
import html
import json
import pathlib
import re
import subprocess
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
UA = "Cineyah/3.1 known-open-fiction"
ALLOWED = {
    "https://creativecommons.org/licenses/by/3.0/": "CC BY 3.0",
    "https://creativecommons.org/licenses/by-sa/3.0/": "CC BY-SA 3.0",
}

# Only titles independently documented as feature-length fiction with a commercial-friendly CC license.
CANDIDATES = [
    {"title":"Four Eyed Monsters","year":2005,"genres":["romance","drama"],"license":"https://creativecommons.org/licenses/by-sa/3.0/","creator":"Arin"},
    {"title":"Le Fear","year":2010,"genres":["comedy","horror"],"license":"https://creativecommons.org/licenses/by/3.0/","creator":"Jason"},
    {"title":"Monolog","year":2010,"genres":["thriller","scifi","drama"],"license":"https://creativecommons.org/licenses/by/3.0/","creator":"Eray"},
    {"title":"The Manifesto","year":2010,"genres":["horror","thriller"],"license":"https://creativecommons.org/licenses/by-sa/3.0/","creator":""},
    {"title":"Valkaama","year":2010,"genres":["drama"],"license":"https://creativecommons.org/licenses/by-sa/3.0/","creator":"Tim"},
]

BAD_FILE = ("trailer","teaser","sample","clip","preview","yts","rarbg","webrip","web-dl","brrip","dvdrip","camrip","torrent")


def get_json(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.load(r)


def clean(v):
    if isinstance(v, list): v = " ".join(map(str,v))
    return re.sub(r"\s+"," ",html.unescape(re.sub(r"<[^>]+>"," ",str(v or "")))).strip()


def canon_license(v):
    v = clean(v).replace("http://creativecommons.org/","https://creativecommons.org/").strip()
    if v and not v.endswith("/"): v += "/"
    return v


def search(title):
    q = f'mediatype:movies AND title:"{title}"'
    params = urllib.parse.urlencode({"q":q,"fl[]":"identifier","rows":25,"output":"json"})
    data = get_json("https://archive.org/advancedsearch.php?"+params)
    return [d["identifier"] for d in data.get("response",{}).get("docs",[]) if d.get("identifier")]


def year_matches(info, expected):
    # Never use upload/publication timestamp as a film release year.
    text = clean(info.get("year"))+" "+clean(info.get("date"))
    years = [int(x) for x in re.findall(r"\b(20\d{2})\b", text)]
    return expected in years


def probe(url):
    try:
        p = subprocess.run([
            "ffprobe","-v","error","-rw_timeout","8000000",
            "-show_entries","format=duration:stream=codec_name,codec_type,height",
            "-of","json",url
        ],capture_output=True,text=True,timeout=12)
        if p.returncode: return None
        d=json.loads(p.stdout or "{}")
        streams=d.get("streams",[])
        video=[s for s in streams if s.get("codec_type")=="video"]
        audio=[s for s in streams if s.get("codec_type")=="audio"]
        if not video or not audio: return None
        if video[0].get("codec_name") not in {"h264","avc1"}: return None
        if audio[0].get("codec_name") not in {"aac","mp3"}: return None
        dur=float(d.get("format",{}).get("duration") or 0)
        if dur < 3600 or dur > 14400: return None
        req=urllib.request.Request(url,headers={"User-Agent":UA,"Range":"bytes=0-4095"})
        with urllib.request.urlopen(req,timeout=8) as r:
            r.read(4096)
            if r.getcode()!=206 and "bytes" not in (r.headers.get("Accept-Ranges") or "").lower() and not (r.headers.get("Content-Range") or "").lower().startswith("bytes"):
                return None
        return dur,int(video[0].get("height") or 0)
    except Exception:
        return None


def subtitle_tracks(meta, identifier):
    out=[]
    for lang,tokens in (("ar",(".ar.","_ar.","-ar.","arabic")),("en",(".en.","_en.","-en.","english"))):
        for f in meta.get("files",[]):
            name=str(f.get("name", "")); low=name.lower()
            if low.endswith(".vtt") and any(t in low for t in tokens):
                out.append({"lang":lang,"labelAr":"العربية" if lang=="ar" else "الإنجليزية","labelEn":"Arabic" if lang=="ar" else "English","url":f"https://archive.org/download/{urllib.parse.quote(identifier,safe='')}/{urllib.parse.quote(name,safe='/')}"})
                break
    return out


def verify_one(spec):
    try: ids=search(spec["title"])
    except Exception: return None
    for identifier in ids:
        try: meta=get_json("https://archive.org/metadata/"+urllib.parse.quote(identifier,safe=""))
        except Exception: continue
        info=meta.get("metadata",{})
        if canon_license(info.get("licenseurl")) != spec["license"]: continue
        if not year_matches(info,spec["year"]): continue
        creator=clean(info.get("creator"))
        if spec["creator"] and spec["creator"].lower() not in creator.lower(): continue
        title=clean(info.get("title"))
        if spec["title"].lower() not in title.lower(): continue
        files=[]
        for f in meta.get("files",[]):
            name=str(f.get("name", "")); low=name.lower()
            if not low.endswith(".mp4") or any(x in low for x in BAD_FILE): continue
            try:
                length=float(f.get("length") or 0); size=int(f.get("size") or 0)
            except Exception: length=size=0
            if length and length<3600: continue
            score=(40 if ".ia.mp4" in low else 0)+(20 if "512kb" in low else 0)+(10 if "720" in low or "1080" in low else 0)-(20 if size>3000000000 else 0)
            files.append((score,f))
        files.sort(key=lambda x:x[0],reverse=True)
        for _,f in files[:5]:
            url=f"https://archive.org/download/{urllib.parse.quote(identifier,safe='')}/{urllib.parse.quote(f['name'],safe='/')}"
            pr=probe(url)
            if not pr: continue
            dur,height=pr
            runtime=round(dur/60)
            label="1080p" if height>=900 else "720p" if height>=650 else "480p" if height>=430 else "360p"
            tracks=subtitle_tracks(meta,identifier)
            source=f"https://archive.org/details/{urllib.parse.quote(identifier,safe='')}"
            poster=f"https://archive.org/download/{urllib.parse.quote(identifier,safe='')}/__ia_thumb.jpg"
            mid=re.sub(r"[^a-z0-9]+","-",spec["title"].lower()).strip("-")+f"-{spec['year']}"
            return {
                "id":mid,"type":"movie","genres":spec["genres"],"titleAr":spec["title"],"titleEn":spec["title"],"titleOriginal":spec["title"],
                "year":spec["year"],"languageAr":clean(info.get("language")) or "Unknown","languageEn":clean(info.get("language")) or "Unknown",
                "runtimeMinutes":runtime,"poster":poster,"backdrop":poster,
                "descriptionAr":f"فيلم روائي طويل من عام {spec['year']}، مدته نحو {runtime} دقيقة.",
                "descriptionEn":clean(info.get("description"))[:700] or f"{spec['title']} is a feature-length fiction film.",
                "publishedAt":"2026-09-11","sources":[{"label":label,"url":url,"mimeType":"video/mp4","sizeBytes":int(f.get("size") or 0)}],
                "subtitles":tracks,
                "subtitleStatusAr":"ترجمة عربية متاحة من المصدر." if any(t["lang"]=="ar" for t in tracks) else ("يتوفر مسار ترجمة إنجليزي من المصدر، والعربية قيد التجهيز." if any(t["lang"]=="en" for t in tracks) else "لا توجد ترجمة عربية مرخّصة منشورة حاليًا."),
                "subtitleStatusEn":"Arabic subtitles are available from the source." if any(t["lang"]=="ar" for t in tracks) else "Arabic subtitles are not yet published.",
                "contentSourceName":"Internet Archive","contentSourceUrl":source,"metadataSourceName":"Internet Archive","metadataSourceUrl":source,
                "licenseName":ALLOWED[spec["license"]],"licenseUrl":spec["license"],"attribution":f"{spec['title']} — {creator or 'original filmmakers'}",
                "downloadAllowed":True,"downloadUrl":url,
                "rightsStatusAr":"تم التحقق من النسخة نفسها: ترخيص تجاري مناسب، فيلم روائي 2000+، مدة ساعة فأكثر، H.264 مع صوت، ودعم التقديم داخل المشغل.",
                "rightsStatusEn":"Playback and commercial-use source verified by Cineyah pipeline.",
                "legalLinks":[{"kind":"info","labelAr":"المصدر والترخيص","labelEn":"Source and license","url":source}],
            }
    return None


def ts(records):
    raw=json.dumps(records,ensure_ascii=False,indent=2)
    raw=raw.replace('"type": "movie"','"type": "movie" as const')
    raw=raw.replace('"kind": "info"','"kind": "info" as const')
    raw=raw.replace('"label": "1080p"','"label": "1080p" as const').replace('"label": "720p"','"label": "720p" as const').replace('"label": "480p"','"label": "480p" as const').replace('"label": "360p"','"label": "360p" as const')
    raw=raw.replace('"lang": "ar"','"lang": "ar" as const').replace('"lang": "en"','"lang": "en" as const')
    # quote keys remain valid TS; remove JSON quote around inserted `as const` values.
    raw=re.sub(r'"([^"\\]+)" as const',lambda m:'"'+m.group(1)+'" as const',raw)
    return 'import type { Movie } from "@/lib/catalog";\n\n// Generated only from exact, commercially reusable, playback-verified feature-film sources.\nexport const generatedFreeMovies: Movie[] = '+raw+';\n'


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(CANDIDATES)) as pool:
        rows=list(pool.map(verify_one,CANDIDATES))
    records=[r for r in rows if r]
    (ROOT/"lib/generated-free-movies.ts").write_text(ts(records))
    (ROOT/"content/known-open-fiction-report.json").write_text(json.dumps({"checked":len(CANDIDATES),"verified":len(records),"titles":[r["titleEn"] for r in records],"arabic":sum(any(t["lang"]=="ar" for t in r["subtitles"]) for r in records)},ensure_ascii=False,indent=2)+"\n")
    print(json.dumps({"verified":len(records),"titles":[r["titleEn"] for r in records]},ensure_ascii=False))

if __name__=="__main__": main()
