import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const staticExport = githubPages || process.env.STATIC_EXPORT === "true";
const basePath = githubPages ? "/cineyah" : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(staticExport
    ? {
        output: "export" as const,
        ...(basePath ? { basePath } : {}),
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
