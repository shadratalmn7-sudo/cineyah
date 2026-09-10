"use client";

import { useMemo, useState } from "react";
import { Globe2, Search } from "lucide-react";
import { discoverableMovies, formatDuration, type Genre, type Locale } from "@/lib/catalog";

const genreLabels: Record<Genre, { ar: string; en: string }> = {
  action:{ar:"أكشن",en:"Action"},horror:{ar:"رعب",en:"Horror"},comedy:{ar:"كوميديا",en:"Comedy"},drama:{ar:"دراما",en:"Drama"},romance:{ar:"رومانسي",en:"Romance"},thriller:{ar:"إثارة",en:"Thriller"},crime:{ar:"جريمة",en:"Crime"},mystery:{ar:"غموض",en:"Mystery"},adventure:{ar:"مغامرات",en:"Adventure"},scifi:{ar:"خيال علمي",en:"Science Fiction"},fantasy:{ar:"فانتازيا",en:"Fantasy"},war:{ar:"حربي",en:"War"},western:{ar:"غربي",en:"Western"},family:{ar:"عائلي",en:"Family"},animation:{ar:"رسوم متحركة",en:"Animation"},musical:{ar:"موسيقي",en:"Musical"},history:{ar:"تاريخي",en:"History"},biography:{ar:"سيرة ذاتية",en:"Biography"},sport:{ar:"رياضي",en:"Sport"},
};

export default function MovieLibraryHome({ locale }: { locale: Locale }) {
  const rtl = locale === "ar";
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre | null>(null);
  const movies = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return discoverableMovies.filter(movie => {
      const matchesQuery = !needle || `${movie.titleAr} ${movie.titleEn} ${movie.year}`.toLowerCase().includes(needle);
      const matchesGenre = !genre || movie.genres.includes(genre);
      return matchesQuery && matchesGenre;
    });
  }, [query, genre]);

  return <div className="library-page" dir={rtl ? "rtl" : "ltr"}>
    <header className="library-nav">
      <a href={`/${locale}/`} className="library-brand"><img src="/cineyah-logo.png" alt="Cineyah — سينياه"/></a>
      <a className="library-lang" href={locale === "ar" ? "/en/" : "/ar/"}><Globe2/>{locale === "ar" ? "EN" : "العربية"}</a>
    </header>

    <main className="library-main">
      <section className="library-intro">
        <span>CINEYAH</span>
        <h1>{rtl ? "مكتبة الأفلام" : "Movie Library"}</h1>
        <p>{rtl ? "اختر فيلمًا لفتح صفحته المستقلة، مع القصة والمعلومات وخيارات المشاهدة المتاحة قانونيًا." : "Choose a movie to open its own indexable page with story, details and legal viewing options."}</p>
      </section>

      <div className="library-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={rtl ? "ابحث عن فيلم..." : "Search movies..."}/></div>

      <div className="library-genres">
        <button className={!genre ? "active" : ""} onClick={()=>setGenre(null)}>{rtl ? "الكل" : "All"}</button>
        {(Object.keys(genreLabels) as Genre[]).map(item => <button key={item} className={genre===item ? "active" : ""} onClick={()=>setGenre(item)}>{genreLabels[item][locale]}</button>)}
      </div>

      <section className="library-grid">
        {movies.map(movie => <a className="library-card" key={movie.id} href={`/${locale}/movies/${movie.id}/`}>
          <div className="library-poster"><img src={movie.poster} alt={`${movie.titleEn} — ${movie.titleAr}`} loading="lazy"/><span>{movie.sources.length ? (rtl ? "متاح هنا" : "Available here") : (rtl ? "صفحة معلومات" : "Info page")}</span></div>
          <div className="library-card-copy">
            <h2>{rtl ? movie.titleAr : movie.titleEn}</h2>
            <p className="library-alt" dir={rtl ? "ltr" : "rtl"}>{rtl ? movie.titleEn : movie.titleAr}</p>
            <p>{movie.year} · {formatDuration(movie.runtimeMinutes, locale)}</p>
          </div>
        </a>)}
      </section>

      {movies.length === 0 && <p className="library-empty">{rtl ? "لا توجد أفلام مطابقة." : "No matching movies."}</p>}
    </main>
  </div>;
}
