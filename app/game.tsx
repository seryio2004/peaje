"use client";

import Link from "next/link";
import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import {
  answerSinglePlayer,
  Card,
  confirmToll,
  continueAfterFailure,
  GameDifficulty,
  GameMode,
  GameSettings,
  GameState,
  GameVariant,
  getAnswerOptions,
  getQuestion,
  getQuestionCount,
  getReferenceCard,
  getScore,
  isRed,
  judgeAnswer,
  rankLabel,
  reachesStartFromLastFailureStreak,
  revealForJudge,
  STEP_NAMES,
  startGame,
  SUIT_NAMES,
  SUIT_SYMBOLS,
} from "@/lib/game";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type CardStyle = "classic" | "burgundy" | "midnight";

const CARD_STYLES: Array<{
  id: CardStyle;
  name: string;
  description: string;
}> = [
  {
    id: "classic",
    name: "Clásica",
    description: "Marfil y verde",
  },
  {
    id: "burgundy",
    name: "Granate",
    description: "Cálida y elegante",
  },
  {
    id: "midnight",
    name: "Medianoche",
    description: "Oscura y moderna",
  },
];

const MODE_OPTIONS: Array<{
  id: GameMode;
  name: string;
  description: string;
}> = [
  {
    id: "one-player",
    name: "1 jugador",
    description: "La web comprueba automáticamente cada respuesta.",
  },
  {
    id: "two-players",
    name: "2 jugadores",
    description: "Una persona responde y la otra valida la carta revelada.",
  },
];

const VARIANT_OPTIONS: Array<{
  id: GameVariant;
  name: string;
  description: string;
}> = [
  {
    id: "classic",
    name: "Clásico",
    description: "Recorre la baraja con las reglas originales.",
  },
  {
    id: "points",
    name: "Por puntos",
    description: "Cada fallo suma 1 punto y cada peaje suma 2.",
  },
  {
    id: "cooperative",
    name: "Cooperativo",
    description: "Completad la ruta antes de alcanzar 6 fallos.",
  },
  {
    id: "quick-turns",
    name: "Turnos rápidos",
    description: "Alterna el jugador activo después de cada respuesta.",
  },
  {
    id: "safe-toll",
    name: "Peaje seguro",
    description: "Los peajes son retos o pruebas sin bebidas.",
  },
];

const DIFFICULTY_OPTIONS: Array<{
  id: GameDifficulty;
  name: string;
  description: string;
}> = [
  {
    id: "easy",
    name: "Fácil",
    description: "3 preguntas · 1 peaje",
  },
  {
    id: "medium",
    name: "Media",
    description: "4 preguntas · 1 peaje",
  },
  {
    id: "hard",
    name: "Difícil",
    description: "4 preguntas · 2 peajes",
  },
];

const VARIANT_LABELS: Record<GameVariant, string> = {
  classic: "Clásico",
  points: "Por puntos",
  cooperative: "Cooperativo",
  "quick-turns": "Turnos rápidos",
  "safe-toll": "Peaje seguro",
};

const DIFFICULTY_LABELS: Record<GameDifficulty, string> = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
};

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
  safeToll = false,
  dealIndex = 0,
}: {
  toll?: boolean;
  safeToll?: boolean;
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
      {toll ? (
        <span className="card-label">{safeToll ? "Reto" : "Bebe"}</span>
      ) : null}
    </div>
  );
}

function RetreatChainEffect() {
  return (
    <div className="five-failures-effect" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <Image
          className={`failure-meme failure-meme-${index + 1}`}
          src={`${BASE_PATH}/images/cinco-fallos.webp`}
          alt=""
          width={250}
          height={250}
          loading="eager"
          key={index}
        />
      ))}
    </div>
  );
}

function CardStyleSelector({
  value,
  onChange,
}: {
  value: CardStyle;
  onChange: (style: CardStyle) => void;
}) {
  return (
    <fieldset className="card-style-fieldset">
      <legend>Elige el estilo de las cartas</legend>
      <div className="card-style-grid">
        {CARD_STYLES.map((style) => (
          <label
            className="card-style-option"
            data-preview-style={style.id}
            data-selected={value === style.id}
            key={style.id}
          >
            <input
              className="sr-only"
              type="radio"
              name="card-style"
              value={style.id}
              checked={value === style.id}
              onChange={() => onChange(style.id)}
            />
            <span className="card-style-preview" aria-hidden="true">
              <span>P</span>
            </span>
            <span className="card-style-copy">
              <strong>{style.name}</strong>
              <small>{style.description}</small>
            </span>
            <span className="card-style-check" aria-hidden="true">
              {value === style.id ? "✓" : ""}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ModeSelection({
  onStart,
  settings,
  onSettingsChange,
  cardStyle,
  onCardStyleChange,
}: {
  onStart: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  cardStyle: CardStyle;
  onCardStyleChange: (style: CardStyle) => void;
}) {
  function changeMode(mode: GameMode) {
    onSettingsChange({
      ...settings,
      mode,
      variant:
        mode === "one-player" && settings.variant === "quick-turns"
          ? "classic"
          : settings.variant,
    });
  }

  return (
    <section className="setup-shell" aria-labelledby="setup-title">
      <section className="setup-panel" aria-labelledby="setup-title">
        <p className="eyebrow">Juego de cartas</p>
        <h1 id="setup-title">El Peaje</h1>
        <p className="setup-copy">
          Configura la partida y la ruta se adaptará a vuestra forma de jugar.
        </p>

        <fieldset className="setup-choice-fieldset">
          <legend>Jugadores</legend>
          <div className="setup-option-grid mode-grid">
            {MODE_OPTIONS.map((option) => (
              <label
                className="setup-option"
                data-selected={settings.mode === option.id}
                key={option.id}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="game-mode"
                  value={option.id}
                  checked={settings.mode === option.id}
                  onChange={() => changeMode(option.id)}
                />
                <strong>{option.name}</strong>
                <span>{option.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="setup-choice-fieldset">
          <legend>Modo de juego</legend>
          <div className="setup-option-grid variant-grid">
            {VARIANT_OPTIONS.map((option) => {
              const disabled =
                option.id === "quick-turns" && settings.mode === "one-player";
              return (
                <label
                  className="setup-option variant-option"
                  data-selected={settings.variant === option.id}
                  data-disabled={disabled}
                  key={option.id}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="game-variant"
                    value={option.id}
                    checked={settings.variant === option.id}
                    disabled={disabled}
                    onChange={() =>
                      onSettingsChange({ ...settings, variant: option.id })
                    }
                  />
                  <strong>{option.name}</strong>
                  <span>{option.description}</span>
                  {disabled ? <small>Disponible con 2 jugadores</small> : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="setup-choice-fieldset">
          <legend>Dificultad</legend>
          <div className="setup-option-grid difficulty-grid">
            {DIFFICULTY_OPTIONS.map((option) => (
              <label
                className="setup-option difficulty-option"
                data-selected={settings.difficulty === option.id}
                key={option.id}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="game-difficulty"
                  value={option.id}
                  checked={settings.difficulty === option.id}
                  onChange={() =>
                    onSettingsChange({ ...settings, difficulty: option.id })
                  }
                />
                <strong>{option.name}</strong>
                <span>{option.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <CardStyleSelector
          value={cardStyle}
          onChange={onCardStyleChange}
        />
        <button className="primary-button start-game-button" onClick={onStart}>
          Comenzar partida
        </button>
        <p className="setup-summary" aria-live="polite">
          {VARIANT_LABELS[settings.variant]} · {DIFFICULTY_LABELS[settings.difficulty]}
          {settings.mode === "one-player" ? " · 1 jugador" : " · 2 jugadores"}
        </p>
        <Link className="rules-shortcut" href="/como-jugar">
          Consultar las reglas antes de jugar
        </Link>
      </section>
    </section>
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
    const title =
      game.endReason === "route-completed"
        ? "¡Recorrido completado!"
        : game.endReason === "failure-limit"
          ? "Reto no superado"
          : "Mazo agotado";
    return (
      <div className="action-content">
        <p className="eyebrow">Fin de la partida</p>
        <h2>{title}</h2>
        <p>{game.message}</p>
        <button
          className="primary-button"
          onClick={() =>
            setGame(
              startGame({
                mode: game.mode,
                variant: game.variant,
                difficulty: game.difficulty,
              }),
            )
          }
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
          {game.variant === "safe-toll" ? "Reto completado" : "Ya he bebido"}
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
        <p className="eyebrow">
          {game.variant === "quick-turns"
            ? `Respuesta del jugador ${game.activePlayer}`
            : "Solo el preguntador"}
        </p>
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

  const currentStep = game.route[game.position];
  const options = getAnswerOptions(currentStep);
  const questionNumber = game.route
    .slice(0, game.position + 1)
    .filter((step) => step !== "toll").length;

  return (
    <div className="action-content">
      <p className="eyebrow">
        Pregunta {questionNumber} de {getQuestionCount(game.route)}
        {game.variant === "quick-turns" ? ` · Jugador ${game.activePlayer}` : ""}
      </p>
      <h2>{getQuestion(currentStep)}</h2>
      {game.mode === "one-player" ? (
        <>
          <p className="helper-copy">
            {currentStep === "higher-lower"
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
  const routeStyle = {
    "--route-slots": game.route.length,
  } as CSSProperties;

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

      <div
        className="route"
        role="list"
        aria-label="Recorrido"
        style={routeStyle}
      >
        {game.route.map((step, index) => {
          const card = game.slots[index];
          const active = game.position === index && game.phase !== "complete";
          const toll = step === "toll";
          return (
            <article
              className={`route-slot ${active ? "is-active" : ""} ${toll ? "is-toll" : ""}`}
              key={`${step}-${index}`}
              role="listitem"
            >
              <div className="slot-heading">
                <span className="slot-number">{index + 1}</span>
                <p className="slot-title">{STEP_NAMES[step]}</p>
              </div>
              {toll ? (
                <HiddenCard
                  toll
                  safeToll={game.variant === "safe-toll"}
                  dealIndex={index + 1}
                />
              ) : card ? (
                <PlayingCard
                  key={card.id}
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
  const [settings, setSettings] = useState<GameSettings>({
    mode: "one-player",
    variant: "classic",
    difficulty: "medium",
  });
  const [cardStyle, setCardStyle] = useState<CardStyle>("classic");
  const [showRetreatEffect, setShowRetreatEffect] = useState(false);
  const [retreatEffectRun, setRetreatEffectRun] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const effectImagePreloadRef = useRef<HTMLImageElement | null>(null);
  const effectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopRetreatEffect(stopAudio = false) {
    if (effectTimeoutRef.current) {
      clearTimeout(effectTimeoutRef.current);
      effectTimeoutRef.current = null;
    }

    setShowRetreatEffect(false);

    if (stopAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  function startNewGame() {
    stopRetreatEffect(true);
    effectImagePreloadRef.current = new window.Image();
    effectImagePreloadRef.current.src = `${BASE_PATH}/images/cinco-fallos.webp`;
    setGame(startGame(settings));
  }

  function updateGame(nextGame: GameState) {
    if (reachesStartFromLastFailureStreak(nextGame)) {
      stopRetreatEffect();
      setRetreatEffectRun((run) => run + 1);
      setShowRetreatEffect(true);

      effectTimeoutRef.current = setTimeout(() => {
        setShowRetreatEffect(false);
        effectTimeoutRef.current = null;
      }, 3500);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play().catch(() => {
          // El efecto visual sigue funcionando aunque aún no exista el MP3.
        });
      }
    }

    setGame(nextGame);
  }

  function returnToSetup() {
    stopRetreatEffect(true);
    setGame(null);
  }

  if (!game) {
    return (
      <div className="game-root" data-card-style={cardStyle}>
        <ModeSelection
          onStart={startNewGame}
          settings={settings}
          onSettingsChange={setSettings}
          cardStyle={cardStyle}
          onCardStyleChange={setCardStyle}
        />
      </div>
    );
  }

  const variantMetric =
    game.variant === "points"
      ? { label: "Puntos", value: String(getScore(game)) }
      : game.variant === "cooperative"
        ? { label: "Margen", value: String(Math.max(0, 6 - game.failures)) }
        : game.variant === "quick-turns"
          ? { label: "Turno", value: `J${game.activePlayer}` }
          : {
              label: "Dificultad",
              value: DIFFICULTY_LABELS[game.difficulty],
            };

  return (
    <section
      className="game-shell game-root"
      data-card-style={cardStyle}
      aria-label="Partida de El Peaje"
    >
      <header className="game-header">
        <div>
          <p className="eyebrow">
            {VARIANT_LABELS[game.variant]} · {DIFFICULTY_LABELS[game.difficulty]} ·{" "}
            {game.mode === "one-player" ? "1 jugador" : "2 jugadores"}
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
        <div>
          <span>{variantMetric.label}</span>
          <strong>{variantMetric.value}</strong>
        </div>
      </section>

      {game.failureStreakFromLast > 0 && game.phase !== "complete" ? (
        <aside className="retreat-chain-notice" aria-live="polite">
          <span aria-hidden="true">!</span>
          <strong>
            Racha desde la última: {game.failureStreakFromLast}
          </strong>
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

      {showRetreatEffect ? (
        <RetreatChainEffect key={retreatEffectRun} />
      ) : null}
    </section>
  );
}
