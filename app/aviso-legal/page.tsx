import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import PageHero from "../page-hero";
import AdPlacement from "../ad-placement";

export const metadata = pageMetadata("/aviso-legal");

export default function LegalNoticePage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Aviso legal">
          <p>Última actualización: 21 de septiembre de 2026.</p>
        </PageHero>
        <div className="content-ad-layout">
          <div className="legal-copy">
          <section><h2>Objeto del sitio</h2><p>El Peaje es un juego de cartas gratuito accesible desde <a href={siteConfig.siteUrl}>{siteConfig.siteUrl}</a>. Ofrece una partida digital y contenido informativo relacionado con sus reglas y modos.</p></section>
          <section><h2>Uso del contenido</h2><p>Los textos, el diseño, el código y los recursos gráficos están protegidos por la normativa aplicable y por las condiciones de licencia que, en su caso, figuren en el repositorio del proyecto. No se concede autorización para presentarlos como obra propia.</p></section>
          <section><h2>Responsabilidad</h2><p>Se procura mantener el juego disponible y correcto, pero no se garantiza un funcionamiento ininterrumpido en todos los dispositivos. Las personas usuarias deben adaptar las dinámicas del peaje a alternativas seguras y apropiadas.</p></section>
          <section><h2>Enlaces externos</h2><p>Las páginas de GitHub enlazadas pertenecen a un tercero y se rigen por sus propias condiciones y políticas.</p></section>
          <section><h2>Contacto</h2><p>Para consultas sobre el sitio, privacidad o derechos relacionados con los datos personales, escribe a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p></section>
          </div>
          <AdPlacement position="legal-rail" />
        </div>
      </div>
    </main>
  );
}
