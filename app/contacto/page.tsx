import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../page-hero";

export const metadata = pageMetadata("/contacto");

export default function ContactPage() {
  return (
    <main className="content-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Participa" title="Contacto">
          <p>
            Puedes comunicar un error, proponer una mejora o plantear una duda por correo electrónico.
          </p>
        </PageHero>
        <section className="content-section contact-panel" aria-labelledby="contact-title">
          <h2 id="contact-title">Escríbenos</h2>
          <p>
            Escríbenos a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Si informas de un error, indica qué ocurrió, qué esperabas que sucediera y, si es posible, el navegador y el dispositivo utilizados.
          </p>
          <a
            className="primary-button"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            Enviar un correo
          </a>
          <p className="contact-note">
            También puedes <a href="https://github.com/seryio2004/peaje/issues" rel="noreferrer" target="_blank">abrir una incidencia pública en GitHub</a>. No publiques datos personales allí.
          </p>
        </section>
      </div>
    </main>
  );
}
