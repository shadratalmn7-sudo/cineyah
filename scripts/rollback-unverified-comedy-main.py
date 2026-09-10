#!/usr/bin/env python3
from pathlib import Path

p=Path('lib/catalog.ts')
s=p.read_text(encoding='utf-8')
s=s.replace('import generatedComedy from "@/content/generated-comedy.json";\n\n','',1)
s=s.replace('const verifiedComedy = generatedComedy as Movie[];\nexport const discoverableMovies = [...movieCatalog, ...verifiedComedy].filter(movie => movie.runtimeMinutes >= 90);','export const discoverableMovies = movieCatalog.filter(movie => movie.runtimeMinutes >= 90);',1)
p.write_text(s,encoding='utf-8')
print('provisional comedy batch removed from public catalog; generated data retained dormant')
