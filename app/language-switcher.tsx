"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGUAGES, LANGUAGE_NAMES, LOCAL_PAGES, localPath, type LocalPage } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const page = LOCAL_PAGES.find(candidate => LANGUAGES.some(lang => localPath(lang, candidate).replace(/\/$/, "") === pathname?.replace(/\/$/, ""))) ?? "home";
  return <nav className="language-switcher" aria-label="Language / Idioma">
    {LANGUAGES.map(lang => <Link prefetch={false} key={lang} href={localPath(lang, page as LocalPage)} hrefLang={lang} lang={lang} aria-current={pathname?.replace(/\/$/, "") === localPath(lang, page).replace(/\/$/, "") ? "page" : undefined} title={LANGUAGE_NAMES[lang]}>{lang.toUpperCase()}</Link>)}
  </nav>;
}
