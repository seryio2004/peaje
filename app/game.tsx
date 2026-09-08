"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGameAnalytics } from "@/lib/game-analytics";
import { hasConsent, subscribeConsent } from "@/lib/consent";
import PrivacySettingsButton from "./privacy-settings-button";
import ShareGame from "./share-game";
import RouteBoard, { type TollCrossing } from "./route-board";
import {
  answerSinglePlayer,
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
  getScore,
  judgeAnswer,
  reachesStartFromLastFailureStreak,
  revealForJudge,
  startGame,
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
      <legend>04 / Tu baraja de viaje</legend>
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
        <p className="road-label setup-road-label"><span>EP-52</span> CONTROL DE ACCESO · EL PEAJE</p>
        <h1 id="setup-title">Prepara tu viaje.</h1>
        <p className="setup-copy">
          Elige compañía, ruta y baraja. La siguiente salida depende de tu suerte.
        </p>

        <fieldset className="setup-choice-fieldset">
          <legend>01 / Compañeros de viaje</legend>
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
          <legend>02 / Elige tu ruta</legend>
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
          <legend>03 / Dificultad del trayecto</legend>
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
  onShared,
}: {
  game: GameState;
  setGame: (state: GameState) => void;
  onShared: (method: "native" | "clipboard") => void;
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
        <ShareGame game={game} onShared={onShared} />
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

export default function Game() {
  const [gameAnalytics] = useState(() => createGameAnalytics());
  const [journeyRun, setJourneyRun] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [crossing, setCrossing] = useState<TollCrossing | null>(null);
  const crossingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const crossingLock = useRef(false);
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

  useEffect(() => () => {
    crossingTimers.current.forEach(clearTimeout);
    if (effectTimeoutRef.current) clearTimeout(effectTimeoutRef.current);
  }, []);

  useEffect(() => {
    const onPageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) gameAnalytics.abandon("page_exit");
    };
    window.addEventListener("pagehide", onPageHide);
    const unsubscribe = subscribeConsent(() => {
      if (!hasConsent("analytics")) gameAnalytics.forget();
    });
    return () => {
      unsubscribe();
      window.removeEventListener("pagehide", onPageHide);
      gameAnalytics.abandon("navigation");
    };
  }, [gameAnalytics]);

  function cancelCrossing() {
    crossingTimers.current.forEach(clearTimeout);
    crossingTimers.current = [];
    crossingLock.current = false;
    setCrossing(null);
  }

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
    cancelCrossing();
    setDirection(1);
    stopRetreatEffect(true);
    effectImagePreloadRef.current = new window.Image();
    effectImagePreloadRef.current.src = `${BASE_PATH}/images/cinco-fallos.webp`;
    const nextGame = startGame(settings);
    gameAnalytics.start(nextGame);
    setGame(nextGame);
  }

  function updateGame(nextGame: GameState) {
    if (crossingLock.current) return;

    if (game?.phase === "complete" && nextGame.phase === "playing") {
      gameAnalytics.start(nextGame, "repeat");
      stopRetreatEffect(true);
      setDirection(1);
      setJourneyRun((run) => run + 1);
      setGame(nextGame);
      return;
    }

    if (game?.phase === "toll" && nextGame.phase === "playing") {
      const passage: TollCrossing = {
        position: game.position,
        direction: nextGame.position < game.position ? -1 : 1,
        departing: false,
      };
      setDirection(passage.direction);
      crossingLock.current = true;
      setCrossing(passage);

      // Open the arm fully before the car moves; keep it open until it clears.
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      crossingTimers.current = [
        setTimeout(() => {
          setCrossing({ ...passage, departing: true });
          gameAnalytics.update(nextGame);
          setGame(nextGame);
        }, reducedMotion ? 0 : 520),
        setTimeout(() => {
          setCrossing(null);
          crossingLock.current = false;
          crossingTimers.current = [];
        }, reducedMotion ? 0 : 1300),
      ];
      return;
    }

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

    if (nextGame.endReason === "route-completed" || !game || nextGame.position > game.position) {
      setDirection(1);
    } else if (nextGame.position < game.position) {
      setDirection(-1);
    }
    gameAnalytics.update(nextGame);
    setGame(nextGame);
  }

  function returnToSetup() {
    gameAnalytics.abandon("new_game");
    cancelCrossing();
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
      data-complete={game.phase === "complete"}
      aria-label="Partida de El Peaje"
    >
      <header className="game-header">
        <div>
          <p className="eyebrow">
            {VARIANT_LABELS[game.variant]} · {DIFFICULTY_LABELS[game.difficulty]} ·{" "}
            {game.mode === "one-player" ? "1 jugador" : "2 jugadores"}
          </p>
          <h1><span className="game-route-badge">EP-52</span> En ruta.</h1>
        </div>
        <div className="game-header-actions"><PrivacySettingsButton compact /><button className="text-button" onClick={returnToSetup}>
          Nueva partida
        </button></div>
      </header>

      <section className="stats" aria-label="Estado de la partida">
        <div>
          <span>En el mazo</span>
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

      <RouteBoard key={journeyRun} game={game} crossing={crossing} direction={direction} />

      <section className="action-panel" aria-live="polite">
        {crossing ? (
          <p className="crossing-status" role="status">
            {crossing.departing ? "Buen viaje. Cruzando el peaje…" : "Penalización cumplida. Levantando la barrera…"}
          </p>
        ) : null}
        <fieldset className="action-controls" disabled={crossing !== null} aria-label="Acciones de la partida">
          <ActionPanel game={game} setGame={updateGame} onShared={gameAnalytics.share} />
        </fieldset>
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
