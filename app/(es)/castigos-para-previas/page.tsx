import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../../page-hero";
import AdPlacement from "../../ad-placement";

export const metadata = pageMetadata("/castigos-para-previas");

const PUNISHMENTS: [card: string, title: string, body: string][] = [
  ["2", "Brindis exprés", "Propón un brindis de una frase por alguien de la mesa. Sin repetir el de otra persona."],
  ["3", "Tu canción", "Elige la próxima canción de la lista. Si nadie la conoce, cuenta por qué te gusta."],
  ["4", "Acento prohibido", "Habla con un acento inventado hasta tu siguiente acierto."],
  ["5", "Dos verdades y una mentira", "Di tres frases sobre ti; el grupo vota cuál es la falsa."],
  ["6", "Cumplido obligatorio", "Dedica un cumplido sincero a la persona de tu derecha."],
  ["7", "Imitación", "Imita a alguien famoso hasta que el grupo lo adivine o pasen 20 segundos."],
  ["8", "Preguntas del grupo", "El grupo te hace una pregunta. Puedes responder o pasar sin dar explicaciones."],
  ["9", "Camarero de la ronda", "Sirves agua o lo que pida la mesa hasta el siguiente peaje."],
  ["10", "Foto del grupo", "Organizas y haces la foto del grupo; tú eliges la pose."],
  ["J", "Regla nueva", "Inventa una norma leve hasta el final de la partida, como no decir «carta»."],
  ["Q", "Elige un compañero", "Señala a alguien: el próximo peaje lo cumplís los dos."],
  ["K", "El rey decide", "El grupo escoge cualquier castigo de esta tabla para ti."],
  ["A", "Pase libre", "Te libras de este peaje. Puedes guardarlo para regalárselo a otra persona."],
];

export default function PunishmentsPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero path="/castigos-para-previas" kicker="Ideas para el peaje" title="Castigos y retos para previas">
          <p>Una lista de castigos y retos para previas que funcionan con y sin alcohol, una regla para el que siempre llega tarde y una tabla del 2 al as para usar cartas como sorteo. Todas las ideas sirven como peajes en El Peaje, el juego de cartas online gratis y sin registro.</p>
          <Link prefetch={false} className="primary-button" href="/jugar">Jugar a El Peaje gratis</Link>
        </PageHero>

        <nav className="article-related" aria-label="En esta guía">
          <a href="#llega-tarde">El que llega tarde</a><a href="#tabla-castigos">Tabla del 2 al as</a><a href="#con-bebida">Con bebida, opcional</a><a href="#limites">Límites</a>
        </nav>

        <section className="content-section" aria-labelledby="llega-tarde">
          <h2 id="llega-tarde">Castigo para el que llega tarde a la previa</h2>
          <p>En casi todos los grupos hay alguien que llega cuando los demás ya llevan un rato. En lugar de discutir, convertidlo en un turno: quien llega el último juega una ruta de El Peaje delante de todos y cumple cada peaje que cruce.</p>
          <ol className="quick-rules">
            <li><strong>Abrid la partida.</strong> Entrad en <Link prefetch={false} href="/jugar">jugar a El Peaje</Link> y elegid un jugador con el modo Clásico.</li>
            <li><strong>Que elija la mesa la dificultad.</strong> Fácil tiene tres preguntas y un peaje. Difícil tiene cuatro preguntas y dos peajes.</li>
            <li><strong>Predice en voz alta.</strong> Mayor o menor, roja o negra y, al final, el palo exacto. Fallar te devuelve hacia atrás y puede obligarte a cruzar otra vez el peaje.</li>
            <li><strong>Cumple al cruzar.</strong> Cada peaje se resuelve con un castigo de la tabla de abajo o con el que acordéis antes de empezar.</li>
          </ol>
          <p>Acertar el palo exacto tiene una probabilidad aproximada de una entre cuatro, así que la última pregunta suele obligar a repetir. Puedes ver los cálculos en <Link prefetch={false} href="/probabilidades">las probabilidades de El Peaje</Link>. Cuando termina la ruta, el castigo queda pagado y la persona se une al resto en <Link prefetch={false} href="/modos-de-juego">el modo de grupo La patata</Link>.</p>
        </section>

        <section className="content-section" aria-labelledby="tabla-castigos">
          <h2 id="tabla-castigos">Tabla de castigos del 2 al as</h2>
          <p>Cuando alguien cruza un peaje, mirad la última carta que ha salido en pantalla y aplicad la fila de su valor. Así nadie elige el castigo a dedo y la partida no se detiene a debatir.</p>
          <div className="probability-table-wrap" tabIndex={0} role="region" aria-label="Castigos según el valor de la carta">
            <table className="probability-table">
              <caption>Castigos sin alcohol según la carta</caption>
              <thead><tr><th scope="col">Carta</th><th scope="col">Castigo</th><th scope="col">Qué hay que hacer</th></tr></thead>
              <tbody>
                {PUNISHMENTS.map(([card, title, body]) => (
                  <tr key={card}><th scope="row">{card}</th><td>{title}</td><td>{body}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Si una fila no encaja con vuestro grupo, cambiadla antes de empezar. El juego marca el cruce, pero no elige retos: la tabla es vuestra.</p>
        </section>

        <AdPlacement position="after-previa" />

        <section className="content-section editorial-grid" aria-labelledby="retos-title">
          <div className="content-heading"><p className="content-kicker">Más ideas</p><h2 id="retos-title">Retos para previas según el ambiente</h2></div>
          <div className="content-prose">
            <article><h3>Para romper el hielo</h3><p>Cuenta la anécdota más rara de tu semana, di tu plan ideal para esta noche o recomienda una serie en diez segundos. Funcionan bien cuando no todo el grupo se conoce.</p></article>
            <article><h3>Para reírse</h3><p>Lee el último mensaje que enviaste con voz de narrador de documentales, haz de presentador de la siguiente carta o cuenta un chiste malo. Si nadie se ríe, se repite al próximo peaje.</p></article>
            <article><h3>Para grupos grandes</h3><p>En La patata, quien cruza el peaje elige a otra persona para que lo cumpla con él. También podéis jugar por equipos y que el castigo lo decida el equipo rival.</p></article>
          </div>
        </section>

        <section className="content-section" aria-labelledby="con-bebida">
          <h2 id="con-bebida">Castigos con bebida: siempre opcionales</h2>
          <p>Entre adultos, algunos grupos usan un sorbo como peaje. Si lo hacéis, que sea un sorbo pequeño de lo que cada uno ya esté tomando, que el agua siempre valga y que cualquiera pueda pasar sin explicar por qué. El Peaje no cuenta tragos ni asigna cantidades.</p>
          <p>Para competir sin bebidas, elegid el modo Por puntos: un fallo suma un punto y cada peaje dos. Gana quien termine con menos. Tienes más formatos en <Link prefetch={false} href="/juegos-de-beber">El Peaje como juego de beber y sin alcohol</Link>.</p>
        </section>

        <section className="responsible-section" aria-labelledby="limites">
          <p className="content-kicker">Para que todos quieran repetir</p>
          <h2 id="limites">Qué no debería ser un castigo</h2>
          <p>Nada que humille, que obligue a beber o a comer, que implique publicar algo en redes de otra persona o que ponga a alguien en peligro. Nadie que vaya a conducir debe beber. Un buen castigo es corto, se cumple en la mesa y hace gracia también a quien lo cumple.</p>
          <Link prefetch={false} href="/previa">Cómo organizar El Peaje en la previa →</Link>
        </section>

        <section className="choice-guide" aria-labelledby="dudas-title">
          <h2 id="dudas-title">Dudas frecuentes</h2>
          <h3>¿Qué castigo poner al que llega tarde a la previa?</h3>
          <p>Uno que sea un turno, no una humillación: que juegue una ruta de El Peaje en solitario y cumpla los peajes que cruce con la tabla de castigos. Dura unos minutos y lo ve todo el grupo.</p>
          <h3>¿Hace falta descargar algo o crear una cuenta?</h3>
          <p>No. <Link prefetch={false} href="/jugar">El Peaje se juega en el navegador</Link>, gratis y sin registro, con un solo móvil para todo el grupo.</p>
          <h3>¿Sirve sin alcohol?</h3>
          <p>Sí. Todos los castigos de la tabla son sin alcohol, y el modo Peaje seguro cambia los avisos del juego. Consulta <Link prefetch={false} href="/como-jugar">las reglas completas</Link> antes de empezar.</p>
        </section>
      </div>
    </main>
  );
}
