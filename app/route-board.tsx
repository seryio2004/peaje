"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { type GameState, getReferenceCard, STEP_NAMES } from "@/lib/game";
import PlayingCard from "./playing-card";

export type TollCrossing = {
  position: number;
  direction: 1 | -1;
  departing: boolean;
};

function RoadCar({ backwards }: { backwards: boolean }) {
  return (
    <svg className="road-car" data-backwards={backwards} viewBox="0 0 72 40" aria-hidden="true">
      <ellipse cx="35" cy="23" rx="33" ry="15" fill="#071917" opacity=".5" />
      <g stroke="#152d2c" strokeWidth="2">
        <rect x="13" y="3" width="12" height="8" rx="2" fill="#101e21" />
        <rect x="47" y="3" width="12" height="8" rx="2" fill="#101e21" />
        <rect x="13" y="29" width="12" height="8" rx="2" fill="#101e21" />
        <rect x="47" y="29" width="12" height="8" rx="2" fill="#101e21" />
        <path d="M8 9 53 7Q66 8 67 15V25Q66 32 53 33L8 31Q4 30 4 25V15Q4 10 8 9Z" fill="#e66b51" />
        <path d="M28 10 43 10 49 14V26L43 30H28L23 26V14Z" fill="#f4cc75" />
        <path d="m42 11 6 4v10l-6 4Z" fill="#a8d1ce" />
        <path d="m28 12-4 4v8l4 4Z" fill="#28526a" />
      </g>
      <path d="M31 11h8v18h-8z" fill="#efb15c" />
      <path d="M56 11h7v4h-7zm0 14h7v4h-7z" fill="#fff1b0" />
      <path d="M6 12h3v5H6zm0 11h3v5H6z" fill="#9b302d" />
      <path d="M52 17h10M52 23h10" stroke="#f39471" strokeWidth="2" />
    </svg>
  );
}

export default function RouteBoard({ game, crossing, direction }: { game: GameState; crossing: TollCrossing | null; direction: 1 | -1 }) {
  const reference = getReferenceCard(game);
  const scrollRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const backwards = direction === -1;
  const waiting = game.phase === "toll";
  const arrived = game.endReason === "route-completed";
  const carPosition = arrived ? game.route.length - 0.12 : game.position + 0.5;
  const stopDirection = waiting ? (backwards ? 1 : -1) : 0;
  const carOffset = stopDirection * 47;
  const routeStyle = { "--route-slots": game.route.length } as CSSProperties;
  const carStyle = {
    left: `min(calc(${carPosition / game.route.length * 100}% + var(--toll-stop, 47px) * ${stopDirection}), calc(100% - var(--car-edge, 36px)))`,
  };

  useEffect(() => {
    const viewport = scrollRef.current;
    const car = carRef.current;
    if (!viewport || !car) return;
    // Follow both movement and viewport changes without scrolling the page vertically.
    function followCar(behavior: ScrollBehavior) {
      if (!viewport || !car?.parentElement) return;
      const target = (carPosition / game.route.length) * car.parentElement.clientWidth + carOffset;
      viewport.scrollTo({ left: Math.max(0, target - viewport.clientWidth / 2), behavior });
    }
    followCar(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth");
    const resizeObserver = new ResizeObserver(() => followCar("instant"));
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, [carPosition, carOffset, game.route.length]);

  return (
    <section className="board-panel journey-board" aria-label="Tablero de juego">
      <div className="journey-heading">
        <p className="road-label"><span>EP-52</span> DESTINO: LA ÚLTIMA CARTA</p>
        <span className="journey-direction">{backwards ? "← Sentido regreso" : "Sentido suerte →"}</span>
      </div>
      <div className="journey-layout">
        <div className="initial-card">
          <p className="slot-title">PUNTO DE PARTIDA</p>
          <PlayingCard card={game.initialCard} reference={reference.id === game.initialCard.id}
            label={reference.id === game.initialCard.id ? "Referencia" : undefined} />
          <span className="departure-caption">Tu primera pista</span>
        </div>
        <div className="route-scroll" ref={scrollRef} tabIndex={0} role="region" aria-label="Carretera de cartas. Desplaza para explorar la ruta.">
          <div className="journey-route" style={routeStyle}>
            <div className="route" role="list" aria-label="Recorrido">
              {game.route.map((step, index) => {
                const card = game.slots[index];
                const active = game.position === index && game.phase !== "complete";
                const toll = step === "toll";
                const open = crossing?.position === index;
                return (
                  <article className={`route-slot ${active ? "is-active" : ""} ${toll ? "is-toll" : ""}`}
                    key={`${step}-${index}`} role="listitem" aria-label={`Tramo ${index + 1}: ${STEP_NAMES[step]}`} aria-current={active ? "step" : undefined}>
                    <div className="slot-heading">
                      <span className="slot-number">{String(index + 1).padStart(2, "0")}</span>
                      <p className="slot-title">{STEP_NAMES[step]}</p>
                    </div>
                    {toll ? (
                      <div className="toll-plaza" data-open={open}>
                        <div className="plaza-sign"><span>PEAJE</span><span className="plaza-signal" aria-hidden="true">{open ? "↑" : "×"}</span></div>
                        <span className="plaza-payment">CONTROL MANUAL</span>
                        <div className="plaza-cabin" aria-hidden="true"><span /><i /><b>P</b></div>
                        <span className="plaza-status">{open ? "Buen viaje" : active ? "Cumple el peaje" : "Parada obligatoria"}</span>
                      </div>
                    ) : card ? (
                      <PlayingCard key={card.id} card={card} reference={reference.id === card.id}
                        label={reference.id === card.id ? "Referencia" : undefined} />
                    ) : (
                      <div className="card-wrap">
                        <div className="card-motion is-dealing" style={{ "--deal-index": index + 1 } as CSSProperties}>
                          <div className="playing-card card-back"><span className="back-mark" aria-hidden="true">P</span><span className="sr-only">Carta oculta</span></div>
                        </div>
                      </div>
                    )}
                    {!toll && <span className="road-kilometer">KM {String(index + 1).padStart(2, "0")}</span>}
                  </article>
                );
              })}
            </div>
            <div className="road-track" aria-hidden="true">
              <div className="road-centerline" />
              <span className="road-finish" />
              {game.route.map((step, index) => step === "toll" ? (
                <div key={index} className="road-gate" data-open={crossing?.position === index}
                  style={{ left: `${(index + 0.5) / game.route.length * 100}%` }}>
                  <span className="gate-base" /><span className="gate-arm" /><span className="gate-hinge" />
                </div>
              ) : null)}
              <div className="car-position" ref={carRef} style={carStyle} data-waiting={waiting && !crossing}>
                <span className="car-pointer" />
                <RoadCar backwards={backwards} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="journey-legend">
        <p role="status">{arrived ? "Destino alcanzado. ¡Buen viaje!" : `Estás en el tramo ${game.position + 1}: ${STEP_NAMES[game.route[game.position]]}.`}</p>
        <span>El coche marca tu posición · Acierta para avanzar</span>
      </div>
    </section>
  );
}
