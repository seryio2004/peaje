import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "./page-hero";
import type { SitePath } from "@/lib/site-routes";

export default function EditorialArticle({ path, title, intro, children }: { path: Exclude<SitePath, "/">; title: string; intro: string; children: ReactNode }) {
  return <main className="content-page"><div className="content-shell narrow-content">
    <PageHero path={path} kicker="Cuaderno de ruta" title={title}><p>{intro}</p></PageHero>
    <article className="legal-copy editorial-article">{children}</article>
    <nav className="article-related" aria-label="Continuar leyendo"><Link prefetch={false} href="/como-jugar">Reglas</Link><Link prefetch={false} href="/modos-de-juego">Modos</Link><Link prefetch={false} href="/probabilidades">Probabilidades</Link><Link prefetch={false} href="/estrategia">Estrategia</Link><Link prefetch={false} href="/variantes">Variantes</Link><Link prefetch={false} href="/desarrollo">Desarrollo</Link></nav>
    <p><Link prefetch={false} className="primary-button" href="/jugar">Llevarlo a la partida →</Link></p>
  </div></main>;
}
