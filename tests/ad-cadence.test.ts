import assert from "node:assert/strict";
import test from "node:test";
import { advanceAdCadence } from "../lib/ad-cadence";

test("two short games or one long game trigger one post-game ad opportunity", () => {
  const firstShort = advanceAdCadence(0, "easy");
  assert.deepEqual(firstShort, { shortGameCredit: 1, showAd: false });
  assert.deepEqual(advanceAdCadence(firstShort.shortGameCredit, "medium"), {
    shortGameCredit: 0, showAd: true,
  });
  assert.deepEqual(advanceAdCadence(0, "hard"), { shortGameCredit: 0, showAd: true });
  assert.deepEqual(advanceAdCadence(0, "normal"), { shortGameCredit: 0, showAd: true });
  assert.deepEqual(advanceAdCadence(1, "hard"), { shortGameCredit: 1, showAd: true });
});
