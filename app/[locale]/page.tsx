import MovieLibraryHome from "@/components/movie-library-home";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Cineyah Movie Library" : "مكتبة أفلام سينياه",
    description: locale === "en"
      ? "Browse movies and open a dedicated page for each title with story, details and legal viewing options."
      : "تصفح الأفلام وافتح صفحة مستقلة لكل فيلم تحتوي على القصة والمعلومات وخيارات المشاهدة القانونية.",
    alternates: { canonical: `/${locale}/`, languages: { ar: "/ar/", en: "/en/" } },
  };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!["ar", "en"].includes(locale)) notFound();
  return <MovieLibraryHome locale={locale === "en" ? "en" : "ar"} />;
}
