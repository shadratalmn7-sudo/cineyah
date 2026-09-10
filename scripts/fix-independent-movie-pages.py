#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
app = ROOT / "components/cineyah-app.tsx"
css = ROOT / "app/globals.css"

text = app.read_text(encoding="utf-8")
changed = 0


def swap(old: str, new: str):
    global text, changed
    if old in text:
        text = text.replace(old, new)
        changed += 1

# Movie cards open a brief preview again. The dedicated movie URL remains available
# from the preview and for search engines.
swap(
    'onClick={()=>{window.location.href=`/${locale}/movies/${item.id}/`}} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&(window.location.href=`/${locale}/movies/${item.id}/`)}',
    'onClick={()=>setSelected(item)} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&setSelected(item)}',
)

# Hero details also opens the same short preview.
swap(
    '<a className="secondary" href={`/${locale}/movies/${hero.id}/`}><Info/>{text.details}</a>',
    '<button className="secondary" onClick={()=>setSelected(hero)}><Info/>{text.details}</button>',
)

# Search keeps the cinematic background but opens the preview instead of jumping
# away immediately.
old_search = '<a key={item.id} href={item.type==="movie"?`/${locale}/movies/${item.id}/`:"#"} className="search-result-card" style={item.type==="movie"?{backgroundImage:`linear-gradient(90deg,rgba(7,11,19,.97),rgba(7,11,19,.72),rgba(7,11,19,.88)),url(\'${item.backdrop??item.poster}\')`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>'
new_search = '<button key={item.id} className="search-result-card" onClick={()=>{if(item.type==="movie")setSelected(item);setQuery("")}} style={item.type==="movie"?{backgroundImage:`linear-gradient(90deg,rgba(7,11,19,.97),rgba(7,11,19,.72),rgba(7,11,19,.88)),url(\'${item.backdrop??item.poster}\')`,backgroundSize:"cover",backgroundPosition:"center"}:undefined}>'
swap(old_search, new_search)
swap(
    '</span><Play/></a>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}',
    '</span><Play/></button>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}',
)

# Lock the document behind the preview/player, including iOS Safari. This prevents
# the homepage from moving underneath the movie card.
lock_marker = 'const cineyahOverlayLock = true;'
if lock_marker not in text:
    anchor = '  const searchRef=useRef<HTMLInputElement>(null),hero=publicMovies[0];'
    lock = '''  const cineyahOverlayLock = true;\n  useEffect(()=>{\n    if(!cineyahOverlayLock||(!selected&&!watching))return;\n    const body=document.body,scrollY=window.scrollY;\n    const previous={position:body.style.position,top:body.style.top,width:body.style.width,overflow:body.style.overflow};\n    body.style.position="fixed";body.style.top=`-${scrollY}px`;body.style.width="100%";body.style.overflow="hidden";\n    return()=>{body.style.position=previous.position;body.style.top=previous.top;body.style.width=previous.width;body.style.overflow=previous.overflow;window.scrollTo(0,scrollY)};\n  },[selected,watching]);\n'''
    if anchor not in text:
        raise SystemExit("Could not find overlay-lock insertion point")
    text = text.replace(anchor, lock + anchor, 1)
    changed += 1

# The preview uses the actual movie frame/backdrop, not the dark poster.
swap(
    "url('${selected.poster}')",
    "url('${selected.backdrop??selected.poster}')",
)

# Preview is informational only. The user explicitly enters the standalone movie
# page before playback.
swap(
    '<button className="primary" onClick={()=>{setSelected(null);setWatching(selected)}}><Play fill="currentColor"/>{text.watch}</button>',
    '<div className="preview-actions"><a className="primary preview-page-link" href={`/${locale}/movies/${selected.id}/`}><Info/>{locale==="ar"?"فتح صفحة الفيلم":"Open movie page"}</a></div>',
)

# Keep the quick card short; legal/source details stay on the dedicated page.
swap(
    '<details><summary>{text.rights}</summary><p>{selected.licenseName} — {selected.attribution}</p><a href={selected.sourceUrl} target="_blank" rel="noreferrer">{text.source}</a><a href={selected.licenseUrl} target="_blank" rel="noreferrer">{selected.licenseName}</a></details>',
    '',
)

if not changed:
    raise SystemExit("No preview-flow changes were applied")
app.write_text(text, encoding="utf-8")

styles = css.read_text(encoding="utf-8")
marker = "/* Movie preview card flow v3 */"
if marker not in styles:
    styles += r'''

/* Movie preview card flow v3 */
.modal-backdrop{overscroll-behavior:none;overflow:hidden;background:rgba(1,3,8,.88);backdrop-filter:blur(16px)}
.detail-modal{width:min(820px,calc(100% - 24px));max-height:min(78svh,700px);overflow:hidden;background:#080d17;border:1px solid #ffffff1f;border-radius:22px;box-shadow:0 30px 100px #000d}
.modal-visual{height:300px;background-size:cover;background-position:center 34%;position:relative}
.modal-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#080d17 0%,rgba(8,13,23,.25) 52%,rgba(8,13,23,.05) 100%)}
.modal-body{padding:0 clamp(20px,5vw,48px) 32px;margin-top:-58px;position:relative;z-index:2}
.modal-body h2{font-size:clamp(30px,5vw,42px);margin:8px 0 4px;text-shadow:0 3px 18px #000}
.modal-body>p{margin:12px 0 0;color:#d7deea;line-height:1.72;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.preview-actions{display:flex;gap:10px;margin-top:20px}.preview-page-link{text-decoration:none;justify-content:center}
.suggestions .search-result-card{cursor:pointer;font:inherit}
@media(max-width:720px){.modal-backdrop{padding:12px}.detail-modal{width:100%;max-height:76svh;border-radius:20px}.modal-visual{height:220px;background-position:center 32%}.modal-body{margin-top:-42px;padding:0 20px 24px}.modal-body h2{font-size:30px}.modal-body>p{font-size:14px;-webkit-line-clamp:3}.preview-actions .primary{width:100%;justify-content:center}}
'''
    css.write_text(styles, encoding="utf-8")

print(f"applied {changed} preview-flow changes")
