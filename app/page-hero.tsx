import type { ReactNode } from "react";
import PageBreadcrumb from "./page-breadcrumb";
import type { SitePath } from "@/lib/site-routes";

export default function PageHero({
  kicker,
  path,
  title,
  children,
}: {
  kicker: string;
  path: Exclude<SitePath, "/">;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="content-page-hero">
      <div className="guide-wayfinding"><PageBreadcrumb path={path} title={title} /><span>EP-52 / GUÍA DE RUTA</span></div>
      <p className="content-kicker">{kicker}</p>
      <h1>{title}</h1>
      <div className="content-page-intro">{children}</div>
      <span className="guide-stamp" aria-hidden="true">♠</span>
    </header>
  );
}
