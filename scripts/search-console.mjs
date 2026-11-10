import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

// Search Console quotes cells containing commas, quotes and line breaks.
export function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (c === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && input[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = []; cell = "";
    } else cell += c;
  }
  if (quoted) throw new Error("CSV con comillas sin cerrar");
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  const [headers, ...values] = rows;
  if (!headers) throw new Error("CSV vacío");
  return values.map(values => {
    if (values.length !== headers.length) throw new Error("CSV con columnas incompletas");
    return Object.fromEntries(headers.map((key, i) => [key, values[i]]));
  });
}

function number(value) {
  if (value === "") return null;
  if (value === undefined) throw new Error("Falta una columna de métricas");
  const result = Number(value.replace(/[%\s\u00a0]/g, "").replace(",", "."));
  if (!Number.isFinite(result) || result < 0) throw new Error("Métrica inválida: " + value);
  return result;
}
export function metrics(row) {
  const clicks = number(row.Clics), impressions = number(row.Impresiones);
  if (clicks === null || impressions === null) throw new Error("Faltan clics o impresiones");
  return { key: Object.values(row)[0], clicks, impressions,
    ctr: impressions ? clicks / impressions * 100 : null, position: number(row["Posición"]) };
}

export function analyzeSearchConsole({ chart, queries, pages, devices, refreshed = {}, asOf }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || !Number.isFinite(Date.parse(asOf)) || new Date(asOf).toISOString().slice(0, 10) !== asOf) throw new Error("Fecha inválida");
  const days = chart.map(metrics).sort((a, b) => a.key.localeCompare(b.key));
  if (!days.length) throw new Error("El gráfico no contiene días");
  const clicks = days.reduce((sum, day) => sum + day.clicks, 0);
  const impressions = days.reduce((sum, day) => sum + day.impressions, 0);
  const queryMetrics = queries.map(metrics).sort((a, b) => b.impressions - a.impressions);
  const pageMetrics = pages.map(metrics).sort((a, b) => b.impressions - a.impressions).map(page => {
    const path = new URL(page.key).pathname.replace(/\/$/, "") || "/";
    const lastEdited = refreshed[path] || null;
    const age = lastEdited ? (Date.parse(asOf) - Date.parse(lastEdited)) / 86400000 : null;
    return { ...page, lastEdited, cooldown: age !== null && age < 60 };
  });
  const nearPageOne = row => row.position !== null && row.position >= 5 && row.position <= 15;
  return {
    asOf, period: { start: days[0].key, end: days.at(-1).key, days: days.length },
    totals: { clicks, impressions, ctr: impressions ? clicks / impressions * 100 : null,
      position: impressions ? days.reduce((sum, day) => sum + (day.position || 0) * day.impressions, 0) / impressions : null },
    queries: queryMetrics, pages: pageMetrics, devices: devices.map(metrics),
    opportunities: {
      queriesAt5to15: queryMetrics.filter(nearPageOne),
      pagesAt5to15: pageMetrics.filter(nearPageOne),
      nextThreePages: pageMetrics.filter(page => nearPageOne(page) && page.lastEdited && !page.cooldown).slice(0, 3),
      lowCtrWith500Impressions: pageMetrics.filter(page => page.impressions >= 500 && page.ctr < 1),
    },
    limitations: [
      "Las consultas y páginas son dimensiones independientes: no permiten asignar una consulta a una URL ni demostrar canibalización.",
      "Las consultas anonimizadas pueden faltar; sus totales y los agregados por página no sustituyen al gráfico.",
      "Las impresiones son del sitio, no volúmenes mensuales de búsqueda. Una muestra pequeña no demuestra un problema de CTR.",
      "La posición global se aproxima ponderando las medias diarias redondeadas por sus impresiones.",
      "El cooldown usa el registro de cambios SEO y, como aproximación, el último commit de la página. No demuestra cuándo Google la rastreó.",
      "Sin exportación anterior comparable no se pueden calcular tendencias ni atribuir mejoras a un cambio.",
    ],
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const dateIndex = args.indexOf("--as-of");
  const asOf = dateIndex >= 0 ? args[dateIndex + 1] : new Date().toISOString().slice(0, 10);
  if (dateIndex >= 0) args.splice(dateIndex, 2);
  if (args.length > 1 || args.some(arg => arg.startsWith("--"))) throw new Error("Uso: npm run seo:report -- [carpeta] [--as-of YYYY-MM-DD]");
  const exports = readdirSync(".", { withFileTypes: true }).filter(entry => entry.isDirectory() && entry.name.includes("Performance-on-Search"));
  const directory = args[0] || (exports.length === 1 ? exports[0].name : null);
  if (!directory) throw new Error("Indica la carpeta de exportación de Search Console");
  const read = name => parseCsv(readFileSync(resolve(directory, name + ".csv"), "utf8"));
  const pages = read("Páginas");
  const refreshed = {};
  for (const row of pages) {
    const path = new URL(Object.values(row)[0]).pathname.replace(/\/$/, "") || "/";
    const foreign = path.match(/^\/(en|it|de|fr|pt)(\/[^/]+)?$/);
    if (path !== "/" && !/^\/[a-z-]+$/.test(path) && !foreign) continue;
    const files = foreign
      ? [foreign[2] ? "app/[lang]/[slug]/page.tsx" : "app/[lang]/page.tsx", "app/[lang]/localized-content.tsx", `lib/translations/${foreign[1]}.ts`]
      : [path === "/" ? "app/(es)/page.tsx" : `app/(es)${path}/page.tsx`];
    try {
      const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
      if (date) refreshed[path] = date;
    } catch { /* An unpacked source archive may have no Git history. */ }
  }
  const recorded = JSON.parse(readFileSync(new URL("../config/seo-refreshes.json", import.meta.url), "utf8"));
  for (const [path, date] of Object.entries(recorded)) if (!refreshed[path] || date > refreshed[path]) refreshed[path] = date;
  console.log(JSON.stringify(analyzeSearchConsole({ chart: read("Gráfico"), queries: read("Consultas"), pages, devices: read("Dispositivos"), refreshed, asOf }), null, 2));
}
