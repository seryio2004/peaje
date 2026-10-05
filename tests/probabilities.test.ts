import assert from "node:assert/strict";
import { createDeck } from "../lib/game";
import { initialProbabilityRows, predictionCounts } from "../lib/probabilities";

assert.equal(initialProbabilityRows.length, 13);
for (const row of initialProbabilityRows) {
  assert.equal(row.total, 51);
  assert.equal(row.higher + row.lower + row.equal, row.total);
  assert.equal(row.equal, 3);
  assert.equal(row.higher, (14 - row.rank) * 4);
  assert.equal(row.lower, (row.rank - 2) * 4);
}
const deck = createDeck();
const reference = deck.find(card => card.id === "hearts-8")!;
const known = [reference, "clubs-2", "spades-3", "diamonds-4", "clubs-5"].map(card => typeof card === "string" ? deck.find(candidate => candidate.id === card)! : card);
assert.deepEqual([predictionCounts(reference, known).higher, predictionCounts(reference, known).lower, predictionCounts(reference, known).equal, predictionCounts(reference, known).total], [24, 20, 3, 47]);
assert.equal(predictionCounts(reference, deck).total, 0);
assert.throws(() => predictionCounts(reference, [reference, reference]));
assert.throws(() => predictionCounts(reference, []));
assert.throws(() => predictionCounts({ ...reference, rank: 9 }));
