"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Expand, Pause, Play, Volume2, X } from "lucide-react";
import type { Locale, Movie } from "@/lib/catalog";
import { formatDuration } from "@/lib/catalog";
import styles from "./movie-detail-page.module.css";

function formatClock(seconds:number){
  if(!Number.isFinite(seconds)||seconds<0)return "0:00";
  const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=Math.floor(seconds%60);
  return h?`${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${m}:${String(s).padStart(2,"0")}`;
}

function NativeMoviePlayer({movie,locale,onClose}:{movie:Movie;locale:Locale;onClose:()=>void}){
  const videoRef=useRef<HTMLVideoElement>(null);
  const previewRef=useRef<HTMLVideoElement>(null);
  const seekRef=useRef<HTMLDivElement>(null);
  const [playing,setPlaying]=useState(false);
  const [time,setTime]=useState(0);
  const [duration,setDuration]=useState(movie.runtimeMinutes*60);
  const [volume,setVolume]=useState(1);
  const [mediaError,setMediaError]=useState(false);
  const [preview,setPreview]=useState<{time:number;left:number}|null>(null);
  const source=movie.sources[0];

  useEffect(()=>{
    const video=videoRef.current;
    if(!video)return;
    const saved=Number(localStorage.getItem(`cineyah:progress:${movie.id}`)||0);
    if(saved>15&&saved<movie.runtimeMinutes*60-60)video.currentTime=saved;
  },[movie.id,movie.runtimeMinutes]);

  useEffect(()=>{
    if(!preview||!previewRef.current)return;
    const p=previewRef.current;
    const next=Math.max(0,Math.min(preview.time,Math.max(0,duration-0.5)));
    if(Math.abs(p.currentTime-next)>.6){
      try{p.currentTime=next}catch{}
    }
  },[preview,duration]);

  const toggle=()=>{
    const v=videoRef.current;
    if(!v)return;
    if(v.paused){void v.play().catch(()=>setMediaError(true));}else v.pause();
  };

  const pointerPreview=(clientX:number)=>{
    const box=seekRef.current?.getBoundingClientRect();
    if(!box||!duration)return;
    const ratio=Math.max(0,Math.min(1,(clientX-box.left)/box.width));
    setPreview({time:ratio*duration,left:ratio*100});
  };

  return <div className={styles.playerOverlay} role="dialog" aria-modal="true">
    <button className={styles.closePlayer} onClick={onClose} aria-label={locale==="ar"?"إغلاق":"Close"}><X/></button>
    <div className={styles.playerShell}>
      <video ref={videoRef} className={styles.video} src={source.url} poster={movie.backdrop??movie.poster} preload="metadata" playsInline onClick={toggle}
        onLoadedMetadata={e=>setDuration(e.currentTarget.duration||movie.runtimeMinutes*60)}
        onTimeUpdate={e=>{setTime(e.currentTarget.currentTime);localStorage.setItem(`cineyah:progress:${movie.id}`,String(e.currentTarget.currentTime))}}
        onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setMediaError(true)} />
      <video ref={previewRef} className={styles.previewVideoSource} src={source.url} muted playsInline preload="metadata" aria-hidden="true" />
      {mediaError&&<div className={styles.playerError}><strong>{locale==="ar"?"تعذر تشغيل هذا المصدر":"This source could not be played"}</strong><p>{locale==="ar"?"سنجرّب المصدر مرة أخرى. إذا استمر الخطأ فلن نعتمد هذا الفيلم كفيلم جاهز.":"We will retry the source. If it keeps failing, the title will not be treated as ready."}</p><button onClick={()=>{setMediaError(false);videoRef.current?.load()}}>{locale==="ar"?"إعادة المحاولة":"Retry"}</button></div>}
      <div className={styles.playerBrand}><b>CINEYAH</b><span>{movie.titleEn}</span></div>
      <div className={styles.controls}>
        <div ref={seekRef} className={styles.seekWrap} onPointerMove={e=>pointerPreview(e.clientX)} onPointerLeave={()=>setPreview(null)}>
          {preview&&<div className={styles.previewBubble} style={{left:`${preview.left}%`}}><video src={source.url} muted playsInline preload="metadata" ref={el=>{if(el&&Math.abs(el.currentTime-preview.time)>.7){try{el.currentTime=preview.time}catch{}}}}/><span>{formatClock(preview.time)}</span></div>}
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
  const title=locale==="ar"?movie.titleAr:movie.titleEn;
  const description=locale==="ar"?movie.descriptionAr:movie.descriptionEn;
  const background=movie.backdrop??movie.poster;
  const genreText=useMemo(()=>movie.genres.join(" · "),[movie.genres]);

  return <div className={styles.page} dir={rtl?"rtl":"ltr"}>
    <header className={styles.header}>
      <a href={`/${locale}/`} className={styles.back}><ArrowLeft/>{locale==="ar"?"الأفلام":"Movies"}</a>
      <a href={`/${locale}/`} className={styles.brand}><img src="/cineyah-logo.png" alt="Cineyah — سينياه"/></a>
      <a href={locale==="ar"?`/en/movies/${movie.id}/`:`/ar/movies/${movie.id}/`} className={styles.lang}>{locale==="ar"?"EN":"العربية"}</a>
    </header>

    <main>
      <section className={styles.hero} style={{backgroundImage:`linear-gradient(90deg,rgba(3,5,10,.97) 2%,rgba(3,5,10,.78) 38%,rgba(3,5,10,.2) 72%,rgba(3,5,10,.85)),linear-gradient(0deg,#050811 1%,transparent 45%),url('${background}')`}}>
        <div className={styles.heroInner}>
          <img className={styles.poster} src={movie.poster} alt={`${movie.titleEn} — ${movie.titleAr}`}/>
          <div className={styles.copy}>
            <span className={styles.kicker}>{locale==="ar"?"فيلم":"MOVIE"}</span>
            <h1>{title}</h1>
            {locale==="ar"?<p className={styles.altTitle}>{movie.titleEn}</p>:<p className={styles.altTitle} dir="rtl">{movie.titleAr}</p>}
            <div className={styles.meta}><b>{movie.year}</b><b>{formatDuration(movie.runtimeMinutes,locale)}</b><b>{genreText}</b><b>{locale==="ar"?movie.languageAr:movie.languageEn}</b></div>
            <p className={styles.description}>{description}</p>
            <button className={styles.watch} onClick={()=>setWatching(true)}><Play fill="currentColor"/>{locale==="ar"?"شاهد الآن":"Watch now"}</button>
          </div>
        </div>
      </section>

      <section className={styles.info}>
        <div><span>{locale==="ar"?"الجودة":"Quality"}</span><b>{movie.sources.map(s=>s.label).join(" · ")}</b></div>
        <div><span>{locale==="ar"?"المدة":"Runtime"}</span><b>{formatDuration(movie.runtimeMinutes,locale)}</b></div>
        <div><span>{locale==="ar"?"اللغة":"Language"}</span><b>{locale==="ar"?movie.languageAr:movie.languageEn}</b></div>
      </section>
    </main>

    {watching&&<NativeMoviePlayer movie={movie} locale={locale} onClose={()=>setWatching(false)}/>} 
  </div>;
}
