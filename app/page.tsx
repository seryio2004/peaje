import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata("/");

const EXITS = [
  { number: "01", suit: "♠", title: "Conoce las reglas", text: "Predice, avanza y descubre qué pasa cuando la suerte te pone una barrera.", href: "/como-jugar", action: "Cómo jugar" },
  { number: "02", suit: "♦", title: "Encuentra tu ruta", text: "Cinco modos y tres dificultades. Tú eliges cómo cruzar al otro lado.", href: "/modos-de-juego", action: "Explorar modos" },
  { number: "03", suit: "♣", title: "Despeja las dudas", text: "Todo sobre las cartas, los turnos y esos pequeños detalles de la partida.", href: "/preguntas-frecuentes", action: "Ver respuestas" },
];

export default function Home() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="road-label"><span>EP-52</span> BARAJA FRANCESA · DESTINO: LA ÚLTIMA CARTA</p>
          <h1>La suerte se reparte.<br /><em>El peaje se cruza.</em></h1>
          <p>El Peaje es un juego de cartas online gratis para uno o dos jugadores. Predice la siguiente carta: cada acierto te acerca al final y cada fallo tiene su peaje.</p>
          <div className="landing-actions">
            <Link className="primary-button" href="/jugar">Empezar partida <span aria-hidden="true">↗</span></Link>
            <Link className="secondary-button" href="/como-jugar">Cómo se juega</Link>
          </div>
          <p className="landing-smallprint">Sin registro. Gratis. Con una pizca de mala suerte.</p>
        </div>
        <div className="toll-scene" aria-label="Ilustración de cartas y una cabina de peaje">
          <div className="toll-sign" aria-hidden="true"><span>PEAJE</span><span className="lane-light">↓</span><small>PREPARE SU BARAJA</small></div>
          <div className="card-fan" aria-hidden="true">
            <div className="souvenir-card card-back"><span>EL<br />PEAJE</span><small>♠ ♥ ♣ ♦</small></div>
            <div className="souvenir-card card-diamond"><span>A<br />♦</span><b>♦</b><span>A<br />♦</span></div>
            <div className="souvenir-card card-spade"><span>A<br />♠</span><b>♠</b><span>A<br />♠</span></div>
          </div>
          <div className="toll-barrier" aria-hidden="true" />
          <div className="toll-ticket"><span>BILLETE DE ENTRADA</span><strong>52 cartas. Un destino.</strong><div><span>1–2 JUGADORES</span><span>0,00 €</span></div></div>
        </div>
      </section>

      <div className="route-strip" aria-label="Características del juego">
        <div><strong>52</strong><span>cartas en la baraja</span></div>
        <div><strong>1–2</strong><span>jugadores por partida</span></div>
        <div><strong>05</strong><span>modos para explorar</span></div>
        <div><strong>03</strong><span>niveles de dificultad</span></div>
      </div>

      <section className="landing-section" aria-labelledby="discover-title">
        <div className="content-heading">
          <p className="content-kicker">Próximas salidas</p>
          <h2 id="discover-title">Antes de levantar la barrera.</h2>
          <p>Todo lo que necesitas para llegar a la mesa con las ideas claras.</p>
        </div>
        <div className="landing-card-grid">
          {EXITS.map((exit) => (
            <Link className="exit-card" href={exit.href} key={exit.number}>
              <div className="exit-card-top"><span>SALIDA {exit.number}</span><span aria-hidden="true">{exit.suit}</span></div>
              <h3>{exit.title}</h3><p>{exit.text}</p>
              <span className="exit-card-action">{exit.action}<span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-responsible">
        <div><p className="content-kicker">Área de descanso</p><h2>Buen juego.<br />Buen viaje.</h2></div>
        <div><p>El peaje lo ponéis vosotros: puntos, preguntas o retos breves. Acordad una penalización segura antes de repartir. El juego no necesita alcohol.</p><Link href="/sobre-el-juego">Más sobre El Peaje <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="landing-section share-invitation"><p className="content-kicker">Una partida más, otro móvil</p><h2>Invita a tu grupo a cruzar el peaje.</h2><p>Comparte la web con un QR y descubre las apps que estamos preparando.</p><Link className="secondary-button" href="/compartir">Compartir por QR y ver las apps →</Link></section>
    </main>
  );
}
