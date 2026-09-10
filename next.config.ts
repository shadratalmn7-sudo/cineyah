import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = githubPages ? "/cineyah" : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(githubPages
    ? {
        output: "export" as const,
        basePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
