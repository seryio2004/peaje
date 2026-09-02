import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seryio2004.github.io/peaje"
).replace(/\/$/, "");

export const dynamic = "force-static";

const ROUTES = [
  "",
  "/jugar",
  "/como-jugar",
  "/modos-de-juego",
  "/preguntas-frecuentes",
  "/sobre-el-juego",
  "/contacto",
  "/privacidad",
  "/cookies",
  "/aviso-legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: index < 5 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : index < 5 ? 0.8 : 0.4,
  }));
}
