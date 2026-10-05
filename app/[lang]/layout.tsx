import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { FOREIGN_LOCALES, isForeignLocale, LOCAL_PAGES, localPath } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "../language-switcher";
import PrivacySettingsButton from "../privacy-settings-button";
import { gameText as t } from "@/lib/game-i18n";
import PrivacyRuntime from "../privacy-runtime";
import "../globals.css";
import "../editorial.css";
import "../journey.css";
import "../measurement.css";
import "../sharing.css";

export const metadata: Metadata = {
  robots: siteConfig.environment === "production" ? { index: true, follow: true } : { index: false, follow: false },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: "El Peaje", category: "games",
};
export function generateStaticParams() { return FOREIGN_LOCALES.map(lang => ({ lang })); }
export const dynamicParams = false;

export default async function LanguageLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isForeignLocale(lang)) notFound();
  const copy = translations[lang];
  return <html lang={lang}><body><div className="site-page">
    <header className="site-header">
      <Link prefetch={false} className="site-brand" href={localPath(lang, "home")} ><span aria-hidden="true">P</span>El Peaje</Link>
      <nav aria-label={t(lang, "Navegación principal")}>{LOCAL_PAGES.filter(page => page !== "party" && page !== "faq").map(page => <Link prefetch={false} href={localPath(lang, page)} key={page}>{copy.nav[page]}</Link>)}</nav>
      <LanguageSwitcher />
    </header>
    {children}
    <footer className="site-footer"><div><strong>El Peaje</strong><p>{copy.footer}</p></div>
      <nav aria-label={t(lang, "Más páginas")}>{LOCAL_PAGES.filter(page => page === "party" || page === "faq").map(page => <Link prefetch={false} key={page} href={localPath(lang, page)}>{copy.nav[page]}</Link>)}<Link prefetch={false} href="/sobre-el-juego/">{lang === "en" ? "About (Spanish)" : lang === "it" ? "Progetto (spagnolo)" : lang === "de" ? "Projekt (Spanisch)" : lang === "fr" ? "Projet (espagnol)" : "Projeto (espanhol)"}</Link><Link prefetch={false} href="/contacto/">{lang === "en" ? "Contact (Spanish)" : lang === "it" ? "Contatto (spagnolo)" : lang === "de" ? "Kontakt (Spanisch)" : lang === "fr" ? "Contact (espagnol)" : "Contacto (espanhol)"}</Link><Link prefetch={false} href="/privacidad/">{lang === "en" ? "Privacy (Spanish)" : lang === "it" ? "Privacy (spagnolo)" : lang === "de" ? "Datenschutz (Spanisch)" : lang === "fr" ? "Confidentialité (espagnol)" : "Privacidade (espanhol)"}</Link><Link prefetch={false} href="/cookies/">Cookies ({lang === "en" ? "Spanish" : lang === "it" ? "spagnolo" : lang === "de" ? "Spanisch" : lang === "fr" ? "espagnol" : "espanhol"})</Link><Link prefetch={false} href="/aviso-legal/">{copy.legalLabel}</Link><PrivacySettingsButton locale={lang} /></nav>
    </footer>
    <PrivacyRuntime locale={lang} />
  </div></body></html>;
}
