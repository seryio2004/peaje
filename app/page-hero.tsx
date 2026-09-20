import type { ReactNode } from "react";
import Link from "next/link";

export default function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="content-page-hero">
      <div className="guide-wayfinding"><Link href="/">← Inicio</Link><span>EP-52 / GUÍA DE RUTA</span></div>
      <p className="content-kicker">{kicker}</p>
      <h1>{title}</h1>
      <div className="content-page-intro">{children}</div>
      <span className="guide-stamp" aria-hidden="true">♠</span>
    </header>
  );
}
