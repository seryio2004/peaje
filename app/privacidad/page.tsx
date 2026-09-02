import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Información sobre privacidad y tratamiento de datos en El Peaje.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Política de privacidad">
          <p>Última actualización: 2 de septiembre de 2026.</p>
        </PageHero>
        <div className="legal-copy">
          <section><h2>Datos tratados por el juego</h2><p>El Peaje no requiere una cuenta, no ofrece formularios propios y no guarda el resultado de las partidas en un servidor. El estado del juego existe en la memoria de la pestaña y se elimina al recargar o cerrar la página.</p></section>
          <section><h2>Almacenamiento y analítica</h2><p>La versión actual no utiliza almacenamiento local, analítica propia ni publicidad activa. Consulta la <Link href="/cookies">política de cookies</Link> para conocer el estado de estas tecnologías.</p></section>
          <section><h2>Alojamiento</h2><p>El sitio se publica mediante GitHub Pages. GitHub puede procesar datos técnicos necesarios para servir la página, como la dirección IP y registros de solicitud, de acuerdo con sus propias políticas.</p></section>
          <section><h2>Publicidad futura</h2><p>Antes de activar Google AdSense u otra plataforma, esta política se actualizará con los proveedores, finalidades, bases legales, plazos y opciones de consentimiento aplicables. No se activarán cookies publicitarias desde estos espacios reservados.</p></section>
          <section><h2>Contacto</h2><p>Para preguntas sobre privacidad, utiliza el canal indicado en la <Link href="/contacto">página de contacto</Link> y evita incluir información sensible.</p></section>
        </div>
      </div>
    </main>
  );
}
