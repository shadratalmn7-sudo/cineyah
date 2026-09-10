"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Download, ExternalLink, Play, X } from "lucide-react";
import type { Locale, Movie } from "@/lib/catalog";
import { formatDuration, getSimilarMovies, getYouMayAlsoLike, movieTitle } from "@/lib/catalog";
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
      if(video && video.readyState < 2) setError(locale==="ar"?"استغرق المصدر وقتًا طويلًا ولم يصبح جاهزًا للتشغيل.":"The source took too long and did not become ready for playback.");
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
    if(sourceIndex < movie.sources.length-1){
      setSourceIndex(index=>index+1);
      return;
    }
    setLoading(false);
    setError(locale==="ar"?"تعذر تشغيل جميع المصادر القانونية المتاحة لهذا الفيلم.":"All available legal playback sources failed.");
  };

  return <div className={styles.playerOverlay} role="dialog" aria-modal="true" aria-label={`${locale==="ar"?"مشغل":"Player"}: ${movieTitle(movie,locale)}`}>
    <div className={styles.playerCard}>
      <div className={styles.playerTopbar}>
        <div><b>{movieTitle(movie,locale)}</b><span>{source.label}</span></div>
        <button className={styles.closePlayer} onClick={onClose} aria-label={locale==="ar"?"إغلاق":"Close"}><X/></button>
      </div>
      <div className={styles.playerShell}>
        <video
          key={source.url}
          ref={videoRef}
          className={styles.video}
          src={source.url}
          poster={movie.backdrop??movie.poster}
          preload="metadata"
          playsInline
          controls
          controlsList={movie.downloadAllowed?undefined:"nodownload"}
          onLoadedMetadata={event=>{
            setLoading(false);
            const saved=Number(localStorage.getItem(`cineyah:progress:${movie.id}`)||0);
            if(saved>15 && saved<event.currentTarget.duration-60) event.currentTarget.currentTime=saved;
          }}
          onCanPlay={()=>{setLoading(false);setError(null)}}
          onTimeUpdate={event=>localStorage.setItem(`cineyah:progress:${movie.id}`,String(event.currentTarget.currentTime))}
          onEnded={()=>localStorage.removeItem(`cineyah:progress:${movie.id}`)}
          onError={failSource}
        >
          {movie.subtitles.map(track=><track key={`${track.lang}-${track.url}`} kind="subtitles" src={track.url} srcLang={track.lang} label={locale==="ar"?track.labelAr:track.labelEn} default={track.lang==="ar"}/>)}
        </video>
        {loading&&!error&&<div className={styles.loading}>{locale==="ar"?"جارٍ تجهيز الفيديو…":"Preparing video…"}</div>}
        {error&&<div className={styles.playerError} role="alert"><strong>{locale==="ar"?"تعذر تشغيل المصدر":"Playback failed"}</strong><p>{error}</p><button onClick={()=>{setError(null);setLoading(true);videoRef.current?.load()}}>{locale==="ar"?"إعادة المحاولة":"Retry"}</button></div>}
      </div>
      {movie.sources.length>1&&<div className={styles.qualityRow}><span>{locale==="ar"?"الجودة":"Quality"}</span>{movie.sources.map((item,index)=><button key={`${item.label}-${item.url}`} className={index===sourceIndex?styles.activeQuality:""} onClick={()=>setSourceIndex(index)}>{item.label}</button>)}</div>}
    </div>
  </div>;
}

function MovieCard({movie,locale}:{movie:Movie;locale:Locale}){
  const rtl=locale==="ar";
  return <a className={styles.card} href={`/${locale}/movies/${movie.id}/`}>
    <div className={styles.cardPoster}><img src={movie.poster} alt={`${movie.titleEn}${movie.titleAr?` — ${movie.titleAr}`:""}`} loading="lazy"/><span>{movie.sources.length?(rtl?"متاح للمشاهدة":"Playable"):(rtl?"معلومات فقط":"Info only")}</span></div>
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
  const actualQualities=[...new Set(movie.sources.map(source=>source.label))].join(" · ");
  const subtitleStatus=rtl?(movie.subtitleStatusAr??(movie.subtitles.length?"توجد ترجمة مرخّصة.":"لا توجد ترجمة مرخّصة منشورة.")):(movie.subtitleStatusEn??(movie.subtitles.length?"Licensed subtitles available.":"No licensed subtitle track published."));

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
    [rtl?"الجودة المتوفرة":"Available quality",playable?actualQualities:(rtl?"لا توجد نسخة مشاهدة منشورة":"No playback copy published")],
    [rtl?"المخرج":"Director",movie.director],
    [rtl?"الترجمة":"Subtitles",subtitleStatus],
  ].filter((item):item is [string,string]=>Boolean(item[1]));

  return <div className={styles.page} dir={rtl?"rtl":"ltr"}>
    <header className={styles.header}>
      <a href={`/${locale}/`} className={styles.back}><ArrowLeft/>{rtl?"الأفلام":"Movies"}</a>
      <a href={`/${locale}/`} className={styles.brand}><img src="/cineyah-logo.png" alt="Cineyah — سينياه"/></a>
      <a href={rtl?`/en/movies/${movie.id}/`:`/ar/movies/${movie.id}/`} className={styles.lang}>{rtl?"EN":"العربية"}</a>
    </header>

    <main>
      <section className={styles.hero} style={{backgroundImage:`url('${background}')`}}>
        <div className={styles.heroInner}>
          <img className={styles.poster} src={movie.poster} alt={`${movie.titleEn}${movie.titleAr?` — ${movie.titleAr}`:""}`}/>
          <div className={styles.copy}>
            <span className={styles.kicker}>{rtl?"فيلم":"MOVIE"}</span>
            <h1>{title}</h1>
            {movie.titleOriginal&&movie.titleOriginal!==title&&<p className={styles.altTitle}>{movie.titleOriginal}</p>}
            {!rtl&&movie.titleAr&&<p className={styles.altTitle} dir="rtl">{movie.titleAr}</p>}
            <div className={styles.meta}><b>{movie.year}</b><b>{formatDuration(movie.runtimeMinutes,locale)}</b><b>{genres}</b></div>
            <p className={styles.description}>{description}</p>
            <div className={styles.actions}>
              {playable&&<button className={styles.watch} onClick={()=>setWatching(true)}><Play fill="currentColor"/>{rtl?"شاهد الآن":"Watch now"}</button>}
              {movie.downloadAllowed&&movie.downloadUrl&&<a className={styles.download} href={movie.downloadUrl} target="_blank" rel="noreferrer"><Download/>{rtl?"تحميل من المصدر المرخّص":"Download from licensed source"}</a>}
              {!playable&&movie.legalLinks?.map(link=><a key={link.url} className={styles.secondaryAction} href={link.url} target="_blank" rel="noreferrer"><ExternalLink/>{rtl?link.labelAr:link.labelEn}</a>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentWrap}>
        <div className={styles.statusBanner} data-playable={playable?"yes":"no"}><strong>{playable?(rtl?"متاح للمشاهدة داخل Cineyah":"Playable on Cineyah"):(rtl?"صفحة معلومات — المشاهدة داخل Cineyah غير متاحة حاليًا":"Metadata page — Cineyah playback is not currently available")}</strong><span>{rtl?"لا يظهر زر المشاهدة إلا عند وجود مصدر قانوني منشور ومتحقق.":"A watch button is shown only when a verified legal playback source is published."}</span></div>

        {story&&<section className={styles.textSection}><h2>{rtl?"القصة":"Story"}</h2><p>{story}</p></section>}
        <section className={styles.textSection}><h2>{rtl?"الوصف":"Description"}</h2><p>{description}</p></section>

        <section className={styles.facts} aria-label={rtl?"معلومات الفيلم":"Movie information"}>{facts.map(([label,value])=><div key={label}><span>{label}</span><b>{value}</b></div>)}</section>

        {movie.cast&&movie.cast.length>0&&<section className={styles.textSection}><h2>{rtl?"طاقم التمثيل":"Cast"}</h2><div className={styles.cast}>{movie.cast.map(person=><span key={person}>{person}</span>)}</div></section>}

        <details className={styles.rights}>
          <summary>{rtl?"حقوق ومصدر المحتوى":"Rights & Content Source"}</summary>
          <div className={styles.rightsGrid}>
            {movie.contentSourceName&&<div><span>{rtl?"مصدر الفيديو":"Video source"}</span><b>{movie.contentSourceName}</b></div>}
            {movie.contentSourceUrl&&<div><span>{rtl?"صفحة المصدر":"Source page"}</span><a href={movie.contentSourceUrl} target="_blank" rel="noreferrer">{movie.contentSourceUrl}</a></div>}
            {movie.licenseName&&<div><span>{rtl?"نوع الرخصة":"License"}</span><b>{movie.licenseName}</b></div>}
            {movie.licenseUrl&&<div><span>{rtl?"رابط الرخصة":"License link"}</span><a href={movie.licenseUrl} target="_blank" rel="noreferrer">{movie.licenseUrl}</a></div>}
            {movie.attribution&&<div><span>Attribution</span><b>{movie.attribution}</b></div>}
            <div><span>{rtl?"هل التحميل مسموح؟":"Download allowed?"}</span><b>{movie.downloadAllowed?(rtl?"نعم، من الرابط المرخّص المحدد":"Yes, from the specified licensed link"):(rtl?"لا يوجد تحميل منشور":"No download is published")}</b></div>
            {(rtl?movie.rightsStatusAr:movie.rightsStatusEn)&&<div className={styles.rightsStatus}><span>{rtl?"حالة الحقوق":"Rights status"}</span><b>{rtl?movie.rightsStatusAr:movie.rightsStatusEn}</b></div>}
            {movie.metadataSourceName&&movie.metadataSourceUrl&&<div><span>{rtl?"مصدر بيانات الفيلم":"Movie metadata source"}</span><a href={movie.metadataSourceUrl} target="_blank" rel="noreferrer">{movie.metadataSourceName}</a></div>}
          </div>
        </details>

        {similar.length>0&&<section className={styles.recommendations}><h2>{rtl?"أفلام مشابهة":"Similar Movies"}</h2><div className={styles.cardGrid}>{similar.map(item=><MovieCard key={item.id} movie={item} locale={locale}/>)}</div></section>}
        {alsoLike.length>0&&<section className={styles.recommendations}><h2>{rtl?"قد يعجبك أيضًا":"You May Also Like"}</h2><div className={styles.cardGrid}>{alsoLike.map(item=><MovieCard key={item.id} movie={item} locale={locale}/>)}</div></section>}
        <a className={styles.returnLink} href={`/${locale}/`}>{rtl?"الرجوع إلى الأفلام / الرئيسية":"Back to movies / home"}</a>
      </section>
    </main>

    {watching&&playable&&<NativeMoviePlayer movie={movie} locale={locale} onClose={()=>setWatching(false)}/>} 
  </div>;
}
