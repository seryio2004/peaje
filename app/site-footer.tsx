import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>El Peaje</strong>
        <p>Juego de cartas gratuito para uno o dos jugadores.</p>
      </div>
      <nav aria-label="Navegación del pie de página">
        <Link href="/sobre-el-juego">Sobre el juego</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/aviso-legal">Aviso legal</Link>
      </nav>
    </footer>
  );
}
