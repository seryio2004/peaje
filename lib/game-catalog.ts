import type { GameDifficulty, GameMode, GameVariant, RouteStep } from "./game";

/** Immutable IDs: labels/translations and display order must never be used as identifiers. */
export const CATEGORY_IDS = {
  rank: "cat-rank", shape: "cat-suit-shape", color: "cat-color", suit: "cat-suit", toll: "cat-toll",
} as const;
export const QUESTION_CATALOG = {
  "higher-lower": { id: "q-higher-lower", categoryId: CATEGORY_IDS.rank },
  "rounded-pointed": { id: "q-rounded-pointed", categoryId: CATEGORY_IDS.shape },
  "red-black": { id: "q-red-black", categoryId: CATEGORY_IDS.color },
  "exact-suit": { id: "q-exact-suit", categoryId: CATEGORY_IDS.suit },
  toll: { id: "step-toll", categoryId: CATEGORY_IDS.toll },
} as const satisfies Record<RouteStep, { id: string; categoryId: string }>;
export const MODE_IDS = {
  classic: "mode-classic", points: "mode-points", cooperative: "mode-cooperative",
  "quick-turns": "mode-quick-turns", "safe-toll": "mode-safe-toll",
} as const satisfies Record<GameVariant, string>;
export const PLAYER_MODE_IDS = {
  "one-player": "players-solo", "two-players": "players-pair",
} as const satisfies Record<GameMode, string>;
export const DIFFICULTY_IDS = {
  easy: "difficulty-easy", medium: "difficulty-medium", hard: "difficulty-hard",
} as const satisfies Record<GameDifficulty, string>;
