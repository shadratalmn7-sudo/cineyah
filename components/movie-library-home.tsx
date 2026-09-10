"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Globe2, Info, Play, Search } from "lucide-react";
import { discoverableMovies, formatDuration, movieTitle, type ContentType, type Genre, type Locale } from "@/lib/catalog";
import styles from "./movie-library-home.module.css";

const genreLabels: Record<Genre, { ar: string; en: string }> = {
  action:{ar:"أكشن",en:"Action"},horror:{ar:"رعب",en:"Horror"},comedy:{ar:"كوميديا",en:"Comedy"},drama:{ar:"دراما",en:"Drama"},romance:{ar:"رومانسي",en:"Romance"},thriller:{ar:"إثارة",en:"Thriller"},crime:{ar:"جريمة",en:"Crime"},mystery:{ar:"غموض",en:"Mystery"},adventure:{ar:"مغامرات",en:"Adventure"},scifi:{ar:"خيال علمي",en:"Science Fiction"},fantasy:{ar:"فانتازيا",en:"Fantasy"},war:{ar:"حربي",en:"War"},western:{ar:"غربي",en:"Western"},family:{ar:"عائلي",en:"Family"},animation:{ar:"رسوم متحركة",en:"Animation"},musical:{ar:"موسيقي",en:"Musical"},history:{ar:"تاريخي",en:"History"},biography:{ar:"سيرة ذاتية",en:"Biography"},sport:{ar:"رياضي",en:"Sport"},
};

export default function MovieLibraryHome({ locale }: { locale: Locale }) {
  const rtl=locale==="ar";
  const [contentType,setContentType]=useState<ContentType>("movie");
  const [query,setQuery]=useState("");
  const [genre,setGenre]=useState<Genre|null>(null);
  const hero=discoverableMovies[0];
  const movies=useMemo(()=>{
    const needle=query.trim().toLowerCase();
    return discoverableMovies.filter(movie=>{
      const matchesQuery=!needle||`${movie.titleAr??""} ${movie.titleEn} ${movie.titleOriginal??""} ${movie.year}`.toLowerCase().includes(needle);
      return matchesQuery&&(!genre||movie.genres.includes(genre));
    });
  },[query,genre]);
  const genres=Object.keys(genreLabels) as Genre[];

  return <div className={styles.page} dir={rtl?"rtl":"ltr"}>
    <header className={styles.nav}>
      <a href={`/${locale}/`} className={styles.brand}><img src="/cineyah-logo.png" alt="Cineyah — سينياه"/></a>
      <nav className={styles.desktopTabs} aria-label={rtl?"نوع المحتوى":"Content type"}>
        <button className={contentType==="movie"?styles.activeTab:""} onClick={()=>{setContentType("movie");setQuery("");setGenre(null)}}>{rtl?"أفلام":"Movies"}</button>
        <button className={contentType==="series"?styles.activeTab:""} onClick={()=>{setContentType("series");setQuery("");setGenre(null)}}>{rtl?"مسلسلات":"Series"}</button>
      </nav>
      <a className={styles.lang} href={locale==="ar"?"/en/":"/ar/"}><Globe2/>{locale==="ar"?"EN":"العربية"}</a>
    </header>

    <main className={styles.main}>
      <div className={styles.mobileSwitch} role="tablist" aria-label={rtl?"أفلام أو مسلسلات":"Movies or series"}>
        <button role="tab" aria-selected={contentType==="movie"} className={contentType==="movie"?styles.activeTab:""} onClick={()=>{setContentType("movie");setQuery("");setGenre(null)}}>{rtl?"أفلام":"Movies"}</button>
        <button role="tab" aria-selected={contentType==="series"} className={contentType==="series"?styles.activeTab:""} onClick={()=>{setContentType("series");setQuery("");setGenre(null)}}>{rtl?"مسلسلات":"Series"}</button>
      </div>

      {contentType==="movie"&&hero&&<section className={styles.hero} style={{backgroundImage:`linear-gradient(90deg,rgba(5,8,17,.96),rgba(5,8,17,.52),rgba(5,8,17,.85)),url('${hero.backdrop??hero.poster}')`}}>
        <div className={styles.heroCopy}>
          <span>{rtl?"مكتبة سينياه القانونية":"CINEYAH LEGAL LIBRARY"}</span>
          <h1>{movieTitle(hero,locale)}</h1>
          {hero.titleOriginal&&hero.titleOriginal!==movieTitle(hero,locale)&&<p className={styles.original}>{hero.titleOriginal}</p>}
          <div className={styles.heroMeta}><b>{hero.year}</b><b>{formatDuration(hero.runtimeMinutes,locale)}</b><b>{rtl?hero.languageAr:hero.languageEn}</b></div>
          <p>{rtl?hero.descriptionAr:hero.descriptionEn}</p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={`/${locale}/movies/${hero.id}/`}>{hero.sources.length?<Play fill="currentColor"/>:<Info/>}{hero.sources.length?(rtl?"شاهد صفحة الفيلم":"Open movie page"):(rtl?"التفاصيل":"Details")}</a>
            <a className={styles.secondary} href={`/${locale}/movies/${hero.id}/`}><Info/>{rtl?"معلومات الفيلم":"Movie details"}</a>
          </div>
        </div>
      </section>}

      {contentType==="series"?<section className={styles.emptySeries}><span>SERIES</span><h1>{rtl?"المسلسلات":"Series"}</h1><p>{rtl?"لا توجد مسلسلات متاحة حاليًا.":"No series are currently available."}</p></section>:<>
        <section className={styles.intro}>
          <div><span>CINEYAH</span><h2>{rtl?"مكتبة الأفلام":"Movie Library"}</h2></div>
          <p>{rtl?"كل بطاقة أو صورة أو اسم أو زر يفتح صفحة الفيلم المستقلة. الأفلام المتاحة للمشاهدة تُميّز بوضوح، وباقي الأعمال تبقى صفحات معلومات فقط حتى تتوفر حقوق مشاهدة صالحة.":"Every card, poster, title and action opens the movie's standalone page. Playable titles are clearly marked; other titles remain metadata-only until valid viewing rights are available."}</p>
        </section>

        <div className={styles.search}><Search/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={rtl?"ابحث عن فيلم...":"Search movies..."}/></div>

        <details className={styles.genreDisclosure}>
          <summary><span>{rtl?"التصنيفات":"Genres"}</span><small>{genre?genreLabels[genre][locale]:(rtl?"كل التصنيفات الـ19":"All 19 genres")}</small><ChevronDown/></summary>
          <div className={styles.genres}>
            <button className={!genre?styles.active:""} onClick={()=>setGenre(null)}>{rtl?"الكل":"All"}</button>
            {genres.map(item=><button key={item} className={genre===item?styles.active:""} onClick={()=>setGenre(item)}>{genreLabels[item][locale]}</button>)}
          </div>
        </details>

        <section className={styles.grid} aria-label={rtl?"الأفلام":"Movies"}>
          {movies.map(movie=><a className={styles.card} key={movie.id} href={`/${locale}/movies/${movie.id}/`}>
            <div className={styles.poster}><img src={movie.poster} alt={`${movie.titleEn}${movie.titleAr?` — ${movie.titleAr}`:""}`} loading="lazy"/><span data-playable={movie.sources.length?"yes":"no"}>{movie.sources.length?(rtl?"متاح للمشاهدة":"Playable"):(rtl?"معلومات فقط":"Info only")}</span><div className={styles.cardAction}>{movie.sources.length?<Play fill="currentColor"/>:<Info/>}</div></div>
            <div className={styles.copy}><h2>{movieTitle(movie,locale)}</h2>{movie.titleOriginal&&movie.titleOriginal!==movieTitle(movie,locale)&&<p className={styles.alt}>{movie.titleOriginal}</p>}<p>{movie.year} · {formatDuration(movie.runtimeMinutes,locale)}</p></div>
          </a>)}
        </section>
        {movies.length===0&&<p className={styles.empty}>{rtl?"لا توجد أفلام مطابقة.":"No matching movies."}</p>}
      </>}
    </main>
  </div>;
}
