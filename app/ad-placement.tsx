type AdPlacementProps = {
  position: "after-rules" | "after-modes" | "after-faq";
};

export default function AdPlacement({ position }: AdPlacementProps) {
  return (
    <aside
      className="ad-placement"
      aria-label="Espacio reservado para publicidad"
      data-ad-position={position}
    >
      <span>Publicidad</span>
      <p>Espacio preparado para un anuncio adaptable</p>
    </aside>
  );
}
