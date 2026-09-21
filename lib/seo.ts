import type { Metadata } from "next";
import { siteConfig } from "./config";
import { SITE_PAGES, type SitePath } from "./site-routes";

/** All public routes share one canonical origin and use trailing slashes. */
export function siteUrl(path = "/"): string {
  return siteConfig.siteUrl + (path === "/" ? "/" : "/" + path.replace(/^\/+|\/+$/g, "") + "/");
}
export function pageMetadata(path: SitePath): Metadata {
  const page = SITE_PAGES[path];
  const title = path === "/" ? page.title : page.title + " | El Peaje";
  const images = [{ url: siteConfig.siteUrl + "/share-image.png", width: 1200, height: 630, alt: "El Peaje: juego de cartas online gratis para jugar solo, en pareja o en grupo" }];
  return {
    title: { absolute: title },
    description: page.description,
    alternates: { canonical: siteUrl(path) },
    openGraph: { type: "website", locale: "es_ES", siteName: "El Peaje", title, description: page.description, url: siteUrl(path), images },
    twitter: { card: "summary_large_image", title, description: page.description, images: images.map(image => image.url) },
  };
}
export function siteStructuredData() {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": siteUrl() + "#website", url: siteUrl(), name: "El Peaje", inLanguage: "es", description: SITE_PAGES["/"].description },
    { "@type": "VideoGame", "@id": siteUrl() + "#game", name: "El Peaje", url: siteUrl("/jugar"),
      description: SITE_PAGES["/jugar"].description, inLanguage: "es", genre: "Juego de cartas",
      gamePlatform: "Navegador web", isAccessibleForFree: true, numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 8 } },
  ] };
}
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
