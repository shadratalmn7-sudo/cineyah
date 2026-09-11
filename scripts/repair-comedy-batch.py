#!/usr/bin/env python3
import concurrent.futures
import datetime as dt
import importlib.util
import json
import pathlib
import re
import time

ROOT=pathlib.Path(__file__).resolve().parents[1]
CAT=ROOT/'content/generated-comedy.json'
REPORT=ROOT/'content/comedy-batch-report.json'
TARGET=100
BAD_TERMS=(
    'trailer','teaser','clip','short film','episode','compilation','collection','box set','boxset',
    'marathon','gameplay','walkthrough','commercials','podcast','radio show','festival','concert',
    'complete series','full season','playlist','bumper','bumpers','dvd iso','blu-ray iso','documentary',
    'talk show','music video','video essay','fan edit','behind the scenes','making of','recording',
    'recordings','reccording','reccordings','livestream','live stream','double feature','two movies',
    'tv recordings','television recordings','cctv','channel bumpers'
)

def norm(s): return re.sub(r'[^a-z0-9]+',' ',str(s).lower()).strip()

def load_builder():
    p=ROOT/'scripts/build-comedy-catalog.py'
    spec=importlib.util.spec_from_file_location('comedy_builder',p)
    m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m

B=load_builder()

def valid_title(movie):
    t=str(movie.get('titleEn') or '')
    return bool(t) and not any(x in t.lower() for x in BAD_TERMS)

def reverify(movie):
    try:
        if movie.get('type')!='movie' or 'comedy' not in movie.get('genres',[]): return None
        if not valid_title(movie): return None
        if not 90 <= int(movie.get('runtimeMinutes',0)) <= 210: return None
        src=(movie.get('sources') or [{}])[0].get('url','')
        if not str(src).startswith('https://'): return None
        d=B.probe_and_decode(src)
        if not d: return None
        movie=dict(movie); movie['runtimeMinutes']=int(round(d/60))
        return movie
    except Exception:
        return None

def main():
    existing=json.loads(CAT.read_text(encoding='utf-8'))
    dedup={}; ordered=[]
    for m in existing:
        k=norm(m.get('titleEn',''))
        if k and k not in dedup:
            dedup[k]=m; ordered.append(m)
    kept=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        futs=[pool.submit(reverify,m) for m in ordered]
        for i,f in enumerate(concurrent.futures.as_completed(futs),1):
            x=f.result()
            if x: kept.append(x)
            if i%10==0: print(json.dumps({'stage':'reverify-seed','checked':i,'kept':len(kept)}),flush=True)
    seen={norm(x['titleEn']) for x in kept}
    ids=B.discover_ids()
    print(json.dumps({'stage':'repair-discovery','candidates':len(ids),'seedKept':len(kept),'need':TARGET-len(kept)}),flush=True)
    scanned=0
    for start in range(0,len(ids),40):
        if len(kept)>=TARGET: break
        chunk=ids[start:start+40]
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            pre=list(pool.map(B.preinspect,chunk))
        candidates=[]
        for c in pre:
            if not c: continue
            k=norm(c.get('title',''))
            if not k or k in seen or any(x in c.get('title','').lower() for x in BAD_TERMS): continue
            candidates.append(c)
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for x in pool.map(B.verify,candidates):
                if not x: continue
                k=norm(x['titleEn'])
                if not k or k in seen or any(t in x['titleEn'].lower() for t in BAD_TERMS): continue
                if not 90 <= x['runtimeMinutes'] <= 210: continue
                seen.add(k); kept.append(x)
                print(json.dumps({'stage':'replacement','count':len(kept),'title':x['titleEn']}),flush=True)
                if len(kept)>=TARGET: break
        scanned+=len(chunk)
        print(json.dumps({'stage':'repair-scan','scanned':scanned,'count':len(kept)}),flush=True)
        time.sleep(0.8)
    if len(kept)<TARGET: raise SystemExit(f'Only {len(kept)} playback-verified feature comedies after targeted repair')
    out=kept[:TARGET]
    assert len(out)==TARGET and len({norm(x['titleEn']) for x in out})==TARGET
    assert all(valid_title(x) for x in out)
    CAT.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    report={'target':100,'verified':100,'distinct':100,'generatedAt':dt.datetime.now(dt.timezone.utc).isoformat(),'method':'targeted repair: reverified existing sources + replaced invalid/stale entries with open-license feature films after ffprobe H.264/AAC-or-MP3 duration and ffmpeg decode checks'}
    REPORT.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report),flush=True)

if __name__=='__main__': main()
