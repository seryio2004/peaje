import Link from "next/link";
import { notFound } from "next/navigation";
import { FOREIGN_LOCALES, isForeignLocale, LOCAL_PAGES, localPath, localizedMetadata, pageForSlug } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import GameWithAds from "../../game-with-ads";
import LocalizedContent from "../localized-content";

export const dynamicParams = false;
export function generateStaticParams() {
  return FOREIGN_LOCALES.flatMap(lang => LOCAL_PAGES.filter(page => page !== "home").map(page => ({ lang, slug: localPath(lang, page).split("/")[2] })));
}
export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isForeignLocale(lang)) notFound();
  const page = pageForSlug(lang, slug);
  if (!page) notFound();
  const { title, description } = translations[lang].pages[page];
  return localizedMetadata(lang, page, title, description);
}
export default async function LocalizedPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isForeignLocale(lang)) notFound();
  const page = pageForSlug(lang, slug);
  if (!page) notFound();
  if (page !== "play") return <LocalizedContent lang={lang} page={page} />;
  const content = translations[lang].pages.play;
  return <main className="play-page localized-page">
    <section className="content-shell" aria-label={content.title}>
      <p className="content-kicker">{content.kicker}</p><p>{content.intro}</p>
    </section>
    <section className="game-stage" aria-label={content.title}><GameWithAds locale={lang} /></section>
    <section className="post-game-guide"><div><h2>{content.sections[0].heading}</h2><p>{content.sections[0].body} <Link href={localPath(lang, "rules")}>{content.sections[0].linkLabel}</Link></p></div>
      <div><h2>{content.sections[1].heading}</h2><p>{content.sections[1].body} <Link href={localPath(lang, "modes")}>{content.sections[1].linkLabel}</Link></p></div>
    </section>
  </main>;
}
