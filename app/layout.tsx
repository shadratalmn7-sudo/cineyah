import type { Metadata } from "next";
import { sitePath } from "@/lib/site-path";
import "./globals.css";

const origin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  "https://cineyah.shadrat-almn7.chatgpt.site";

export const metadata: Metadata = {
  title: { default: "Cineyah — سينياه", template: "%s | Cineyah" },
  description: "أفلام ومسلسلات مرخّصة ومتاحة قانونيًا للمشاهدة بالعربية والإنجليزية.",
  metadataBase: new URL(origin),
  alternates: { languages: { ar: sitePath("/ar/"), en: sitePath("/en/") } },
  robots: { index: true, follow: true },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: sitePath("/favicon.svg"),
    shortcut: sitePath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
