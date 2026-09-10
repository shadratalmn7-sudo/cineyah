import CineyahApp from "@/components/cineyah-app";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CineyahApp locale={locale === "en" ? "en" : "ar"} />;
}
