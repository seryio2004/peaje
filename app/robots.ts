import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/config";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Crawling must remain possible to observe staging's noindex.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.environment === "production" ? { sitemap: siteConfig.siteUrl + "/sitemap.xml" } : {}),
  };
}
