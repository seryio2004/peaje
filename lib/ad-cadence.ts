import type { GameDifficulty } from "./game";

/** One long game or two short games earns one post-game ad opportunity. */
export function advanceAdCadence(shortGameCredit: 0 | 1, difficulty: GameDifficulty): {
  shortGameCredit: 0 | 1;
  showAd: boolean;
} {
  const weight = difficulty === "easy" || difficulty === "medium" ? 1 : 2;
  const total = shortGameCredit + weight;
  return {
    shortGameCredit: (total % 2) as 0 | 1,
    showAd: total >= 2,
  };
}
