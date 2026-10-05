import assert from "node:assert/strict";
import test from "node:test";
import { FOREIGN_LOCALES, LANGUAGES, LOCAL_PAGES, languageAlternates, localPath, pageForSlug } from "../lib/i18n";
import { translations } from "../lib/translations";
import { gameText, gameFormat, gameMessage } from "../lib/game-i18n";
import { pageMetadata } from "../lib/seo";

test("each translated page has a unique route and reciprocal language alternatives", () => {
  const all = LANGUAGES.flatMap(lang => LOCAL_PAGES.map(page => localPath(lang, page)));
  assert.equal(new Set(all).size, all.length);
  for (const lang of FOREIGN_LOCALES) for (const page of LOCAL_PAGES) {
    const copy = translations[lang].pages[page];
    assert.ok(copy.title && copy.description && copy.intro && copy.sections.length);
    assert.equal(languageAlternates(page)[lang], "https://elpejae.com" + localPath(lang, page));
    if (page !== "home") assert.equal(pageForSlug(lang, localPath(lang, page).split("/")[2]), page);
  }
  assert.equal(pageMetadata("/jugar").alternates?.languages?.en, "https://elpejae.com/en/play/");
  assert.equal(pageMetadata("/juegos-de-beber").alternates?.languages?.de, "https://elpejae.com/de/trinkspiele/");
});

test("game questions and dynamic results are translated for every supported language", () => {
  for (const lang of FOREIGN_LOCALES) {
    assert.notEqual(gameText(lang, "¿La siguiente carta será mayor o menor?"), "¿La siguiente carta será mayor o menor?");
    assert.ok(gameFormat(lang, "Pregunta {n} de {total}", { n: 2, total: 4 }).includes("2"));
    assert.ok(gameMessage(lang, "¡Has completado el recorrido! Puntuación final: 7.").includes("7"));
    assert.ok(gameMessage(lang, "Móvil para el jugador 3. Sigue desde aquí.").includes("3"));
    assert.notEqual(gameMessage(lang, "Has llegado a El Peaje: cumple el peaje acordado para continuar."), "Has llegado a El Peaje: cumple el peaje acordado para continuar.");
  }
});
