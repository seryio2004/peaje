import { type CSSProperties } from "react";
import { type Card, isRed, rankLabel, SUIT_NAMES, SUIT_SYMBOLS } from "@/lib/game";

export default function PlayingCard({
  card,
  reference = false,
  label,
  dealIndex = 0,
}: {
  card: Card;
  reference?: boolean;
  label?: string;
  dealIndex?: number;
}) {
  const red = isRed(card);
  const animationStyle = {
    "--deal-index": dealIndex,
  } as CSSProperties;

  return (
    <div className="card-wrap">
      <div className="card-motion is-revealing" style={animationStyle}>
        <div className="card-flip">
          <div
            className="playing-card card-back card-face card-face-back"
            aria-hidden="true"
          >
            <span className="back-mark">P</span>
          </div>
          <div
            className={`playing-card card-face card-face-front ${red ? "card-red" : "card-black"} ${reference ? "is-reference" : ""}`}
            aria-label={`${rankLabel(card.rank)} de ${SUIT_NAMES[card.suit]}${reference ? ", carta de referencia" : ""}`}
          >
            <span className="card-corner card-corner-top">
              <strong>{rankLabel(card.rank)}</strong>
              <span>{SUIT_SYMBOLS[card.suit]}</span>
            </span>
            <span className="card-suit" aria-hidden="true">
              {SUIT_SYMBOLS[card.suit]}
            </span>
            <span className="card-corner card-corner-bottom" aria-hidden="true">
              <strong>{rankLabel(card.rank)}</strong>
              <span>{SUIT_SYMBOLS[card.suit]}</span>
            </span>
            <span className="card-shine" aria-hidden="true" />
          </div>
        </div>
      </div>
      {label ? <span className="card-label">{label}</span> : null}
    </div>
  );
}

