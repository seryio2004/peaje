import type { Metadata } from "next";
import Link from "next/link";
import { DIFFICULTIES, GAME_MODES } from "../../lib/site-content";
import AdPlacement from "../ad-placement";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Modos de juego y dificultades",
  description:
    "Compara los cinco modos de El Peaje y elige entre dificultad fácil, media o difícil con rutas y peajes adaptados.",
};

export default function ModesPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Configura la partida" title="Modos de juego y dificultades">
          <p>
            Combina una variante con la dificultad que mejor encaje con el tiempo,
            la experiencia y el número de jugadores.
          </p>
          <Link className="primary-button" href="/jugar">Elegir configuración</Link>
        </PageHero>

        <section className="content-section" aria-labelledby="modes-title">
          <div className="content-heading">
            <p className="content-kicker">Cinco formas de jugar</p>
            <h2 id="modes-title">Elige el ritmo y el objetivo</h2>
          </div>
          <div className="variants-grid mode-detail-grid">
            {GAME_MODES.map((mode) => (
              <article key={mode.number}>
                <span>{mode.number} · {mode.summary}</span>
                <h3>{mode.title}</h3>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
        </section>

        <AdPlacement position="after-modes" />

        <section className="content-section" aria-labelledby="difficulty-title">
          <div className="content-heading">
            <p className="content-kicker">Longitud de la ruta</p>
            <h2 id="difficulty-title">Tres dificultades reales</h2>
            <p>Cada nivel modifica la baraja visible, las preguntas y el número de peajes del recorrido.</p>
          </div>
          <div className="difficulty-guide difficulty-guide-standalone">
            <div className="difficulty-guide-heading"><h3>Comparativa rápida</h3></div>
            <div className="difficulty-guide-grid">
              {DIFFICULTIES.map((difficulty) => (
                <article key={difficulty.title}>
                  <strong>{difficulty.title}</strong>
                  <span>{difficulty.detail}</span>
                  <p>{difficulty.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="choice-guide" aria-labelledby="choice-title">
          <h2 id="choice-title">¿Cuál conviene elegir?</h2>
          <p><strong>Para aprender:</strong> clásico y fácil.</p>
          <p><strong>Para competir:</strong> por puntos y dificultad media.</p>
          <p><strong>Para grupos experimentados:</strong> cooperativo o turnos rápidos en difícil.</p>
        </section>
      </div>
    </main>
  );
}
