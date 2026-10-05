import type { ForeignLocale } from "../i18n";
import type { Translation } from "./types";
import { en } from "./en";
import { it } from "./it";
import { de } from "./de";
import { fr } from "./fr";
import { pt } from "./pt";
export const translations: Record<ForeignLocale, Translation> = { en, it, de, fr, pt };
