import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../page-hero";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Condiciones e información legal disponible sobre el sitio El Peaje.",
};

export default function LegalNoticePage() {
  return (
    <main className="content-page legal-page">
      <div className="content-shell narrow-content">
        <PageHero kicker="Información legal" title="Aviso legal">
          <p>Última actualización: 2 de septiembre de 2026.</p>
        </PageHero>
        <aside className="legal-pending">
          <strong>Información pendiente antes de monetizar</strong>
          <p>Antes de activar publicidad, el titular debe completar aquí su identidad legal, NIF y un medio de contacto o domicilio válido. Esos datos no se inventan ni se publican sin su confirmación.</p>
        </aside>
        <div className="legal-copy">
          <section><h2>Objeto del sitio</h2><p>El Peaje es un juego de cartas gratuito accesible desde <a href="https://seryio2004.github.io/peaje">seryio2004.github.io/peaje</a>. Ofrece una partida digital y contenido informativo relacionado con sus reglas y modos.</p></section>
          <section><h2>Uso del contenido</h2><p>Los textos, el diseño, el código y los recursos gráficos están protegidos por la normativa aplicable y por las condiciones de licencia que, en su caso, figuren en el repositorio del proyecto. No se concede autorización para presentarlos como obra propia.</p></section>
          <section><h2>Responsabilidad</h2><p>Se procura mantener el juego disponible y correcto, pero no se garantiza un funcionamiento ininterrumpido en todos los dispositivos. Las personas usuarias deben adaptar las dinámicas del peaje a alternativas seguras y apropiadas.</p></section>
          <section><h2>Enlaces externos</h2><p>Las páginas de GitHub enlazadas pertenecen a un tercero y se rigen por sus propias condiciones y políticas.</p></section>
          <section><h2>Contacto</h2><p>Los errores y consultas pueden comunicarse mediante la <Link href="/contacto">página de contacto</Link>.</p></section>
        </div>
      </div>
    </main>
  );
}
