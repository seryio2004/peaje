import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/config";
import { SITE_PAGES, type SitePath } from "../lib/site-routes";
import { siteUrl } from "../lib/seo";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.environment !== "production") return [];
  return (Object.keys(SITE_PAGES) as SitePath[]).map(path => ({ url: siteUrl(path) }));
}
