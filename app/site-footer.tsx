import PrivacySettingsButton from "./privacy-settings-button";
import Link from "next/link";
import { FOOTER_PATHS, SITE_PAGES } from "@/lib/site-routes";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>El Peaje</strong>
        <p>Juego de cartas gratuito para jugar solo, en pareja o en grupo.</p>
      </div>
      <nav aria-label="Navegación del pie de página">
        {FOOTER_PATHS.map(path => <Link href={path} key={path}>{SITE_PAGES[path].label}</Link>)}
        <PrivacySettingsButton />
      </nav>
    </footer>
  );
}
