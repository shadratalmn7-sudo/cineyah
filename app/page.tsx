import { sitePath } from "@/lib/site-path";

export default function RootPage() {
  const target = sitePath("/ar/");
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#050811", color: "#f7f8fc", fontFamily: "Arial, sans-serif" }}>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <a href={target} style={{ color: "inherit" }}>Cineyah — سينياه</a>
    </main>
  );
}
