import Link from "next/link";
import { HEADER_PATHS, SITE_PAGES } from "@/lib/site-routes";



export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="El Peaje, ir al inicio">
        <span aria-hidden="true">P</span>
        El Peaje
      </Link>
      <nav aria-label="Navegación principal">
        {HEADER_PATHS.map((path) => (
          <Link href={path} key={path}>
            {SITE_PAGES[path].label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
