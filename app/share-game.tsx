"use client";

import type { Locale } from "@/lib/i18n";
import { localPath } from "@/lib/i18n";
import { gameText as t, gameFormat as fmt } from "@/lib/game-i18n";
import { useState } from "react";
import type { GameState } from "@/lib/game";
import { siteConfig } from "@/lib/config";

export default function ShareGame({ locale = "es", game, onShared }: {
  locale?: Locale; game: GameState; onShared: (method: "native" | "clipboard") => void;
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function share() {
    if (busy) return;
    setBusy(true);
    setStatus("");
    const data = { title: "El Peaje", text: game.endReason === "route-completed"
      ? fmt(locale, "He cruzado El Peaje con {n} fallos. ¿Te atreves a intentarlo?", { n: game.failures })
      : t(locale, "¿Te atreves a cruzar El Peaje?"), url: siteConfig.siteUrl + localPath(locale, "play") };
    try {
      if (navigator.share) {
        await navigator.share(data);
        onShared("native");
        setStatus(t(locale, "Compartido."));
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        onShared("clipboard");
        setStatus(t(locale, "Enlace copiado."));
      } else {
        setStatus(t(locale, "Puedes copiar la dirección desde la barra del navegador."));
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setStatus(t(locale, "No se ha podido compartir. Inténtalo de nuevo."));
    } finally { setBusy(false); }
  }
  return (
    <div className="share-game">
      <button className="text-button" onClick={share} disabled={busy}>{t(locale, "Compartir resultado")}</button>
      <span role="status">{status}</span>
    </div>
  );
}
