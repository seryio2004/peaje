export type GameMode = "one-player" | "two-players";

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

export type GameState = {
  mode: GameMode;
  deck: Card[];
  initialCard: Card;
  slots: Array<Card | null>;
  position: number;
  failures: number;
  tolls: number;
  phase: GamePhase;
  message: string;
  pendingPosition: number | null;
  endReason: "route-completed" | "deck-empty" | null;
};

export type AnswerOption = {
  label: string;
  value: Prediction;
};

export const POSITION_NAMES = [
  "Mayor o menor",
  "Redonda o picuda",
  "El Peaje",
  "Roja o negra",
  "Palo exacto",
] as const;

const SUITS: Suit[] = ["hearts", "diamonds", "clubs", "spades"];

const QUESTIONS = [
  "¿La siguiente carta será mayor o menor?",
  "¿El palo de la siguiente carta será redondo o picudo?",
  "El Peaje",
  "¿La siguiente carta será roja o negra?",
  "¿Cuál será el palo de la siguiente carta?",
] as const;

const ANSWERS: Record<number, AnswerOption[]> = {
  0: [
    { label: "Mayor", value: "higher" },
    { label: "Menor", value: "lower" },
  ],
  1: [
    { label: "Redonda", value: "rounded" },
    { label: "Picuda", value: "pointed" },
  ],
  3: [
    { label: "Roja", value: "red" },
    { label: "Negra", value: "black" },
  ],
  4: [
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

export function startGame(mode: GameMode, random = Math.random): GameState {
  const [initialCard, ...deck] = shuffleDeck(createDeck(), random);

  return {
    mode,
    deck,
    initialCard,
    slots: [null, null, null, null, null],
    position: 0,
    failures: 0,
    tolls: 0,
    phase: "playing",
    message: "Partida iniciada. Elige una respuesta.",
    pendingPosition: null,
    endReason: null,
  };
}

export function getQuestion(position: number): string {
  return QUESTIONS[position] ?? "";
}

export function getAnswerOptions(position: number): AnswerOption[] {
  return ANSWERS[position] ?? [];
}

export function getReferenceCard(state: GameState): Card {
  if (state.position === 0) return state.initialCard;

  for (let index = state.position - 1; index >= 0; index -= 1) {
    const card = state.slots[index];
    if (card) return card;
  }

  return state.initialCard;
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

function isPredictionCorrect(
  position: number,
  prediction: Prediction,
  reference: Card,
  card: Card,
): boolean {
  switch (position) {
    case 0:
      if (prediction === "higher") return card.rank > reference.rank;
      if (prediction === "lower") return card.rank < reference.rank;
      return false;
    case 1: {
      const rounded = card.suit === "hearts" || card.suit === "clubs";
      return prediction === (rounded ? "rounded" : "pointed");
    }
    case 3: {
      const red = card.suit === "hearts" || card.suit === "diamonds";
      return prediction === (red ? "red" : "black");
    }
    case 4:
      return prediction === card.suit;
    default:
      return false;
  }
}

function registerSuccess(state: GameState): GameState {
  const nextPosition = state.position + 1;

  if (nextPosition > 4) {
    return {
      ...state,
      phase: "complete",
      endReason: "route-completed",
      message: "¡Has completado el recorrido!",
      pendingPosition: null,
    };
  }

  if (nextPosition === 2) {
    return {
      ...state,
      position: 2,
      tolls: state.tolls + 1,
      phase: "toll",
      pendingPosition: 3,
      message: "Has llegado a El Peaje: bebe para continuar.",
    };
  }

  return {
    ...state,
    position: nextPosition,
    phase: "playing",
    pendingPosition: null,
    message: "¡Acierto! Avanzas una posición.",
  };
}

function registerFailure(state: GameState): GameState {
  const previousPosition = Math.max(0, state.position - 1);
  const crossesToll = previousPosition === 2;
  const destination = crossesToll ? 1 : previousPosition;

  return {
    ...state,
    failures: state.failures + 1,
    phase: "failed",
    // A negative value identifies that El Peaje must be confirmed first.
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

  const drawn = drawCard(state);
  if (!drawn) return finishEmptyDeck(state);

  const reference = getReferenceCard(state);
  const nextState = withDrawnCard(state, drawn.card, drawn.deck);

  return isPredictionCorrect(
    state.position,
    prediction,
    reference,
    drawn.card,
  )
    ? registerSuccess(nextState)
    : registerFailure(nextState);
}

export function revealForJudge(state: GameState): GameState {
  if (state.mode !== "two-players" || state.phase !== "playing") return state;

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
      position: 2,
      tolls: state.tolls + 1,
      phase: "toll",
      pendingPosition: destination,
      message: "Atraviesas El Peaje al retroceder: bebe.",
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
    message: "Peaje confirmado. Puedes continuar.",
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
