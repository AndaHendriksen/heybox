import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/booking`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/om-os`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/lokationer`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/handelsbetingelser`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privatlivspolitik`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]
}
