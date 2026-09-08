"use client";

import { useState } from "react";
import type { GameState } from "@/lib/game";
import { siteConfig } from "@/lib/config";

export default function ShareGame({ game, onShared }: {
  game: GameState; onShared: (method: "native" | "clipboard") => void;
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function share() {
    if (busy) return;
    setBusy(true);
    setStatus("");
    const data = { title: "El Peaje", text: game.endReason === "route-completed"
      ? `He cruzado El Peaje con ${game.failures} fallos. ¿Te atreves a intentarlo?`
      : "¿Te atreves a cruzar El Peaje?", url: `${siteConfig.siteUrl}/jugar/` };
    try {
      if (navigator.share) {
        await navigator.share(data);
        onShared("native");
        setStatus("Compartido.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        onShared("clipboard");
        setStatus("Enlace copiado.");
      } else {
        setStatus("Puedes copiar la dirección desde la barra del navegador.");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setStatus("No se ha podido compartir. Inténtalo de nuevo.");
    } finally { setBusy(false); }
  }
  return (
    <div className="share-game">
      <button className="text-button" onClick={share} disabled={busy}>Compartir resultado</button>
      <span role="status">{status}</span>
    </div>
  );
}
