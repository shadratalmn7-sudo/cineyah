import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Cineyah — سينياه", template: "%s | Cineyah" },
  description: "أفلام ومسلسلات مرخّصة ومتاحة قانونيًا للمشاهدة بالعربية والإنجليزية.",
  metadataBase: new URL("https://cineyah.shadrat-almn7.chatgpt.site"),
  alternates: { languages: { ar: "/ar/", en: "/en/" } },
  robots: { index: true, follow: true },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
