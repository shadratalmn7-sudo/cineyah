#!/usr/bin/env python3
import json,re,subprocess,urllib.parse,urllib.request,pathlib
ID='ulises-largometraje-abel-amador-2012'
ROOT=pathlib.Path(__file__).resolve().parents[1]
CAT=ROOT/'lib/catalog.ts'

def get_json(url):
    req=urllib.request.Request(url,headers={'User-Agent':'Cineyah/1.0'})
    with urllib.request.urlopen(req,timeout=30) as r:return json.load(r)

def duration(f):
    try:return float(f.get('length') or 0)
    except:return 0

def probe(url):
    p=subprocess.run(['ffprobe','-v','error','-rw_timeout','15000000','-show_entries','stream=codec_name,codec_type,height','-of','json',url],capture_output=True,text=True,timeout=35)
    if p.returncode:return None
    d=json.loads(p.stdout or '{}'); s=d.get('streams',[])
    v=[x for x in s if x.get('codec_type')=='video']; a=[x for x in s if x.get('codec_type')=='audio']
    if not v or v[0].get('codec_name')!='h264':return None
    if a and a[0].get('codec_name') not in {'aac','mp3'}:return None
    return {'height':int(v[0].get('height') or 0),'video':v[0].get('codec_name'),'audio':a[0].get('codec_name') if a else None}

meta=get_json(f'https://archive.org/metadata/{ID}')
files=[]
for f in meta.get('files',[]):
    name=str(f.get('name',''))
    if not name.lower().endswith('.mp4') or duration(f)<5400:continue
    url=f'https://archive.org/download/{ID}/'+urllib.parse.quote(name,safe='/')
    try:
        info=probe(url)
    except Exception:
        info=None
    if info:files.append((info['height'],duration(f),name,url,info))
if not files:raise SystemExit('No browser-compatible >=90m MP4 rendition found for Ulises')
files.sort(reverse=True)
h,secs,name,url,info=files[0]
label='1080p' if h>=1000 else '720p' if h>=650 else '480p' if h>=430 else '360p'
text=CAT.read_text()
text2=re.sub(r'sources:\[\{label:"(?:1080p|720p|480p|360p)",url:"https://archive\.org/download/ulises-largometraje-abel-amador-2012/[^"]+"\}\]',f'sources:[{{label:"{label}",url:"{url}"}}]',text,count=1)
if text2==text:raise SystemExit('Catalog source pattern not found')
CAT.write_text(text2)
report={'id':ID,'file':name,'url':url,'runtimeMinutes':round(secs/60,1),'label':label,'codecs':info}
(ROOT/'content').mkdir(exist_ok=True)
(ROOT/'content/ulises-playback-verified.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False))
