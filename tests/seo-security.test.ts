import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { documentPolicy, inlineScriptHashes, securityHeaders } from "../scripts/security.mjs";
import { validateSiteUrl } from "../scripts/site-environment.mjs";
import { serializeJsonLd, pageMetadata } from "../lib/seo";
import { SITE_PAGES } from "../lib/site-routes";

test("CSP permits only exact inline contents and configured analytics origins", () => {
 const script = 'self.__next_f.push([1,"test"]);';
 const html = '<head><script src="/app.js"></script><script>' + script + '</script></head>';
 const expected = "'sha256-" + createHash("sha256").update(script).digest("base64") + "'";
 assert.deepEqual(inlineScriptHashes(html), [expected]);
 assert.notDeepEqual(inlineScriptHashes(html.replace("test", "tampered")), [expected]);
 const policy = documentPolicy(html);
 assert.ok(policy.includes(expected)); assert.ok(!policy.includes("cloudflareinsights"));
 assert.ok(!/script-src [^;]*unsafe-inline/.test(policy)); assert.ok(!policy.includes("unsafe-eval"));
 assert.ok(documentPolicy(html, true).includes("connect-src 'self' https://cloudflareinsights.com"));
 assert.ok(securityHeaders("staging").includes("noindex")); assert.ok(!securityHeaders("production").includes("noindex"));
});
test("production URLs use the one canonical domain", () => {
 for (const url of ["javascript:alert(1)", "https://user:pass@elpejae.com", "https://elpejae.com?x=1", "https://elpejae.com/#a", "http://elpejae.com", "https://localhost", "https://elpeaje.com", "https://www.elpejae.com", "https://elpejae.com:8443", "https://elpejae.com/wrong"]) assert.throws(()=>validateSiteUrl(url,"production",""));
 assert.equal(validateSiteUrl("https://elpejae.com/","production",""),"https://elpejae.com");
 assert.throws(()=>validateSiteUrl("https://elpejae.com/peaje/","production","/peaje"));
 assert.equal(validateSiteUrl("http://localhost:3000","development",""),"http://localhost:3000");
});
test("JSON-LD cannot escape its script element and each route has its own canonical", () => {
 const serialized = serializeJsonLd({name:'</script><script>alert(1)</script>'});
 assert.ok(!serialized.includes("<")); assert.equal(JSON.parse(serialized).name,'</script><script>alert(1)</script>');
 const canonicals = Object.keys(SITE_PAGES).map(path => pageMetadata(path as keyof typeof SITE_PAGES).alternates?.canonical);
 assert.equal(new Set(canonicals).size, Object.keys(SITE_PAGES).length);
});
