#!/usr/bin/env python3
import concurrent.futures
import importlib.util
import json
import os
import pathlib

ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cineyah_fast",ROOT/"scripts/build-open-playable-fast.py")
fast=importlib.util.module_from_spec(spec)
spec.loader.exec_module(fast)

GENRE=os.environ.get("CINEYAH_GENRE","").strip()
TARGET=int(os.environ.get("CINEYAH_TARGET","10"))
MAX_PAGES=int(os.environ.get("CINEYAH_MAX_PAGES","8"))
if GENRE not in fast.GENRES:
    raise SystemExit(f"Unknown genre: {GENRE}")

records={}
cache={}
seen=set()
for page in range(1,MAX_PAGES+1):
    try:
        ids=fast.search_ids(GENRE,page)
    except Exception as exc:
        print(json.dumps({"genre":GENRE,"page":page,"searchError":str(exc)}),flush=True)
        continue
    ids=[i for i in ids if i not in seen]
    seen.update(ids)
    if not ids:
        continue
    def inspect(identifier):
        if identifier not in cache:
            cache[identifier]=fast.validate(fast.prefilter(identifier))
        return cache[identifier]
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        for item in pool.map(inspect,ids):
            if not item:
                continue
            if GENRE not in item["genres"]:
                item["genres"].insert(0,GENRE)
            key=fast.norm_title(item["titleEn"])
            if not key or key in records:
                continue
            records[key]=item
            print(json.dumps({"genre":GENRE,"verified":len(records),"title":item["titleEn"]},ensure_ascii=False),flush=True)
            if len(records)>=TARGET:
                break
    if len(records)>=TARGET:
        break

items=list(records.values())[:TARGET]
out=ROOT/"work"/f"genre-{GENRE}.json"
out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps(items,ensure_ascii=False,indent=2)+"\n")
print(json.dumps({"genre":GENRE,"target":TARGET,"verified":len(items),"complete":len(items)>=TARGET},ensure_ascii=False),flush=True)
