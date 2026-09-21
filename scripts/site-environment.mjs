export function validateSiteUrl(value, profile, basePath = "") {
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || !["http:", "https:"].includes(url.protocol)) throw new Error("SITE_URL debe ser una URL sin credenciales, query ni fragmento");
  if (profile === "production" && (url.protocol !== "https:" || url.hostname !== "elpejae.com" || url.port || basePath)) throw new Error("Producción requiere https://elpejae.com sin puerto ni subdirectorio");
  if (url.pathname.replace(/\/$/, "") !== basePath) throw new Error("El path de SITE_URL debe coincidir con PAGES_BASE_PATH (vacío en Cloudflare)");
  return url.href.replace(/\/$/, "");
}
