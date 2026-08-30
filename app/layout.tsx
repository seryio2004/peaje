import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Peaje",
  description: "Versión web del juego de cartas El Peaje",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
