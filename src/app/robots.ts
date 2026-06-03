import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    // Broad allow - do NOT block AI crawlers (GPTBot, PerplexityBot, etc.); GEO depends on them.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/booking/confirmation"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
