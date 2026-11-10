import type { Metadata } from "next";
import { LOCAL_PAGES, languageAlternates, localPath } from "./i18n";
import { siteConfig } from "./config";
import { SITE_PAGES, type SitePath } from "./site-routes";

/** All public routes share one canonical origin and use trailing slashes. */
export function siteUrl(path = "/"): string {
  return siteConfig.siteUrl + (path === "/" ? "/" : "/" + path.replace(/^\/+|\/+$/g, "") + "/");
}
export function pageMetadata(path: SitePath): Metadata {
  const page = SITE_PAGES[path];
  const title = page.title.includes("El Peaje") ? page.title : page.title + " | El Peaje";
  const images = [{ url: siteConfig.siteUrl + "/share-image.png", width: 1200, height: 630, alt: "El Peaje: juego de cartas online gratis para jugar solo, en pareja o en grupo" }];
  const translatedPage = LOCAL_PAGES.find(page => localPath("es", page) === siteUrl(path).replace(siteConfig.siteUrl, ""));
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: siteUrl(path), ...(translatedPage ? { languages: languageAlternates(translatedPage) } : {}) },
    openGraph: { type: "website", locale: "es_ES", siteName: "El Peaje", title, description: page.description, url: siteUrl(path), images },
    twitter: { card: "summary_large_image", title, description: page.description, images: images.map(image => image.url) },
  };
}
export function siteStructuredData() {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": siteUrl() + "#website", url: siteUrl(), name: "El Peaje", inLanguage: "es", description: SITE_PAGES["/"].description },
    { "@type": ["VideoGame", "WebApplication"], "@id": siteUrl() + "#game", name: "El Peaje", url: siteUrl("/jugar"),
      description: SITE_PAGES["/jugar"].description, inLanguage: "es", genre: "Juego de cartas",
      applicationCategory: "GameApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
      gamePlatform: "Navegador web", isAccessibleForFree: true, numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 8 } },
  ] };
}
/** Match the visible navigation; never fabricate authors, ratings or dates. */
export function pageStructuredData(path: Exclude<SitePath, "/">, title: string) {
  const url = siteUrl(path);
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url + "#webpage", url, name: title,
      description: SITE_PAGES[path].description, inLanguage: "es",
      isPartOf: { "@id": siteUrl() + "#website" }, breadcrumb: { "@id": url + "#breadcrumb" } },
    { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", url,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl() },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ] },
  ] };
}
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
