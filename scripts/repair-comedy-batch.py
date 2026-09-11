#!/usr/bin/env python3
import concurrent.futures
import datetime as dt
import importlib.util
import json
import pathlib
import re
import time
import urllib.parse

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

def load_builder():
    p=ROOT/'scripts/build-comedy-catalog.py'
    spec=importlib.util.spec_from_file_location('comedy_builder',p)
    m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m

B=load_builder()

def norm(s):
    return B.norm(str(s or ''))

def source_key(movie):
    try:
        return str((movie.get('sources') or [{}])[0].get('url','')).strip().lower()
    except Exception:
        return ''

def valid_title(movie):
    t=str(movie.get('titleEn') or '')
    return bool(t) and not any(x in t.lower() for x in BAD_TERMS)

def reverify(movie):
    try:
        if movie.get('type')!='movie' or 'comedy' not in movie.get('genres',[]): return None
        if not valid_title(movie): return None
        if not 90 <= int(movie.get('runtimeMinutes',0)) <= 210: return None
        src=source_key(movie)
        if not src.startswith('https://'): return None
        d=B.probe_and_decode(src)
        if not d: return None
        movie=dict(movie); movie['runtimeMinutes']=int(round(d/60)); movie['_verifiedDurationSeconds']=float(d)
        return movie
    except Exception:
        return None

def expanded_ids(base_ids):
    out=list(base_ids); seen=set(out)
    queries=[
        'mediatype:movies AND subject:"screwball comedy"',
        'mediatype:movies AND subject:"musical comedy"',
        'mediatype:movies AND subject:"black comedy"',
        'mediatype:movies AND subject:"comedy drama"',
        'mediatype:movies AND subject:"comedy film"',
        'mediatype:movies AND subject:"comedy films"',
        'mediatype:movies AND description:"feature length comedy"',
        'mediatype:movies AND description:"feature film" AND comedy',
        'mediatype:movies AND collection:feature_films AND subject:comedy',
        'mediatype:movies AND collection:feature_films AND title:(comedy OR comic OR funny)',
    ]
    for q in queries:
        for page in range(1,31):
            params=urllib.parse.urlencode({'q':q,'fl[]':'identifier','rows':100,'page':page,'output':'json'})
            try:
                docs=B.fetch_json('https://archive.org/advancedsearch.php?'+params,timeout=15).get('response',{}).get('docs',[])
            except Exception:
                break
            for d in docs:
                ident=d.get('identifier')
                if ident and ident not in seen:
                    seen.add(ident); out.append(ident)
            if len(docs)<100: break
    return out

def main():
    existing=json.loads(CAT.read_text(encoding='utf-8'))
    # First collapse records that are obviously the same film by canonicalized title or exact media URL.
    dedup=[]; seed_titles=set(); seed_sources=set()
    for m in existing:
        k=norm(m.get('titleEn','')); sk=source_key(m)
        if not k or not sk or k in seed_titles or sk in seed_sources: continue
        seed_titles.add(k); seed_sources.add(sk); dedup.append(m)

    verified=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        futs=[pool.submit(reverify,m) for m in dedup]
        for i,f in enumerate(concurrent.futures.as_completed(futs),1):
            x=f.result()
            if x: verified.append(x)
            if i%10==0: print(json.dumps({'stage':'reverify-seed','checked':i,'verified':len(verified)}),flush=True)

    # A distinct-film batch must not contain the same exact playable media under multiple upload titles.
    kept=[]; seen_titles=set(); seen_sources=set(); seen_durations=set()
    for x in verified:
        k=norm(x['titleEn']); sk=source_key(x); dk=round(float(x.get('_verifiedDurationSeconds') or 0),2)
        if not k or not sk or not dk or k in seen_titles or sk in seen_sources or dk in seen_durations: continue
        seen_titles.add(k); seen_sources.add(sk); seen_durations.add(dk); kept.append(x)

    ids=expanded_ids(B.discover_ids())
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
            if not k or k in seen_titles or any(x in c.get('title','').lower() for x in BAD_TERMS): continue
            candidates.append(c)
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            for x in pool.map(B.verify,candidates):
                if not x: continue
                k=norm(x['titleEn']); sk=source_key(x)
                if not k or not sk or k in seen_titles or sk in seen_sources or any(t in x['titleEn'].lower() for t in BAD_TERMS): continue
                if not 90 <= x['runtimeMinutes'] <= 210: continue
                duration=B.probe_and_decode(sk)
                if not duration: continue
                dk=round(float(duration),2)
                if dk in seen_durations: continue
                x['_verifiedDurationSeconds']=float(duration)
                seen_titles.add(k); seen_sources.add(sk); seen_durations.add(dk); kept.append(x)
                print(json.dumps({'stage':'replacement','count':len(kept),'title':x['titleEn']}),flush=True)
                if len(kept)>=TARGET: break
        scanned+=len(chunk)
        print(json.dumps({'stage':'repair-scan','scanned':scanned,'count':len(kept)}),flush=True)
        time.sleep(0.5)
    if len(kept)<TARGET: raise SystemExit(f'Only {len(kept)} playback-verified distinct feature comedies after targeted repair')
    out=kept[:TARGET]
    for x in out: x.pop('_verifiedDurationSeconds',None)
    assert len(out)==TARGET
    assert len({norm(x['titleEn']) for x in out})==TARGET
    assert len({source_key(x) for x in out})==TARGET
    assert all(valid_title(x) for x in out)
    CAT.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    report={'target':100,'verified':100,'distinct':100,'generatedAt':dt.datetime.now(dt.timezone.utc).isoformat(),'method':'targeted repair: canonical-title + unique-source + media-duration dedupe, strict feature-title gate, open-license discovery, ffprobe H.264/AAC-or-MP3 duration and ffmpeg decode checks'}
    REPORT.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report),flush=True)

if __name__=='__main__': main()
