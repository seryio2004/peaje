import type { LocalPage } from "../i18n";
export type ContentSection = { heading: string; body?: string; items?: { title: string; body: string }[]; link?: LocalPage; linkLabel?: string };
export type PageContent = { title: string; description: string; kicker: string; intro: string; cta: string; sections: ContentSection[] };
export type Translation = { nav: Record<LocalPage, string>; homeLabel: string; guideLabel: string; footer: string; legalLabel: string; pages: Record<LocalPage, PageContent> };
