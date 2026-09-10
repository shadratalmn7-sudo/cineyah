#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
app = ROOT / "components/cineyah-app.tsx"
text = app.read_text(encoding="utf-8")
original = text

# Cards must navigate to the dedicated movie page, never open a homepage preview.
text = text.replace(
    'onClick={()=>setSelected(item)} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&setSelected(item)}',
    'onClick={()=>{window.location.href=`/${locale}/movies/${item.id}/`}} onKeyDown={event=>(event.key==="Enter"||event.key===" ")&&(window.location.href=`/${locale}/movies/${item.id}/`)}'
)

# The play button on a card also enters the movie page first.
text = text.replace(
    'onClick={event=>{event.stopPropagation();setWatching(item)}}',
    'onClick={event=>{event.stopPropagation();window.location.href=`/${locale}/movies/${item.id}/`}}'
)

# Hero actions enter the standalone movie page.
text = text.replace(
    '<button className="primary" onClick={()=>setWatching(hero)}><Play fill="currentColor"/>{text.watch}</button>',
    '<a className="primary" href={`/${locale}/movies/${hero.id}/`}><Play fill="currentColor"/>{text.watch}</a>'
)
text = text.replace(
    '<button className="secondary" onClick={()=>setSelected(hero)}><Info/>{text.details}</button>',
    '<a className="secondary" href={`/${locale}/movies/${hero.id}/`}><Info/>{text.details}</a>'
)

# Search results navigate directly to the movie page.
text = text.replace(
    '<button key={item.id} className="search-result-card" onClick={()=>{if(item.type==="movie")setSelected(item);setQuery("")}}',
    '<a key={item.id} href={item.type==="movie"?`/${locale}/movies/${item.id}/`:"#"} className="search-result-card"'
)
text = text.replace(
    '</span><Play/></button>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}',
    '</span><Play/></a>):<p>{contentType==="movie"?text.emptyMovies:text.emptySeries}</p>}'
)

# Disable the legacy homepage preview state even if stale markup remains.
text = text.replace(
    '[selected,setSelected]=useState<Movie|null>(publicMovies.find(movie=>movie.id===initialMovieId)??null)',
    '[selected,setSelected]=useState<Movie|null>(null)'
)

if text == original:
    raise SystemExit("No independent-page routing changes were applied")

app.write_text(text, encoding="utf-8")
print("Movie cards, hero actions and search now route to standalone movie pages")
