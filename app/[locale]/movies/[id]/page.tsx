import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieDetailPage from "@/components/movie-detail-page";
import { discoverableMovies } from "@/lib/catalog";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const movie = discoverableMovies.find(item => item.id === id);
  if (!movie || !["ar", "en"].includes(locale)) return { robots: { index: false } };

  const title = locale === "ar"
    ? `فيلم ${movie.titleAr} (${movie.year}) — القصة وأين تشاهده` 
    : `${movie.titleEn} (${movie.year}) — Story & where to watch`;
  const description = locale === "ar" ? movie.descriptionAr : movie.descriptionEn;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/movies/${id}/`,
      languages: { ar: `/ar/movies/${id}/`, en: `/en/movies/${id}/` },
    },
    openGraph: {
      title,
      description,
      images: [movie.backdrop ?? movie.poster, movie.poster],
      type: "video.movie",
    },
    robots: { index: true, follow: true },
  };
}

export default async function MoviePage({ params }: Props) {
  const { locale, id } = await params;
  const movie = discoverableMovies.find(item => item.id === id);
  if (!movie || !["ar", "en"].includes(locale)) notFound();

  const data = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.titleEn,
    alternateName: movie.titleAr,
    description: locale === "ar" ? movie.descriptionAr : movie.descriptionEn,
    duration: `PT${movie.runtimeMinutes}M`,
    image: [movie.backdrop ?? movie.poster, movie.poster],
    datePublished: String(movie.year),
    url: `https://cineyah.shadrat-almn7.chatgpt.site/${locale}/movies/${id}/`,
    ...(movie.licenseUrl ? { license: movie.licenseUrl } : {}),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    <MovieDetailPage movie={movie} locale={locale as "ar" | "en"} />
  </>;
}
