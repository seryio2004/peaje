import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../../page-hero";
import AdPlacement from "../../ad-placement";

export const metadata = pageMetadata("/previa");

export default function PreviaPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Una partida antes de salir" title="El Peaje para la previa">
          <p>El Peaje es un juego de cartas online para romper el hielo en una previa. Solo necesitáis un móvil: la web mezcla las 52 cartas y guía la partida.</p>
          <Link prefetch={false} className="primary-button" href="/jugar">Empezar a jugar gratis</Link>
        </PageHero>

        <section className="content-section editorial-grid" aria-labelledby="preparar-title">
          <div className="content-heading">
            <p className="content-kicker">Preparación rápida</p>
            <h2 id="preparar-title">Preparar una mesa que funcione</h2>
          </div>
          <div className="content-prose">
            <article><h3>1. Una pantalla a la vista</h3><p>Colocad el móvil en un lugar donde todos vean la carta. Asignad quién pulsa y evitad respuestas simultáneas. El QR sirve para abrir la web en otro dispositivo, pero no conecta las partidas: para una ruta compartida usad una sola pantalla.</p></article>
            <article><h3>2. Números y peajes claros</h3><p>En La patata, repartid números del 1 al número de jugadores antes de iniciar. Acordad una consecuencia breve para cada cruce y cómo puede omitirla quien no quiera participar. El destinatario de un pase se elige por número en la pantalla.</p></article>
            <article><h3>3. Un cierre para la sesión</h3><p>Decidid si vais a jugar una partida o una ronda por persona. No hay temporizador: los retrocesos pueden alargar un intento. Si tenéis que salir, podéis cerrar la partida y anotarla como interrumpida; no la contéis como recorrido completado.</p></article>
          </div>
        </section>

        <section className="content-section" aria-labelledby="grupo-title">
          <div className="content-heading">
            <p className="content-kicker">Para compartir pantalla</p>
            <h2 id="grupo-title">Qué modo elegir para el grupo</h2>
          </div>
          <div className="content-prose">
            <p>Para una partida corta, elegid Clásico con dificultad Fácil. Si queréis competir, Por puntos cuenta los fallos y los peajes. Con 3 a 8 jugadores, La patata permite pasar el móvil tras algunos aciertos; las cartas que lo permiten están ocultas hasta responder.</p>
            <p>Consulta <Link prefetch={false} href="/modos-de-juego">todos los modos y dificultades</Link> o lee <Link prefetch={false} href="/como-jugar">las reglas completas</Link> antes de empezar.</p>
          </div>
        </section>

        <AdPlacement position="after-previa" />

        <section className="responsible-section" aria-labelledby="bebidas-title">
          <p className="content-kicker">Bebidas y alternativas</p>
          <h2 id="bebidas-title">Si alguien entra o sale del grupo</h2>
          <p>La patata fija el número de jugadores al empezar. Si cambia el grupo, terminad o interrumpid esa partida e iniciad otra con la nueva configuración. Para más de ocho personas, dividid la mesa o utilizad un operador por equipo; no existen salas compartidas entre móviles.</p>
          <Link prefetch={false} href="/juegos-de-beber">Ideas para acordar peajes voluntarios →</Link>
        </section>
      </div>
    </main>
  );
}
