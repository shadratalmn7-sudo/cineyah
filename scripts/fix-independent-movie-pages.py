#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
app = ROOT / "components/cineyah-app.tsx"
catalog = ROOT / "lib/catalog.ts"
repair = ROOT / "scripts/repair-ulises.py"
css = ROOT / "app/globals.css"

# 1) Home/search interactions must navigate to a real movie URL, never open the old details modal.
text = app.read_text(encoding="utf-8")
text = text.replace(
    'onClick={()=>setSelected(item)} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&setSelected(item)}',
    'onClick={()=>{window.location.href=`/${locale}/movies/${item.id}/`}} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&(window.location.href=`/${locale}/movies/${item.id}/`)}'
)
text = text.replace(
    '<button className="secondary" onClick={()=>setSelected(hero)}><Info/>{text.details}</button>',
    '<a className="secondary" href={`/${locale}/movies/${hero.id}/`}><Info/>{text.details}</a>'
)
text = text.replace(
    '<button key={item.id} onClick={()=>{if(item.type==="movie")setSelected(item);setQuery("")}}>',
    '<a key={item.id} href={item.type==="movie"?`/${locale}/movies/${item.id}/`:"#"} className="search-result-card" style={item.type==="movie"?{backgroundImage:`linear-gradient(90deg,rgba(7,11,19,.97),rgba(7,11,19,.72),rgba(7,11,19,.88)),url(\'${item.backdrop??item.poster}\')`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>'
)
# Close the search result anchor instead of button.
needle = '</span><Play/></button>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}'
if needle in text:
    text = text.replace(needle, '</span><Play/></a>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}')
app.write_text(text, encoding="utf-8")

# 2) Movie model supports a dedicated cinematic backdrop.
text = catalog.read_text(encoding="utf-8")
if 'backdrop?:string;' not in text:
    text = text.replace('runtimeMinutes:number; poster:string;', 'runtimeMinutes:number; poster:string; backdrop?:string;')
catalog.write_text(text, encoding="utf-8")

# 3) Repair job extracts an actual frame from the movie and uses it as the backdrop.
text = repair.read_text(encoding="utf-8")
if 'BACKDROP = ROOT / "public/backdrops/ulises-2012.jpg"' not in text:
    text = text.replace('CAT = ROOT / "lib/catalog.ts"', 'CAT = ROOT / "lib/catalog.ts"\nBACKDROP = ROOT / "public/backdrops/ulises-2012.jpg"')

if 'def extract_backdrop(url):' not in text:
    insert = '''\n\ndef extract_backdrop(url):\n    BACKDROP.parent.mkdir(parents=True, exist_ok=True)\n    cmd = [\n        "ffmpeg", "-y", "-v", "error",\n        "-ss", "600", "-i", url,\n        "-frames:v", "1", "-vf", "scale=1600:-2",\n        "-q:v", "3", str(BACKDROP),\n    ]\n    p = subprocess.run(cmd, capture_output=True, text=True, timeout=90)\n    if p.returncode or not BACKDROP.exists() or BACKDROP.stat().st_size < 20000:\n        raise SystemExit("Could not extract a real movie-frame backdrop: " + (p.stderr or "unknown ffmpeg error")[-1200:])\n    return "/backdrops/ulises-2012.jpg"\n'''
    text = text.replace('\n\nmeta = get_json(', insert + '\n\nmeta = get_json(')

if 'backdrop_url = extract_backdrop(url)' not in text:
    text = text.replace('# This is the decisive test: Chrome must actually load and advance playback.\nbrowser_result = browser_playback_test(url)', '# This is the decisive test: Chrome must actually load and advance playback.\nbrowser_result = browser_playback_test(url)\nbackdrop_url = extract_backdrop(url)')

# Ensure the catalog gets/updates backdrop inside the Ulises block after poster.
if 'backdrop:"/backdrops/ulises-2012.jpg"' not in text:
    marker = 'segment = text[start:end]'
    replacement = '''segment = text[start:end]\n# Insert or refresh the cinematic backdrop in the movie record.\nif 'backdrop:' in segment:\n    segment = re.sub(r'backdrop:"[^"]*"', f'backdrop:"{backdrop_url}"', segment, count=1)\nelse:\n    segment = re.sub(r'(poster:"[^"]+",)', r'\\1backdrop:"' + backdrop_url + '",', segment, count=1)'''
    text = text.replace(marker, replacement)

# The original script reconstructed updated_segment from segment, so keep the backdrop modifications.
text = text.replace('updated_segment = segment[: match.start()] + replacement + segment[match.end() :]', 'updated_segment = segment[: match.start()] + replacement + segment[match.end() :]')
# Add backdrop to report if absent.
if '"backdrop": backdrop_url' not in text:
    text = text.replace('"sourceChanged": source_changed,', '"sourceChanged": source_changed,\n    "backdrop": backdrop_url,')
repair.write_text(text, encoding="utf-8")

# 4) Search cards need readable text over the real backdrop, and anchor styling.
styles = css.read_text(encoding="utf-8")
addition = '''\n\n/* Independent movie-page navigation + cinematic search results */\n.suggestions .search-result-card{width:100%;border:0;color:white;display:flex;align-items:center;gap:14px;text-align:start;padding:11px;border-radius:12px;text-decoration:none;min-height:82px;overflow:hidden;position:relative;box-shadow:inset 0 0 0 1px #ffffff12;background-repeat:no-repeat!important}\n.suggestions .search-result-card:hover,.suggestions .search-result-card:focus{box-shadow:inset 0 0 0 1px #ffffff2d,0 12px 28px #0007;outline:none}\n.suggestions .search-result-card img{width:48px;height:64px;object-fit:cover;border-radius:8px;box-shadow:0 6px 16px #0009;flex:0 0 auto}\n.suggestions .search-result-card span{position:relative;z-index:1;text-shadow:0 2px 8px #000;display:flex;flex-direction:column;gap:5px;flex:1}\n.suggestions .search-result-card>svg{position:relative;z-index:1;filter:drop-shadow(0 2px 6px #000)}\n.secondary{text-decoration:none}\n'''
if 'Independent movie-page navigation + cinematic search results' not in styles:
    styles += addition
css.write_text(styles, encoding="utf-8")

print("patched independent movie pages, search backdrops, and Ulises frame extraction")
