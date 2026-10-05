import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

/** Local preview only; Cloudflare deployment/headers must be checked separately. */
export async function serveExport(port = 0, directory = "out") {
  const root = resolve(directory);
  const types = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".webp": "image/webp", ".mp3": "audio/mpeg", ".svg": "image/svg+xml" };
  let redirects = [];
  try { redirects = (await readFile(resolve(root, "_redirects"), "utf8")).split("\n").filter(line => line.trim() && !line.startsWith("#")).map(line => line.trim().split(/\s+/)); } catch {}
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const redirect = redirects.find(([from]) => from === pathname);
      if (redirect) { response.writeHead(Number(redirect[2]) || 301, { Location: redirect[1] }); response.end(); return; }
      let file = resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
      try { if ((await stat(file)).isDirectory()) file = resolve(file, "index.html"); await stat(file); }
      catch { file = resolve(root, "404.html"); response.statusCode = 404; }
      const type = types[extname(file)] || "application/octet-stream";
      response.setHeader("Content-Type", type);
      const body = await readFile(file);
      response.setHeader("Vary", "Accept-Encoding");
      // A plain preview without compression exaggerates transfer costs in Lighthouse.
      // This models normal static hosting; it does not prove production settings.
      if (/gzip/.test(request.headers["accept-encoding"] || "") && /text\/|javascript|json|xml/.test(type)) {
        response.setHeader("Content-Encoding", "gzip");
        response.end(gzipSync(body));
      } else response.end(body);
    } catch { response.writeHead(500); response.end("Preview error"); }
  });
  await new Promise((resolveReady, reject) => { server.once("error", reject); server.listen(port, "127.0.0.1", resolveReady); });
  return { server, base: "http://127.0.0.1:" + server.address().port };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { base } = await serveExport(Number(process.argv[2] || 4173));
  console.log("Static preview: " + base);
}
