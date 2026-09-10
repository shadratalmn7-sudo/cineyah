"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Play, X } from "lucide-react";
import type { Locale, Movie } from "@/lib/catalog";
import { formatDuration, movieTitle } from "@/lib/catalog";
import { getSimilarMovies, getYouMayAlsoLike } from "@/lib/public-catalog";
import { sitePath } from "@/lib/site-path";
import styles from "./movie-detail-page.module.css";

const genreLabels = {
  action:{ar:"أكشن",en:"Action"},horror:{ar:"رعب",en:"Horror"},comedy:{ar:"كوميديا",en:"Comedy"},drama:{ar:"دراما",en:"Drama"},romance:{ar:"رومانسي",en:"Romance"},thriller:{ar:"إثارة",en:"Thriller"},crime:{ar:"جريمة",en:"Crime"},mystery:{ar:"غموض",en:"Mystery"},adventure:{ar:"مغامرات",en:"Adventure"},scifi:{ar:"خيال علمي",en:"Science Fiction"},fantasy:{ar:"فانتازيا",en:"Fantasy"},war:{ar:"حربي",en:"War"},western:{ar:"غربي",en:"Western"},family:{ar:"عائلي",en:"Family"},animation:{ar:"رسوم متحركة",en:"Animation"},musical:{ar:"موسيقي",en:"Musical"},history:{ar:"تاريخي",en:"History"},biography:{ar:"سيرة ذاتية",en:"Biography"},sport:{ar:"رياضي",en:"Sport"},
} as const;

function NativeMoviePlayer({movie,locale,onClose}:{movie:Movie;locale:Locale;onClose:()=>void}){
  const videoRef=useRef<HTMLVideoElement>(null);
  const [sourceIndex,setSourceIndex]=useState(0);
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState(true);
  const source=movie.sources[sourceIndex];

  useEffect(()=>{
    setError(null);
    setLoading(true);
    const timer=window.setTimeout(()=>{
      const video=videoRef.current;
      if(video&&video.readyState<2)setError(locale==="ar"?"الفيديو لم يصبح جاهزًا بعد. جرّب مرة أخرى.":"The video did not become ready. Please retry.");
    },15000);
    return()=>window.clearTimeout(timer);
  },[locale,sourceIndex]);

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")onClose()};
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[onClose]);

  if(!source)return null;

  const failSource=()=>{
    if(sourceIndex<movie.sources.length-1){setSourceIndex(index=>index+1);return;}
    setLoading(false);
    setError(locale==="ar"?"تعذر تشغيل الفيديو الآن.":"The video could not be played right now.");
  };

  return <div className={styles.playerOverlay} role="dialog" aria-modal="true" aria-label={`${locale==="ar"?"مشغل":"Player"}: ${movieTitle(movie,locale)}`}>
    <div className={styles.playerCard}>
      <div className={styles.playerTopbar}>
        <div><b>{movieTitle(movie,locale)}</b>{movie.sources.length>1&&<span>{source.label}</span>}</div>
        <button className={styles.closePlayer} onClick={onClose} aria-label={locale==="ar"?"إغلاق":"Close"}><X/></button>
      </div>
      <div className={styles.playerShell}>
        <video key={source.url} ref={videoRef} className={styles.video} src={sitePath(source.url)} poster={sitePath(movie.backdrop??movie.poster)} preload="metadata" playsInline controls
          onLoadedMetadata={event=>{
            setLoading(false);
            const saved=Number(localStorage.getItem(`cineyah:progress:${movie.id}`)||0);
            if(saved>15&&saved<event.currentTarget.duration-60)event.currentTarget.currentTime=saved;
          }}
          onCanPlay={()=>{setLoading(false);setError(null)}}
          onTimeUpdate={event=>localStorage.setItem(`cineyah:progress:${movie.id}`,String(event.currentTarget.currentTime))}
          onEnded={()=>localStorage.removeItem(`cineyah:progress:${movie.id}`)}
          onError={failSource}>
          {movie.subtitles.map(track=><track key={`${track.lang}-${track.url}`} kind="subtitles" src={sitePath(track.url)} srcLang={track.lang} label={locale==="ar"?track.labelAr:track.labelEn} default={track.lang==="ar"}/>) }
        </video>
        {loading&&!error&&<div className={styles.loading}>{locale==="ar"?"جارٍ تجهيز الفيديو…":"Preparing video…"}</div>}
        {error&&<div className={styles.playerError} role="alert"><strong>{locale==="ar"?"تعذر التشغيل":"Playback failed"}</strong><p>{error}</p><button onClick={()=>{setError(null);setLoading(true);videoRef.current?.load()}}>{locale==="ar"?"إعادة المحاولة":"Retry"}</button></div>}
      </div>
      {movie.sources.length>1&&<div className={styles.qualityRow}>{movie.sources.map((item,index)=><button key={`${item.label}-${item.url}`} className={index===sourceIndex?styles.activeQuality:""} onClick={()=>setSourceIndex(index)}>{item.label}</button>)}</div>}
    </div>
  </div>;
}

function MovieCard({movie,locale}:{movie:Movie;locale:Locale}){
  return <a className={styles.card} href={sitePath(`/${locale}/movies/${movie.id}/`)}>
    <div className={styles.cardPoster}><img src={sitePath(movie.poster)} alt={`${movie.titleEn}${movie.titleAr?` — ${movie.titleAr}`:""}`} loading="lazy"/><div className={styles.cardPlay}><Play fill="currentColor"/></div></div>
    <h3>{movieTitle(movie,locale)}</h3>
    <p>{movie.year} · {formatDuration(movie.runtimeMinutes,locale)}</p>
  </a>;
}

export default function MovieDetailPage({movie,locale}:{movie:Movie;locale:Locale}){
  const rtl=locale==="ar";
  const [watching,setWatching]=useState(false);
  const title=movieTitle(movie,locale);
  const description=rtl?movie.descriptionAr:movie.descriptionEn;
  const story=rtl?movie.storyAr:movie.storyEn;
  const background=movie.backdrop??movie.poster;
  const playable=movie.sources.length>0;
  const similar=useMemo(()=>getSimilarMovies(movie,6),[movie]);
  const alsoLike=useMemo(()=>getYouMayAlsoLike(movie,6),[movie]);
  const genres=movie.genres.map(genre=>genreLabels[genre][locale]).join(" · ");

  useEffect(()=>{
    if(!watching)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previous};
  },[watching]);

  const facts=[
    [rtl?"السنة":"Year",String(movie.year)],
    [rtl?"المدة":"Runtime",formatDuration(movie.runtimeMinutes,locale)],
    [rtl?"التصنيفات":"Genres",genres],
    [rtl?"الدولة":"Country",rtl?movie.countryAr:movie.countryEn],
    [rtl?"اللغة":"Language",rtl?movie.languageAr:movie.languageEn],
    [rtl?"المخرج":"Director",movie.director],
  ].filter((item):item is [string,string]=>Boolean(item[1]));

  return <div className={styles.page} dir={rtl?"rtl":"ltr"}>
    <header className={styles.header}>
      <a href={sitePath(`/${locale}/`)} className={styles.back}><ArrowLeft/>{rtl?"الأفلام":"Movies"}</a>
      <a href={sitePath(`/${locale}/`)} className={styles.brand}><img src={sitePath("/cineyah-logo.png")} alt="Cineyah — سينياه"/></a>
      <a href={sitePath(rtl?`/en/movies/${movie.id}/`:`/ar/movies/${movie.id}/`)} className={styles.lang}>{rtl?"EN":"العربية"}</a>
    </header>

    <main>
      <section className={styles.hero} style={{backgroundImage:`url('${sitePath(background)}')`}}>
        <div className={styles.heroInner}>
          <img className={styles.poster} src={sitePath(movie.poster)} alt={`${movie.titleEn}${movie.titleAr?` — ${movie.titleAr}`:""}`}/>
          <div className={styles.copy}>
            <span className={styles.kicker}>{rtl?"فيلم":"MOVIE"}</span>
            <h1>{title}</h1>
            {movie.titleOriginal&&movie.titleOriginal!==title&&<p className={styles.altTitle}>{movie.titleOriginal}</p>}
            {!rtl&&movie.titleAr&&<p className={styles.altTitle} dir="rtl">{movie.titleAr}</p>}
            <div className={styles.meta}><b>{movie.year}</b><b>{formatDuration(movie.runtimeMinutes,locale)}</b><b>{genres}</b></div>
            <p className={styles.description}>{description}</p>
            {playable&&<div className={styles.actions}><button className={styles.watch} onClick={()=>setWatching(true)}><Play fill="currentColor"/>{rtl?"شاهد الآن":"Watch now"}</button></div>}
          </div>
        </div>
      </section>

      <section className={styles.contentWrap}>
        {story&&<section className={styles.textSection}><h2>{rtl?"القصة":"Story"}</h2><p>{story}</p></section>}
        <section className={styles.textSection}><h2>{rtl?"الوصف":"Description"}</h2><p>{description}</p></section>
        <section className={styles.facts} aria-label={rtl?"معلومات الفيلم":"Movie information"}>{facts.map(([label,value])=><div key={label}><span>{label}</span><b>{value}</b></div>)}</section>
        {movie.cast&&movie.cast.length>0&&<section className={styles.textSection}><h2>{rtl?"طاقم التمثيل":"Cast"}</h2><div className={styles.cast}>{movie.cast.map(person=><span key={person}>{person}</span>)}</div></section>}
        {similar.length>0&&<section className={styles.recommendations}><h2>{rtl?"أفلام مشابهة":"Similar Movies"}</h2><div className={styles.cardGrid}>{similar.map(item=><MovieCard key={item.id} movie={item} locale={locale}/>)}</div></section>}
        {alsoLike.length>0&&<section className={styles.recommendations}><h2>{rtl?"قد يعجبك أيضًا":"You May Also Like"}</h2><div className={styles.cardGrid}>{alsoLike.map(item=><MovieCard key={item.id} movie={item} locale={locale}/>)}</div></section>}
        <a className={styles.returnLink} href={sitePath(`/${locale}/`)}>{rtl?"الرجوع إلى الأفلام":"Back to movies"}</a>
      </section>
    </main>

    {watching&&playable&&<NativeMoviePlayer movie={movie} locale={locale} onClose={()=>setWatching(false)}/>} 
  </div>;
}