import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../../page-hero";

export const metadata = pageMetadata("/juegos-de-beber");

export default function DrinkingGamesPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero path="/juegos-de-beber" kicker="Cartas para la próxima reunión" title="El Peaje: juego de beber con cartas online gratis">
          <p>El Peaje es un juego de beber con cartas online, gratis y sin registro, que también puedes jugar sin alcohol. Predice la siguiente carta, avanza cuando aciertes y resuelve los peajes del recorrido. Para jugar en grupo compartís un móvil; las bebidas y las consecuencias las decidís vosotros.</p>
          <Link prefetch={false} className="primary-button" href="/jugar">Jugar a El Peaje gratis</Link>
        </PageHero>

        <nav className="article-related" aria-label="En esta guía">
          <a href="#reglas-rapidas">Cómo jugar</a><a href="#modo-por-grupo">Modo según jugadores</a><a href="#toll-examples-title">Peajes sin alcohol</a><a href="#dudas-title">Dudas frecuentes</a>
        </nav>

        <section className="content-section" aria-labelledby="reglas-rapidas">
          <h2 id="reglas-rapidas">Cómo jugar a El Peaje en una reunión</h2>
          <ol className="quick-rules">
            <li><strong>Abrid la partida.</strong> Entrad en <Link prefetch={false} href="/jugar">jugar a El Peaje</Link> desde el navegador. No necesitáis descargar una app ni tener una baraja física.</li>
            <li><strong>Elegid el modo.</strong> Clásico Fácil sirve para aprender; La patata permite jugar de 3 a 8 personas pasando el móvil.</li>
            <li><strong>Acordad el peaje.</strong> Decidid una pregunta, un punto o una consecuencia voluntaria antes de empezar. Cualquiera puede pasar.</li>
            <li><strong>Predecid las cartas.</strong> En Fácil respondéis mayor o menor, roja o negra y palo exacto. En Media y Difícil también aparece redonda o picuda.</li>
            <li><strong>Avanzad o retroceded.</strong> Un acierto permite seguir; un fallo os devuelve hacia la pregunta anterior. Confirmad cada peaje que crucéis, también al retroceder.</li>
          </ol>
          <p>La ruta se completa al acertar la última pregunta. También puede terminar al agotar el mazo o, en Cooperativo, al sexto fallo. Consulta <Link prefetch={false} href="/como-jugar">las reglas de El Peaje con ejemplos de turnos</Link> para ver los detalles.</p>
        </section>

        <section className="content-section" aria-labelledby="modo-por-grupo">
          <h2 id="modo-por-grupo">Qué modo elegir según cuántos seáis</h2>
          <div className="probability-table-wrap" tabIndex={0} role="region" aria-label="Modos de El Peaje según los jugadores">
            <table className="probability-table">
              <caption>Una pantalla compartida, sin salas entre móviles</caption>
              <thead><tr><th scope="col">Grupo</th><th scope="col">Modo</th><th scope="col">Cómo funciona</th></tr></thead>
              <tbody>
                <tr><th scope="row">Una persona</th><td>Clásico</td><td>La web comprueba cada predicción.</td></tr>
                <tr><th scope="row">Dos personas</th><td>Turnos rápidos</td><td>Cada persona conserva su ruta; el fallo cambia el turno.</td></tr>
                <tr><th scope="row">De 3 a 8</th><td>La patata</td><td>Algunas cartas acertadas permiten pasar el móvil.</td></tr>
                <tr><th scope="row">Un equipo</th><td>Cooperativo</td><td>Compartís ruta e intentáis llegar antes del sexto fallo.</td></tr>
              </tbody>
            </table>
          </div>
          <p>Podéis usar puntos o preguntas en cualquier modo. Para comparar los seis formatos y sus rutas, consulta <Link prefetch={false} href="/modos-de-juego">los modos y dificultades de El Peaje</Link>. Para preparar una sesión antes de salir, sigue <Link prefetch={false} href="/previa">la guía de cartas para la previa</Link>.</p>
        </section>

        <section className="content-section" aria-labelledby="ejemplo-peaje">
          <h2 id="ejemplo-peaje">Un ejemplo: del acierto al peaje</h2>
          <p>La referencia es 6♥ y eliges mayor. Si aparece 10♣, aciertas y avanzas. Si aparece 6♦, fallas: el palo no deshace el empate. Cuando el recorrido atraviesa un peaje, cumplís la consecuencia acordada y lo confirmáis para continuar. El juego marca el cruce, pero no asigna una cantidad de bebida.</p>
          <p>En Por puntos, tres fallos y dos cruces de peaje suman siete puntos: uno por fallo y dos por cruce. Ese marcador permite comparar partidas de la misma dificultad sin asociar los puntos a consumos.</p>
        </section>

        <section className="content-section editorial-grid" aria-labelledby="pasos-title">
          <div className="content-heading"><p className="content-kicker">Antes de repartir</p><h2 id="pasos-title">Tres acuerdos para que el peaje sea voluntario</h2></div>
          <div className="content-prose">
            <article><h3>El cruce no impone una bebida</h3><p>El motor registra cada paso por un peaje, también hacia atrás. No calcula tragos ni verifica consumos. Acordad una consecuencia que pueda repetirse sin incomodar: un punto simbólico o una pregunta breve.</p></article>
            <article><h3>Pasar es una opción de la mesa</h3><p>Una persona puede omitir la consecuencia y confirmar el peaje para seguir. No hace falta revelar por qué. No cambiéis ese acuerdo tras una mala racha ni utilizad el contador de fallos para presionar a alguien.</p></article>
            <article><h3>Separad marcador y consecuencia</h3><p>En Por puntos, el juego suma un punto por fallo y dos por cruce. Esos puntos son parte del resultado digital y no una cantidad de bebida. Podéis registrar el marcador y jugar toda la sesión sin consumir nada.</p></article>
          </div>
        </section>
        <section className="content-section" aria-labelledby="toll-examples-title"><h2 id="toll-examples-title">Ejemplos de peajes sin alcohol</h2><p><strong>Una recomendación:</strong> nombra una canción, una película o una receta que te guste. <strong>Una preferencia:</strong> elige playa o montaña y explica tu elección en una frase. <strong>Un punto:</strong> apunta una marca en papel y continúa sin una tarea adicional.</p><p>Preparad las preguntas antes para no detener cada turno. En Peaje seguro la web cambia los mensajes, pero no escoge retos automáticamente. Si un cruce se repite, podéis reutilizar la pregunta o pasar; la baraja y los retrocesos no cambian.</p><p>Para organizar tiempos, jugadores y una pantalla compartida, consulta <Link prefetch={false} href="/previa">la guía de sesión</Link>. Para formatos completos, prueba <Link prefetch={false} href="/variantes">las variantes de conversación y equipos</Link>. Para más ideas, consulta <Link prefetch={false} href="/castigos-para-previas">castigos y retos para previas</Link>.</p></section>

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
