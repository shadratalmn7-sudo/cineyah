import type { MetadataRoute } from "next";
import { sitePath } from "@/lib/site-path";

export const dynamic = "force-static";

const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://cineyah.shadrat-almn7.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: sitePath("/"),
      disallow: [sitePath("/admin/"), sitePath("/api/")],
    },
    sitemap: `${origin}${sitePath("/sitemap.xml")}`,
  };
}
