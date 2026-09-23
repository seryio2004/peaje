import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import GameWithAds from "../game-with-ads";

export const metadata = pageMetadata("/jugar");

export default function PlayPage() {
  return (
    <main className="play-page">
      <section className="game-stage" aria-label="Juego El Peaje">
        <GameWithAds />
      </section>
      <section className="post-game-guide" aria-labelledby="play-help-title">
        <div>
          <p className="content-kicker">Antes de otra partida</p>
          <h2 id="play-help-title">¿Quieres ajustar la experiencia?</h2>
        </div>
        <p>
          Consulta las <Link href="/como-jugar">reglas completas</Link>, compara
          los <Link href="/modos-de-juego">modos y dificultades</Link> o descubre <Link href="/juegos-de-beber">cómo adaptar El Peaje a una previa</Link> antes de
          elegir una nueva configuración.
        </p>
      </section>
    </main>
  );
}
