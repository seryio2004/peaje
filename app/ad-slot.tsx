/** Editorial integration points only. No SDK or empty ad placeholder is rendered.
 * Activate only after configuring real units and consent outside game controls.
 */
export const AD_SLOT_IDS = [
  "after-rules", "after-modes", "after-faq", "after-previa", "about-rail",
] as const;
export type AdSlotId = typeof AD_SLOT_IDS[number];
export const EDITORIAL_AD_SLOTS: ReadonlySet<AdSlotId> = new Set(["after-rules", "after-modes", "after-faq", "after-previa", "about-rail"]);
export default function AdSlot({ id }: { id: AdSlotId }) {
  if (!EDITORIAL_AD_SLOTS.has(id)) return null;
  // A feature flag alone must never create placeholders or enable advertising.
  return null;
}
