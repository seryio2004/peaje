import type { Metadata } from "next";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Canal de contacto para comunicar errores o sugerencias sobre El Peaje.",
};

export default function ContactPage() {
  return (
    <main className="content-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Participa" title="Contacto">
          <p>
            Puedes comunicar un error, proponer una mejora o plantear una duda
            mediante el repositorio público del proyecto.
          </p>
        </PageHero>
        <section className="content-section contact-panel" aria-labelledby="contact-title">
          <h2 id="contact-title">Abrir una incidencia en GitHub</h2>
          <p>
            Describe qué ocurrió, qué esperabas que sucediera y, si es posible,
            indica el navegador y el dispositivo utilizados. No publiques datos personales.
          </p>
          <a
            className="primary-button"
            href="https://github.com/seryio2004/peaje/issues"
            rel="noreferrer"
            target="_blank"
          >
            Ir a incidencias de GitHub
          </a>
          <p className="contact-note">
            Este sitio no incluye actualmente formularios propios ni recopila
            mensajes directamente.
          </p>
        </section>
      </div>
    </main>
  );
}
