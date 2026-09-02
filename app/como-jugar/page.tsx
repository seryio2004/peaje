import type { Metadata } from "next";
import Link from "next/link";
import { RULES } from "../../lib/site-content";
import AdPlacement from "../ad-placement";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Cómo jugar",
  description:
    "Reglas completas de El Peaje: cómo predecir las cartas, avanzar por la ruta, resolver peajes y terminar una partida.",
};

export default function RulesPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Guía completa" title="Cómo jugar a El Peaje">
          <p>
            El objetivo es superar una ruta de predicciones sobre una baraja
            francesa. Los aciertos te acercan al final; los fallos te hacen
            retroceder y pueden obligarte a cruzar un peaje.
          </p>
          <Link className="primary-button" href="/jugar">Empezar una partida</Link>
        </PageHero>

        <section className="content-section" aria-labelledby="rules-title">
          <div className="content-heading">
            <p className="content-kicker">Paso a paso</p>
            <h2 id="rules-title">Las reglas esenciales</h2>
          </div>
          <ol className="rules-grid">
            {RULES.map((rule) => (
              <li key={rule.number}>
                <span>{rule.number}</span>
                <div><h3>{rule.title}</h3><p>{rule.text}</p></div>
              </li>
            ))}
          </ol>
          <p className="rules-note">
            <strong>Importante:</strong> la web mezcla 52 cartas y no repite
            ninguna dentro de la misma partida. En mayor o menor, el as es alto
            y un valor idéntico cuenta como fallo.
          </p>
        </section>

        <AdPlacement position="after-rules" />

        <section className="content-section editorial-grid" aria-labelledby="round-title">
          <div className="content-heading">
            <p className="content-kicker">Ejemplo de turno</p>
            <h2 id="round-title">Qué ocurre al responder</h2>
          </div>
          <div className="content-prose">
            <article><h3>1. Elige una respuesta</h3><p>Observa la carta de referencia y selecciona una de las opciones disponibles para la posición actual.</p></article>
            <article><h3>2. Revela la carta</h3><p>En solitario, la web comprueba la predicción. Con dos jugadores, la otra persona revela y valida el resultado.</p></article>
            <article><h3>3. Actualiza la ruta</h3><p>Un acierto hace avanzar. Un fallo suma al marcador y hace retroceder hasta la posición anterior.</p></article>
          </div>
        </section>

        <section className="responsible-section">
          <p className="content-kicker">Juego responsable</p>
          <h2>Define un peaje seguro antes de empezar.</h2>
          <p>
            El juego no exige alcohol. Utiliza puntos, agua, preguntas o retos
            breves adecuados para todas las personas del grupo.
          </p>
        </section>
      </div>
    </main>
  );
}
