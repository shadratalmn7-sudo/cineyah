"use client";

import { useEffect } from "react";
import { publicMovies, type Locale } from "@/lib/catalog";

export default function MovieLinkGuard({ locale }: { locale: Locale }) {
  useEffect(() => {
    const go = (id: string) => {
      window.location.assign(`/${locale}/movies/${id}/`);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const tile = target.closest<HTMLElement>(".tile");
      if (tile && !target.closest(".round-play")) {
        const href = tile.querySelector<HTMLAnchorElement>("a[href*='/movies/']")?.getAttribute("href");
        if (href) {
          event.preventDefault();
          event.stopPropagation();
          window.location.assign(href);
          return;
        }
      }

      const suggestion = target.closest<HTMLButtonElement>(".suggestions button");
      if (suggestion) {
        const title = suggestion.querySelector("b")?.textContent?.trim();
        const movie = publicMovies.find(item => item.titleEn === title || item.titleAr === title);
        if (movie) {
          event.preventDefault();
          event.stopPropagation();
          go(movie.id);
          return;
        }
      }

      const details = target.closest<HTMLElement>(".hero-buttons .secondary");
      if (details) {
        const movie = publicMovies[0];
        if (movie) {
          event.preventDefault();
          event.stopPropagation();
          go(movie.id);
        }
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as HTMLElement | null;
      const tile = target?.closest<HTMLElement>(".tile");
      if (!tile) return;
      const href = tile.querySelector<HTMLAnchorElement>("a[href*='/movies/']")?.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(href);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [locale]);

  return null;
}
