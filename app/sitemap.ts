import type { MetadataRoute } from "next";
import { publicMovies } from "@/lib/public-catalog";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cineyah-movies.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["ar", "en"].flatMap(locale => [
    { url: `${origin}${sitePath(`/${locale}/`)}` },
    ...publicMovies.map(movie => ({
      url: `${origin}${sitePath(`/${locale}/movies/${movie.id}/`)}`,
      lastModified: movie.publishedAt,
    })),
  ]);
}
