import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata("/");

const EXITS = [
  { number: "01", suit: "♠", title: "Tiene reglas y todo", text: "Adivina la carta, avanza y resuelve los peajes. Está explicado aquí por si lo de pulsar cosas no funciona.", href: "/como-jugar", action: "Leer las reglas" },
  { number: "02", suit: "♦", title: "El problema, a tu gusto", text: "Seis modos, incluido La patata para grupos. Había que poner ajustes para que esto pareciera serio.", href: "/modos-de-juego", action: "Ver los modos" },
  { number: "03", suit: "♣", title: "¿Pero esto por qué?", text: "Qué pasa al fallar, cuándo cambia el turno y cuándo acaba la partida. Todo menos por qué has elegido esa carta.", href: "/preguntas-frecuentes", action: "Resolver dudas" },
];

export default function Home() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="road-label"><span>EP-52</span> UN PEAJE. SÍ, EN INTERNET.</p>
          <h1>Es una carta.<br /><em>Cómo vas a fallar.</em></h1>
          <p>El Peaje es un juego de cartas gratis para jugar solo, en pareja o en grupo. Predice la siguiente carta: si aciertas, avanzas; si fallas, te comes el peaje. Puedes explicarle a la pantalla por qué tenías razón. Le da igual.</p>
          <div className="landing-actions">
            <Link className="primary-button" href="/jugar">Venga, reparte <span aria-hidden="true">↗</span></Link>
            <Link className="secondary-button" href="/como-jugar">Pero cómo se juega</Link>
          </div>
          <p className="landing-smallprint">Gratis y sin registro. Bastante tienes con las cartas.</p>
        </div>
        <div className="toll-scene" aria-label="Ilustración de cartas y una cabina de peaje">
          <div className="toll-sign" aria-hidden="true"><span>PEAJE</span><span className="lane-light">↓</span><small>NO GOLPEAR LA CABINA</small></div>
          <div className="card-fan" aria-hidden="true">
            <div className="souvenir-card card-back"><span>EL<br />PEAJE</span><small>♠ ♥ ♣ ♦</small></div>
            <div className="souvenir-card card-diamond"><span>A<br />♦</span><b>♦</b><span>A<br />♦</span></div>
            <div className="souvenir-card card-spade"><span>A<br />♠</span><b>♠</b><span>A<br />♠</span></div>
          </div>
          <div className="toll-barrier" aria-hidden="true" />
          <div className="toll-ticket"><span>GUARDE ESTE PAPEL PARA NADA</span><strong>52 cartas. Tú sabrás.</strong><div><span>1–8 JUGADORES</span><span>0,00 €</span></div></div>
        </div>
      </section>

      <div className="route-strip" aria-label="Características del juego">
        <div><strong>52</strong><span>cartas. Las hemos contado.</span></div>
        <div><strong>1–8</strong><span>jugadores según el modo</span></div>
        <div><strong>06</strong><span>modos de juego</span></div>
        <div><strong>2–3</strong><span>dificultades según el modo</span></div>
      </div>

      <section className="landing-section" aria-labelledby="discover-title">
        <div className="content-heading">
          <p className="content-kicker">El manual que vas a saltarte</p>
          <h2 id="discover-title">Luego no digas que no estaba explicado.</h2>
          <p>Reglas, modos y respuestas. Está todo aquí, bastante a mano.</p>
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
        <div><p className="content-kicker">Un segundo de seriedad</p><h2>Que mañana<br />os sigáis hablando.</h2></div>
        <div><p>El peaje lo ponéis vosotros: puntos, preguntas o retos cortos. Acordad algo seguro y que os apetezca a todos. Si alguien pasa, se respeta. No hace falta alcohol ni montar un interrogatorio por una carta.</p><Link href="/sobre-el-juego">De qué va El Peaje <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="landing-section share-invitation"><p className="content-kicker">Para el grupo de los 400 mensajes sin leer</p><h2>Mándales algo que se pueda jugar.</h2><p>Pásales el QR. No hay que hacerse una cuenta ni descargarse nada. También puedes ver las apps que estamos preparando, que todavía no están.</p><Link className="secondary-button" href="/compartir">Compartir QR y ver las apps →</Link></section>
    </main>
  );
}
