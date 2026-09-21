import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/config";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Staging remains crawlable so bots can read the page-level noindex.
  // OAI-SearchBot is OpenAI's search crawler; the wildcard covers other bots.
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    ...(siteConfig.environment === "production" ? { sitemap: siteConfig.siteUrl + "/sitemap.xml" } : {}),
  };
}
