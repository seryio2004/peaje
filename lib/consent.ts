import { siteConfig } from "./config";
import { readStored, writeStored, removeStored } from "./storage";

export const CONSENT_KEY = "peaje.consent.v2";
export const CONSENT_VERSION = 2;
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_CHANGED = "peaje:consent-changed";
export type Consent = {
  version: 2;
  policy: string;
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  updatedAt: number;
};
export function getConsentPolicy(): string {
  return "2026-09-08:" + (siteConfig.analyticsEnabled ? siteConfig.cloudflareEnabled ? "events-cloudflare" : "events" : "essential");
}
export function isConsent(value: unknown): value is Consent {
  if (!value || typeof value !== "object") return false;
  const c = value as Partial<Consent>;
  return c.version === CONSENT_VERSION && c.policy === getConsentPolicy() && c.necessary === true &&
    typeof c.analytics === "boolean" && c.advertising === false &&
    typeof c.updatedAt === "number" && Number.isFinite(c.updatedAt) &&
    c.updatedAt <= Date.now() && Date.now() - c.updatedAt < CONSENT_MAX_AGE_MS;
}
let memoryConsent: Consent | null = null;
let snapshot = "";
export function getConsent(): Consent | null {
  const stored = readStored(CONSENT_KEY, isConsent);
  return isConsent(memoryConsent) ? memoryConsent : stored;
}
export function getConsentSnapshot(): string {
  const next = JSON.stringify(getConsent());
  if (snapshot !== next) snapshot = next;
  return snapshot;
}
export const getServerConsentSnapshot = () => "null";
export function hasConsent(purpose: "analytics" | "advertising"): boolean {
  return getConsent()?.[purpose] === true;
}
export function saveConsent(choices: Pick<Consent, "analytics" | "advertising">): Consent {
  const consent: Consent = { version: 2, policy: getConsentPolicy(), necessary: true, analytics: siteConfig.analyticsEnabled && choices.analytics === true,
    advertising: false, updatedAt: Date.now() };
  memoryConsent = consent;
  writeStored(CONSENT_KEY, consent);
  removeStored("peaje.consent.v1");
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CONSENT_CHANGED));
  return consent;
}
export function subscribeConsent(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { memoryConsent = null; listener(); }
  };
  window.addEventListener(CONSENT_CHANGED, listener);
  window.addEventListener("storage", onStorage);
  // Re-evaluate expiry when a suspended tab becomes visible.
  window.addEventListener("focus", listener);
  return () => {
    window.removeEventListener(CONSENT_CHANGED, listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", listener);
  };
}
