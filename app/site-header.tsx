import Link from "next/link";

const NAVIGATION = [
  { href: "/", label: "Inicio" },
  { href: "/jugar", label: "Jugar" },
  { href: "/como-jugar", label: "Reglas" },
  { href: "/modos-de-juego", label: "Modos" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="El Peaje, ir al inicio">
        <span aria-hidden="true">P</span>
        El Peaje
      </Link>
      <nav aria-label="Navegación principal">
        {NAVIGATION.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
