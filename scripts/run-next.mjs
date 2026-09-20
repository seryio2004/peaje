import { hardenExport } from "./security.mjs";
import { validateSiteUrl } from "./site-environment.mjs";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { parseEnv } from "node:util";

const command = process.argv[2] || "build";
const profile = process.argv[3] || "production";
if (!["development", "staging", "production"].includes(profile) || !["dev", "build"].includes(command)) throw new Error("Entorno o comando inválido");
const defaults = JSON.parse(readFileSync(new URL("../config/environments/" + profile + ".json", import.meta.url)));
let local = {};
for (const file of [".env", ".env.local", ".env." + profile + ".local"]) {
  try { Object.assign(local, parseEnv(readFileSync(file, "utf8"))); } catch (error) { if (error.code !== "ENOENT") throw error; }
}
const env = { ...process.env, ...defaults, ...local };
// CI / shell values override versioned defaults and local files.
Object.assign(env, process.env);
env.NEXT_PUBLIC_APP_ENV = profile;
env.NODE_ENV = command === "dev" ? "development" : "production";
if (profile === "production") env.NEXT_PUBLIC_ANALYTICS_DEBUG = "false";
const basePath = env.PAGES_BASE_PATH || "";
env.NEXT_PUBLIC_SITE_URL = validateSiteUrl(env.NEXT_PUBLIC_SITE_URL || (basePath ? "https://seryio2004.github.io" + basePath : profile === "development" ? "http://localhost:3000" : "https://seryio2004.github.io/peaje"), profile, basePath || (!env.NEXT_PUBLIC_SITE_URL && profile !== "development" ? "/peaje" : ""));
for (const key of ["NEXT_PUBLIC_ANALYTICS_ENABLED", "NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ENABLED", "NEXT_PUBLIC_ADS_ENABLED", "NEXT_PUBLIC_ANALYTICS_DEBUG"]) {
  if (!["true", "false"].includes(env[key])) throw new Error(key + " debe ser true o false");
}
if (env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ENABLED === "true" && !/^[a-f0-9]{32}$/i.test(env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || "")) throw new Error("Falta un token válido de Cloudflare Web Analytics");
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", command, ...(command === "build" ? ["--webpack"] : [])], { env, stdio: "inherit" });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
if (command === "build") {
  const pages = hardenExport("out", profile, env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ENABLED === "true");
  console.log("Security: protected " + pages + " static HTML files.");
  const check = spawnSync(process.execPath, ["--import", "tsx", "scripts/verify-export.ts"], { env, stdio: "inherit" });
  if (check.status !== 0) process.exit(check.status || 1);
}
