import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function inlineScriptHashes(html) {
  const hashes = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/i.test(match[1]) && match[2]) hashes.add("'sha256-" + createHash("sha256").update(match[2]).digest("base64") + "'");
  }
  return [...hashes];
}
export function documentPolicy(html, cloudflare = false) {
  return [
    "default-src 'self'",
    "script-src 'self' " + inlineScriptHashes(html).join(" ") + (cloudflare ? " https://static.cloudflareinsights.com" : ""),
    "script-src-attr 'none'",
    // The board uses React style attributes for movement and CSS variables.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "media-src 'self'",
    "connect-src 'self'" + (cloudflare ? " https://cloudflareinsights.com" : ""),
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join("; ");
}
export function securityHeaders(profile) {
  return "/*\n" + [
    "Content-Security-Policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
    "X-Frame-Options: DENY",
    "X-Content-Type-Options: nosniff",
    "Referrer-Policy: strict-origin-when-cross-origin",
    "Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Strict-Transport-Security: max-age=86400",
    ...(profile !== "production" ? ["X-Robots-Tag: noindex, nofollow", "Cache-Control: no-store"] : []),
  ].map(line => "  " + line + "\n").join("");
}
export function hardenExport(directory, profile, cloudflare = false) {
  let pages = 0;
  function visit(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) { visit(path); continue; }
      if (!entry.name.endsWith(".html")) continue;
      let html = readFileSync(path, "utf8");
      // Idempotent; hashes are computed from final inline script bytes.
      html = html.replace(/<meta data-peaje-csp="true"[^>]*>/g, "");
      const policy = documentPolicy(html, cloudflare).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      if (!html.includes("<head>")) throw new Error("Missing head in " + path);
      html = html.replace("<head>", '<head><meta data-peaje-csp="true" http-equiv="Content-Security-Policy" content="' + policy + '"/>');
      writeFileSync(path, html);
      pages++;
    }
  }
  visit(directory);
  if (!pages) throw new Error("No HTML to protect");
  // CSP meta supports per-document hashes without Pages' 2,000-character header limit.
  // frame-ancestors only works in an HTTP header, so it lives in _headers above.
  writeFileSync(join(directory, "_headers"), securityHeaders(profile));
  return pages;
}
