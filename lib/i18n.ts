import type { Metadata } from "next";
import { siteConfig } from "./config";

export const LANGUAGES = ["es", "en", "it", "de", "fr", "pt"] as const;
export type Locale = (typeof LANGUAGES)[number];
export type ForeignLocale = Exclude<Locale, "es">;
export const FOREIGN_LOCALES = LANGUAGES.filter((lang): lang is ForeignLocale => lang !== "es");
export type LocalPage = "home" | "play" | "rules" | "modes" | "drinking" | "party" | "faq";
export const LOCAL_PAGES: LocalPage[] = ["home", "play", "rules", "modes", "drinking", "party", "faq"];

const slugs: Record<Locale, Record<LocalPage, string>> = {
  es: { home: "", play: "jugar", rules: "como-jugar", modes: "modos-de-juego", drinking: "juegos-de-beber", party: "previa", faq: "preguntas-frecuentes" },
  en: { home: "", play: "play", rules: "how-to-play", modes: "game-modes", drinking: "drinking-games", party: "party-card-game", faq: "faq" },
  it: { home: "", play: "gioca", rules: "come-si-gioca", modes: "modalita-di-gioco", drinking: "giochi-da-bere", party: "gioco-per-feste", faq: "domande-frequenti" },
  de: { home: "", play: "spielen", rules: "spielregeln", modes: "spielmodi", drinking: "trinkspiele", party: "party-kartenspiel", faq: "haeufige-fragen" },
  fr: { home: "", play: "jouer", rules: "regles-du-jeu", modes: "modes-de-jeu", drinking: "jeux-a-boire", party: "jeu-de-soiree", faq: "questions-frequentes" },
  pt: { home: "", play: "jogar", rules: "como-jogar", modes: "modos-de-jogo", drinking: "jogos-de-beber", party: "jogo-para-festas", faq: "perguntas-frequentes" },
};
export const LANGUAGE_NAMES: Record<Locale, string> = { es: "Español", en: "English", it: "Italiano", de: "Deutsch", fr: "Français", pt: "Português" };
export function isForeignLocale(value: string): value is ForeignLocale {
  return FOREIGN_LOCALES.includes(value as ForeignLocale);
}
export function localPath(locale: Locale, page: LocalPage): string {
  const prefix = locale === "es" ? "" : "/" + locale;
  const slug = slugs[locale][page];
  return prefix + (slug ? "/" + slug : "") + "/";
}
export function pageForSlug(locale: ForeignLocale, slug: string): LocalPage | undefined {
  return LOCAL_PAGES.find(page => page !== "home" && slugs[locale][page] === slug);
}
export function languageAlternates(page: LocalPage): Record<string, string> {
  return Object.fromEntries([...LANGUAGES.map(locale => [locale, siteConfig.siteUrl + localPath(locale, page)]), ["x-default", siteConfig.siteUrl + localPath("es", page)]]);
}
export function localizedMetadata(locale: ForeignLocale, page: LocalPage, title: string, description: string): Metadata {
  const url = siteConfig.siteUrl + localPath(locale, page);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url, languages: languageAlternates(page) },
    openGraph: { type: "website", locale, siteName: "El Peaje", title, description, url, images: [{ url: siteConfig.siteUrl + "/share-image.png", width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [siteConfig.siteUrl + "/share-image.png"] },
  };
}
