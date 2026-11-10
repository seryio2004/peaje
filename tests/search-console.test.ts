import assert from "node:assert/strict";
import test from "node:test";
import { analyzeSearchConsole, parseCsv } from "../scripts/search-console.mjs";

test("Search Console CSV preserves quoted queries, BOM, CRLF and missing zero-day metrics", () => {
  const rows = parseCsv('\uFEFFConsulta,Clics,Impresiones,CTR,Posición\r\n"juego, \"\"peaje\"\"",1,8,"12,5%","6,25"\r\n"dos\nlíneas",0,0,,');
  assert.equal(rows[0].Consulta, 'juego, "peaje"');
  assert.equal(rows[1].Consulta, "dos\nlíneas");
  assert.throws(() => parseCsv('a,b\n"sin cierre,b'));
  assert.throws(() => parseCsv('a,b\n1'));
});

test("GSC uses chart totals, separates dimensions and waits 60 days before another refresh", () => {
  const chart = parseCsv('Fecha,Clics,Impresiones,CTR,Posición\n2026-11-01,1,10,10%,4\n2026-11-02,0,0,,');
  const queries = parseCsv('Consultas principales,Clics,Impresiones,CTR,Posición\npeaje,0,3,0%,9');
  const pages = parseCsv('Páginas principales,Clics,Impresiones,CTR,Posición\nhttps://elpejae.com/reciente/,0,100,0%,8\nhttps://elpejae.com/antigua/,0,80,0%,5\nhttps://elpejae.com/desconocida/,0,50,0%,15\nhttps://elpejae.com/baja/,0,2,0%,16');
  const args = { chart, queries, pages, devices: [], asOf: "2026-11-10", refreshed: { "/reciente": "2026-11-01", "/antigua": "2026-09-11" } };
  const report = analyzeSearchConsole(args);
  assert.deepEqual(report.totals, { clicks: 1, impressions: 10, ctr: 10, position: 4 });
  assert.equal(report.opportunities.queriesAt5to15.length, 1);
  assert.equal(report.opportunities.pagesAt5to15.length, 3);
  assert.deepEqual(report.opportunities.nextThreePages.map((page: { key: string }) => page.key), ["https://elpejae.com/antigua/"]);
  assert.deepEqual(report.opportunities.lowCtrWith500Impressions, []);
  assert.equal("url" in report.queries[0], false);
  assert.throws(() => analyzeSearchConsole({ ...args, asOf: "2026-02-30" }));
});
