#!/usr/bin/env python3
import concurrent.futures, datetime as dt, html, json, pathlib, re, subprocess, urllib.parse, urllib.request

ROOT=pathlib.Path(__file__).resolve().parents[1]
TARGET=10; ROWS=60; MAX_PAGES=3; UA="Cineyah/2.1 playable-fast"
GENRES={
"action":["action","martial arts","kung fu","combat"],"horror":["horror","supernatural","ghost","haunted","demon","possession","vampire","zombie","witchcraft"],"comedy":["comedy","slapstick","farce","satire","humor","humour"],"drama":["drama","dramatic"],"romance":["romance","romantic","love story"],"thriller":["thriller","suspense"],"crime":["crime","gangster","heist","detective"],"mystery":["mystery","detective","whodunit"],"adventure":["adventure","expedition","journey"],"scifi":["science fiction","sci-fi","science-fiction","space","futuristic"],"fantasy":["fantasy","fairy tale","magic","magical"],"war":["war film","war movie","military","world war","battle"],"western":["western","cowboy","frontier"],"family":["family film","family movie","children","kids"],"animation":["animation","animated","cartoon"],"musical":["musical","music film","song and dance"],"history":["historical","history","period film","period drama"],"biography":["biography","biographical","biopic"],"sport":["sports film","sport film","boxing","baseball","football","soccer","racing"]}
AR={"action":"أكشن","horror":"رعب","comedy":"كوميديا","drama":"دراما","romance":"رومانسي","thriller":"إثارة","crime":"جريمة","mystery":"غموض","adventure":"مغامرات","scifi":"خيال علمي","fantasy":"فانتازيا","war":"حربي","western":"غربي","family":"عائلي","animation":"رسوم متحركة","musical":"موسيقي","history":"تاريخي","biography":"سيرة ذاتية","sport":"رياضي"}
LICENSES=[f"https://creativecommons.org/licenses/{kind}/{v}/" for kind in ("by","by-sa","by-nd") for v in ("2.0","2.5","3.0","4.0")]+["https://creativecommons.org/publicdomain/zero/1.0/","https://creativecommons.org/publicdomain/mark/1.0/"]
BAD=("trailer","teaser","clip","short film","shorts","episode","episodes","season ","full season","compilation","collection","boxset","marathon","gameplay","walkthrough","podcast","radio show","commercial break","channel archive","livestream","live stream","playlist","complete series","movie collection","porn","erotic","xxx","adult")
RIP=("yts","rarbg","webrip","web-dl","brrip","dvdrip","camrip","hdrip","torrent")

def fetch_json(url,timeout=18):
    req=urllib.request.Request(url,headers={"User-Agent":UA});
    with urllib.request.urlopen(req,timeout=timeout) as r:return json.load(r)
def clean(v):
    if isinstance(v,list):v=" ".join(str(x) for x in v)
    return re.sub(r"\s+"," ",html.unescape(re.sub(r"<[^>]+>"," ",str(v or "")))).strip()
def year_of(info):
    for k in ("year","date"):
        m=re.search(r"\b(18\d{2}|19\d{2}|20\d{2})\b",clean(info.get(k)))
        if m:return int(m.group(1))
    return 2000
def norm_title(s):return re.sub(r"[^a-z0-9]+"," ",re.sub(r"\b(18\d{2}|19\d{2}|20\d{2})\b"," ",s.lower())).strip()
def safe_id(s):return re.sub(r"[^a-z0-9]+","-",s.lower()).strip("-")[:100]
def lic_name(u):
    if "publicdomain/zero" in u:return "CC0 1.0"
    if "publicdomain/mark" in u:return "Public Domain Mark 1.0"
    m=re.search(r"licenses/(by(?:-sa|-nd)?)/(\d\.\d)/",u);return f"CC {m.group(1).upper()} {m.group(2)}" if m else "Creative Commons"
def infer(h):
    h=h.lower();return [g for g,terms in GENRES.items() if any(t in h for t in terms)]
def coverage(records):return {g:sum(g in r["genres"] for r in records.values()) for g in GENRES}

def search_ids(genre,page):
    lq=" OR ".join(f'\"{u}\"' for u in LICENSES);tq=" OR ".join(f'\"{t}\"' if " " in t else t for t in GENRES[genre])
    feature='(collection:feature_films OR collection:opensource_movies OR subject:("feature film" OR "feature films" OR movie OR cinema) OR title:("full movie" OR "feature film"))'
    q=f'mediatype:movies AND licenseurl:({lq}) AND {feature} AND (subject:({tq}) OR title:({tq}) OR description:({tq}))'
    p=urllib.parse.urlencode({"q":q,"fl[]":"identifier","rows":ROWS,"page":page,"output":"json"})
    return [d["identifier"] for d in fetch_json("https://archive.org/advancedsearch.php?"+p).get("response",{}).get("docs",[]) if d.get("identifier")]

def prefilter(identifier):
    safe=urllib.parse.quote(identifier,safe="")
    try:
        meta=fetch_json("https://archive.org/metadata/"+safe);info=meta.get("metadata",{})
        title=clean(info.get("title"));desc=clean(info.get("description"));low=f"{identifier} {title} {desc}".lower()
        if not title or len(title)>150 or any(x in low for x in BAD) or any(x in low for x in RIP):return None
        lic=clean(info.get("licenseurl")).replace("http://creativecommons.org/","https://creativecommons.org/")
        if lic not in LICENSES:return None
        y=year_of(info);creator=clean(info.get("creator"))
        if "publicdomain/mark" in lic and y>1930:return None
        if "licenses/" in lic and not creator:return None
        subjects=info.get("subject",[]);subjects=subjects if isinstance(subjects,list) else [subjects]
        cols=info.get("collection",[]);cols=cols if isinstance(cols,list) else [cols]
        hay=" ".join([title,desc,*map(clean,subjects),*map(clean,cols)])
        files=[]
        for f in meta.get("files",[]):
            name=str(f.get("name","")).lower();fmt=str(f.get("format","")).lower()
            if not name.endswith(".mp4"):continue
            try:length=float(f.get("length") or 0);size=int(f.get("size") or 0)
            except Exception:continue
            if not (5400<=length<=12600):continue
            if size and not (80_000_000<=size<=2_000_000_000):continue
            score=(60 if "512kb" in name else 0)+(50 if ".ia.mp4" in name else 0)+(35 if any(x in fmt for x in ("h.264","h264","mpeg4","mpeg-4")) else 0)-(30 if size>1_500_000_000 else 0)
            files.append((score,f))
        if not files:return None
        files.sort(key=lambda x:x[0],reverse=True)
        return {"identifier":identifier,"safe":safe,"info":info,"title":title,"desc":desc,"year":y,"creator":creator,"license":lic,"hay":hay,"files":[f for _,f in files[:3]]}
    except Exception:return None

def probe_url(url):
    try:
        p=subprocess.run(["ffprobe","-v","error","-rw_timeout","9000000","-show_entries","format=duration:stream=codec_name,codec_type,height","-of","json",url],capture_output=True,text=True,timeout=14)
        if p.returncode:return None
        d=json.loads(p.stdout or "{}");streams=d.get("streams",[]);v=[s for s in streams if s.get("codec_type")=="video"];a=[s for s in streams if s.get("codec_type")=="audio"]
        if not v or v[0].get("codec_name")!="h264":return None
        if a and a[0].get("codec_name") not in {"aac","mp3"}:return None
        dur=float(d.get("format",{}).get("duration") or 0)
        if not 5400<=dur<=12600:return None
        req=urllib.request.Request(url,headers={"User-Agent":UA,"Range":"bytes=0-2047"})
        with urllib.request.urlopen(req,timeout=10) as r:r.read(2048)
        return dur,int(v[0].get("height") or 0)
    except Exception:return None

def validate(c):
    if not c:return None
    for f in c["files"]:
        url=f"https://archive.org/download/{c['safe']}/{urllib.parse.quote(f['name'],safe='/')}";p=probe_url(url)
        if not p:continue
        dur,h=p;runtime=int(round(dur/60));label="1080p" if h>=900 else "720p" if h>=650 else "480p"
        lang=clean(c["info"].get("language")) or "Unknown";source=f"https://archive.org/details/{c['safe']}";desc=c["desc"][:520].strip() or f"{c['title']} is a feature-length film from {c['year']}."
        return {"id":safe_id(c["identifier"]),"type":"movie","genres":infer(c["hay"]),"titleAr":c["title"],"titleEn":c["title"],"titleOriginal":c["title"],"year":c["year"],"languageAr":lang,"languageEn":lang,"runtimeMinutes":runtime,"poster":f"https://archive.org/download/{c['safe']}/__ia_thumb.jpg","descriptionAr":"","descriptionEn":desc,"publishedAt":dt.date.today().isoformat(),"sources":[{"label":label,"url":url,"mimeType":"video/mp4","sizeBytes":int(f.get("size") or 0)}],"subtitles":[],"contentSourceName":"Internet Archive","contentSourceUrl":source,"metadataSourceName":"Internet Archive","metadataSourceUrl":source,"licenseName":lic_name(c["license"]),"licenseUrl":c["license"],"attribution":f"{c['title']} ({c['year']}) — {c['creator'] or 'public-domain source'}","downloadAllowed":False,"rightsStatusAr":"مصدر التشغيل متحقق داخليًا.","rightsStatusEn":"Playback source checked internally."}
    return None

def patch_catalog(records):
    p=ROOT/"lib/catalog.ts";s=p.read_text();s=re.sub(r'\n  // GENERATED PLAYABLE START\n.*?\n  // GENERATED PLAYABLE END\n','\n',s,flags=re.S)
    lines=[]
    for r in records:
        r["descriptionAr"]=f"فيلم طويل من عام {r['year']}، مدته نحو {r['runtimeMinutes']} دقيقة."
        lines.append("  "+json.dumps(r,ensure_ascii=False,indent=2).replace("\n","\n  ")+")")
    # fix JSON object closing marker added above and add commas as TypeScript array entries
    lines=[x[:-1]+"," for x in lines]
    block="\n  // GENERATED PLAYABLE START\n"+"\n".join(lines)+"\n  // GENERATED PLAYABLE END\n"
    marker="\n];\n\nexport const discoverableMovies"
    if marker not in s:raise SystemExit("catalog insertion marker not found")
    s=s.replace(marker,block+"];\n\nexport const discoverableMovies",1)
    old="export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);\nexport const publicMovies = discoverableMovies;\nexport const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);"
    new="export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);\nexport const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);\nexport const publicMovies = playableMovies;"
    if old in s:s=s.replace(old,new,1)
    elif new not in s:raise SystemExit("catalog export block changed")
    p.write_text(s)

def main():
    records={};cache={};seen_pairs=set()
    for genre in GENRES:
        if coverage(records)[genre]>=TARGET:continue
        for page in range(1,MAX_PAGES+1):
            try:ids=search_ids(genre,page)
            except Exception as e:print(json.dumps({"genre":genre,"searchError":str(e)}),flush=True);break
            ids=[i for i in ids if (i,genre) not in seen_pairs]
            for i in ids:seen_pairs.add((i,genre))
            if not ids:break
            def get(i):
                if i not in cache:cache[i]=validate(prefilter(i))
                return cache[i]
            with concurrent.futures.ThreadPoolExecutor(max_workers=14) as pool:
                for item in pool.map(get,ids):
                    if not item:continue
                    if genre not in item["genres"]:item["genres"].insert(0,genre)
                    key=norm_title(item["titleEn"])
                    if not key:continue
                    if key in records:
                        records[key]["genres"]=list(dict.fromkeys(records[key]["genres"]+item["genres"]))
                    else:records[key]=item
            cov=coverage(records);print(json.dumps({"genre":genre,"page":page,"count":cov[genre],"unique":len(records)},ensure_ascii=False),flush=True)
            if cov[genre]>=TARGET or len(ids)<ROWS:break
    cov=coverage(records);items=list(records.values());items.sort(key=lambda x:x["titleEn"].lower())
    (ROOT/"content/generated-playable.json").write_text(json.dumps(items,ensure_ascii=False,indent=2)+"\n")
    report={"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),"targetPerGenre":TARGET,"uniqueMovies":len(items),"coverage":cov,"missing":{g:TARGET-n for g,n in cov.items() if n<TARGET}}
    (ROOT/"content/playable-coverage.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n");patch_catalog(items);print(json.dumps(report,ensure_ascii=False),flush=True)
if __name__=="__main__":main()
