import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../page-hero";
import AdPlacement from "../ad-placement";

export const metadata = pageMetadata("/previa");

export default function PreviaPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Una partida antes de salir" title="El Peaje para la previa">
          <p>El Peaje es un juego de cartas online para romper el hielo en una previa. Solo necesitáis un móvil: la web mezcla las 52 cartas y guía la partida.</p>
          <Link className="primary-button" href="/jugar">Empezar a jugar gratis</Link>
        </PageHero>

        <section className="content-section editorial-grid" aria-labelledby="preparar-title">
          <div className="content-heading">
            <p className="content-kicker">Preparación rápida</p>
            <h2 id="preparar-title">Cómo montar la partida</h2>
          </div>
          <div className="content-prose">
            <article><h3>1. Elegid a los jugadores</h3><p>Podéis jugar en solitario, en pareja o compartir el móvil entre 3 y 8 personas con el modo La patata.</p></article>
            <article><h3>2. Acordad el peaje</h3><p>Antes de repartir, decidid una consecuencia sencilla para cuando se cruce un peaje: un punto, una pregunta o un reto breve que cualquiera pueda rechazar.</p></article>
            <article><h3>3. Predecid la carta</h3><p>La primera carta queda visible. Adivinad si la siguiente será mayor o menor y continuad con las preguntas de la ruta. Un acierto permite avanzar; un fallo os hace retroceder.</p></article>
          </div>
        </section>

        <section className="content-section" aria-labelledby="grupo-title">
          <div className="content-heading">
            <p className="content-kicker">Para compartir pantalla</p>
            <h2 id="grupo-title">Qué modo elegir para el grupo</h2>
          </div>
          <div className="content-prose">
            <p>Para una partida corta, elegid Clásico con dificultad Fácil. Si queréis competir, Por puntos cuenta los fallos y los peajes. Con 3 a 8 jugadores, La patata permite pasar el móvil tras algunos aciertos; las cartas que lo permiten están ocultas hasta responder.</p>
            <p>Consulta <Link href="/modos-de-juego">todos los modos y dificultades</Link> o lee <Link href="/como-jugar">las reglas completas</Link> antes de empezar.</p>
          </div>
        </section>

        <AdPlacement position="after-previa" />

        <section className="responsible-section" aria-labelledby="bebidas-title">
          <p className="content-kicker">Bebidas y alternativas</p>
          <h2 id="bebidas-title">¿El Peaje es un juego de beber?</h2>
          <p>Se puede jugar en una reunión donde haya bebidas, pero El Peaje no asigna tragos ni obliga a beber. El peaje es una regla que decide el grupo. Puntos, agua o retos breves funcionan igual, y cualquier persona puede pasar sin dar explicaciones.</p>
          <Link href="/juegos-de-beber">Ver El Peaje entre los juegos de beber gratis →</Link>
        </section>
      </div>
    </main>
  );
}
