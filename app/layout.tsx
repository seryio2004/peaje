import type { Metadata } from "next";
import { serializeJsonLd, siteStructuredData } from "@/lib/seo";
import PrivacyRuntime from "./privacy-runtime";
import { siteConfig } from "@/lib/config";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./globals.css";
import "./editorial.css";
import "./journey.css";
import "./measurement.css";
import "./sharing.css";

export const metadata: Metadata = {
  robots: siteConfig.environment === "production" ? undefined : { index: false, follow: false },
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "El Peaje | Juego de cartas online",
    template: "%s | El Peaje",
  },
  description:
    "Juega gratis a El Peaje con rutas de tres o cuatro preguntas, cinco modos y tres dificultades para uno o dos jugadores.",
  applicationName: "El Peaje",
  category: "games",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteStructuredData()) }} />
        <div className="site-page">
          <SiteHeader />
          {children}
          <SiteFooter />
          <PrivacyRuntime />
        </div>
      </body>
    </html>
  );
}
