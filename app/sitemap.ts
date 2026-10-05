import type { MetadataRoute } from "next";
import { FOREIGN_LOCALES, LOCAL_PAGES, localPath, languageAlternates } from "../lib/i18n";
import { siteConfig } from "../lib/config";
import { SITE_PAGES, type SitePath } from "../lib/site-routes";
import { siteUrl } from "../lib/seo";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.environment !== "production") return [];
  const spanish = (Object.keys(SITE_PAGES) as SitePath[]).map(path => {
    const page = LOCAL_PAGES.find(key => localPath("es", key) === siteUrl(path).replace(siteConfig.siteUrl, ""));
    return { url: siteUrl(path), ...(page ? { alternates: { languages: languageAlternates(page) } } : {}) };
  });
  const translated = FOREIGN_LOCALES.flatMap(lang => LOCAL_PAGES.map(page => ({
    url: siteConfig.siteUrl + localPath(lang, page),
    alternates: { languages: languageAlternates(page) },
  })));
  return [...spanish, ...translated];
}
