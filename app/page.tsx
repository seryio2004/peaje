import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="content-kicker">Baraja francesa · Gratis · Sin registro</p>
          <h1>Predice la siguiente carta y consigue cruzar El Peaje.</h1>
          <p>
            Un juego de cartas online para una o dos personas, con cinco modos,
            tres dificultades y partidas que empiezan en segundos.
          </p>
          <div className="landing-actions">
            <Link className="primary-button" href="/jugar">
              Jugar ahora
            </Link>
            <Link className="secondary-button" href="/como-jugar">
              Aprender las reglas
            </Link>
          </div>
        </div>
        <aside className="landing-summary" aria-label="Características principales">
          <span className="landing-card-mark" aria-hidden="true">A♠</span>
          <dl>
            <div><dt>Baraja</dt><dd>52 cartas sin repetir</dd></div>
            <div><dt>Jugadores</dt><dd>Uno o dos</dd></div>
            <div><dt>Configuración</dt><dd>5 modos · 3 dificultades</dd></div>
          </dl>
        </aside>
      </section>

      <section className="landing-section" aria-labelledby="discover-title">
        <div className="content-heading">
          <p className="content-kicker">Todo lo necesario</p>
          <h2 id="discover-title">Entiende el juego antes de repartir</h2>
          <p>
            El contenido está separado para que puedas consultar cada tema sin
            interrumpir una partida.
          </p>
        </div>
        <div className="landing-card-grid">
          <article>
            <span aria-hidden="true">01</span>
            <h3>Cómo jugar</h3>
            <p>Aprende las predicciones, los peajes y cuándo termina la partida.</p>
            <Link href="/como-jugar">Ver reglas</Link>
          </article>
          <article>
            <span aria-hidden="true">02</span>
            <h3>Modos y dificultad</h3>
            <p>Compara las rutas y elige la configuración adecuada para el grupo.</p>
            <Link href="/modos-de-juego">Comparar modos</Link>
          </article>
          <article>
            <span aria-hidden="true">03</span>
            <h3>Preguntas frecuentes</h3>
            <p>Resuelve dudas sobre cartas, puntuación, privacidad y jugadores.</p>
            <Link href="/preguntas-frecuentes">Consultar respuestas</Link>
          </article>
        </div>
      </section>

      <section className="landing-responsible">
        <div>
          <p className="content-kicker">Juega a tu manera</p>
          <h2>El peaje no tiene que ser una bebida.</h2>
        </div>
        <p>
          Puedes usar puntos, retos breves, preguntas o cualquier penalización
          segura acordada por el grupo. La diversión está en las predicciones.
        </p>
      </section>
    </main>
  );
}
