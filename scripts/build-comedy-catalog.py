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
PREQUALIFIED_TARGET = 420
SEARCH_LIMIT = 5000
UA = "Cineyah/1.0 comedy-batch"

LICENSES = {
    "https://creativecommons.org/licenses/by/2.0/","https://creativecommons.org/licenses/by/2.5/","https://creativecommons.org/licenses/by/3.0/","https://creativecommons.org/licenses/by/4.0/",
    "https://creativecommons.org/licenses/by-sa/2.0/","https://creativecommons.org/licenses/by-sa/2.5/","https://creativecommons.org/licenses/by-sa/3.0/","https://creativecommons.org/licenses/by-sa/4.0/",
    "https://creativecommons.org/licenses/by-nd/2.0/","https://creativecommons.org/licenses/by-nd/2.5/","https://creativecommons.org/licenses/by-nd/3.0/","https://creativecommons.org/licenses/by-nd/4.0/",
    "https://creativecommons.org/publicdomain/zero/1.0/","https://creativecommons.org/publicdomain/mark/1.0/",
}
BAD_TERMS={
    "trailer","teaser","clip","short film","shorts","episode","episodes","tv episode","porn","erotic","xxx","adult",
    "compilation","collection","boxset","box set","franchise","trilogy","marathon","gameplay","walkthrough","commercials",
    "podcast","radio show","news","festival","performance","concert","improv","showcase","complete series","season ",
    "full season","all episodes","playlist","bumper","bumpers","idents","dvd iso","blu-ray iso","documentary","docu-series",
    "game show","talk show","music video","video essay","fan edit","behind the scenes","making of","recording","recordings",
    "reccording","reccordings","livestream","live stream","youtube channel","twitch","double feature","two movies","2 movies",
    "with trailers","riff collection","tv recordings","television recordings"
}
COMEDY_TERMS=("comedy","comed","slapstick","farce","romantic comedy","romcom","satire","humor","humour")
FEATURE_TERMS=("feature film","feature films","feature-length","feature length","full movie","full film","motion picture","feature movie")
FEATURE_COLLECTIONS={"feature_films","featurefilms","moviesandfilms"}


def fetch_json(url,timeout=14):
    req=urllib.request.Request(url,headers={"User-Agent":UA})
    with urllib.request.urlopen(req,timeout=timeout) as r:return json.load(r)

def clean(v):
    if isinstance(v,list):v=" ".join(str(x) for x in v)
    return re.sub(r"\s+"," ",html.unescape(re.sub(r"<[^>]+>"," ",str(v or "")))).strip()

def vals(v):return v if isinstance(v,list) else ([v] if v else [])
def reported(f):
    try:return float(f.get("length") or 0)
    except:return 0.0

def norm(title):
    title=re.sub(r"\[[^\]]*\]"," ",title)
    title=re.sub(r"\([^)]*(?:rip|dub|sub|1080|720|480|vhs|dvd|bluray|blu-ray|webrip|web-rip|yify|yts|geekjuice|geek juice)[^)]*\)"," ",title,flags=re.I)
    title=re.sub(r"\b(18\d{2}|19\d{2}|20\d{2})\b"," ",title)
    title=re.sub(r"\b(full movie|full film|feature film|movie|film|extended edition|anniversary edition|sing along edition)\b"," ",title,flags=re.I)
    title=re.sub(r"\b(starring|directed by|produced by)\b.*$"," ",title,flags=re.I)
    return re.sub(r"[^a-z0-9]+"," ",title.lower()).strip()

def parse_year(info):
    for k in ("year","date"):
        m=re.search(r"\b(18\d{2}|19\d{2}|20\d{2})\b",clean(info.get(k)))
        if m:return int(m.group(1))
    return 0

def license_name(url):
    if "publicdomain/zero" in url:return "CC0 1.0"
    if "publicdomain/mark" in url:return "Public Domain Mark 1.0"
    m=re.search(r"licenses/(by(?:-sa|-nd)?)/(\d\.\d)/",url)
    return f"CC {m.group(1).upper()} {m.group(2)}" if m else "Creative Commons"

def source_rank(f):
    n=str(f.get("name","")).lower(); fmt=str(f.get("format","")).lower(); size=int(f.get("size") or 0)
    score=120 if n.endswith(".mp4") else 70 if n.endswith(".webm") else 0
    if any(x in fmt for x in ("h.264","h264","mpeg4","mpeg-4")):score+=45
    if any(x in fmt for x in ("vp9","vp8","webm")):score+=25
    if "512kb" in n or "512kb" in fmt:score+=15
    if 100_000_000<=size<=3_000_000_000:score+=10
    return score

def looks_feature(info,title,description,subjects,files):
    low=f"{title} {description} {' '.join(subjects)}".lower()
    if any(x in low for x in BAD_TERMS):return False
    if re.search(r"\b(ep\.?\s*\d+|episode\s*\d+|part\s*[2-9]\d*)\b",title,re.I):return False
    if not any(x in f"{title} {' '.join(subjects)}".lower() for x in COMEDY_TERMS):return False
    collections={clean(x).lower() for x in vals(info.get("collection"))}
    explicit=any(x in low for x in FEATURE_TERMS)
    if not (explicit or collections & FEATURE_COLLECTIONS):return False
    media=[f for f in files if str(f.get("name","")).lower().endswith((".mp4",".webm"))]
    if not media:return False
    # Archive.org often omits `length` on otherwise valid derivative media. A missing
    # metadata length is not a rejection: the decisive duration/codec gate is ffprobe.
    measured=[reported(f) for f in media if reported(f)>0]
    if measured and not any(5400<=d<=12600 for d in measured):return False
    return True

def preinspect(identifier):
    safe=urllib.parse.quote(identifier,safe="")
    try:
        meta=fetch_json(f"https://archive.org/metadata/{safe}")
        info=meta.get("metadata",{}); title=clean(info.get("title")); desc=clean(info.get("description")); subjects=[clean(x) for x in vals(info.get("subject"))]
        lic=clean(info.get("licenseurl"))
        files=meta.get("files",[])
        if not title or lic not in LICENSES or not looks_feature(info,title,desc,subjects,files):return None
        choices=[]
        for f in files:
            n=str(f.get("name","")).lower(); dur=reported(f)
            if not n.endswith((".mp4",".webm")):continue
            if dur and not (5400<=dur<=12600):continue
            choices.append(f)
        if not choices:return None
        choices.sort(key=source_rank,reverse=True)
        return {"identifier":identifier,"safe":safe,"info":info,"title":title,"description":desc,"license":lic,"file":choices[0]}
    except Exception:return None

def probe(url):
    try:
        p=subprocess.run(["ffprobe","-v","error","-rw_timeout","12000000","-show_entries","format=duration:stream=codec_name,codec_type","-of","json",url],capture_output=True,text=True,timeout=20)
        if p.returncode:return None
        d=json.loads(p.stdout or "{}"); streams=d.get("streams",[])
        video=[s.get("codec_name") for s in streams if s.get("codec_type")=="video"]
        audio=[s.get("codec_name") for s in streams if s.get("codec_type")=="audio"]
        if not video or video[0] not in {"h264","vp8","vp9","av1"}:return None
        if audio and audio[0] not in {"aac","mp3","opus","vorbis"}:return None
        duration=float(d.get("format",{}).get("duration") or 0)
        return duration if 5400<=duration<=12600 else None
    except Exception:return None

def verify(c):
    f=c["file"]; url=f"https://archive.org/download/{c['safe']}/{urllib.parse.quote(f['name'],safe='/')}"
    duration=probe(url)
    if not duration:return None
    info=c["info"]; title=c["title"]; description=c["description"]
    creator=clean(info.get("creator")) or "Internet Archive contributor"; lang=clean(info.get("language")) or "Unknown"
    desc=description[:520].strip() or f"{title} is a feature-length comedy from an openly licensed source, verified by Cineyah for runtime and browser-compatible playback."
    return {"id":re.sub(r"[^a-z0-9]+","-",c['identifier'].lower()).strip("-")[:90],"type":"movie","genres":["comedy"],"titleAr":title,"titleEn":title,"year":parse_year(info),"languageAr":lang,"languageEn":lang,"runtimeMinutes":int(round(duration/60)),"poster":f"https://archive.org/download/{c['safe']}/__ia_thumb.jpg","descriptionAr":f"فيلم كوميدي طويل بعنوان «{title}». أُضيف إلى سينياه بعد التحقق من أن مدته لا تقل عن ساعة ونصف وأن ملف الفيديو متوافق مع تشغيل المتصفح.","descriptionEn":desc,"publishedAt":dt.date.today().isoformat(),"sources":[{"label":"480p","url":url}],"subtitles":[],"sourceUrl":f"https://archive.org/details/{c['safe']}","licenseName":license_name(c['license']),"licenseUrl":c['license'],"attribution":f"{title} — {creator}","downloadAllowed":True}

def discover_ids():
    queries=[
        'mediatype:movies AND collection:feature_films AND subject:comedy',
        'mediatype:movies AND collection:feature_films AND (subject:slapstick OR subject:farce OR subject:satire)',
        'mediatype:movies AND subject:comedy',
        'mediatype:movies AND title:comedy',
        'mediatype:movies AND subject:"romantic comedy"',
        'mediatype:movies AND (subject:slapstick OR subject:farce OR subject:satire)',
        'mediatype:movies AND (subject:humor OR subject:humour)'
    ]
    out=[]; seen=set()
    for q in queries:
        for page in range(1,31):
            if len(out)>=SEARCH_LIMIT:break
            params=urllib.parse.urlencode({"q":q,"fl[]":"identifier","rows":100,"page":page,"output":"json"})
            docs=fetch_json("https://archive.org/advancedsearch.php?"+params).get("response",{}).get("docs",[])
            for d in docs:
                i=d.get("identifier")
                if i and i not in seen:seen.add(i);out.append(i)
            if len(docs)<100:break
        if len(out)>=SEARCH_LIMIT:break
    return out

def main():
    ids=discover_ids(); print(json.dumps({"stage":"discovery","candidates":len(ids)}),flush=True)
    pre=[]; seen_titles=set()
    for start in range(0,len(ids),400):
        chunk=ids[start:start+400]
        with concurrent.futures.ThreadPoolExecutor(max_workers=64) as pool:
            futures=[pool.submit(preinspect,i) for i in chunk]
            for fut in concurrent.futures.as_completed(futures):
                x=fut.result()
                if not x:continue
                k=norm(x["title"])
                if not k or k in seen_titles:continue
                seen_titles.add(k);pre.append(x)
        print(json.dumps({"stage":"prequalified","count":len(pre),"scanned":min(start+400,len(ids))}),flush=True)
        if len(pre)>=PREQUALIFIED_TARGET:break
    if len(pre)<TARGET:raise SystemExit(f"Only {len(pre)} prequalified comedy features; need {TARGET}")
    found=[]; final_seen=set()
    with concurrent.futures.ThreadPoolExecutor(max_workers=32) as pool:
        futures=[pool.submit(verify,x) for x in pre]
        for fut in concurrent.futures.as_completed(futures):
            x=fut.result()
            if not x:continue
            k=norm(x["titleEn"])
            if not k or k in final_seen:continue
            final_seen.add(k);found.append(x);print(json.dumps({"verified":len(found),"title":x["titleEn"]}),flush=True)
            if len(found)>=TARGET:
                for f in futures:f.cancel()
                break
    if len(found)<TARGET:raise SystemExit(f"Only {len(found)} playback-verified distinct comedy feature films found; need {TARGET}")
    published=found[:TARGET]
    assert len({norm(x["titleEn"]) for x in published})==TARGET
    assert all(90<=x["runtimeMinutes"]<=210 for x in published)
    assert all(x["sources"] and x["sources"][0]["url"].startswith("https://") for x in published)
    (ROOT/"content/generated-comedy.json").write_text(json.dumps(published,ensure_ascii=False,indent=2)+"\n")
    report={"target":TARGET,"verified":TARGET,"distinct":TARGET,"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),"method":"metadata feature/comedy gate + ffprobe codec/duration verification"}
    (ROOT/"content/comedy-batch-report.json").write_text(json.dumps(report,indent=2)+"\n")
    print(json.dumps(report),flush=True)

if __name__=="__main__":main()
