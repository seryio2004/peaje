"use client";

import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import {
  answerSinglePlayer,
  Card,
  confirmToll,
  continueAfterFailure,
  GameMode,
  GameState,
  getAnswerOptions,
  getQuestion,
  getReferenceCard,
  isRed,
  judgeAnswer,
  POSITION_NAMES,
  rankLabel,
  revealForJudge,
  startGame,
  SUIT_NAMES,
  SUIT_SYMBOLS,
} from "@/lib/game";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function PlayingCard({
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

function HiddenCard({
  toll = false,
  dealIndex = 0,
}: {
  toll?: boolean;
  dealIndex?: number;
}) {
  const animationStyle = {
    "--deal-index": dealIndex,
  } as CSSProperties;

  return (
    <div className="card-wrap">
      <div className="card-motion is-dealing" style={animationStyle}>
        <div className={`playing-card card-back ${toll ? "toll-card" : ""}`}>
          <span className="back-mark" aria-hidden="true">
            {toll ? "×1" : "P"}
          </span>
          <span className="sr-only">
            {toll ? "El Peaje, carta oculta" : "Carta oculta"}
          </span>
        </div>
      </div>
      {toll ? <span className="card-label">Bebe</span> : null}
    </div>
  );
}

function FiveFailuresEffect() {
  return (
    <div className="five-failures-effect" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <Image
          className={`failure-meme failure-meme-${index + 1}`}
          src={`${BASE_PATH}/images/cinco-fallos.webp`}
          alt=""
          width={250}
          height={250}
          priority={index === 0}
          key={index}
        />
      ))}
    </div>
  );
}

function ModeSelection({ onStart }: { onStart: (mode: GameMode) => void }) {
  return (
    <main className="setup-shell">
      <section className="setup-panel" aria-labelledby="setup-title">
        <p className="eyebrow">Juego de cartas</p>
        <h1 id="setup-title">El Peaje</h1>
        <p className="setup-copy">
          Elige un modo para crear y barajar una partida nueva.
        </p>
        <div className="mode-grid">
          <button className="mode-button" onClick={() => onStart("one-player")}>
            <strong>1 jugador</strong>
            <span>Responde en pantalla y el juego comprueba la carta.</span>
          </button>
          <button className="mode-button" onClick={() => onStart("two-players")}>
            <strong>2 jugadores</strong>
            <span>El preguntador revela la carta y valida la respuesta oral.</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function ActionPanel({
  game,
  setGame,
}: {
  game: GameState;
  setGame: (state: GameState) => void;
}) {
  if (game.phase === "complete") {
    return (
      <div className="action-content">
        <p className="eyebrow">Fin de la partida</p>
        <h2>
          {game.endReason === "route-completed"
            ? "¡Recorrido completado!"
            : "Mazo agotado"}
        </h2>
        <p>{game.message}</p>
        <button
          className="primary-button"
          onClick={() => setGame(startGame(game.mode))}
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  if (game.phase === "toll") {
    return (
      <div className="action-content toll-action">
        <p className="eyebrow">Parada obligatoria</p>
        <h2>El Peaje</h2>
        <p>{game.message}</p>
        <button
          className="primary-button danger-button"
          onClick={() => setGame(confirmToll(game))}
        >
          Ya he bebido
        </button>
      </div>
    );
  }

  if (game.phase === "failed") {
    return (
      <div className="action-content failure-action">
        <p className="eyebrow">Respuesta incorrecta</p>
        <h2>La carta queda revelada</h2>
        <p>{game.message}</p>
        <button
          className="primary-button"
          onClick={() => setGame(continueAfterFailure(game))}
        >
          Continuar
        </button>
      </div>
    );
  }

  if (game.phase === "judging") {
    return (
      <div className="action-content">
        <p className="eyebrow">Solo el preguntador</p>
        <h2>¿Ha acertado?</h2>
        <p>{game.message}</p>
        <div className="button-row">
          <button
            className="primary-button success-button"
            onClick={() => setGame(judgeAnswer(game, true))}
          >
            Acierto
          </button>
          <button
            className="secondary-button"
            onClick={() => setGame(judgeAnswer(game, false))}
          >
            Fallo
          </button>
        </div>
      </div>
    );
  }

  const options = getAnswerOptions(game.position);

  return (
    <div className="action-content">
      <p className="eyebrow">Posición {game.position + 1} de 5</p>
      <h2>{getQuestion(game.position)}</h2>
      {game.mode === "one-player" ? (
        <>
          <p className="helper-copy">
            {game.position === 0
              ? "El as es la carta más alta; un empate cuenta como fallo."
              : "Elige una opción para revelar la siguiente carta."}
          </p>
          <div className="button-row answer-grid">
            {options.map((option) => (
              <button
                className="primary-button"
                key={option.value}
                onClick={() =>
                  setGame(answerSinglePlayer(game, option.value))
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="helper-copy">
            El jugador responde en voz alta. Después, revela la carta y valida el
            resultado.
          </p>
          <button
            className="primary-button"
            onClick={() => setGame(revealForJudge(game))}
          >
            Revelar carta
          </button>
        </>
      )}
    </div>
  );
}

function Board({ game }: { game: GameState }) {
  const reference = getReferenceCard(game);

  return (
    <section className="board-panel" aria-label="Tablero de juego">
      <div className="initial-card">
        <p className="slot-title">Carta inicial</p>
        <PlayingCard
          card={game.initialCard}
          reference={reference.id === game.initialCard.id}
          label={reference.id === game.initialCard.id ? "Referencia" : undefined}
          dealIndex={0}
        />
      </div>

      <div className="route" role="list" aria-label="Recorrido">
        {POSITION_NAMES.map((name, index) => {
          const card = game.slots[index];
          const active = game.position === index && game.phase !== "complete";
          return (
            <article
              className={`route-slot ${active ? "is-active" : ""} ${index === 2 ? "is-toll" : ""}`}
              key={name}
              role="listitem"
            >
              <div className="slot-heading">
                <span className="slot-number">{index + 1}</span>
                <p className="slot-title">{name}</p>
              </div>
              {index === 2 ? (
                <HiddenCard toll dealIndex={index + 1} />
              ) : card ? (
                <PlayingCard
                  card={card}
                  reference={reference.id === card.id}
                  label={reference.id === card.id ? "Referencia" : undefined}
                />
              ) : (
                <HiddenCard dealIndex={index + 1} />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Game() {
  const [game, setGame] = useState<GameState | null>(null);
  const [showFiveFailuresEffect, setShowFiveFailuresEffect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const effectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopFiveFailuresEffect(stopAudio = false) {
    if (effectTimeoutRef.current) {
      clearTimeout(effectTimeoutRef.current);
      effectTimeoutRef.current = null;
    }

    setShowFiveFailuresEffect(false);

    if (stopAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function startNewGame(mode: GameMode) {
    stopFiveFailuresEffect(true);
    setGame(startGame(mode));
  }

  function updateGame(nextGame: GameState) {
    if (game && game.failures < 5 && nextGame.failures >= 5) {
      stopFiveFailuresEffect();
      setShowFiveFailuresEffect(true);

      effectTimeoutRef.current = setTimeout(() => {
        setShowFiveFailuresEffect(false);
        effectTimeoutRef.current = null;
      }, 3500);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play().catch(() => {
          // El efecto visual sigue funcionando aunque aún no exista el MP3.
        });
      }
    } else if (game && game.failures > 0 && nextGame.failures === 0) {
      stopFiveFailuresEffect(true);
    }

    setGame(nextGame);
  }

  function returnToSetup() {
    stopFiveFailuresEffect(true);
    setGame(null);
  }

  if (!game) {
    return <ModeSelection onStart={startNewGame} />;
  }

  return (
    <main className="game-shell">
      <header className="game-header">
        <div>
          <p className="eyebrow">
            Partida local · {game.mode === "one-player" ? "1 jugador" : "2 jugadores"}
          </p>
          <h1>El Peaje</h1>
        </div>
        <button className="text-button" onClick={returnToSetup}>
          Nueva partida
        </button>
      </header>

      <section className="stats" aria-label="Estado de la partida">
        <div>
          <span>Cartas restantes</span>
          <strong>{game.deck.length}</strong>
        </div>
        <div>
          <span>Fallos</span>
          <strong>{game.failures}</strong>
        </div>
        <div>
          <span>Peajes</span>
          <strong>{game.tolls}</strong>
        </div>
      </section>

      {game.failures >= 5 ? (
        <aside className="five-failures-notice" aria-live="polite">
          <span aria-hidden="true">!</span>
          <strong>Llevas {game.failures} fallos</strong>
        </aside>
      ) : null}

      <Board game={game} />

      <section className="action-panel" aria-live="polite">
        <ActionPanel game={game} setGame={updateGame} />
      </section>

      <audio
        ref={audioRef}
        src={`${BASE_PATH}/audio/cinco-fallos.mp3`}
        preload="auto"
      />

      {showFiveFailuresEffect ? <FiveFailuresEffect /> : null}
    </main>
  );
}
