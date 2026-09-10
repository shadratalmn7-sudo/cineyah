import CineyahApp from "@/components/cineyah-app";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "en" ? "Movies and series" : "أفلام ومسلسلات", alternates: { canonical: `/${locale}/`, languages: { ar: "/ar/", en: "/en/" } } };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!["ar", "en"].includes(locale)) notFound();
  return <CineyahApp locale={locale === "en" ? "en" : "ar"} />;
}
