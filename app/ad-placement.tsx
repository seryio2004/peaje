import AdSlot, { type AdSlotId } from "./ad-slot";

/** Compatibility wrapper for existing editorial pages. */
export default function AdPlacement({ position }: { position: AdSlotId }) {
  return <AdSlot id={position} />;
}
