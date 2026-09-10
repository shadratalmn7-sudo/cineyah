import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CineyahApp from "@/components/cineyah-app";
import { publicMovies } from "@/lib/catalog";

type Props = { params: Promise<{ locale: string; id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const movie = publicMovies.find(item => item.id === id);
  if (!movie || !["ar", "en"].includes(locale)) return { robots: { index: false } };
  return {
    title: `${movie.titleEn} (${movie.year})`,
    description: locale === "ar" ? movie.descriptionAr : movie.descriptionEn,
    alternates: { canonical: `/${locale}/movies/${id}/`, languages: { ar: `/ar/movies/${id}/`, en: `/en/movies/${id}/` } },
    openGraph: { title: movie.titleEn, images: [movie.poster], type: "video.movie" },
  };
}

export default async function MoviePage({ params }: Props) {
  const { locale, id } = await params;
  const movie = publicMovies.find(item => item.id === id);
  if (!movie || !["ar", "en"].includes(locale)) notFound();
  const data = { "@context": "https://schema.org", "@type": "Movie", name: movie.titleEn, alternateName: movie.titleAr, description: locale === "ar" ? movie.descriptionAr : movie.descriptionEn, duration: `PT${movie.runtimeMinutes}M`, image: movie.poster, datePublished: String(movie.year), license: movie.licenseUrl, url: `https://cineyah.shadrat-almn7.chatgpt.site/${locale}/movies/${id}/` };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /><CineyahApp locale={locale as "ar" | "en"} initialMovieId={id} /></>;
}
