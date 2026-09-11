#!/usr/bin/env python3
import concurrent.futures
import datetime as dt
import json
import pathlib
import re
import subprocess

ROOT=pathlib.Path(__file__).resolve().parents[1]
CAT=ROOT/'content/generated-comedy.json'
REPORT=ROOT/'content/comedy-batch-report.json'
TARGET=100
BAD_TERMS=(
    'trailer','teaser','clip','short film','episode','compilation','collection','box set','boxset',
    'marathon','gameplay','walkthrough','commercials','podcast','radio show','festival','concert',
    'complete series','full season','playlist','bumper','bumpers','dvd iso','blu-ray iso','documentary',
    'talk show','variety show','music video','video essay','fan edit','behind the scenes','making of','recording',
    'recordings','reccording','reccordings','livestream','live stream','double feature','two movies',
    'tv recordings','television recordings','cctv','channel bumpers','the johnny cash show',
    'plays minecraft','gamertag','moviemax comedy','casados con hijos','video #','dead and buried treasures',
    'may 19th, 2024','covid 19 plan','plandemic','sing-along edition','extended cut','anniversary edition'
)

def norm(s):
    return re.sub(r'[^a-z0-9]+',' ',str(s).lower()).strip()

def verify_one(movie):
    try:
        title=str(movie.get('titleEn') or '')
        if movie.get('type')!='movie' or 'comedy' not in movie.get('genres',[]): return (False,title,'metadata')
        if any(t in title.lower() for t in BAD_TERMS): return (False,title,'non-feature-packaging')
        if not 90 <= int(movie.get('runtimeMinutes',0)) <= 210: return (False,title,'runtime-metadata')
        sources=movie.get('sources') or []
        if not sources or not str(sources[0].get('url','')).startswith('https://'): return (False,title,'source')
        url=sources[0]['url']
        p=subprocess.run(['ffprobe','-v','error','-rw_timeout','25000000','-show_entries','format=duration:stream=codec_name,codec_type','-of','json',url],capture_output=True,text=True,timeout=45)
        if p.returncode: return (False,title,'ffprobe')
        data=json.loads(p.stdout or '{}')
        duration=float(data.get('format',{}).get('duration') or 0)
        streams=data.get('streams',[])
        video=[s.get('codec_name') for s in streams if s.get('codec_type')=='video']
        audio=[s.get('codec_name') for s in streams if s.get('codec_type')=='audio']
        if not video or video[0] != 'h264': return (False,title,f'video:{video[:1]}')
        if audio and audio[0] not in {'aac','mp3'}: return (False,title,f'audio:{audio[:1]}')
        if not 5400 <= duration <= 12600: return (False,title,f'duration:{duration}')
        sample=min(max(30,duration*.2),duration-5)
        q=subprocess.run(['ffmpeg','-v','error','-rw_timeout','25000000','-ss',str(sample),'-i',url,'-t','1','-map','0:v:0','-f','null','-'],capture_output=True,text=True,timeout=45)
        if q.returncode: return (False,title,'decode')
        return (True,title,duration)
    except Exception as e:
        return (False,movie.get('titleEn'),type(e).__name__)

def main():
    movies=json.loads(CAT.read_text(encoding='utf-8'))
    if len(movies)!=TARGET: raise SystemExit(f'catalog has {len(movies)} items, expected 100')
    keys=[norm(x.get('titleEn','')) for x in movies]
    if any(not k for k in keys) or len(set(keys))!=TARGET: raise SystemExit('titles are not exactly 100 distinct normalized titles')
    offenders=[x.get('titleEn','') for x in movies if any(t in str(x.get('titleEn','')).lower() for t in BAD_TERMS)]
    if offenders: raise SystemExit(f'non-feature packaging/recording titles remain: {offenders[:20]}')
    print(json.dumps({'stage':'verify-existing','count':len(movies)}),flush=True)
    results=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        futs={pool.submit(verify_one,m):m for m in movies}
        for i,f in enumerate(concurrent.futures.as_completed(futs),1):
            r=f.result(); results.append(r)
            print(json.dumps({'checked':i,'ok':r[0],'title':r[1],'detail':r[2]}),flush=True)
    bad=[r for r in results if not r[0]]
    if bad:
        print(json.dumps({'failed':len(bad),'examples':bad[:20]}),flush=True)
        raise SystemExit(f'{len(bad)} of 100 sources failed current browser-compatibility verification')
    report={'target':TARGET,'verified':TARGET,'distinct':TARGET,'generatedAt':dt.datetime.now(dt.timezone.utc).isoformat(),'method':'revalidated existing batch: strict feature-title gate + ffprobe H.264/AAC-or-MP3 duration gate + real ffmpeg decode sample for all 100'}
    REPORT.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report),flush=True)

if __name__=='__main__': main()
