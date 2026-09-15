"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearAnalyticsSession } from "@/lib/analytics";
import { CONSENT_CHANGED, CONSENT_MAX_AGE_MS } from "@/lib/consent";
import { canLoadCloudflareAnalytics, siteConfig } from "@/lib/config";
import ConsentControls, { useConsent } from "./consent-controls";
import { OPEN_PRIVACY_SETTINGS } from "./privacy-settings-button";

export default function PrivacyRuntime() {
  const consent = useConsent();
  const pathname = usePathname();
  const loaded = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const allowed = consent?.analytics === true;
  const isCookiesPage = pathname.replace(/\/$/, "").endsWith("/cookies");
  const open = manuallyOpened || (!isCookiesPage && !dismissed);
  function showDialog() {
    setDismissed(false);
    setManuallyOpened(true);
  }
  function closeDialog() {
    setDismissed(true);
    setManuallyOpened(false);
  }
  useEffect(() => {
    window.addEventListener(OPEN_PRIVACY_SETTINGS, showDialog);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS, showDialog);
  }, []);
  useEffect(() => {
    if (open && dialog.current && !dialog.current.open) dialog.current.showModal();
    if (!open && dialog.current?.open) dialog.current.close();
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
    <dialog className="privacy-dialog" ref={dialog} aria-labelledby="privacy-dialog-title" onClose={closeDialog}>
      <div className="privacy-dialog-heading"><h2 id="privacy-dialog-title">Preferencias de cookies</h2><button type="button" className="privacy-settings-trigger" onClick={closeDialog}>Cerrar sin cambios</button></div>
      {open ? <ConsentControls onSave={closeDialog} /> : null}
      <div className="consent-links"><Link href="/cookies" onClick={closeDialog}>Política de cookies</Link><Link href="/privacidad" onClick={closeDialog}>Privacidad</Link></div>
    </dialog>
  </>;
}
