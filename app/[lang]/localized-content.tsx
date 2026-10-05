import Link from "next/link";
import type { ForeignLocale, LocalPage } from "@/lib/i18n";
import { localPath } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function LocalizedContent({ lang, page }: { lang: ForeignLocale; page: Exclude<LocalPage, "play"> }) {
  const copy = translations[lang];
  const content = copy.pages[page];
  const ctaPage = page === "home" || page === "rules" || page === "modes" || page === "drinking" || page === "party" || page === "faq" ? "play" : "home";
  return <main className="content-page localized-page">
    <div className="content-shell">
      <header className="content-page-hero">
        <div className="guide-wayfinding"><Link prefetch={false} href={localPath(lang, "home")}>← {copy.homeLabel}</Link><span>EP-52 / {copy.guideLabel}</span></div>
        <p className="content-kicker">{content.kicker}</p>
        <h1>{content.title}</h1>
        <div className="content-page-intro"><p>{content.intro}</p><Link prefetch={false} className="primary-button" href={localPath(lang, ctaPage)}>{content.cta}</Link></div>
        <span className="guide-stamp" aria-hidden="true">♠</span>
      </header>
      {content.sections.map((section, index) => <section className="content-section" key={section.heading} aria-labelledby={"section-" + index}>
        <div className="content-heading"><h2 id={"section-" + index}>{section.heading}</h2>{section.body && <p>{section.body}</p>}</div>
        {section.items && <div className="variants-grid mode-detail-grid">{section.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}
        {section.link && <p><Link prefetch={false} className="secondary-button" href={localPath(lang, section.link)}>{section.linkLabel} →</Link></p>}
      </section>)}
    </div>
  </main>;
}
