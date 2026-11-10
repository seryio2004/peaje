import Link from "next/link";
import { pageStructuredData, serializeJsonLd } from "@/lib/seo";
import type { SitePath } from "@/lib/site-routes";

export default function PageBreadcrumb({ path, title }: { path: Exclude<SitePath, "/">; title: string }) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageStructuredData(path, title)) }} />
    <nav className="article-breadcrumb" aria-label="Ruta de navegación">
      <Link prefetch={false} href="/">Inicio</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span>
    </nav>
  </>;
}
