"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localPath } from "@/lib/i18n";
import { gameText as t, gameFormat as fmt, gameMessage } from "@/lib/game-i18n";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { createGameAnalytics } from "@/lib/game-analytics";
import { hasConsent, subscribeConsent } from "@/lib/consent";
import PrivacySettingsButton from "./privacy-settings-button";
import ShareGame from "./share-game";
import RouteBoard, { type TollCrossing } from "./route-board";
import {
  answerSinglePlayer,
  answerQuickTurns,
  confirmToll,
  confirmQuickTurnsToll,
  continueAfterFailure,
  continueQuickTurnsAfterFailure,
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
  normalizeGameSettings,
  type QuickTurnsState,
  reachesStartFromLastFailureStreak,
  revealForJudge,
  resolvePotatoPass,
  startGame,
  startQuickTurnsGame,
} from "@/lib/game";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type CardStyle = "classic" | "burgundy" | "midnight" | "pixel-toll";

const CARD_STYLES: Array<{
  id: CardStyle;
  name: string;
  description: string;
}> = [
  {
    id: "classic",
    name: "Clásica",
    description: "Marfil y verde. Las de toda la vida.",
  },
  {
    id: "burgundy",
    name: "Granate",
    description: "Granate. Parece que sabes jugar.",
  },
  {
    id: "midnight",
    name: "Medianoche",
    description: "Oscura, por si ya es muy tarde.",
  },
  {
    id: "pixel-toll",
    name: "Peaje pixel",
    description: "La autopista en cuatro píxeles.",
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
    description: "Sin testigos. La web comprueba cada respuesta.",
  },
  {
    id: "two-players",
    name: "2 jugadores",
    description: "Uno responde y el otro valida la carta. Procurad seguir siendo amigos.",
  },
  {
    id: "group",
    name: "Grupo · 3–8 jugadores",
    description: "La patata: un móvil que solo puedes pasar cuando la carta te deja.",
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
    description: "Las reglas originales. Ya dan bastante trabajo.",
  },
  {
    id: "points",
    name: "Por puntos",
    description: "Llevamos la cuenta: +1 punto por fallo, +2 por peaje.",
  },
  {
    id: "cooperative",
    name: "Cooperativo",
    description: "Completad la ruta antes de 6 fallos. Las culpas se reparten después.",
  },
  {
    id: "quick-turns",
    name: "Turnos rápidos",
    description: "Fallas y le toca al otro. Cada uno conserva su ruta.",
  },
  {
    id: "safe-toll",
    name: "Peaje seguro",
    description: "Retos y pruebas sin bebidas. Acordadlos antes, que luego hay quejas.",
  },
  {
    id: "hot-potato",
    name: "La patata",
    description: "Acierta una carta de pase y elige a quién darle el móvil. Si fallas, te lo quedas.",
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
  "hot-potato": "La patata",
};

const DIFFICULTY_LABELS: Record<GameDifficulty, string> = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
  normal: "Normal",
};

const POTATO_DIFFICULTIES: typeof DIFFICULTY_OPTIONS = [
  { id: "normal", name: "Normal", description: "4 preguntas · 2 peajes · El difícil de siempre" },
  { id: "hard", name: "Difícil", description: "5 preguntas · 2 peajes · Añade par o impar" },
];

function playerCountLabel(settings: GameSettings, locale: Locale) {
  return settings.mode === "group" ? fmt(locale, "{n} jugadores", { n: settings.playerCount ?? 3 }) : t(locale, settings.mode === "one-player" ? "1 jugador" : "2 jugadores");
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
  locale,
  value,
  onChange,
}: {
  locale: Locale;
  value: CardStyle;
  onChange: (style: CardStyle) => void;
}) {
  return (
    <fieldset className="card-style-fieldset">
      <legend>{t(locale, "04 / El aspecto de las cartas")}</legend>
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
              <strong>{t(locale, style.name)}</strong>
              <small>{t(locale, style.description)}</small>
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
  locale,
  onStart,
  settings,
  onSettingsChange,
  cardStyle,
  onCardStyleChange,
}: {
  locale: Locale;
  onStart: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  cardStyle: CardStyle;
  onCardStyleChange: (style: CardStyle) => void;
}) {
  const isPotato = settings.variant === "hot-potato";
  const difficulties = isPotato ? POTATO_DIFFICULTIES : DIFFICULTY_OPTIONS;
  function changeMode(mode: GameMode) {
    onSettingsChange(normalizeGameSettings({
      ...settings,
      mode,
      variant: mode === "group" ? "hot-potato" : isPotato || (mode === "one-player" && settings.variant === "quick-turns") ? "classic" : settings.variant,
      difficulty: mode === "group" && !isPotato ? "normal" : settings.difficulty,
    }));
  }

  function changeVariant(variant: GameVariant) {
    onSettingsChange(normalizeGameSettings({
      ...settings,
      variant,
      difficulty: variant === "hot-potato" && !isPotato ? "normal" : settings.difficulty,
    }));
  }

  return (
    <section className="setup-shell" aria-labelledby="setup-title">
      <section className="setup-panel" aria-labelledby="setup-title">
        <p className="road-label setup-road-label"><span>EP-52</span> {t(locale, "VENTANILLA DE DECISIONES CUESTIONABLES")}</p>
        <h1 id="setup-title">{t(locale, "A ver qué montamos.")}</h1>
        <p className="setup-copy">
          {t(locale, "Elige jugadores, modo, dificultad y baraja. Esto último no ayuda a ganar, pero queda bonito.")}
        </p>

        <fieldset className="setup-choice-fieldset">
          <legend>{t(locale, "01 / ¿Cuántos vais a jugar?")}</legend>
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
                <strong>{t(locale, option.name)}</strong>
                <span>{t(locale, option.description)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {isPotato ? (
          <fieldset className="setup-choice-fieldset">
            <legend>{t(locale, "Personas en el grupo")}</legend>
            <div className="setup-option-grid potato-player-grid">
              {[3, 4, 5, 6, 7, 8].map(count => (
                <label className="setup-option" data-selected={settings.playerCount === count} key={count}>
                  <input className="sr-only" type="radio" name="player-count" value={count}
                    checked={settings.playerCount === count}
                    onChange={() => onSettingsChange({ ...settings, playerCount: count })} />
                  <strong>{fmt(locale, "{n} jugadores", { n: count })}</strong>
                </label>
              ))}
            </div>
            <p className="helper-copy">{fmt(locale, "Repartíos los números del 1 al {n}. Empieza el jugador 1. Compartís ruta: unas 2 de cada 5 cartas permiten pasar el móvil si aciertas, pero no sabréis cuáles hasta entonces. Puedes pasarlo a cualquier otra persona o quedártelo. Si fallas, retrocedes y sigues tú. Los peajes los cumple quien tenga el móvil antes de pasarlo.", { n: settings.playerCount ?? 3 })}</p>
          </fieldset>
        ) : null}

        <fieldset className="setup-choice-fieldset">
          <legend>{t(locale, "02 / ¿Cómo jugamos?")}</legend>
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
                    onChange={() => changeVariant(option.id)}
                  />
                  <strong>{t(locale, option.name)}</strong>
                  <span>{t(locale, option.description)}</span>
                  {disabled ? <small>{t(locale, "Hace falta otra persona: 2 jugadores")}</small> : null}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="setup-choice-fieldset">
          <legend>{t(locale, "03 / ¿Lo ponemos difícil?")}</legend>
          <div className="setup-option-grid difficulty-grid">
            {difficulties.map((option) => (
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
                <strong>{t(locale, option.name)}</strong>
                <span>{t(locale, option.description)}</span>
              </label>
            ))}
          </div>
          {isPotato && settings.difficulty === "hard" ? <p className="helper-copy">{t(locale, "Par o impar usa el valor de la carta: J = 11, Q = 12, K = 13 y A = 14. El as cuenta como par.")}</p> : null}
        </fieldset>

        <CardStyleSelector
          locale={locale}
          value={cardStyle}
          onChange={onCardStyleChange}
        />
        <button className="primary-button start-game-button" onClick={onStart}>
          {t(locale, "Reparte ya")}
        </button>
        <p className="setup-summary" aria-live="polite">
          {t(locale, VARIANT_LABELS[settings.variant])} · {t(locale, DIFFICULTY_LABELS[settings.difficulty])}
          {` · ${playerCountLabel(settings, locale)}`}
        </p>
        <Link className="rules-shortcut" href={localPath(locale, "rules")}>
          {t(locale, "Espera, cómo se juega")}
        </Link>
      </section>
    </section>
  );
}

function ActionPanel({
  locale,
  game,
  setGame,
  onShared,
  quickTurns,
  onQuickTurnsChange,
  onRestart,
}: {
  locale: Locale;
  game: GameState;
  setGame: (state: GameState) => void;
  onShared: (method: "native" | "clipboard") => void;
  quickTurns?: QuickTurnsState;
  onQuickTurnsChange?: (state: QuickTurnsState) => void;
  onRestart?: () => void;
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
        <p className="eyebrow">{t(locale, "Fin de la partida")}</p>
        <h2>{t(locale, title)}</h2>
        <p>{gameMessage(locale, game.message)}</p>
        <button
          className="primary-button"
          onClick={() => {
            if (onRestart) {
              onRestart();
              return;
            }
            setGame(
              startGame({
                mode: game.mode,
                variant: game.variant,
                difficulty: game.difficulty,
                playerCount: game.playerCount,
              }),
            );
          }}
        >
          {t(locale, "Jugar otra vez")}
        </button>
        <ShareGame locale={locale} game={game} onShared={onShared} />
      </div>
    );
  }

  if (game.phase === "toll") {
    return (
      <div className="action-content toll-action">
        <p className="eyebrow">{t(locale, "Parada obligatoria")}</p>
        <h2>El Peaje</h2>
        <p>{gameMessage(locale, game.message)}</p>
        <button
          className="primary-button danger-button"
          onClick={() =>
            quickTurns && onQuickTurnsChange
              ? onQuickTurnsChange(confirmQuickTurnsToll(quickTurns))
              : setGame(confirmToll(game))
          }
        >
          {game.variant === "safe-toll" || game.variant === "hot-potato" ? t(locale, "Reto completado") : t(locale, "Peaje completado")}
        </button>
      </div>
    );
  }

  if (game.hotPotato?.passAvailable) {
    return (
      <div className="action-content">
        <p className="eyebrow">{fmt(locale, "La patata · Jugador {n}", { n: game.activePlayer })}</p>
        <h2>{t(locale, "Esta carta te deja pasar el móvil.")}</h2>
        <p>{t(locale, "Has acertado una carta de pase. Elige quién sigue desde esta posición o quédate el móvil.")}</p>
        <div className="button-row answer-grid">
          {Array.from({ length: game.playerCount ?? 3 }, (_, i) => i + 1)
            .filter(player => player !== game.activePlayer)
            .map(player => (
              <button className="primary-button" key={player} onClick={() => setGame(resolvePotatoPass(game, player))}>
                {fmt(locale, "Pasar al jugador {n}", { n: player })}
              </button>
            ))}
        </div>
        <button className="secondary-button" onClick={() => setGame(resolvePotatoPass(game, game.activePlayer))}>{t(locale, "Me lo quedo")}</button>
      </div>
    );
  }

  if (game.phase === "failed") {
    return (
      <div className="action-content failure-action">
        <p className="eyebrow">{t(locale, "Respuesta incorrecta")}</p>
        <h2>{t(locale, "La carta queda revelada")}</h2>
        <p>{gameMessage(locale, game.message)}</p>
        {game.variant === "hot-potato" ? <p>{fmt(locale, "El móvil sigue con el jugador {n}. Fallar no permite pasarlo.", { n: game.activePlayer })}</p> : null}
        <button
          className="primary-button"
          onClick={() =>
            quickTurns && onQuickTurnsChange
              ? onQuickTurnsChange(continueQuickTurnsAfterFailure(quickTurns))
              : setGame(continueAfterFailure(game))
          }
        >
          {t(locale, "Continuar")}
        </button>
      </div>
    );
  }

  if (game.phase === "judging") {
    return (
      <div className="action-content">
        <p className="eyebrow">
          {game.variant === "quick-turns"
            ? fmt(locale, "Respuesta del jugador {n}", { n: game.activePlayer })
            : t(locale, "Solo el preguntador")}
        </p>
        <h2>{t(locale, "¿Ha acertado?")}</h2>
        <p>{gameMessage(locale, game.message)}</p>
        <div className="button-row">
          <button
            className="primary-button success-button"
            onClick={() => setGame(judgeAnswer(game, true))}
          >
            {t(locale, "Acierto")}
          </button>
          <button
            className="secondary-button"
            onClick={() => setGame(judgeAnswer(game, false))}
          >
            {t(locale, "Fallo")}
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

  const automaticValidation = game.mode === "one-player" || game.mode === "group" || Boolean(quickTurns);

  return (
    <div className="action-content">
      <p className="eyebrow">
        {fmt(locale, "Pregunta {n} de {total}", { n: questionNumber, total: getQuestionCount(game.route) })}
        {game.variant === "quick-turns" || game.variant === "hot-potato" ? ` · ${fmt(locale, "Jugador {n}", { n: game.activePlayer })}` : ""}
      </p>
      <h2>{t(locale, getQuestion(currentStep))}</h2>
      {automaticValidation ? (
        <>
          <p className="helper-copy">
            {currentStep === "even-odd"
              ? t(locale, "J = 11, Q = 12, K = 13 y A = 14. J y K son impares; Q y A son pares.")
              : quickTurns
              ? t(locale, "La web comprueba el resultado. Si fallas, guarda tu partida y pasa el turno al otro jugador.")
              : currentStep === "higher-lower"
                ? t(locale, "El as es la carta más alta; un empate cuenta como fallo.")
                : t(locale, "Elige una opción para revelar la siguiente carta.")}
          </p>
          <div className="button-row answer-grid">
            {options.map((option) => (
              <button
                className="primary-button"
                key={option.value}
                onClick={() =>
                  quickTurns && onQuickTurnsChange
                    ? onQuickTurnsChange(answerQuickTurns(quickTurns, option.value))
                    : setGame(answerSinglePlayer(game, option.value))
                }
              >
                {t(locale, option.label)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="helper-copy">
            {t(locale, "El jugador responde en voz alta. Después, revela la carta y valida el resultado.")}
          </p>
          <button
            className="primary-button"
            onClick={() => setGame(revealForJudge(game))}
          >
            {t(locale, "Revelar carta")}
          </button>
        </>
      )}
    </div>
  );
}

export default function Game({ locale = "es", onCompleted, onStart }: {
  locale?: Locale;
  onCompleted?: (difficulty: GameDifficulty) => void;
  onStart?: () => void;
}) {
  const [gameAnalytics] = useState(() => createGameAnalytics());
  const [journeyRun, setJourneyRun] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [crossing, setCrossing] = useState<TollCrossing | null>(null);
  const crossingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const crossingLock = useRef(false);
  const [game, setGame] = useState<GameState | null>(null);
  const [quickTurns, setQuickTurns] = useState<QuickTurnsState | null>(null);
  const [settings, setSettings] = useState<GameSettings>({
    mode: "one-player",
    variant: "classic",
    difficulty: "medium",
  });
  const [cardStyle, setCardStyle] = useState<CardStyle>("classic");
  const cardStyleVariables = cardStyle === "pixel-toll"
    ? ({
        "--pixel-toll-back": "url(" + BASE_PATH + "/images/peaje-pixel-back.png)",
        "--pixel-toll-suits": "url(" + BASE_PATH + "/images/peaje-pixel-suits.png)",
        "--pixel-toll-references": "url(" + BASE_PATH + "/images/peaje-pixel-references.png)",
      } as CSSProperties)
    : undefined;
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
    onStart?.();
    cancelCrossing();
    setDirection(1);
    stopRetreatEffect(true);
    effectImagePreloadRef.current = new window.Image();
    effectImagePreloadRef.current.src = `${BASE_PATH}/images/cinco-fallos.webp`;
    if (settings.variant === "quick-turns") {
      const nextSession = startQuickTurnsGame(settings);
      gameAnalytics.start(nextSession.players[1]);
      setQuickTurns(nextSession);
      setGame(nextSession.players[1]);
      return;
    }

    const nextGame = startGame(settings);
    gameAnalytics.start(nextGame);
    setQuickTurns(null);
    setGame(nextGame);
  }

  function updateQuickTurns(nextSession: QuickTurnsState) {
    const nextGame = nextSession.players[nextSession.activePlayer];
    if (game?.phase !== "complete" && nextGame.phase === "complete") onCompleted?.(nextGame.difficulty);
    gameAnalytics.update(nextGame);
    setDirection(1);
    setQuickTurns(nextSession);
    setGame(nextGame);
  }

  function updateGame(nextGame: GameState) {
    if (crossingLock.current) return;

    if (game?.phase === "complete" && nextGame.phase === "playing") {
      onStart?.();
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
    if (game?.phase !== "complete" && nextGame.phase === "complete") onCompleted?.(nextGame.difficulty);
    gameAnalytics.update(nextGame);
    setGame(nextGame);
  }

  function returnToSetup() {
    onStart?.();
    gameAnalytics.abandon("new_game");
    cancelCrossing();
    stopRetreatEffect(true);
    setQuickTurns(null);
    setGame(null);
  }

  if (!game) {
    return (
      <div className="game-root" data-card-style={cardStyle} style={cardStyleVariables}>
        <ModeSelection
          locale={locale}
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
      ? { label: t(locale, "Puntos"), value: String(getScore(game)) }
      : game.variant === "cooperative"
        ? { label: t(locale, "Margen"), value: String(Math.max(0, 6 - game.failures)) }
        : game.variant === "quick-turns" || game.variant === "hot-potato"
          ? { label: t(locale, "Turno"), value: String(quickTurns?.activePlayer ?? game.activePlayer) }
          : {
              label: t(locale, "Dificultad"),
              value: t(locale, DIFFICULTY_LABELS[game.difficulty]),
            };

  return (
    <section
      className="game-shell game-root"
      data-card-style={cardStyle}
      data-complete={game.phase === "complete"}
      style={cardStyleVariables}
      aria-label={t(locale, "Partida de El Peaje")}
    >
      <header className="game-header">
        <div>
          <p className="eyebrow">
            {t(locale, VARIANT_LABELS[game.variant])} · {t(locale, DIFFICULTY_LABELS[game.difficulty])} ·{" "}
            {playerCountLabel(game, locale)}
          </p>
          <h1><span className="game-route-badge">EP-52</span> {t(locale, "En ruta.")}</h1>
        </div>
        <div className="game-header-actions"><PrivacySettingsButton compact locale={locale} /><button className="text-button" onClick={returnToSetup}>
          {t(locale, "Nueva partida")}
        </button></div>
      </header>

      <section className="stats" aria-label={t(locale, "Estado de la partida")}>
        <div>
          <span>{t(locale, "En el mazo")}</span>
          <strong>{game.deck.length}</strong>
        </div>
        <div>
          <span>{t(locale, "Fallos")}</span>
          <strong>{game.failures}</strong>
        </div>
        <div>
          <span>{t(locale, "Peajes")}</span>
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
            {fmt(locale, "Racha desde la última: {n}", { n: game.failureStreakFromLast })}
          </strong>
        </aside>
      ) : null}

      <RouteBoard locale={locale} key={journeyRun} game={game} crossing={crossing} direction={direction} />

      <section className="action-panel" aria-live="polite">
        {crossing ? (
          <p className="crossing-status" role="status">
            {t(locale, crossing.departing ? "Buen viaje. Cruzando el peaje…" : "Penalización cumplida. Levantando la barrera…")}
          </p>
        ) : null}
        <fieldset className="action-controls" disabled={crossing !== null} aria-label={t(locale, "Acciones de la partida")}>
          <ActionPanel
            locale={locale}
            game={game}
            setGame={updateGame}
            onShared={gameAnalytics.share}
            quickTurns={quickTurns ?? undefined}
            onQuickTurnsChange={updateQuickTurns}
            onRestart={quickTurns ? startNewGame : undefined}
          />
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
