import type { MetadataRoute } from "next";
import { publicMovies } from "@/lib/catalog";
const origin = "https://cineyah.shadrat-almn7.chatgpt.site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["ar", "en"].flatMap(locale => [
    { url: `${origin}/${locale}/` },
    ...publicMovies.map(movie => ({ url: `${origin}/${locale}/movies/${movie.id}/`, lastModified: movie.publishedAt })),
  ]);
}
