import type { Metadata } from "next";
import Link from "next/link";
import Game from "../game";

export const metadata: Metadata = {
  title: "Jugar",
  description:
    "Juega gratis a El Peaje con una baraja de 52 cartas, cinco modos y tres dificultades para uno o dos jugadores.",
};

export default function PlayPage() {
  return (
    <main className="play-page">
      <section className="game-stage" aria-label="Juego El Peaje">
        <Game />
      </section>
      <section className="post-game-guide" aria-labelledby="play-help-title">
        <div>
          <p className="content-kicker">Antes de otra partida</p>
          <h2 id="play-help-title">¿Quieres ajustar la experiencia?</h2>
        </div>
        <p>
          Consulta las <Link href="/como-jugar">reglas completas</Link> o compara
          los <Link href="/modos-de-juego">modos y dificultades</Link> antes de
          elegir una nueva configuración.
        </p>
      </section>
    </main>
  );
}
