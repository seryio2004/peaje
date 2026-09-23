import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../page-hero";

export const metadata = pageMetadata("/juegos-de-beber");

export default function DrinkingGamesPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Cartas para la próxima reunión" title="Juegos de beber gratis online: juega a El Peaje">
          <p>El Peaje es un juego de cartas gratuito para la previa o cualquier reunión. Puedes usarlo como juego de beber si el grupo acuerda esa variante, pero la web no manda beber: cada peaje admite puntos, preguntas, agua o retos breves.</p>
          <Link className="primary-button" href="/jugar">Jugar a El Peaje gratis</Link>
        </PageHero>

        <section className="content-section editorial-grid" aria-labelledby="pasos-title">
          <div className="content-heading">
            <p className="content-kicker">Una partida en tres pasos</p>
            <h2 id="pasos-title">Cómo se juega en grupo</h2>
            <p>No necesitas baraja, descarga ni registro. Basta con abrir el juego en un móvil.</p>
          </div>
          <div className="content-prose">
            <article><h3>1. Elegid el modo</h3><p>Para 3 a 8 personas, La patata permite compartir el móvil y pasarlo tras ciertos aciertos. Para dos, podéis jugar por turnos; también hay partida individual.</p></article>
            <article><h3>2. Acordad el peaje</h3><p>Antes de empezar, decidid qué ocurre al cruzarlo. Puede ser un punto, una pregunta o un reto corto. Si sois adultos y preferís una variante con bebidas, que sea siempre voluntaria y sin presión.</p></article>
            <article><h3>3. Predecid las cartas</h3><p>La web mezcla 52 cartas. Adivinad si la siguiente es mayor o menor y resolved las preguntas de la ruta. Cada acierto hace avanzar; cada fallo hace retroceder.</p></article>
          </div>
        </section>

        <section className="content-section" aria-labelledby="elegir-title">
          <div className="content-heading">
            <p className="content-kicker">Escoge la partida</p>
            <h2 id="elegir-title">Qué hace diferente a El Peaje</h2>
          </div>
          <div className="variants-grid mode-detail-grid">
            <article><span>Gratis y online</span><h3>Sin preparar cartas</h3><p>La baraja se mezcla en la web y las cartas no se repiten durante la partida. Juega desde el navegador, sin crear cuenta.</p></article>
            <article><span>Seis modos</span><h3>Solo, en pareja o en grupo</h3><p>Elige Clásico para aprender, Por puntos para competir o La patata para 3 a 8 personas. Consulta <Link href="/modos-de-juego">todos los modos y dificultades</Link>.</p></article>
            <article><span>Regla flexible</span><h3>El peaje lo decidís vosotros</h3><p>El juego marca cuándo se cruza un peaje. No asigna tragos ni cantidades: también funciona completamente sin alcohol.</p></article>
          </div>
        </section>

        <section className="choice-guide" aria-labelledby="dudas-title">
          <h2 id="dudas-title">Dudas antes de empezar</h2>
          <h3>¿El Peaje es un juego de beber gratis?</h3>
          <p>Sí, jugar es gratis y puedes adaptar los peajes a una reunión con bebidas entre adultos. La mecánica principal es predecir cartas; beber nunca es obligatorio.</p>
          <h3>¿Hace falta descargar una app?</h3>
          <p>No. Abre <Link href="/jugar">El Peaje online</Link> en el navegador. La partida empieza sin registro.</p>
          <h3>¿Cómo se juega sin alcohol?</h3>
          <p>Asignad puntos, preguntas o pruebas breves a los peajes. En el modo Peaje seguro, los avisos del juego proponen alternativas sin bebidas. Lee <Link href="/como-jugar">las reglas completas</Link> o prepara <Link href="/previa">una partida para la previa</Link>.</p>
        </section>
      </div>
    </main>
  );
}
