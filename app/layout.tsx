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
  robots: siteConfig.environment === "production" ? { index: true, follow: true } : { index: false, follow: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "El Peaje | Juego de cartas online",
    template: "%s | El Peaje",
  },
  description:
    "Juega gratis a El Peaje: seis modos para jugar solo, en pareja o en grupo, con rutas de tres a cinco preguntas.",
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
