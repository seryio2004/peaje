import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { RULES } from "../../../lib/site-content";
import AdPlacement from "../../ad-placement";
import PageHero from "../../page-hero";

export const metadata = pageMetadata("/como-jugar");

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
          <Link prefetch={false} className="primary-button" href="/jugar">Empezar una partida</Link>
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
            <article><h3>2. Revela la carta</h3><p>En solitario, la web comprueba la predicción. En el modo normal de dos jugadores, la otra persona revela y valida el resultado; en turnos rápidos, la web lo valida automáticamente.</p></article>
            <article><h3>3. Actualiza la ruta</h3><p>Un acierto hace avanzar. Un fallo suma al marcador y hace retroceder hasta la posición anterior.</p></article>
          </div>
        </section>

        <section className="content-section" aria-labelledby="quick-turns-title">
          <div className="content-heading">
            <p className="content-kicker">Dos rutas, un turno</p>
            <h2 id="quick-turns-title">Turnos rápidos</h2>
          </div>
          <div className="content-prose">
            <p>Cada persona juega su propia partida, con sus cartas, posición, fallos y peajes. La web verifica la respuesta al pulsar una opción.</p>
            <p>Mientras aciertas, sigues con tu ruta. Al fallar, tu estado queda guardado —incluida la carta revelada— y el turno pasa a la otra persona. Cuando vuelva tu turno, retomarás exactamente esa partida.</p>
          </div>
        </section>

        <section className="content-section" aria-labelledby="examples-title">
          <h2 id="examples-title">Tres situaciones que conviene conocer</h2>
          <div className="content-prose">
            <article><h3>Un acierto y un empate</h3><p>La referencia es 6♥. Dices mayor y sale 10♣: avanzas. Si hubiera salido 6♦, sería fallo, porque el palo no rompe el empate. Si fallas en la primera posición, continúas allí con la referencia inicial; la carta revelada se retira del mazo.</p></article>
            <article><h3>Un retroceso que cruza peaje</h3><p>En dificultad media, llegas a roja o negra tras confirmar el peaje central. Si fallas, confirmas el fallo, cruzas ese peaje hacia atrás y debes confirmarlo otra vez. Después vuelves a redonda o picuda. El peaje cuenta en ambas direcciones y no consume cartas.</p></article>
            <article><h3>Agotar el mazo</h3><p>Las cartas no se devuelven al mazo al fallar. Repetir posiciones puede consumir las 51 cartas que quedan después de la referencia inicial. Si intentas revelar y no hay cartas, la partida termina sin completar la ruta. No aparece una segunda baraja automáticamente.</p></article>
          </div>
        </section>
        <section className="content-section" aria-labelledby="setup-title"><h2 id="setup-title">De la preparación al resultado</h2><p>Elige jugadores, variante, dificultad y estilo de cartas; acuerda qué significa el peaje antes de empezar. En dos jugadores con validación verbal, una persona responde antes de que la otra revele y marque acierto o fallo. En La patata, asignad los números del 1 al número de participantes.</p><p>Al aparecer un fallo, continúa con el control correspondiente; al llegar a un peaje, resuélvelo y confírmalo. La partida acaba al acertar la última pregunta, al intentar robar de un mazo vacío o al sexto fallo en cooperativo. Para repetir, inicia una partida nueva: las cartas se mezclan de nuevo.</p><p>Consulta <Link prefetch={false} href="/modos-de-juego">las diferencias entre modos</Link>, <Link prefetch={false} href="/preguntas-frecuentes">las dudas de funcionamiento</Link> y <Link prefetch={false} href="/probabilidades">los cálculos de mayor o menor</Link>.</p></section>

        <section className="responsible-section">
          <p className="content-kicker">Juego responsable</p>
          <h2>Define un peaje seguro antes de empezar.</h2>
          <p>
            El juego no exige alcohol. Utiliza puntos, agua, preguntas o retos
            breves adecuados para todas las personas del grupo.
          </p>
          <Link prefetch={false} href="/previa">Cómo organizar El Peaje para una previa →</Link>
        </section>
      </div>
    </main>
  );
}
