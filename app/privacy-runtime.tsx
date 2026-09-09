"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearAnalyticsSession } from "@/lib/analytics";
import { CONSENT_CHANGED, CONSENT_MAX_AGE_MS, saveConsent } from "@/lib/consent";
import { canLoadCloudflareAnalytics, siteConfig } from "@/lib/config";
import ConsentControls, { useConsent } from "./consent-controls";
import { OPEN_PRIVACY_SETTINGS } from "./privacy-settings-button";

export default function PrivacyRuntime() {
  const consent = useConsent();
  const pathname = usePathname();
  const loaded = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const allowed = consent?.analytics === true;
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_PRIVACY_SETTINGS, show);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS, show);
  }, []);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    if (!consent) return;
    const expiresAt = consent.updatedAt + CONSENT_MAX_AGE_MS;
    let timer: ReturnType<typeof setTimeout>;
    function schedule() {
      timer = setTimeout(() => {
        window.dispatchEvent(new Event(CONSENT_CHANGED));
        if (Date.now() < expiresAt) schedule();
      }, Math.min(2147483647, Math.max(1, expiresAt - Date.now() + 1)));
    }
    schedule();
    return () => clearTimeout(timer);
  }, [consent]);
  useEffect(() => {
    if (!allowed) {
      clearAnalyticsSession();
      // The beacon has no supported teardown API; discard the document and its listeners.
      if (loaded.current) window.location.reload();
      return;
    }
    if (!canLoadCloudflareAnalytics(allowed) || loaded.current) return;
    const existing = document.getElementById("peaje-cloudflare-analytics");
    if (existing) { loaded.current = true; return; }
    const script = document.createElement("script");
    script.id = "peaje-cloudflare-analytics";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.defer = true;
    script.dataset.cfBeacon = JSON.stringify({ token: siteConfig.cloudflareToken, spa: true });
    script.onerror = () => { script.remove(); loaded.current = false; };
    loaded.current = true;
    document.body.appendChild(script);
  }, [allowed]);
  return <>
    {!consent && siteConfig.analyticsEnabled && !open && !pathname.replace(/\/$/, "").endsWith("/cookies") ? <aside className="consent-notice" aria-labelledby="consent-title">
      <h2 id="consent-title">Cookies y privacidad</h2>
      <p>El Peaje guarda tu elección de privacidad. Si aceptas, medimos el uso de las partidas{siteConfig.cloudflareEnabled ? " y usamos Cloudflare Web Analytics para conocer visitas y rendimiento" : ""}. Puedes rechazar y seguir jugando. No hay publicidad activa.</p>
      <div className="consent-actions">
        <button type="button" onClick={() => saveConsent({ analytics: false, advertising: false })}>Rechazar opcionales</button>
        <button type="button" onClick={() => setOpen(true)}>Configurar</button>
        <button type="button" onClick={() => saveConsent({ analytics: true, advertising: false })}>Aceptar opcionales</button>
      </div>
      <p>Tu elección dura hasta 180 días. Puedes retirarla desde «Preferencias de cookies».</p>
      <div className="consent-links"><Link href="/cookies">Política de cookies</Link><Link href="/privacidad">Privacidad</Link><Link href="/aviso-legal">Titular del sitio</Link></div>
    </aside> : null}
    <dialog className="privacy-dialog" ref={dialog} aria-labelledby="privacy-dialog-title" onClose={() => setOpen(false)}>
      <div className="privacy-dialog-heading"><h2 id="privacy-dialog-title">Preferencias de cookies</h2><button type="button" className="privacy-settings-trigger" onClick={() => setOpen(false)}>Cerrar sin cambios</button></div>
      {open ? <ConsentControls onSave={() => setOpen(false)} /> : null}
      <div className="consent-links"><Link href="/cookies" onClick={() => setOpen(false)}>Política de cookies</Link><Link href="/privacidad" onClick={() => setOpen(false)}>Privacidad</Link></div>
    </dialog>
  </>;
}
