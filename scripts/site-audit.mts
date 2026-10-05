import { writeFile } from "node:fs/promises";
import { SITE_PAGES } from "../lib/site-routes";
import { FOREIGN_LOCALES, LOCAL_PAGES, localPath } from "../lib/i18n";
import { serveExport } from "./serve-export.mjs";

type Result = { status: "PASS" | "WARN" | "FAIL"; page: string; check: string; detail: string };
const results: Result[] = [];
const args = process.argv.slice(2);
const argument = (key: string) => args.includes(key) ? args[args.indexOf(key) + 1] : undefined;
const expectedOrigin = new URL(argument("--origin") || "https://elpejae.com").origin;
const allowNoindex = args.includes("--allow-noindex");
const report = argument("--report");
function record(status: Result["status"], page: string, check: string, detail: string) {
  results.push({ status, page, check, detail });
  console.log(`${status} ${page} ${check}: ${detail}`);
}
const check = (ok: boolean, page: string, name: string, detail: string) => record(ok ? "PASS" : "FAIL", page, name, detail);
const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const tags = (html: string, tag: string) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(match => match[0]);
const attr = (tag: string, key: string) => decode(tag.match(new RegExp(`\\b${key}="([^"]*)"`, "i"))?.[1] || "");
const meta = (html: string, key: string, value: string) => tags(html, "meta").filter(tag => attr(tag, key) === value);
const visible = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
const paths = [...Object.keys(SITE_PAGES).map(path => path === "/" ? "/" : path + "/"), ...FOREIGN_LOCALES.flatMap(lang => LOCAL_PAGES.map(page => localPath(lang, page)))];
const local = argument("--base") ? null : await serveExport();
const base = new URL(argument("--base") || local!.base);
const cache = new Map<string, Promise<{ status: number; body: string; url: string; headerRobots: string }>>();
const get = (path: string) => {
  if (!cache.has(path)) cache.set(path, (async () => {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
    return { status: response.status, body: await response.text(), url: response.url, headerRobots: response.headers.get("x-robots-tag") || "" };
  })());
  return cache.get(path)!;
};
const titles = new Set<string>();
const descriptions = new Set<string>();
const links = new Map<string, Set<string>>();
try {
  record("PASS", "site", "scope", local ? "HTTP sobre export local; no verifica el despliegue" : `HTTP ${base.origin}; canonical esperado ${expectedOrigin}`);
  for (const path of paths) {
    try {
      const response = await get(path);
      check(response.status === 200, path, "HTTP", String(response.status));
      const html = response.body;
      check(new URL(response.url).pathname === path, path, "route", "La URL final conserva la ruta esperada");
      const titleMatches = [...html.matchAll(/<title>([^<]+)<\/title>/gi)];
      const title = decode(titleMatches[0]?.[1] || "");
      check(titleMatches.length === 1 && !!title && !titles.has(title), path, "title", title || "Ausente o duplicado"); titles.add(title);
      const descriptionTags = meta(html, "name", "description");
      const description = attr(descriptionTags[0] || "", "content");
      check(descriptionTags.length === 1 && !!description && !descriptions.has(description), path, "description", description || "Ausente o duplicada"); descriptions.add(description);
      const canonicalTags = tags(html, "link").filter(tag => attr(tag, "rel") === "canonical");
      check(canonicalTags.length === 1 && attr(canonicalTags[0], "href") === expectedOrigin + path, path, "canonical", attr(canonicalTags[0] || "", "href"));
      const h1 = [...visible(html).matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
      check(h1.length === 1 && !!h1[0]?.[1].replace(/<[^>]+>/g, "").trim(), path, "H1", String(h1.length));
      const robots = meta(html, "name", "robots").map(tag => attr(tag, "content")).join(",") + (response.headerRobots ? "; HTTP: " + response.headerRobots : "");
      check(allowNoindex ? /noindex/i.test(robots) : !/noindex|none/i.test(robots), path, "indexable", robots || "Indexación por defecto");
      check(attr(meta(html, "property", "og:url")[0] || "", "content") === expectedOrigin + path && meta(html, "property", "og:title").length === 1 && meta(html, "property", "og:image").length === 1, path, "OpenGraph", "URL, título e imagen");
      const body = visible(html);
      const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
      const text = decode(main.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
      check(text.length > 100, path, "HTML sin JS", `${text.split(/\s+/).length} palabras en main; partida necesita JS`);
      check(!/próximamente|coming soon|aún no disponible|todavía en desarrollo/i.test(text), path, "placeholders", "Sin promesas de funciones inexistentes");
      const footer = body.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/i)?.[1] || "";
      check(["sobre-el-juego", "contacto", "privacidad", "cookies"].every(slug => footer.includes(`href="/${slug}`)), path, "footer", "Sobre, contacto, privacidad y cookies accesibles");
      if (/\/(jugar|play|gioca|spielen|jouer|jogar)\/$/.test(path)) check(!/data-ad-slot|adsbygoogle|pagead2\.googlesyndication/.test(html), path, "juego sin anuncios", "Sin unidades ni SDK publicitario");
      for (const tag of tags(body, "a")) {
        const href = attr(tag, "href");
        if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
        const target = new URL(href, new URL(path, expectedOrigin));
        if (target.origin !== expectedOrigin && target.origin !== base.origin) continue;
        const key = target.pathname + target.search;
        if (!links.has(key)) links.set(key, new Set());
        links.get(key)!.add(path);
        if (target.hash && target.pathname.replace(/\/$/, "") === path.replace(/\/$/, "")) {
          const id = decodeURIComponent(target.hash.slice(1));
          check(tags(body, "[a-z][a-z0-9]*").some(element => attr(element, "id") === id), path, "anchor", id);
        }
      }
    } catch (error) { record("FAIL", path, "request", String(error)); }
  }
  for (const [target, sources] of links) {
    try { const response = await get(target); check(response.status === 200, target, "internal link", `${response.status}; desde ${[...sources].join(", ")}`); }
    catch (error) { record("FAIL", target, "internal link", String(error)); }
  }
  const sitemapResponse = await get("/sitemap.xml");
  check(sitemapResponse.status === 200, "/sitemap.xml", "HTTP", String(sitemapResponse.status));
  const locations = [...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
  check(allowNoindex ? locations.length === 0 : locations.length === paths.length && new Set(locations).size === paths.length && paths.every(path => locations.includes(expectedOrigin + path)), "/sitemap.xml", "coverage", `${locations.length} URLs; esperadas ${allowNoindex ? 0 : paths.length}`);
  const robotsResponse = await get("/robots.txt");
  check(robotsResponse.status === 200, "/robots.txt", "HTTP", String(robotsResponse.status));
  check(/User-Agent: \*\s+Allow: \//i.test(robotsResponse.body) && !/^Disallow:\s*\/(?:\s|$)/im.test(robotsResponse.body), "/robots.txt", "crawl", "Rastreo público permitido");
  check(allowNoindex || robotsResponse.body.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`), "/robots.txt", "sitemap", "Origen correcto");
  const missing = await get("/audit-route-that-does-not-exist/");
  check(missing.status === 404, "404", "HTTP", String(missing.status));
  check(/noindex/.test(meta(missing.body, "name", "robots").map(tag => attr(tag, "content")).join(",") + missing.headerRobots), "404", "noindex", "Errores fuera del índice");
  const ads = await get("/ads.txt");
  const lines = ads.body.split("\n").map(line => line.trim()).filter(line => line && !line.startsWith("#"));
  check(ads.status === 200 && lines.length > 0 && lines.every(line => /^google\.com,\s*pub-\d{16},\s*DIRECT,\s*f08c47fec0942fa0$/.test(line)), "/ads.txt", "syntax", "Registro de Google válido en formato");
  record("WARN", "/ads.txt", "ownership", "Confirmar identificador en la cuenta AdSense; la sintaxis no prueba titularidad");
} catch (error) { record("FAIL", "site", "audit", String(error)); }
finally { if (local) await new Promise<void>(resolve => local.server.close(() => resolve())); }
const summary = { PASS: results.filter(result => result.status === "PASS").length, WARN: results.filter(result => result.status === "WARN").length, FAIL: results.filter(result => result.status === "FAIL").length };
console.log(JSON.stringify(summary));
if (report) await writeFile(report, JSON.stringify({ scope: local ? "local-export" : base.href, expectedOrigin, routes: paths.length, summary, results }, null, 2) + "\n");
process.exitCode = summary.FAIL ? 1 : 0;
