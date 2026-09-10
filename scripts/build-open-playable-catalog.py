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

ROOT=pathlib.Path(__file__).resolve().parents[1]
TARGET_PER_GENRE=10
ROWS=50
MAX_PAGES_PER_GENRE=10
UA="Cineyah/2.0 playable-catalog"

GENRE_TERMS={
  "action":["action","martial arts","kung fu","combat","chase"],
  "horror":["horror","supernatural","ghost","haunted","demon","possession","vampire","zombie","witchcraft"],
  "comedy":["comedy","slapstick","farce","satire","humor","humour"],
  "drama":["drama","dramatic"],
  "romance":["romance","romantic","love story"],
  "thriller":["thriller","suspense"],
  "crime":["crime","gangster","criminal","heist","detective"],
  "mystery":["mystery","detective","whodunit"],
  "adventure":["adventure","expedition","journey"],
  "scifi":["science fiction","sci-fi","science-fiction","space","futuristic"],
  "fantasy":["fantasy","fairy tale","magic","magical"],
  "war":["war film","war movie","military","world war","battle"],
  "western":["western","cowboy","frontier"],
  "family":["family film","family movie","children","kids"],
  "animation":["animation","animated","cartoon"],
  "musical":["musical","music film","song and dance"],
  "history":["historical","history","period film","period drama"],
  "biography":["biography","biographical","biopic"],
  "sport":["sports film","sport film","boxing","baseball","football","soccer","racing"],
}
GENRE_AR={
  "action":"أكشن","horror":"رعب","comedy":"كوميديا","drama":"دراما","romance":"رومانسي","thriller":"إثارة","crime":"جريمة","mystery":"غموض","adventure":"مغامرات","scifi":"خيال علمي","fantasy":"فانتازيا","war":"حربي","western":"غربي","family":"عائلي","animation":"رسوم متحركة","musical":"موسيقي","history":"تاريخي","biography":"سيرة ذاتية","sport":"رياضي"
}
LICENSES=[
  "https://creativecommons.org/licenses/by/2.0/","https://creativecommons.org/licenses/by/2.5/","https://creativecommons.org/licenses/by/3.0/","https://creativecommons.org/licenses/by/4.0/",
  "https://creativecommons.org/licenses/by-sa/2.0/","https://creativecommons.org/licenses/by-sa/2.5/","https://creativecommons.org/licenses/by-sa/3.0/","https://creativecommons.org/licenses/by-sa/4.0/",
  "https://creativecommons.org/licenses/by-nd/2.0/","https://creativecommons.org/licenses/by-nd/2.5/","https://creativecommons.org/licenses/by-nd/3.0/","https://creativecommons.org/licenses/by-nd/4.0/",
  "https://creativecommons.org/publicdomain/zero/1.0/","https://creativecommons.org/publicdomain/mark/1.0/",
]
BAD_TERMS=(
  "trailer","teaser","clip","short film","shorts","episode","episodes","tv episode","season ","full season","all episodes",
  "porn","erotic","xxx","adult","compilation","collection","boxset","box set","marathon","gameplay","walkthrough","podcast","radio show",
  "commercial break","commercials","channel archive","livestream","live stream","playlist","complete series","movie collection"
)
PIRACY_MARKERS=("yts","rarbg","webrip","web-dl","brrip","dvdrip","camrip","hdrip","torrent","x265-","x264-")


def fetch_json(url,timeout=25):
  req=urllib.request.Request(url,headers={"User-Agent":UA})
  with urllib.request.urlopen(req,timeout=timeout) as r:
    return json.load(r)


def clean(value):
  if isinstance(value,list): value=" ".join(str(x) for x in value)
  value=html.unescape(re.sub(r"<[^>]+>"," ",str(value or "")))
  return re.sub(r"\s+"," ",value).strip()


def norm_license(value):
  value=clean(value).replace("http://creativecommons.org/","https://creativecommons.org/")
  return value


def parse_year(info):
  for key in ("year","date"):
    m=re.search(r"\b(18\d{2}|19\d{2}|20\d{2})\b",clean(info.get(key)))
    if m:return int(m.group(1))
  return 2000


def norm_title(value):
  value=re.sub(r"\[[^\]]*\]"," ",value)
  value=re.sub(r"\b(18\d{2}|19\d{2}|20\d{2})\b"," ",value)
  return re.sub(r"[^a-z0-9]+"," ",value.lower()).strip()


def safe_id(identifier):
  return re.sub(r"[^a-z0-9]+","-",identifier.lower()).strip("-")[:100]


def looks_like_feature(identifier,title,description):
  low=f"{identifier} {title} {description}".lower()
  if not title or len(title)>150:return False
  if any(term in low for term in BAD_TERMS):return False
  if any(term in low for term in PIRACY_MARKERS):return False
  if re.search(r"\b(ep\.?\s*\d+|episode\s*\d+|season\s*\d+)\b",low):return False
  return True


def infer_genres(haystack,expected):
  low=haystack.lower()
  genres=[]
  for genre,terms in GENRE_TERMS.items():
    if any(term in low for term in terms):genres.append(genre)
  if expected not in genres:genres.insert(0,expected)
  return list(dict.fromkeys(genres))


def source_rank(f):
  name=str(f.get("name","")).lower();fmt=str(f.get("format","")).lower();size=int(f.get("size") or 0)
  if not name.endswith(".mp4"):return -1
  score=100
  if ".ia.mp4" in name:score+=55
  if "512kb" in name or "512kb" in fmt:score+=45
  if "h.264" in fmt or "h264" in fmt or "mpeg4" in fmt:score+=35
  if 120_000_000<=size<=1_600_000_000:score+=25
  if size>2_200_000_000:score-=80
  return score


def reported_seconds(f):
  try:return float(f.get("length") or 0)
  except Exception:return 0


def range_ok(url):
  try:
    req=urllib.request.Request(url,headers={"User-Agent":UA,"Range":"bytes=0-2047"})
    with urllib.request.urlopen(req,timeout=12) as r:
      status=getattr(r,"status",200)
      r.read(2048)
      return status in (200,206)
  except Exception:
    return False


def probe(url):
  try:
    p=subprocess.run([
      "ffprobe","-v","error","-rw_timeout","12000000","-show_entries","format=duration:stream=codec_name,codec_type,height","-of","json",url
    ],capture_output=True,text=True,timeout=20)
    if p.returncode:return None
    data=json.loads(p.stdout or "{}")
    streams=data.get("streams",[])
    videos=[s for s in streams if s.get("codec_type")=="video"]
    audios=[s for s in streams if s.get("codec_type")=="audio"]
    if not videos or videos[0].get("codec_name")!="h264":return None
    if audios and audios[0].get("codec_name") not in {"aac","mp3"}:return None
    duration=float(data.get("format",{}).get("duration") or 0)
    if not 5400<=duration<=12600:return None
    height=int(videos[0].get("height") or 0)
    return duration,height
  except Exception:
    return None


def license_name(url):
  if "publicdomain/zero" in url:return "CC0 1.0"
  if "publicdomain/mark" in url:return "Public Domain Mark 1.0"
  m=re.search(r"licenses/(by(?:-sa|-nd)?)/(\d\.\d)/",url)
  return f"CC {m.group(1).upper()} {m.group(2)}" if m else "Creative Commons"


def inspect(identifier,expected):
  safe=urllib.parse.quote(identifier,safe="")
  try:
    meta=fetch_json(f"https://archive.org/metadata/{safe}")
    info=meta.get("metadata",{})
    title=clean(info.get("title"));description=clean(info.get("description"));creator=clean(info.get("creator"));year=parse_year(info)
    if not looks_like_feature(identifier,title,description):return None
    lic=norm_license(info.get("licenseurl"))
    if lic not in LICENSES:return None
    if "publicdomain/mark" in lic and year>1930:return None
    if "licenses/" in lic and not creator:return None
    subjects=info.get("subject",[]);subjects=subjects if isinstance(subjects,list) else [subjects]
    collections=info.get("collection",[]);collections=collections if isinstance(collections,list) else [collections]
    haystack=" ".join([title,description,*[clean(x) for x in subjects],*[clean(x) for x in collections]])
    genres=infer_genres(haystack,expected)
    files=[f for f in meta.get("files",[]) if source_rank(f)>=0]
    files.sort(key=source_rank,reverse=True)
    chosen=None;media=None
    for f in files[:6]:
      hinted=reported_seconds(f)
      if hinted and not 5400<=hinted<=12600:continue
      url=f"https://archive.org/download/{safe}/{urllib.parse.quote(f['name'],safe='/')}"
      result=probe(url)
      if result and range_ok(url):
        chosen=f;media=(url,*result);break
    if not chosen or not media:return None
    url,duration,height=media
    runtime=int(round(duration/60))
    label="1080p" if height>=900 else "720p" if height>=650 else "480p"
    language=clean(info.get("language")) or "Unknown"
    desc_en=description[:520].strip()
    if len(desc_en)<60:desc_en=f"{title} is a feature-length film from {year}."
    genre_ar=" · ".join(GENRE_AR[g] for g in genres[:4])
    source_page=f"https://archive.org/details/{safe}"
    return {
      "id":safe_id(identifier),"type":"movie","genres":genres,"titleAr":title,"titleEn":title,"titleOriginal":title,"year":year,
      "languageAr":language,"languageEn":language,"runtimeMinutes":runtime,
      "poster":f"https://archive.org/download/{safe}/__ia_thumb.jpg",
      "descriptionAr":f"فيلم طويل من عام {year} بتصنيفات {genre_ar}. المدة نحو {runtime} دقيقة.",
      "descriptionEn":desc_en,"publishedAt":dt.date.today().isoformat(),
      "sources":[{"label":label,"url":url,"mimeType":"video/mp4","sizeBytes":int(chosen.get("size") or 0)}],"subtitles":[],
      "contentSourceName":"Internet Archive","contentSourceUrl":source_page,"metadataSourceName":"Internet Archive","metadataSourceUrl":source_page,
      "licenseName":license_name(lic),"licenseUrl":lic,"attribution":f"{title} ({year}) — {creator or 'public-domain source'}","downloadAllowed":False,
      "rightsStatusAr":"تم التحقق داخليًا من المصدر المفتوح وملف التشغيل.","rightsStatusEn":"Open-source provenance and playback file checked internally."
    }
  except Exception:
    return None


def search_page(genre,page):
  license_q=" OR ".join(f'\"{x}\"' for x in LICENSES)
  terms=" OR ".join(f'\"{x}\"' if " " in x else x for x in GENRE_TERMS[genre])
  feature='(collection:feature_films OR collection:opensource_movies OR subject:("feature film" OR "feature films" OR movie OR cinema) OR title:("full movie" OR "feature film"))'
  query=f'mediatype:movies AND licenseurl:({license_q}) AND {feature} AND (subject:({terms}) OR title:({terms}) OR description:({terms}))'
  params=urllib.parse.urlencode({"q":query,"fl[]":"identifier","rows":ROWS,"page":page,"output":"json"})
  docs=fetch_json("https://archive.org/advancedsearch.php?"+params).get("response",{}).get("docs",[])
  return [x["identifier"] for x in docs if x.get("identifier")]


def coverage(records):
  return {g:sum(g in x["genres"] for x in records) for g in GENRE_TERMS}


def patch_catalog(records):
  path=ROOT/"lib/catalog.ts";text=path.read_text()
  text=re.sub(r'\n  // GENERATED PLAYABLE START\n.*?\n  // GENERATED PLAYABLE END\n','\n',text,flags=re.S)
  objects=[]
  for record in records:
    objects.append("  "+json.dumps(record,ensure_ascii=False,indent=2).replace("\n","\n  ")+",")
  block="\n  // GENERATED PLAYABLE START\n"+"\n".join(objects)+"\n  // GENERATED PLAYABLE END\n"
  marker="\n];\n\nexport const discoverableMovies"
  if marker not in text:raise SystemExit("catalog insertion marker not found")
  text=text.replace(marker,block+"];\n\nexport const discoverableMovies",1)
  old="export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);\nexport const publicMovies = discoverableMovies;\nexport const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);"
  new="export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);\nexport const playableMovies = discoverableMovies.filter(movie => movie.sources.length > 0);\nexport const publicMovies = playableMovies;"
  if old in text:text=text.replace(old,new,1)
  elif new not in text:raise SystemExit("catalog export block changed")
  path.write_text(text)


def main():
  records=[];seen_titles=set();seen_ids=set();cache={}
  for genre in GENRE_TERMS:
    if coverage(records)[genre]>=TARGET_PER_GENRE:continue
    for page in range(1,MAX_PAGES_PER_GENRE+1):
      try:ids=search_page(genre,page)
      except Exception as e:
        print(json.dumps({"genre":genre,"page":page,"searchError":str(e)}),flush=True);break
      fresh=[i for i in ids if (i,genre) not in seen_ids]
      for i in fresh:seen_ids.add((i,genre))
      if not fresh:break
      def load(i):
        key=(i,genre)
        if key not in cache:cache[key]=inspect(i,genre)
        return cache[key]
      with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        for item in pool.map(load,fresh):
          if not item:continue
          key=norm_title(item["titleEn"])
          if not key or key in seen_titles:continue
          if genre not in item["genres"]:continue
          records.append(item);seen_titles.add(key)
      cov=coverage(records)
      print(json.dumps({"genre":genre,"page":page,"verifiedForGenre":cov[genre],"totalUnique":len(records)},ensure_ascii=False),flush=True)
      if cov[genre]>=TARGET_PER_GENRE:break
      if len(ids)<ROWS:break
  cov=coverage(records)
  records.sort(key=lambda x:(x["genres"][0],x["titleEn"].lower()))
  (ROOT/"content/generated-playable.json").write_text(json.dumps(records,ensure_ascii=False,indent=2)+"\n")
  report={"generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),"targetPerGenre":TARGET_PER_GENRE,"uniqueMovies":len(records),"coverage":cov,"missing":{g:max(0,TARGET_PER_GENRE-n) for g,n in cov.items() if n<TARGET_PER_GENRE}}
  (ROOT/"content/playable-coverage.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
  patch_catalog(records)
  print(json.dumps(report,ensure_ascii=False),flush=True)

if __name__=="__main__":main()
