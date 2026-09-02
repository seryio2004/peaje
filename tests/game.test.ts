import assert from "node:assert/strict";
import test from "node:test";

import {
  answerSinglePlayer,
  type Card,
  confirmToll,
  continueAfterFailure,
  createDeck,
  type GameState,
  getAnswerOptions,
  getRoute,
  getScore,
  judgeAnswer,
  reachesStartFromLastFailureStreak,
  revealForJudge,
  shuffleDeck,
  startGame,
} from "../lib/game";

function card(suit: Card["suit"], rank: number): Card {
  return { id: `${suit}-${rank}`, suit, rank };
}

function gameState(overrides: Partial<GameState> = {}): GameState {
  return {
    mode: "one-player",
    variant: "classic",
    difficulty: "medium",
    route: getRoute("medium"),
    deck: [],
    initialCard: card("hearts", 10),
    slots: [null, null, null, null, null],
    position: 0,
    failures: 0,
    failureStreakFromLast: 0,
    tolls: 0,
    activePlayer: 1,
    phase: "playing",
    message: "",
    pendingPosition: null,
    endReason: null,
    ...overrides,
  };
}

test("creates a standard deck with 52 unique cards", () => {
  const deck = createDeck();

  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map(({ id }) => id)).size, 52);
  assert.deepEqual(
    [...new Set(deck.map(({ rank }) => rank))],
    Array.from({ length: 13 }, (_, index) => index + 2),
  );
});

test("shuffles without mutating the input deck", () => {
  const deck = createDeck();
  const originalIds = deck.map(({ id }) => id);
  const shuffled = shuffleDeck(deck, () => 0);

  assert.deepEqual(deck.map(({ id }) => id), originalIds);
  assert.notDeepEqual(shuffled.map(({ id }) => id), originalIds);
  assert.deepEqual(
    [...shuffled.map(({ id }) => id)].sort(),
    [...originalIds].sort(),
  );
});

test("completes the route and charges the forward toll once", () => {
  let state = gameState({
    deck: [
      card("spades", 11),
      card("clubs", 2),
      card("diamonds", 5),
      card("diamonds", 7),
    ],
  });

  state = answerSinglePlayer(state, "higher");
  assert.equal(state.position, 1);

  state = answerSinglePlayer(state, "rounded");
  assert.equal(state.phase, "toll");
  assert.equal(state.tolls, 1);
  assert.equal(state.failures, 0);

  state = confirmToll(state);
  assert.equal(state.position, 3);

  state = answerSinglePlayer(state, "red");
  assert.equal(state.position, 4);

  state = answerSinglePlayer(state, "diamonds");
  assert.equal(state.phase, "complete");
  assert.equal(state.endReason, "route-completed");
  assert.equal(state.failures, 0);
  assert.equal(state.tolls, 1);
});

test("counts a higher-or-lower tie as a failure", () => {
  const state = answerSinglePlayer(
    gameState({ deck: [card("diamonds", 10)] }),
    "higher",
  );

  assert.equal(state.phase, "failed");
  assert.equal(state.failures, 1);
  assert.equal(state.pendingPosition, 0);
});

test("charges one toll when a failure crosses it backwards", () => {
  let state = gameState({
    deck: [card("spades", 8)],
    slots: [card("hearts", 11), card("clubs", 2), null, null, null],
    position: 3,
  });

  state = answerSinglePlayer(state, "red");
  assert.equal(state.phase, "failed");
  assert.equal(state.failures, 1);

  state = continueAfterFailure(state);
  assert.equal(state.phase, "toll");
  assert.equal(state.position, 2);
  assert.equal(state.pendingPosition, 1);
  assert.equal(state.tolls, 1);
  assert.equal(state.failures, 1);

  state = confirmToll(state);
  assert.equal(state.phase, "playing");
  assert.equal(state.position, 1);
});

test("two-player mode draws once before the answer is judged", () => {
  let state = gameState({
    mode: "two-players",
    deck: [card("spades", 11)],
  });

  state = revealForJudge(state);
  assert.equal(state.phase, "judging");
  assert.equal(state.deck.length, 0);

  state = judgeAnswer(state, true);
  assert.equal(state.phase, "playing");
  assert.equal(state.position, 1);
});

test("builds a different route for each difficulty", () => {
  assert.deepEqual(getRoute("easy"), [
    "higher-lower",
    "toll",
    "red-black",
    "exact-suit",
  ]);
  assert.equal(getRoute("medium").length, 5);
  assert.equal(getRoute("medium").filter((step) => step === "toll").length, 1);
  assert.equal(getRoute("hard").length, 6);
  assert.equal(getRoute("hard").filter((step) => step === "toll").length, 2);
});

test("completes the easy route with three correct answers and one toll", () => {
  let state = gameState({
    difficulty: "easy",
    route: getRoute("easy"),
    slots: [null, null, null, null],
    deck: [
      card("spades", 11),
      card("diamonds", 5),
      card("diamonds", 7),
    ],
  });

  state = answerSinglePlayer(state, "higher");
  assert.equal(state.phase, "toll");
  assert.equal(state.tolls, 1);

  state = confirmToll(state);
  state = answerSinglePlayer(state, "red");
  state = answerSinglePlayer(state, "diamonds");

  assert.equal(state.phase, "complete");
  assert.equal(state.endReason, "route-completed");
  assert.equal(state.tolls, 1);
});

test("charges both forward tolls on the hard route", () => {
  let state = gameState({
    difficulty: "hard",
    route: getRoute("hard"),
    slots: [null, null, null, null, null, null],
    deck: [
      card("spades", 11),
      card("clubs", 2),
      card("diamonds", 5),
      card("diamonds", 7),
    ],
  });

  state = answerSinglePlayer(state, "higher");
  state = answerSinglePlayer(state, "rounded");
  assert.equal(state.phase, "toll");
  assert.equal(state.tolls, 1);

  state = confirmToll(state);
  state = answerSinglePlayer(state, "red");
  assert.equal(state.phase, "toll");
  assert.equal(state.tolls, 2);

  state = confirmToll(state);
  state = answerSinglePlayer(state, "diamonds");
  assert.equal(state.phase, "complete");
  assert.equal(state.tolls, 2);
});

test("charges the second hard toll when a failure crosses it backwards", () => {
  let state = gameState({
    difficulty: "hard",
    route: getRoute("hard"),
    slots: [
      card("hearts", 11),
      card("clubs", 2),
      null,
      card("diamonds", 5),
      null,
      null,
    ],
    position: 5,
    deck: [card("spades", 8)],
  });

  state = answerSinglePlayer(state, "diamonds");
  assert.equal(state.phase, "failed");

  state = continueAfterFailure(state);
  assert.equal(state.phase, "toll");
  assert.equal(state.position, 4);
  assert.equal(state.pendingPosition, 3);
  assert.equal(state.tolls, 1);

  state = confirmToll(state);
  assert.equal(state.position, 3);
});

test("points mode calculates failures plus double tolls", () => {
  assert.equal(getScore({ failures: 3, tolls: 2 }), 7);
});

test("cooperative mode ends when the team reaches six failures", () => {
  const state = answerSinglePlayer(
    gameState({
      variant: "cooperative",
      failures: 5,
      deck: [card("diamonds", 10)],
    }),
    "higher",
  );

  assert.equal(state.failures, 6);
  assert.equal(state.phase, "complete");
  assert.equal(state.endReason, "failure-limit");
});

test("quick turns alternates the active player after every judged answer", () => {
  let state = gameState({
    mode: "two-players",
    variant: "quick-turns",
    deck: [card("spades", 11), card("diamonds", 4)],
  });

  state = revealForJudge(state);
  state = judgeAnswer(state, true);
  assert.equal(state.activePlayer, 2);

  state = revealForJudge(state);
  state = judgeAnswer(state, false);
  assert.equal(state.activePlayer, 1);
});

test("quick turns always starts as a two-player game", () => {
  const state = startGame({
    mode: "one-player",
    variant: "quick-turns",
    difficulty: "easy",
  });

  assert.equal(state.mode, "two-players");
});

test("safe toll replaces the drinking instruction with an agreed challenge", () => {
  let state = gameState({
    variant: "safe-toll",
    deck: [card("spades", 11), card("clubs", 2)],
  });

  state = answerSinglePlayer(state, "higher");
  state = answerSinglePlayer(state, "rounded");

  assert.equal(state.phase, "toll");
  assert.match(state.message, /reto acordado/i);
  assert.doesNotMatch(state.message, /bebe/i);
});

test("detects a consecutive retreat from the last to the first medium question", () => {
  let state = gameState({
    slots: [
      card("hearts", 11),
      card("clubs", 2),
      null,
      card("diamonds", 5),
      null,
    ],
    position: 4,
    deck: [card("spades", 8), card("spades", 9), card("diamonds", 7)],
  });

  state = answerSinglePlayer(state, "hearts");
  assert.equal(state.failureStreakFromLast, 1);
  assert.equal(reachesStartFromLastFailureStreak(state), false);

  state = continueAfterFailure(state);
  state = answerSinglePlayer(state, "red");
  assert.equal(state.failureStreakFromLast, 2);
  assert.equal(reachesStartFromLastFailureStreak(state), false);

  state = continueAfterFailure(state);
  state = confirmToll(state);
  state = answerSinglePlayer(state, "rounded");
  assert.equal(state.failureStreakFromLast, 3);
  assert.equal(reachesStartFromLastFailureStreak(state), true);
});

test("detects the shorter retreat chain on easy difficulty", () => {
  let state = gameState({
    difficulty: "easy",
    route: getRoute("easy"),
    slots: [card("hearts", 11), null, card("diamonds", 5), null],
    position: 3,
    deck: [card("spades", 8), card("spades", 9)],
  });

  state = answerSinglePlayer(state, "hearts");
  state = continueAfterFailure(state);
  state = answerSinglePlayer(state, "red");

  assert.equal(state.failureStreakFromLast, 2);
  assert.equal(reachesStartFromLastFailureStreak(state), true);
});

test("a correct answer cancels the retreat chain", () => {
  let state = gameState({
    slots: [
      card("hearts", 11),
      card("clubs", 2),
      null,
      card("diamonds", 5),
      null,
    ],
    position: 4,
    deck: [card("spades", 8), card("diamonds", 9)],
  });

  state = answerSinglePlayer(state, "hearts");
  state = continueAfterFailure(state);
  state = answerSinglePlayer(state, "red");

  assert.equal(state.failureStreakFromLast, 0);
});

test("five accumulated failures no longer trigger the retreat effect", () => {
  const state = answerSinglePlayer(
    gameState({
      failures: 4,
      position: 0,
      deck: [card("diamonds", 10)],
    }),
    "higher",
  );

  assert.equal(state.failures, 5);
  assert.equal(state.failureStreakFromLast, 0);
  assert.equal(reachesStartFromLastFailureStreak(state), false);
});

test("all supported settings finish without invalid route positions", () => {
  const variants: GameState["variant"][] = [
    "classic",
    "points",
    "cooperative",
    "quick-turns",
    "safe-toll",
  ];
  const difficulties: GameState["difficulty"][] = ["easy", "medium", "hard"];

  for (const variant of variants) {
    for (const difficulty of difficulties) {
      let state = startGame(
        {
          mode: variant === "quick-turns" ? "two-players" : "one-player",
          variant,
          difficulty,
        },
        () => 0,
      );
      let actions = 0;

      while (state.phase !== "complete" && actions < 200) {
        assert.ok(state.position >= 0 && state.position < state.route.length);
        assert.equal(state.slots.length, state.route.length);

        if (state.phase === "toll") {
          state = confirmToll(state);
        } else if (state.phase === "failed") {
          state = continueAfterFailure(state);
        } else if (state.phase === "judging") {
          state = judgeAnswer(state, true);
        } else if (state.mode === "two-players") {
          state = revealForJudge(state);
        } else {
          const step = state.route[state.position];
          const [answer] = getAnswerOptions(step);
          assert.ok(answer);
          state = answerSinglePlayer(state, answer.value);
        }

        actions += 1;
      }

      assert.equal(state.phase, "complete");
      assert.ok(actions < 200);
    }
  }
});
