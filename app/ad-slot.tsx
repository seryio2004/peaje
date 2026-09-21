import { siteConfig } from "@/lib/config";

export const AD_SLOT_IDS = [
  "after-rules", "after-modes", "after-faq", "after-previa", "after-share",
  "about-rail", "contact-rail", "privacy-rail", "cookies-rail", "legal-rail",
  "after-game",
] as const;
export type AdSlotId = typeof AD_SLOT_IDS[number];

export default function AdSlot({ id }: { id: AdSlotId }) {
  if (!siteConfig.adsEnabled) return null;
  return (
    <aside className="ad-placement" aria-label="Espacio reservado para publicidad"
      data-ad-slot={id} data-ad-format={id.endsWith("-rail") ? "vertical" : "horizontal"}
      data-ad-state="placeholder">
      <span>Publicidad</span>
      <p>Espacio reservado. No hay anuncios activos.</p>
    </aside>
  );
}
