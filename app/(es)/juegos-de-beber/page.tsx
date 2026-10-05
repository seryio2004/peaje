import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../../page-hero";

export const metadata = pageMetadata("/juegos-de-beber");

export default function DrinkingGamesPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Cartas para la próxima reunión" title="Peajes con y sin bebidas en El Peaje">
          <p>El Peaje es un juego de cartas gratuito para la previa o cualquier reunión. Puedes usarlo como juego de beber si el grupo acuerda esa variante, pero la web no manda beber: cada peaje admite puntos, preguntas, agua o retos breves.</p>
          <Link prefetch={false} className="primary-button" href="/jugar">Jugar a El Peaje gratis</Link>
        </PageHero>

        <section className="content-section editorial-grid" aria-labelledby="pasos-title">
          <div className="content-heading"><p className="content-kicker">Antes de repartir</p><h2 id="pasos-title">Tres acuerdos para que el peaje sea voluntario</h2></div>
          <div className="content-prose">
            <article><h3>El cruce no impone una bebida</h3><p>El motor registra cada paso por un peaje, también hacia atrás. No calcula tragos ni verifica consumos. Acordad una consecuencia que pueda repetirse sin incomodar: un punto simbólico o una pregunta breve.</p></article>
            <article><h3>Pasar es una opción de la mesa</h3><p>Una persona puede omitir la consecuencia y confirmar el peaje para seguir. No hace falta revelar por qué. No cambiéis ese acuerdo tras una mala racha ni utilizad el contador de fallos para presionar a alguien.</p></article>
            <article><h3>Separad marcador y consecuencia</h3><p>En Por puntos, el juego suma un punto por fallo y dos por cruce. Esos puntos son parte del resultado digital y no una cantidad de bebida. Podéis registrar el marcador y jugar toda la sesión sin consumir nada.</p></article>
          </div>
        </section>
        <section className="content-section" aria-labelledby="toll-examples-title"><h2 id="toll-examples-title">Ejemplos de peajes sin alcohol</h2><p><strong>Una recomendación:</strong> nombra una canción, una película o una receta que te guste. <strong>Una preferencia:</strong> elige playa o montaña y explica tu elección en una frase. <strong>Un punto:</strong> apunta una marca en papel y continúa sin una tarea adicional.</p><p>Preparad las preguntas antes para no detener cada turno. En Peaje seguro la web cambia los mensajes, pero no escoge retos automáticamente. Si un cruce se repite, podéis reutilizar la pregunta o pasar; la baraja y los retrocesos no cambian.</p><p>Para organizar tiempos, jugadores y una pantalla compartida, consulta <Link prefetch={false} href="/previa">la guía de sesión</Link>. Para formatos completos, prueba <Link prefetch={false} href="/variantes">las variantes de conversación y equipos</Link>.</p></section>

        <section className="content-section" aria-labelledby="elegir-title">
          <div className="content-heading">
            <p className="content-kicker">Escoge la partida</p>
            <h2 id="elegir-title">Qué hace diferente a El Peaje</h2>
          </div>
          <div className="variants-grid mode-detail-grid">
            <article><span>Gratis y online</span><h3>Sin preparar cartas</h3><p>La baraja se mezcla en la web y las cartas no se repiten durante la partida. Juega desde el navegador, sin crear cuenta.</p></article>
            <article><span>Seis modos</span><h3>Solo, en pareja o en grupo</h3><p>Elige Clásico para aprender, Por puntos para competir o La patata para 3 a 8 personas. Consulta <Link prefetch={false} href="/modos-de-juego">todos los modos y dificultades</Link>.</p></article>
            <article><span>Regla flexible</span><h3>El peaje lo decidís vosotros</h3><p>El juego marca cuándo se cruza un peaje. No asigna tragos ni cantidades: también funciona completamente sin alcohol.</p></article>
          </div>
        </section>

        <section className="choice-guide" aria-labelledby="dudas-title">
          <h2 id="dudas-title">Dudas antes de empezar</h2>
          <h3>¿El Peaje es un juego de beber gratis?</h3>
          <p>Sí, jugar es gratis y puedes adaptar los peajes a una reunión con bebidas entre adultos. La mecánica principal es predecir cartas; beber nunca es obligatorio.</p>
          <h3>¿Hace falta descargar una app?</h3>
          <p>No. Abre <Link prefetch={false} href="/jugar">El Peaje online</Link> en el navegador. La partida empieza sin registro.</p>
          <h3>¿Cómo se juega sin alcohol?</h3>
          <p>Asignad puntos, preguntas o pruebas breves a los peajes. En el modo Peaje seguro, los avisos del juego proponen alternativas sin bebidas. Lee <Link prefetch={false} href="/como-jugar">las reglas completas</Link> o prepara <Link prefetch={false} href="/previa">una partida para la previa</Link>.</p>
        </section>
      </div>
    </main>
  );
}
