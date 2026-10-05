"use client";
import type { Locale } from "@/lib/i18n";
import { gameText as t } from "@/lib/game-i18n";
import { useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/config";
import { getConsentSnapshot, getServerConsentSnapshot, saveConsent, subscribeConsent, type Consent } from "@/lib/consent";
export function useConsent(): Consent | null {
  return JSON.parse(useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot)) as Consent | null;
}
export default function ConsentControls({ onSave, locale = "es" }: { onSave?: () => void; locale?: Locale }) {
  const consent = useConsent();
  const [selection, setSelection] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const analytics = siteConfig.analyticsEnabled && (selection ?? consent?.analytics ?? false);
  function choose(value: boolean) {
    saveConsent({ analytics: value, advertising: false }); setSelection(value); setSaved(true); onSave?.();
  }
  return <div className="consent-controls">
    <p>{t(locale, "El juego funciona igual si rechazas la analítica. Recordamos tu elección durante 180 días; puedes cambiarla o retirarla cuando quieras.")}</p>
    <label><input type="checkbox" checked disabled /><span><strong>{t(locale, "Necesarias")}</strong><small>{t(locale, "Guardar tus preferencias de privacidad en este dispositivo.")}</small></span></label>
    <label><input type="checkbox" checked={analytics} disabled={!siteConfig.analyticsEnabled} onChange={e => { setSelection(e.target.checked); setSaved(false); }} /><span><strong>{t(locale, "Analítica")}</strong><small>{t(locale, siteConfig.analyticsEnabled ? (siteConfig.cloudflareEnabled ? "Cloudflare Web Analytics: visitas y rendimiento sin cookies. Medición local de partidas: identificador de sesión, modo y resultados." : "Medición local de partidas: identificador de sesión, modo y resultados. Sin receptor remoto conectado.") : "Desactivada en esta versión del sitio. No se recoge consentimiento anticipado.")}</small></span></label>
    <p><strong>{t(locale, "Publicidad no activa.")}</strong> {t(locale, "No se cargan anuncios ni se solicita permiso para futuros proveedores.")}</p>
    <div className="consent-actions">
      <button type="button" onClick={() => choose(false)}>{t(locale, "Rechazar opcionales")}</button>
      <button type="button" onClick={() => choose(analytics)}>{t(locale, "Guardar selección")}</button>
      {siteConfig.analyticsEnabled ? <button type="button" onClick={() => choose(true)}>{t(locale, "Aceptar opcionales")}</button> : null}
    </div>
    <small>{t(locale, "Al retirar el permiso de una analítica ya cargada, la página se recarga para detenerla y la partida abierta se pierde.")}</small>
    <p role="status">{saved ? t(locale, "Preferencias aplicadas.") : ""}</p>
  </div>;
}
