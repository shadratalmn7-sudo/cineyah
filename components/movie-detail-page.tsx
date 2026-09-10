"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Expand, ExternalLink, Pause, Play, Volume2, X } from "lucide-react";
import type { Locale, Movie } from "@/lib/catalog";
import { formatDuration } from "@/lib/catalog";
import styles from "./movie-detail-page.module.css";

function formatClock(seconds:number){
  if(!Number.isFinite(seconds)||seconds<0)return "0:00";
  const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=Math.floor(seconds%60);
  return h?`${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${m}:${String(s).padStart(2,"0")}`;
}

function NativeMoviePlayer({movie,locale,onClose}:{movie:Movie;locale:Locale;onClose:()=>void}){
  const source=movie.sources[0];
  const videoRef=useRef<HTMLVideoElement>(null);
  const [playing,setPlaying]=useState(false);
  const [time,setTime]=useState(0);
  const [duration,setDuration]=useState(movie.runtimeMinutes*60);
  const [volume,setVolume]=useState(1);
  const [mediaError,setMediaError]=useState(false);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video)return;
    const saved=Number(localStorage.getItem(`cineyah:progress:${movie.id}`)||0);
    if(saved>15&&saved<movie.runtimeMinutes*60-60)video.currentTime=saved;
  },[movie.id,movie.runtimeMinutes]);

  if(!source)return null;

  const toggle=()=>{
    const video=videoRef.current;
    if(!video)return;
    if(video.paused) void video.play().catch(()=>setMediaError(true));
    else video.pause();
  };

  return <div className={styles.playerOverlay} role="dialog" aria-modal="true">
    <button className={styles.closePlayer} onClick={onClose} aria-label={locale==="ar"?"إغلاق":"Close"}><X/></button>
    <div className={styles.playerShell}>
      <video
        ref={videoRef}
        className={styles.video}
        src={source.url}
        poster={movie.backdrop??movie.poster}
        preload="metadata"
        playsInline
        onClick={toggle}
        onLoadedMetadata={e=>setDuration(e.currentTarget.duration||movie.runtimeMinutes*60)}
        onTimeUpdate={e=>{setTime(e.currentTarget.currentTime);localStorage.setItem(`cineyah:progress:${movie.id}`,String(e.currentTarget.currentTime))}}
        onPlay={()=>setPlaying(true)}
        onPause={()=>setPlaying(false)}
        onError={()=>setMediaError(true)}
      />
      {mediaError&&<div className={styles.playerError}><strong>{locale==="ar"?"تعذر تشغيل هذا المصدر":"This source could not be played"}</strong><p>{locale==="ar"?"تعذر تحميل ملف الفيلم من المصدر المرخّص الحالي.":"The currently licensed source could not be loaded."}</p><button onClick={()=>{setMediaError(false);videoRef.current?.load()}}>{locale==="ar"?"إعادة المحاولة":"Retry"}</button></div>}
      <div className={styles.playerBrand}><b>CINEYAH</b><span>{movie.titleEn}</span></div>
      <div className={styles.controls}>
        <div className={styles.seekWrap}>
          <input className={styles.seek} type="range" min="0" max={duration||1} value={Math.min(time,duration||1)} onChange={e=>{const t=Number(e.target.value);setTime(t);if(videoRef.current)videoRef.current.currentTime=t}} aria-label={locale==="ar"?"التقدم":"Progress"}/>
        </div>
        <div className={styles.controlRow}>
          <button onClick={toggle} aria-label={playing?"Pause":"Play"}>{playing?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button>
          <Volume2/><input className={styles.volume} type="range" min="0" max="1" step="0.05" value={volume} onChange={e=>{const n=Number(e.target.value);setVolume(n);if(videoRef.current)videoRef.current.volume=n}}/>
          <span className={styles.clock}>{formatClock(time)} / {formatClock(duration)}</span>
          <span className={styles.spacer}/>
          <span className={styles.quality}>{source.label}</span>
          <button onClick={()=>{const shell=videoRef.current?.parentElement;if(shell?.requestFullscreen)void shell.requestFullscreen()}} aria-label="Fullscreen"><Expand/></button>
        </div>
      </div>
    </div>
  </div>;
}

export default function MovieDetailPage({movie,locale}:{movie:Movie;locale:Locale}){
  const rtl=locale==="ar";
  const [watching,setWatching]=useState(false);
  const title=rtl?movie.titleAr:movie.titleEn;
  const description=rtl?movie.descriptionAr:movie.descriptionEn;
  const background=movie.backdrop??movie.poster;
  const genreText=useMemo(()=>movie.genres.join(" · "),[movie.genres]);
  const playable=movie.sources.length>0;

  useEffect(()=>{
    if(!watching)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previous};
  },[watching]);

  return <div className={styles.page} dir={rtl?"rtl":"ltr"}>
    <header className={styles.header}>
      <a href={`/${locale}/`} className={styles.back}><ArrowLeft/>{rtl?"الأفلام":"Movies"}</a>
      <a href={`/${locale}/`} className={styles.brand}><img src="/cineyah-logo.png" alt="Cineyah — سينياه"/></a>
      <a href={rtl?`/en/movies/${movie.id}/`:`/ar/movies/${movie.id}/`} className={styles.lang}>{rtl?"EN":"العربية"}</a>
    </header>

    <main>
      <section className={styles.hero} style={{backgroundImage:`url('${background}')`}}>
        <div className={styles.heroInner}>
          <img className={styles.poster} src={movie.poster} alt={`${movie.titleEn} — ${movie.titleAr}`}/>
          <div className={styles.copy}>
            <span className={styles.kicker}>{rtl?"فيلم":"MOVIE"}</span>
            <h1>{title}</h1>
            {rtl?<p className={styles.altTitle}>{movie.titleEn}</p>:<p className={styles.altTitle} dir="rtl">{movie.titleAr}</p>}
            <div className={styles.meta}><b>{movie.year}</b><b>{formatDuration(movie.runtimeMinutes,locale)}</b><b>{genreText}</b><b>{rtl?movie.languageAr:movie.languageEn}</b></div>
            <p className={styles.description}>{description}</p>

            {playable ? <button className={styles.watch} onClick={()=>setWatching(true)}><Play fill="currentColor"/>{rtl?"شاهد الآن":"Watch now"}</button> : null}

            {!playable && movie.legalLinks?.map(link => <a key={link.url} className={styles.watch} href={link.url} target="_blank" rel="noreferrer"><ExternalLink/>{rtl?link.labelAr:link.labelEn}</a>)}
          </div>
        </div>
      </section>

      <section className={styles.info}>
        <div><span>{rtl?"التوفر":"Availability"}</span><b>{playable?(rtl?"متاح داخل سينياه بمصدر مرخّص":"Licensed playback available on Cineyah"):(rtl?"لا نستضيف نسخة من هذا الفيلم":"Cineyah does not host this movie")}</b></div>
        <div><span>{rtl?"المدة":"Runtime"}</span><b>{formatDuration(movie.runtimeMinutes,locale)}</b></div>
        <div><span>{rtl?"اللغة":"Language"}</span><b>{rtl?movie.languageAr:movie.languageEn}</b></div>
      </section>

      {playable && movie.downloadAllowed && <section className={styles.info}>
        <div><span>{rtl?"التحميل":"Download"}</span><b><a href={movie.sources[0].url}>{rtl?"تحميل من المصدر المرخّص":"Download from licensed source"}</a></b></div>
        <div><span>{rtl?"الترخيص":"License"}</span><b>{movie.licenseName??(rtl?"مرخّص":"Licensed")}</b></div>
        <div><span>{rtl?"المصدر":"Source"}</span><b><a href={movie.sourceUrl} target="_blank" rel="noreferrer">{rtl?"عرض المصدر":"View source"}</a></b></div>
      </section>}
    </main>

    {watching&&playable&&<NativeMoviePlayer movie={movie} locale={locale} onClose={()=>setWatching(false)}/>} 
  </div>;
}
