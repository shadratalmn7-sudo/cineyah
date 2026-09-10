import type { MetadataRoute } from "next";
import { discoverableMovies } from "@/lib/catalog";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cineyah.shadrat-almn7.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["ar", "en"].flatMap(locale => [
    { url: `${origin}${sitePath(`/${locale}/`)}` },
    ...discoverableMovies.map(movie => ({
      url: `${origin}${sitePath(`/${locale}/movies/${movie.id}/`)}`,
      lastModified: movie.publishedAt,
    })),
  ]);
}
