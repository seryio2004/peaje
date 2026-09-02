import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Información sobre el uso actual y futuro de cookies en El Peaje.",
};

export default function CookiesPage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Política de cookies">
          <p>Última actualización: 2 de septiembre de 2026.</p>
        </PageHero>
        <div className="legal-copy">
          <section><h2>Uso actual</h2><p>El Peaje no instala cookies propias, no utiliza almacenamiento local para conservar partidas y no incluye actualmente herramientas de analítica ni anuncios activos.</p></section>
          <section><h2>Servicios de alojamiento</h2><p>El sitio se sirve desde GitHub Pages. Las solicitudes pasan por la infraestructura de GitHub, que puede aplicar tecnologías estrictamente necesarias bajo sus propias condiciones.</p></section>
          <section><h2>Cambios futuros</h2><p>Si se incorpora publicidad o medición que requiera tecnologías no esenciales, se añadirá una plataforma de consentimiento antes de activarlas. Esta página detallará su nombre, proveedor, finalidad y duración.</p></section>
          <section><h2>Más información</h2><p>Consulta también la <Link href="/privacidad">política de privacidad</Link> o utiliza la <Link href="/contacto">página de contacto</Link>.</p></section>
        </div>
      </div>
    </main>
  );
}
