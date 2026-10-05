"use client";
import type { Locale } from "@/lib/i18n";
import { gameText as t } from "@/lib/game-i18n";
export const OPEN_PRIVACY_SETTINGS = "peaje:open-privacy-settings";
export default function PrivacySettingsButton({ compact = false, locale = "es" }: { compact?: boolean; locale?: Locale }) {
  return <button type="button" className={compact ? "privacy-settings-trigger compact" : "privacy-settings-trigger"} aria-label={t(locale, "Preferencias de cookies")} title={t(locale, "Preferencias de cookies")} onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS))}>
    {compact ? <span aria-hidden="true">⚙</span> : t(locale, "Preferencias de cookies")}
  </button>;
}
