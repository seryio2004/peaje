import assert from "node:assert/strict";
import test from "node:test";
import jsQR from "jsqr";
import { createShareQr } from "../lib/share-qr";
import { saveConsent, isConsent } from "../lib/consent";
import { siteConfig } from "../lib/config";

test("rendered QR path decodes to the exact public URL, including the base path", () => {
 for (const url of ["https://seryio2004.github.io/peaje/", "https://elpeaje.example/"]) {
  const qr = createShareQr(url), scale = 6, width = qr.size * scale;
  const pixels = new Uint8ClampedArray(width * width * 4).fill(255);
  for (const cell of qr.path.matchAll(/M(\d+),(\d+)h1v1h-1z/g)) {
   for (let y = 0; y < scale; y++) for (let x = 0; x < scale; x++) {
    const offset = ((Number(cell[2]) * scale + y) * width + Number(cell[1]) * scale + x) * 4;
    pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = 0;
   }
  }
  assert.equal(jsQR(pixels, width, width)?.data, url);
 }
 assert.throws(() => createShareQr("javascript:alert(1)"));
});
test("consent never preauthorizes ads or disabled metrics and expires when providers change", () => {
 const original = {...siteConfig};
 try {
  siteConfig.analyticsEnabled = false;
  const disabled = saveConsent({analytics:true,advertising:true});
  assert.equal(disabled.analytics,false); assert.equal(disabled.advertising,false);
  siteConfig.analyticsEnabled = true; siteConfig.cloudflareEnabled = false;
  assert.equal(isConsent(disabled),false);
  const events = saveConsent({analytics:true,advertising:true});
  assert.equal(events.analytics,true); assert.equal(events.advertising,false);
  siteConfig.cloudflareEnabled = true;
  assert.equal(isConsent(events),false);
 } finally { Object.assign(siteConfig,original); }
});
