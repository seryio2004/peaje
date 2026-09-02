import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "../../lib/site-content";
import AdPlacement from "../ad-placement";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre las reglas, cartas, jugadores, final de partida y privacidad de El Peaje.",
};

export default function FaqPage() {
  return (
    <main className="content-page">
      <div className="content-shell">
        <PageHero kicker="Respuestas rápidas" title="Preguntas frecuentes">
          <p>
            Aquí encontrarás las dudas habituales sobre la baraja, las reglas y
            el funcionamiento de las partidas.
          </p>
          <Link className="secondary-button" href="/como-jugar">Leer todas las reglas</Link>
        </PageHero>
        <section className="content-section faq-section" aria-label="Listado de preguntas frecuentes">
          <div className="faq-list">
            {FAQS.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <AdPlacement position="after-faq" />
      </div>
    </main>
  );
}
