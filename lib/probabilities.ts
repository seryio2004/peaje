import { createDeck, type Card } from "./game";

/** Known means every revealed card, including cards overwritten on the board. */
export function predictionCounts(reference: Card, known: Card[] = [reference]) {
  const deck = createDeck();
  const ids = new Set(known.map(card => card.id));
  if (ids.size !== known.length || !ids.has(reference.id) ||
      known.some(card => !deck.some(candidate => candidate.id === card.id && candidate.rank === card.rank && candidate.suit === card.suit))) {
    throw new Error("Known cards must be unique deck cards and include the reference.");
  }
  const remaining = deck.filter(card => !ids.has(card.id));
  return {
    total: remaining.length,
    higher: remaining.filter(card => card.rank > reference.rank).length,
    lower: remaining.filter(card => card.rank < reference.rank).length,
    equal: remaining.filter(card => card.rank === reference.rank).length,
    red: remaining.filter(card => card.suit === "hearts" || card.suit === "diamonds").length,
    rounded: remaining.filter(card => card.suit === "hearts" || card.suit === "clubs").length,
    even: remaining.filter(card => card.rank % 2 === 0).length,
    suits: Object.fromEntries(["hearts", "diamonds", "clubs", "spades"].map(suit => [suit, remaining.filter(card => card.suit === suit).length])),
  };
}

export const initialProbabilityRows = createDeck().filter(card => card.suit === "hearts")
  .map(card => ({ rank: card.rank, ...predictionCounts(card) }));

export function percent(count: number, total: number): string {
  return total === 0 ? "Sin cartas" : (100 * count / total).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " %";
}
