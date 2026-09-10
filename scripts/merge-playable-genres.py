#!/usr/bin/env python3
import datetime as dt
import importlib.util
import json
import pathlib

ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cineyah_fast",ROOT/"scripts/build-open-playable-fast.py")
fast=importlib.util.module_from_spec(spec)
spec.loader.exec_module(fast)

records={}
for path in sorted((ROOT/"work/genres").rglob("genre-*.json")):
    for item in json.loads(path.read_text()):
        key=fast.norm_title(item.get("titleEn", ""))
        if not key:
            continue
        if key in records:
            records[key]["genres"]=list(dict.fromkeys(records[key]["genres"]+item["genres"]))
        else:
            records[key]=item

items=list(records.values())
items.sort(key=lambda x:x["titleEn"].lower())
coverage=fast.coverage({fast.norm_title(x["titleEn"]):x for x in items})
report={
    "generatedAt":dt.datetime.now(dt.timezone.utc).isoformat(),
    "targetPerGenre":10,
    "uniqueMovies":len(items),
    "coverage":coverage,
    "missing":{g:10-n for g,n in coverage.items() if n<10},
}
(ROOT/"content/generated-playable.json").write_text(json.dumps(items,ensure_ascii=False,indent=2)+"\n")
(ROOT/"content/playable-coverage.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n")
fast.patch_catalog(items)
print(json.dumps(report,ensure_ascii=False,indent=2))
