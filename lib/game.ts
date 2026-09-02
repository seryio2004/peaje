export type GameMode = "one-player" | "two-players";

export type GameVariant =
  | "classic"
  | "points"
  | "cooperative"
  | "quick-turns"
  | "safe-toll";

export type GameDifficulty = "easy" | "medium" | "hard";

export type RouteStep =
  | "higher-lower"
  | "rounded-pointed"
  | "toll"
  | "red-black"
  | "exact-suit";

export type GameSettings = {
  mode: GameMode;
  variant: GameVariant;
  difficulty: GameDifficulty;
};

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export type Prediction =
  | "higher"
  | "lower"
  | "rounded"
  | "pointed"
  | "red"
  | "black"
  | Suit;

export type GamePhase =
  | "playing"
  | "judging"
  | "failed"
  | "toll"
  | "complete";

export type Card = {
  id: string;
  suit: Suit;
  rank: number;
};

export type GameState = GameSettings & {
  route: RouteStep[];
  deck: Card[];
  initialCard: Card;
  slots: Array<Card | null>;
  position: number;
  failures: number;
  failureStreakFromLast: number;
  tolls: number;
  activePlayer: 1 | 2;
  phase: GamePhase;
  message: string;
  pendingPosition: number | null;
  endReason: "route-completed" | "deck-empty" | "failure-limit" | null;
};

export type AnswerOption = {
  label: string;
  value: Prediction;
};

export const STEP_NAMES: Record<RouteStep, string> = {
  "higher-lower": "Mayor o menor",
  "rounded-pointed": "Redonda o picuda",
  toll: "El Peaje",
  "red-black": "Roja o negra",
  "exact-suit": "Palo exacto",
};

const ROUTES: Record<GameDifficulty, RouteStep[]> = {
  easy: ["higher-lower", "toll", "red-black", "exact-suit"],
  medium: [
    "higher-lower",
    "rounded-pointed",
    "toll",
    "red-black",
    "exact-suit",
  ],
  hard: [
    "higher-lower",
    "rounded-pointed",
    "toll",
    "red-black",
    "toll",
    "exact-suit",
  ],
};

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const QUESTIONS: Record<Exclude<RouteStep, "toll">, string> = {
  "higher-lower": "¿La siguiente carta será mayor o menor?",
  "rounded-pointed": "¿El palo de la siguiente carta será redondo o picudo?",
  "red-black": "¿La siguiente carta será roja o negra?",
  "exact-suit": "¿Cuál será el palo de la siguiente carta?",
};

const ANSWERS: Record<Exclude<RouteStep, "toll">, AnswerOption[]> = {
  "higher-lower": [
    { label: "Mayor", value: "higher" },
    { label: "Menor", value: "lower" },
  ],
  "rounded-pointed": [
    { label: "Redonda", value: "rounded" },
    { label: "Picuda", value: "pointed" },
  ],
  "red-black": [
    { label: "Roja", value: "red" },
    { label: "Negra", value: "black" },
  ],
  "exact-suit": [
    { label: "Corazones ♥", value: "hearts" },
    { label: "Diamantes ♦", value: "diamonds" },
    { label: "Tréboles ♣", value: "clubs" },
    { label: "Picas ♠", value: "spades" },
  ],
};

export const SUIT_SYMBOLS: Record<Suit, string> = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

export const SUIT_NAMES: Record<Suit, string> = {
  hearts: "corazones",
  diamonds: "diamantes",
  clubs: "tréboles",
  spades: "picas",
};

export function getRoute(difficulty: GameDifficulty): RouteStep[] {
  return [...ROUTES[difficulty]];
}

export function getQuestionCount(route: RouteStep[]): number {
  return route.filter((step) => step !== "toll").length;
}

export function getScore(state: Pick<GameState, "failures" | "tolls">): number {
  return state.failures + state.tolls * 2;
}

export function createDeck(): Card[] {
  return SUITS.flatMap((suit) =>
    Array.from({ length: 13 }, (_, index) => {
      const rank = index + 2;
      return { id: `${suit}-${rank}`, suit, rank };
    }),
  );
}

export function shuffleDeck(cards: Card[], random = Math.random): Card[] {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[target]] = [
      shuffled[target],
      shuffled[index],
    ];
  }

  return shuffled;
}

export function startGame(
  settings: GameSettings | GameMode,
  random = Math.random,
): GameState {
  const normalizedSettings: GameSettings =
    typeof settings === "string"
      ? { mode: settings, variant: "classic", difficulty: "medium" }
      : {
          ...settings,
          mode: settings.variant === "quick-turns" ? "two-players" : settings.mode,
        };
  const route = getRoute(normalizedSettings.difficulty);
  const [initialCard, ...deck] = shuffleDeck(createDeck(), random);

  return {
    ...normalizedSettings,
    route,
    deck,
    initialCard,
    slots: route.map(() => null),
    position: 0,
    failures: 0,
    failureStreakFromLast: 0,
    tolls: 0,
    activePlayer: 1,
    phase: "playing",
    message: "Partida iniciada. Elige una respuesta.",
    pendingPosition: null,
    endReason: null,
  };
}

export function getQuestion(step: RouteStep): string {
  return step === "toll" ? "El Peaje" : QUESTIONS[step];
}

export function getAnswerOptions(step: RouteStep): AnswerOption[] {
  return step === "toll" ? [] : ANSWERS[step];
}

export function getReferenceCard(state: GameState): Card {
  for (let index = state.position - 1; index >= 0; index -= 1) {
    const card = state.slots[index];
    if (card) return card;
  }

  return state.initialCard;
}

export function reachesStartFromLastFailureStreak(state: GameState): boolean {
  if (
    state.phase !== "failed" ||
    state.failureStreakFromLast === 0 ||
    state.pendingPosition === null
  ) {
    return false;
  }

  const destination =
    state.pendingPosition < 0
      ? -state.pendingPosition - 1
      : state.pendingPosition;
  return destination === 0;
}

function drawCard(state: GameState): { card: Card; deck: Card[] } | null {
  const [card, ...deck] = state.deck;
  return card ? { card, deck } : null;
}

function withDrawnCard(state: GameState, card: Card, deck: Card[]): GameState {
  const slots = [...state.slots];
  slots[state.position] = card;
  return { ...state, deck, slots };
}

function finishEmptyDeck(state: GameState): GameState {
  return {
    ...state,
    phase: "complete",
    endReason: "deck-empty",
    message: "No quedan cartas en el mazo.",
  };
}

function nextPlayer(state: GameState): 1 | 2 {
  if (state.variant !== "quick-turns") return state.activePlayer;
  return state.activePlayer === 1 ? 2 : 1;
}

function tollMessage(state: GameState, backwards = false): string {
  if (state.variant === "safe-toll") {
    return backwards
      ? "Atraviesas El Peaje al retroceder: completa el reto acordado."
      : "Has llegado a El Peaje: completa el reto acordado para continuar.";
  }

  return backwards
    ? "Atraviesas El Peaje al retroceder: bebe."
    : "Has llegado a El Peaje: bebe para continuar.";
}

function isPredictionCorrect(
  step: RouteStep,
  prediction: Prediction,
  reference: Card,
  card: Card,
): boolean {
  switch (step) {
    case "higher-lower":
      if (prediction === "higher") return card.rank > reference.rank;
      if (prediction === "lower") return card.rank < reference.rank;
      return false;
    case "rounded-pointed": {
      const rounded = card.suit === "hearts" || card.suit === "clubs";
      return prediction === (rounded ? "rounded" : "pointed");
    }
    case "red-black": {
      const red = card.suit === "hearts" || card.suit === "diamonds";
      return prediction === (red ? "red" : "black");
    }
    case "exact-suit":
      return prediction === card.suit;
    case "toll":
      return false;
  }
}

function registerSuccess(state: GameState): GameState {
  const nextPosition = state.position + 1;
  const activePlayer = nextPlayer(state);

  if (nextPosition >= state.route.length) {
    const scoreCopy =
      state.variant === "points" ? ` Puntuación final: ${getScore(state)}.` : "";
    return {
      ...state,
      failureStreakFromLast: 0,
      activePlayer,
      phase: "complete",
      endReason: "route-completed",
      message: `¡Has completado el recorrido!${scoreCopy}`,
      pendingPosition: null,
    };
  }

  if (state.route[nextPosition] === "toll") {
    return {
      ...state,
      failureStreakFromLast: 0,
      activePlayer,
      position: nextPosition,
      tolls: state.tolls + 1,
      phase: "toll",
      pendingPosition: nextPosition + 1,
      message: tollMessage(state),
    };
  }

  return {
    ...state,
    failureStreakFromLast: 0,
    activePlayer,
    position: nextPosition,
    phase: "playing",
    pendingPosition: null,
    message: "¡Acierto! Avanzas una posición.",
  };
}

function registerFailure(state: GameState): GameState {
  const failures = state.failures + 1;
  const lastQuestionPosition = state.route.length - 1;
  const failureStreakFromLast =
    state.position === lastQuestionPosition
      ? 1
      : state.failureStreakFromLast > 0
        ? state.failureStreakFromLast + 1
        : 0;

  if (state.variant === "cooperative" && failures >= 6) {
    return {
      ...state,
      failures,
      failureStreakFromLast,
      activePlayer: nextPlayer(state),
      phase: "complete",
      endReason: "failure-limit",
      pendingPosition: null,
      message: "El equipo ha alcanzado seis fallos. Iniciad un nuevo reto para volver a intentarlo.",
    };
  }

  const previousPosition = Math.max(0, state.position - 1);
  const crossesToll = state.route[previousPosition] === "toll";
  const destination = crossesToll
    ? Math.max(0, previousPosition - 1)
    : previousPosition;

  return {
    ...state,
    failures,
    failureStreakFromLast,
    activePlayer: nextPlayer(state),
    phase: "failed",
    // Un valor negativo identifica que antes debe confirmarse el peaje anterior.
    pendingPosition: crossesToll ? -destination - 1 : destination,
    message: crossesToll
      ? "Fallo. La carta queda visible y al retroceder atraviesas El Peaje."
      : state.position === 0
        ? "Fallo. Permaneces en la primera posición."
        : "Fallo. Retrocedes una posición.",
  };
}

export function answerSinglePlayer(
  state: GameState,
  prediction: Prediction,
): GameState {
  if (state.mode !== "one-player" || state.phase !== "playing") return state;

  const step = state.route[state.position];
  if (!step || step === "toll") return state;

  const drawn = drawCard(state);
  if (!drawn) return finishEmptyDeck(state);

  const reference = getReferenceCard(state);
  const nextState = withDrawnCard(state, drawn.card, drawn.deck);

  return isPredictionCorrect(step, prediction, reference, drawn.card)
    ? registerSuccess(nextState)
    : registerFailure(nextState);
}

export function revealForJudge(state: GameState): GameState {
  if (state.mode !== "two-players" || state.phase !== "playing") return state;

  const step = state.route[state.position];
  if (!step || step === "toll") return state;

  const drawn = drawCard(state);
  if (!drawn) return finishEmptyDeck(state);

  return {
    ...withDrawnCard(state, drawn.card, drawn.deck),
    phase: "judging",
    message: "Carta revelada. El preguntador valida la respuesta verbal.",
  };
}

export function judgeAnswer(state: GameState, correct: boolean): GameState {
  if (state.mode !== "two-players" || state.phase !== "judging") return state;
  return correct ? registerSuccess(state) : registerFailure(state);
}

export function continueAfterFailure(state: GameState): GameState {
  if (state.phase !== "failed" || state.pendingPosition === null) return state;

  if (state.pendingPosition < 0) {
    const destination = -state.pendingPosition - 1;
    return {
      ...state,
      position: Math.max(0, state.position - 1),
      tolls: state.tolls + 1,
      phase: "toll",
      pendingPosition: destination,
      message: tollMessage(state, true),
    };
  }

  return {
    ...state,
    position: state.pendingPosition,
    phase: "playing",
    pendingPosition: null,
    message: "Continúa desde la posición indicada.",
  };
}

export function confirmToll(state: GameState): GameState {
  if (state.phase !== "toll" || state.pendingPosition === null) return state;

  return {
    ...state,
    position: state.pendingPosition,
    phase: "playing",
    pendingPosition: null,
    message:
      state.variant === "safe-toll"
        ? "Reto completado. Puedes continuar."
        : "Peaje confirmado. Puedes continuar.",
  };
}

export function rankLabel(rank: number): string {
  if (rank === 14) return "A";
  if (rank === 13) return "K";
  if (rank === 12) return "Q";
  if (rank === 11) return "J";
  return String(rank);
}

export function isRed(card: Card): boolean {
  return card.suit === "hearts" || card.suit === "diamonds";
}
