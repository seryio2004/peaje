import assert from "node:assert/strict";
import test from "node:test";
import {
  answerSinglePlayer, confirmToll, continueAfterFailure, getAnswerOptions, getQuestionCount,
  getRoute, normalizeGameSettings, resolvePotatoPass, startGame,
  type Card, type GameState, type Prediction,
} from "../lib/game";
import { gameEventContext } from "../lib/game-analytics";

const card = (rank: number, suit: Card["suit"] = "hearts"): Card => ({ id: `${suit}-${rank}`, rank, suit });
const randomFrom = (seed: number) => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 2 ** 32;
};
function potato(overrides: Partial<GameState> = {}): GameState {
  return {
    ...startGame({ mode: "group", variant: "hot-potato", difficulty: "normal", playerCount: 5 }, randomFrom(1)),
    initialCard: card(10),
    deck: [card(11), card(12), card(13)],
    hotPotato: { passCardIds: [card(11).id], passAvailable: false },
    ...overrides,
  };
}

test("normal potato uses the existing hard route; hard adds parity before the last suit", () => {
  const normal = potato();
  const hard = startGame({ mode: "group", variant: "hot-potato", difficulty: "hard" });
  assert.deepEqual(normal.route, getRoute("hard"));
  assert.equal(getQuestionCount(normal.route), 4);
  assert.equal(getQuestionCount(hard.route), 5);
  assert.equal(hard.route.filter(step => step === "toll").length, 2);
  assert.deepEqual(hard.route.slice(-2), ["even-odd", "exact-suit"]);
  assert.equal(hard.slots.length, hard.route.length);
});

test("each game chooses 20 unique pass cards from its 51 hidden cards at setup", () => {
  const settings = { mode: "group", variant: "hot-potato", difficulty: "normal" } as const;
  const first = startGame(settings, randomFrom(12));
  const second = startGame(settings, randomFrom(13));
  const ids = first.hotPotato!.passCardIds;
  assert.equal(ids.length, 20);
  assert.equal(new Set(ids).size, 20);
  assert.equal(ids.includes(first.initialCard.id), false);
  assert.ok(ids.every(id => first.deck.some(card => card.id === id)));
  assert.notDeepEqual(ids, second.hotPotato!.passCardIds);
  assert.equal(first.hotPotato!.passAvailable, false);
  assert.equal(first.slots.every(slot => slot === null), true);
});

test("only a correct answer on a pass card offers a change of player", () => {
  const initial = potato();
  const success = answerSinglePlayer(initial, "higher");
  assert.equal(success.hotPotato!.passAvailable, true);
  assert.deepEqual(success.hotPotato!.passCardIds, initial.hotPotato!.passCardIds);
  assert.equal(success.activePlayer, 1);
  assert.equal(success.position, 1);
  assert.equal(initial.hotPotato!.passAvailable, false);
  const ordinary = answerSinglePlayer(potato({ hotPotato: { passCardIds: [], passAvailable: false } }), "higher");
  assert.equal(ordinary.hotPotato!.passAvailable, false);
  assert.equal(ordinary.activePlayer, 1);
  const failure = answerSinglePlayer(initial, "lower");
  assert.equal(failure.hotPotato!.passAvailable, false);
  assert.equal(failure.phase, "failed");
  assert.equal(failure.activePlayer, 1);
  assert.equal(continueAfterFailure(failure).activePlayer, 1);
});

test("an earned pass can go to any other player or be declined, without drawing a card", () => {
  const earned = answerSinglePlayer(potato(), "higher");
  for (const player of [1, 2, 3, 4, 5]) {
    const passed = resolvePotatoPass(earned, player);
    assert.equal(passed.activePlayer, player);
    assert.equal(passed.hotPotato!.passAvailable, false);
    assert.equal(passed.deck, earned.deck);
    assert.equal(passed.slots, earned.slots);
    assert.equal(passed.position, earned.position);
    assert.equal(resolvePotatoPass(passed, 2), passed);
  }
  for (const player of [0, -1, 6, 1.5, NaN]) assert.equal(resolvePotatoPass(earned, player), earned);
  assert.equal(answerSinglePlayer(earned, "rounded"), earned);
  const unearned = potato();
  assert.equal(resolvePotatoPass(unearned, 2), unearned);
});

test("the current holder pays a forward toll before resolving the earned pass", () => {
  const earned = answerSinglePlayer(potato({ position: 1 }), "rounded");
  assert.equal(earned.phase, "toll");
  assert.equal(earned.tolls, 1);
  assert.equal(earned.hotPotato!.passAvailable, true);
  assert.equal(resolvePotatoPass(earned, 4), earned);
  assert.match(earned.message, /reto acordado/);
  const afterToll = confirmToll(earned);
  assert.equal(afterToll.activePlayer, 1);
  assert.equal(afterToll.hotPotato!.passAvailable, true);
  const passed = resolvePotatoPass(afterToll, 4);
  assert.equal(passed.activePlayer, 4);
  assert.equal(passed.position, 3);
  assert.equal(passed.tolls, 1);
});

test("failure retreats across a toll and keeps the current holder even on a pass card", () => {
  const failed = answerSinglePlayer(potato({ position: 5, activePlayer: 4 }), "spades");
  assert.equal(failed.hotPotato!.passAvailable, false);
  const toll = continueAfterFailure(failed);
  assert.equal(toll.phase, "toll");
  assert.equal(toll.activePlayer, 4);
  const continued = confirmToll(toll);
  assert.equal(continued.position, 3);
  assert.equal(continued.activePlayer, 4);
  assert.equal(continued.failures, 1);
});

test("parity uses every numeric rank including J=11, Q=12, K=13 and A=14", () => {
  const started = startGame({ mode: "group", variant: "hot-potato", difficulty: "hard" });
  for (let rank = 2; rank <= 14; rank++) {
    const state = { ...started, position: 5, deck: [card(rank), card(2, "clubs")] };
    const correct: Prediction = rank % 2 === 0 ? "even" : "odd";
    const wrong: Prediction = correct === "even" ? "odd" : "even";
    assert.equal(answerSinglePlayer(state, correct).position, 6);
    assert.equal(answerSinglePlayer(state, wrong).phase, "failed");
    assert.equal(answerSinglePlayer(state, "hearts").phase, "failed");
  }
});

test("winning or consuming the last card does not offer an unusable pass", () => {
  const won = answerSinglePlayer(potato({ position: 5 }), "hearts");
  assert.equal(won.phase, "complete");
  assert.equal(won.endReason, "route-completed");
  assert.equal(won.hotPotato!.passAvailable, false);
  const lastCard = answerSinglePlayer(potato({ deck: [card(11)] }), "higher");
  assert.equal(lastCard.hotPotato!.passAvailable, false);
  const empty = answerSinglePlayer(lastCard, "rounded");
  assert.equal(empty.endReason, "deck-empty");
  assert.equal(empty.activePlayer, 1);
});

test("settings constrain group size and isolate the two potato difficulties", () => {
  for (const count of [undefined, NaN, Infinity, 3.5]) {
    assert.equal(normalizeGameSettings({ mode: "one-player", variant: "hot-potato", difficulty: "easy", playerCount: count }).playerCount, 3);
  }
  assert.equal(startGame("group").variant, "hot-potato");
  for (const [input, expected] of [[2, 3], [5, 5], [20, 8]]) {
    const settings = normalizeGameSettings({ mode: "two-players", variant: "hot-potato", difficulty: "medium", playerCount: input });
    assert.equal(settings.mode, "group");
    assert.equal(settings.difficulty, "normal");
    assert.equal(settings.playerCount, expected);
  }
  assert.deepEqual(normalizeGameSettings({ mode: "group", variant: "classic", difficulty: "normal", playerCount: 5 }), {
    mode: "one-player", variant: "classic", difficulty: "hard",
  });
});

test("restarting preserves group settings and draws a fresh set of hidden pass cards", () => {
  const first = potato();
  const repeated = startGame(first, randomFrom(42));
  assert.equal(repeated.playerCount, 5);
  assert.equal(repeated.difficulty, "normal");
  assert.equal(repeated.activePlayer, 1);
  assert.equal(repeated.failures, 0);
  assert.equal(repeated.hotPotato!.passAvailable, false);
  assert.notDeepEqual(repeated.hotPotato!.passCardIds, first.hotPotato!.passCardIds);
});

test("group events identify the mode without exporting hidden pass cards", () => {
  const event = gameEventContext(potato());
  assert.equal(event.mode_id, "mode-hot-potato");
  assert.equal(event.player_mode_id, "players-group");
  assert.equal(event.difficulty_id, "difficulty-normal");
  assert.equal("hotPotato" in event, false);
  assert.equal("passCardIds" in event, false);
});

test("both potato difficulties finish with valid routes and players across many shuffles", () => {
  for (const difficulty of ["normal", "hard"] as const) {
    for (let seed = 1; seed <= 60; seed++) {
      let state = startGame({ mode: "group", variant: "hot-potato", difficulty, playerCount: 8 }, randomFrom(seed));
      const passIds = [...state.hotPotato!.passCardIds];
      let steps = 0;
      while (state.phase !== "complete" && steps++ < 250) {
        assert.ok(state.position >= 0 && state.position < state.route.length);
        assert.ok(state.activePlayer >= 1 && state.activePlayer <= 8);
        assert.deepEqual(state.hotPotato!.passCardIds, passIds);
        if (state.phase === "toll") state = confirmToll(state);
        else if (state.hotPotato!.passAvailable) state = resolvePotatoPass(state, state.activePlayer % 8 + 1);
        else if (state.phase === "failed") state = continueAfterFailure(state);
        else state = answerSinglePlayer(state, getAnswerOptions(state.route[state.position])[0].value);
      }
      assert.equal(state.phase, "complete");
      assert.ok(steps < 250);
    }
  }
});
