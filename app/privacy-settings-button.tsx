"use client";
export const OPEN_PRIVACY_SETTINGS = "peaje:open-privacy-settings";
export default function PrivacySettingsButton({ compact = false }: { compact?: boolean }) {
  return <button type="button" className={compact ? "privacy-settings-trigger compact" : "privacy-settings-trigger"} aria-label="Preferencias de cookies" title="Preferencias de cookies" onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS))}>
    {compact ? <span aria-hidden="true">⚙</span> : "Preferencias de cookies"}
  </button>;
}
