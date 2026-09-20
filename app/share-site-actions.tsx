"use client";
import { useState } from "react";
export default function ShareSiteActions({ url }: { url: string }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function copy() {
    if (busy) return;
    setBusy(true);
    try { await navigator.clipboard.writeText(url); setStatus("Enlace copiado."); }
    catch { setStatus("No se pudo copiar. Puedes seleccionar el enlace que aparece arriba."); }
    finally { setBusy(false); }
  }
  async function share() {
    if (busy) return;
    if (!navigator.share) { await copy(); return; }
    setBusy(true);
    try { await navigator.share({ title: "El Peaje", text: "Una partida de cartas, una ruta y un peaje. ¿Jugamos?", url }); setStatus("Enlace compartido."); }
    catch (error) { setStatus(error instanceof Error && error.name === "AbortError" ? "" : "No se pudo compartir. Prueba a copiar el enlace."); }
    finally { setBusy(false); }
  }
  return <div><div className="share-site-actions">
    <button className="primary-button" disabled={busy} onClick={share}>Compartir página</button>
    <button className="secondary-button" disabled={busy} onClick={copy}>Copiar enlace</button>
  </div><p className="share-status" role="status">{status}</p></div>;
}
