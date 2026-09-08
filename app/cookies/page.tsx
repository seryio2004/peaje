import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ConsentControls from "../consent-controls";
import PageHero from "../page-hero";

export const metadata = pageMetadata("/cookies");
export default function CookiesPage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Política de cookies">
          <p>Última actualización: 8 de septiembre de 2026.</p>
        </PageHero>
        <div className="legal-copy">
          <section><h2>Uso actual</h2><p>El juego no guarda partidas ni instala cookies propias. Guarda tu elección de privacidad en localStorage (peaje.consent.v1) durante un máximo de 180 días. Si el navegador impide guardarla, solo se conserva en memoria hasta recargar.</p></section>
          <section><h2>Analítica opcional</h2><p>Solo cuando está habilitada y la aceptas, la medición de partidas utiliza sessionStorage (peaje.analytics-session.v1), con una sesión por pestaña que se renueva tras 30 minutos de inactividad. Se elimina al cerrar la pestaña o retirar el permiso. Cloudflare Web Analytics, si está configurado, mide visitas y rendimiento sin cookies. No recibe los eventos personalizados del juego.</p></section>
          <section><h2>Tus preferencias</h2><ConsentControls /></section>
          <section><h2>Alojamiento</h2><p>Según el despliegue, el sitio se sirve desde GitHub Pages o Cloudflare Pages. El proveedor procesa las solicitudes necesarias para entregar la web.</p></section>
          <section><h2>Publicidad</h2><p>Los espacios reservados no cargan anuncios reales ni cookies publicitarias. Antes de integrar un proveedor se actualizarán estas preferencias y la información sobre tecnologías, finalidades y duración.</p></section>
          <section><h2>Más información</h2><p>Consulta la <Link href="/privacidad">política de privacidad</Link> o la <Link href="/contacto">página de contacto</Link>.</p></section>
        </div>
      </div>
    </main>
  );
}
