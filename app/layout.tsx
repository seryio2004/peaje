import type { Metadata } from "next";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seryio2004.github.io/peaje/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "El Peaje | Juego de cartas online",
    template: "%s | El Peaje",
  },
  description:
    "Juega gratis a El Peaje con rutas de tres o cuatro preguntas, cinco modos y tres dificultades para uno o dos jugadores.",
  keywords: [
    "juego de cartas online",
    "El Peaje",
    "juego para dos jugadores",
    "juego de baraja francesa",
    "juego de predicciones",
  ],
  applicationName: "El Peaje",
  category: "games",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <div className="site-page">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
