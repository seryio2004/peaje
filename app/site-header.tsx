import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import { HEADER_PATHS, SITE_PAGES } from "@/lib/site-routes";



export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link prefetch={false} className="site-brand" href="/" title="Ir al inicio">
        <span aria-hidden="true">P</span>
        El Peaje
      </Link>
      <nav aria-label="Navegación principal">
        {HEADER_PATHS.map((path) => (
          <Link prefetch={false} href={path} key={path}>
            {SITE_PAGES[path].label}
          </Link>
        ))}
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
