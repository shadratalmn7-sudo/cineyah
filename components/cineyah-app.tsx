"use client";

import MovieLibraryHome from "@/components/movie-library-home";
import type { Locale } from "@/lib/catalog";

// Compatibility entry point retained for older imports. The home experience is now
// declarative navigation only; movie previews and player overlays were intentionally removed.
export default function CineyahApp({locale}:{locale:Locale;initialMovieId?:string}){
  return <MovieLibraryHome locale={locale}/>;
}
