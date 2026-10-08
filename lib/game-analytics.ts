import { trackEvent, type EventName, type EventProperties } from "./analytics";
import { MODE_IDS, PLAYER_MODE_IDS, DIFFICULTY_IDS, QUESTION_CATALOG } from "./game-catalog";
import { getScore, type GameState } from "./game";
import { createAnalyticsId } from "./analytics-id";

type Emit = (name: EventName, properties?: EventProperties) => boolean;
export function gameEventContext(game: GameState): EventProperties {
  const question = QUESTION_CATALOG[game.route[game.position]];
  return { mode_id: MODE_IDS[game.variant], player_mode_id: PLAYER_MODE_IDS[game.mode],
    difficulty_id: DIFFICULTY_IDS[game.difficulty], question_id: question?.id,
    category_id: question?.categoryId, route_index: game.position, failures: game.failures,
    tolls: game.tolls, score: getScore(game) };
}
/** Explicit transitions keep render effects and Strict Mode from duplicating events. */
export function createGameAnalytics(emit: Emit = trackEvent, now = Date.now) {
  const safelyEmit: Emit = (name, properties) => {
    try { return emit(name, properties); } catch { return false; }
  };
  let run: { id: string; startedAt: number; ended: boolean; game: GameState } | null = null;
  const properties = () => run ? {
    ...gameEventContext(run.game), game_id: run.id, duration_ms: Math.max(0, now() - run.startedAt),
  } : {};
  return {
    start(game: GameState, source: "setup" | "repeat" = "setup") {
      const previous = run;
      if (source === "repeat" && previous?.ended) safelyEmit("game_repeat", properties());
      const id = createAnalyticsId();
      if (!id) { run = null; return; }
      const accepted = safelyEmit("game_start", { ...gameEventContext(game), game_id: id, source,
        ...(source === "repeat" && previous ? { previous_game_id: previous.id } : {}) });
      run = accepted ? { id, startedAt: now(), ended: false, game } : null;
    },
    update(game: GameState) {
      if (!run || run.ended) return;
      run.game = game;
      if (game.phase === "complete") {
        run.ended = true;
        safelyEmit("game_end", { ...properties(), end_reason: game.endReason ?? "unknown" });
      }
    },
    abandon(reason: "new_game" | "navigation" | "page_exit") {
      if (!run || run.ended) return;
      run.ended = true;
      safelyEmit("game_abandon", { ...properties(), reason });
    },
    share(method: "native" | "clipboard") {
      if (run) safelyEmit("game_share", { ...properties(), method, result: method === "native" ? "shared" : "copied" });
    },
    forget() { run = null; },
  };
}
