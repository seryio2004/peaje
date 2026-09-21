import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { SITE_PAGES, type SitePath } from "../lib/site-routes";
import { inlineScriptHashes } from "./security.mjs";

const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const read = (path: string) => readFileSync(path, "utf8");
const home = read("out/index.html");
const attribute = (html: string, tag: string, selector: string, field: string) => {
 const matches = [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "g"))].filter(match => match[0].includes(selector));
 assert.equal(matches.length, 1, "Expected one " + selector);
 const value = matches[0][0].match(new RegExp(field + '="([^"]*)"'));
 assert.ok(value, selector + " missing " + field);
 return decode(value[1]);
};
const canonicalRoot = attribute(home, "link", 'rel="canonical"', "href");
if (process.env.NEXT_PUBLIC_SITE_URL) assert.equal(canonicalRoot, process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") + "/");
const production = !/<meta name="robots" content="[^"]*noindex/.test(home);
if (production) assert.equal(canonicalRoot, "https://elpejae.com/");
const titles = new Set<string>();
const pages = Object.keys(SITE_PAGES) as SitePath[];
for (const path of pages) {
 const file = "out" + (path === "/" ? "" : path) + "/index.html";
 assert.ok(existsSync(file), "Missing export for " + path);
 const html = read(file);
 const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
 assert.ok(title); assert.ok(!titles.has(title), "Repeated title: " + title); titles.add(title);
 assert.equal((html.match(/<h1\b/g) || []).length, 1, path + " must contain one primary heading");
 assert.ok(attribute(html, "meta", 'name="description"', "content").length > 0);
 const expected = canonicalRoot + (path === "/" ? "" : path.slice(1) + "/");
 assert.equal(attribute(html, "link", 'rel="canonical"', "href"), expected);
 assert.equal(attribute(html, "meta", 'property="og:url"', "content"), expected);
 assert.equal(attribute(html, "meta", 'property="og:image"', "content"), canonicalRoot + "share-image.png");
 assert.equal(attribute(html, "meta", 'name="twitter:image"', "content"), canonicalRoot + "share-image.png");
 assert.equal(attribute(html, "meta", 'name="twitter:card"', "content"), "summary_large_image");
 if (production) assert.ok(!/https?:\/\/(?:www\.)?(?:elpeaje\.com|seryio2004\.github\.io)/i.test(html), path + " contains a legacy domain");
 const policy = attribute(html, "meta", 'data-peaje-csp="true"', "content");
 for (const hash of inlineScriptHashes(html)) assert.ok(policy.includes(hash), "Inline script hash missing on " + path);
 assert.ok(!/script-src [^;]*'unsafe-(inline|eval)'/.test(policy));
 assert.ok(html.indexOf('data-peaje-csp="true"') < html.indexOf("<script"));
 for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
   const structuredData = JSON.parse(script[1]);
   if (production) for (const node of structuredData["@graph"] || []) {
     assert.ok(node["@id"]?.startsWith(canonicalRoot), path + " has an off-domain structured-data ID");
     assert.ok(node.url?.startsWith(canonicalRoot), path + " has an off-domain structured-data URL");
   }
 }
 for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
   const href = decode(match[1]);
   if (!href.startsWith("/") || href.startsWith("//")) continue;
   const base = new URL(canonicalRoot).pathname.replace(/\/$/, "");
   const target = href.split(/[?#]/)[0].replace(new RegExp("^" + base + "(?=/|$)"), "").replace(/\/$/, "") || "/";
   assert.ok(target in SITE_PAGES || existsSync("out" + target), path + " broken link: " + href);
 }
}
for (const entry of readdirSync("app", { withFileTypes: true })) {
 if (entry.isDirectory() && existsSync("app/" + entry.name + "/page.tsx")) assert.ok("/" + entry.name in SITE_PAGES, "Register new route: " + entry.name);
}
const sitemap = read("out/sitemap.xml");
assert.equal((sitemap.match(/<loc>/g) || []).length, production ? pages.length : 0);
for (const path of pages) if (production) assert.ok(sitemap.includes(canonicalRoot + (path === "/" ? "" : path.slice(1) + "/")));
if (production) {
 for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) assert.equal(new URL(url).origin, "https://elpejae.com");
 assert.ok(read("out/robots.txt").includes("Sitemap: https://elpejae.com/sitemap.xml"));
 assert.ok(read("out/compartir/index.html").includes("https://elpejae.com/"));
}
const headers = read("out/_headers");
assert.ok(headers.includes("frame-ancestors 'none'"));
assert.equal(headers.includes("X-Robots-Tag: noindex"), !production);
assert.ok(read("out/404.html").includes("noindex"));
assert.ok(read("out/robots.txt").includes("Allow: /"));
assert.ok(existsSync("out/share-image.png"));
console.log("SEO/security: " + pages.length + " routes, canonical URLs, links, sitemap, metadata and CSP verified.");
