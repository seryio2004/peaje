import { notFound } from "next/navigation";
import { isForeignLocale, localizedMetadata } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import LocalizedContent from "./localized-content";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isForeignLocale(lang)) notFound();
  const { title, description } = translations[lang].pages.home;
  return localizedMetadata(lang, "home", title, description);
}
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isForeignLocale(lang)) notFound();
  return <LocalizedContent lang={lang} page="home" />;
}
