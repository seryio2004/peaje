import { siteConfig } from "./config";
import { hasConsent } from "./consent";
import { readStored, removeStored, writeStored } from "./storage";

export const ANALYTICS_SESSION_KEY = "peaje.analytics-session.v1";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
export const EVENT_NAMES = ["game_start", "game_end", "game_abandon", "game_repeat", "game_share"] as const;
export type EventName = typeof EVENT_NAMES[number];
export type EventProperties = {
  game_id?: string; previous_game_id?: string;
  mode_id?: string; player_mode_id?: string; difficulty_id?: string;
  question_id?: string; category_id?: string; route_index?: number;
  duration_ms?: number; failures?: number; tolls?: number; score?: number;
  end_reason?: string; reason?: "new_game" | "navigation" | "page_exit";
  source?: "setup" | "repeat"; method?: "native" | "clipboard";
  result?: "shared" | "copied"; session_game_number?: number;
};
export type AnalyticsEvent = {
  name: EventName; schema_version: 1; occurred_at: string;
  environment: typeof siteConfig.environment; session_id: string;
  ad_variant: "off" | "placeholder"; properties: EventProperties;
};
export type AnalyticsAdapter = (event: AnalyticsEvent) => void;
const adapters = new Set<AnalyticsAdapter>();
type Session = { id: string; lastActivity: number; games: number };
let memorySession: Session | null = null;
const PROPERTY_KEYS = [
  "game_id", "previous_game_id", "mode_id", "player_mode_id", "difficulty_id", "question_id", "category_id",
  "route_index", "duration_ms", "failures", "tolls", "score", "end_reason", "reason", "source", "method", "result", "session_game_number",
] as const;
function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const s = value as Partial<Session>;
  return typeof s.id === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(s.id) &&
    typeof s.lastActivity === "number" && Number.isFinite(s.lastActivity) &&
    typeof s.games === "number" && Number.isSafeInteger(s.games) && s.games >= 0;
}
export function clearAnalyticsSession(): void {
  memorySession = null;
  removeStored(ANALYTICS_SESSION_KEY, "session");
}
/** Future GA4/Zaraz adapters plug in here AFTER their own CMP checks. No replay queue. */
export function registerAnalyticsAdapter(adapter: AnalyticsAdapter): () => void {
  adapters.add(adapter);
  return () => { adapters.delete(adapter); };
}
export function trackEvent(name: EventName, properties: EventProperties = {}): boolean {
  if (typeof window === "undefined" || !siteConfig.analyticsEnabled || !hasConsent("analytics")) return false;
  if (!(EVENT_NAMES as readonly string[]).includes(name)) return false;
  const now = Date.now();
  const stored = memorySession ?? readStored(ANALYTICS_SESSION_KEY, isSession, "session");
  const session = stored && now >= stored.lastActivity && now - stored.lastActivity < SESSION_TIMEOUT_MS
    ? stored : { id: crypto.randomUUID(), lastActivity: now, games: 0 };
  session.lastActivity = now;
  if (name === "game_start") session.games += 1;
  memorySession = session;
  writeStored(ANALYTICS_SESSION_KEY, session, "session");
  // No arbitrary text, page URLs, query strings, names, emails or card contents.
  const clean: Record<string, string | number> = {};
  for (const key of PROPERTY_KEYS) {
    const value = properties[key];
    if (typeof value === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) clean[key] = value;
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) clean[key] = Math.round(value);
  }
  if (name === "game_start") clean.session_game_number = session.games;
  const event: AnalyticsEvent = {
    name, schema_version: 1, occurred_at: new Date(now).toISOString(), environment: siteConfig.environment,
    session_id: session.id, ad_variant: siteConfig.adsEnabled ? "placeholder" : "off", properties: clean,
  };
  if (siteConfig.analyticsDebug) console.debug("[peaje:analytics]", event);
  for (const adapter of adapters) {
    try { adapter(event); } catch { /* Metrics must never break a game. */ }
  }
  // Accepted locally; this does NOT claim delivery to a remote service.
  return true;
}
