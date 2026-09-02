import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Sobre el juego",
  description:
    "Conoce el propósito, el funcionamiento y los principios de diseño de El Peaje, un juego de cartas online gratuito.",
};

export default function AboutPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="El proyecto" title="Sobre El Peaje">
          <p>
            El Peaje convierte un juego de predicciones con baraja francesa en
            una experiencia web rápida, configurable y sin registro.
          </p>
          <Link className="primary-button" href="/jugar">Probar el juego</Link>
        </PageHero>

        <section className="content-section editorial-grid" aria-labelledby="purpose-title">
          <div className="content-heading">
            <p className="content-kicker">Propósito</p>
            <h2 id="purpose-title">Una partida lista en segundos</h2>
          </div>
          <div className="content-prose">
            <article><h3>Sin instalación</h3><p>El juego funciona directamente en el navegador y crea una baraja nueva al iniciar cada partida.</p></article>
            <article><h3>Sin cuentas</h3><p>No necesitas crear un perfil. El progreso permanece en la memoria del navegador mientras juegas.</p></article>
            <article><h3>Adaptable al grupo</h3><p>Los modos, las dificultades y los estilos de carta permiten ajustar la experiencia sin cambiar las reglas básicas.</p></article>
          </div>
        </section>

        <section className="responsible-section">
          <p className="content-kicker">Principio de diseño</p>
          <h2>La diversión depende de las cartas, no de la penalización.</h2>
          <p>
            Los peajes se presentan como una mecánica flexible. Cada grupo debe
            elegir alternativas seguras, inclusivas y apropiadas para sus participantes.
          </p>
        </section>
      </div>
    </main>
  );
}
