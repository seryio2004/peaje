import type { Locale } from "@/lib/i18n";
import Game from "./game";

/** Kept for existing localized imports. All game routes remain ad-free. */
export default function GameWithAds({ locale = "es" }: { locale?: Locale }) {
  return <Game locale={locale} />;
}
