export const RULES = [
  {
    number: "01",
    title: "Descubre la referencia",
    text: "La partida comienza con una carta visible. Esa carta será la primera referencia para decidir qué aparecerá después.",
  },
  {
    number: "02",
    title: "Mayor o menor",
    text: "Predice si la siguiente carta tendrá un valor mayor o menor. El as es la carta más alta y un empate cuenta como fallo.",
  },
  {
    number: "03",
    title: "Redonda o picuda",
    text: "Corazones y tréboles son palos redondos. Diamantes y picas son palos picudos. Esta pregunta no aparece en dificultad fácil.",
  },
  {
    number: "04",
    title: "Cruza El Peaje",
    text: "Al atravesar un peaje en cualquier dirección debes cumplir la penalización segura que el grupo haya acordado antes de jugar.",
  },
  {
    number: "05",
    title: "Roja o negra",
    text: "Elige roja para corazones o diamantes; negra para tréboles o picas.",
  },
  {
    number: "06",
    title: "Acierta el palo",
    text: "La última pregunta exige acertar el palo exacto: corazones, diamantes, tréboles o picas.",
  },
];

export const GAME_MODES = [
  {
    number: "01",
    title: "Clásico",
    summary: "El recorrido original",
    text: "Acierta para avanzar y retrocede cuando falles. La partida termina al superar la última pregunta o al agotar la baraja.",
  },
  {
    number: "02",
    title: "Por puntos",
    summary: "Fallo +1 · Peaje +2",
    text: "El marcador calcula automáticamente un punto por fallo y dos por cada peaje. El objetivo es completar la ruta con la puntuación más baja.",
  },
  {
    number: "03",
    title: "Cooperativo",
    summary: "Un equipo · Seis fallos",
    text: "Todos comparten el mismo recorrido. El equipo debe llegar al final antes de alcanzar el sexto fallo.",
  },
  {
    number: "04",
    title: "Turnos rápidos",
    summary: "Dos jugadores alternos",
    text: "La web alterna automáticamente el jugador activo después de validar cada respuesta. Está disponible al seleccionar dos jugadores.",
  },
  {
    number: "05",
    title: "Peaje seguro",
    summary: "Retos sin bebidas",
    text: "Sustituye las instrucciones del peaje por una prueba breve, una pregunta divertida o un reto seguro acordado por el grupo.",
  },
];

export const DIFFICULTIES = [
  {
    title: "Fácil",
    detail: "3 preguntas · 1 peaje",
    text: "Elimina la prueba de redonda o picuda para crear una ruta breve de cuatro posiciones.",
  },
  {
    title: "Media",
    detail: "4 preguntas · 1 peaje",
    text: "Mantiene el recorrido original con las cuatro predicciones y un peaje central.",
  },
  {
    title: "Difícil",
    detail: "4 preguntas · 2 peajes",
    text: "Conserva todas las preguntas e introduce un segundo peaje antes de acertar el palo exacto.",
  },
];

export const FAQS = [
  {
    question: "¿Necesito una baraja física?",
    answer:
      "No. La web crea, mezcla y reparte una baraja francesa completa de 52 cartas sin repetir cartas dentro de una partida.",
  },
  {
    question: "¿Qué valor tiene el as?",
    answer:
      "El as es la carta más alta. En la pregunta de mayor o menor, dos cartas con el mismo valor cuentan como fallo.",
  },
  {
    question: "¿Qué significa redonda o picuda?",
    answer:
      "Corazones y tréboles se consideran redondos. Diamantes y picas se consideran picudos por la forma principal de su símbolo.",
  },
  {
    question: "¿Se puede jugar sin consumir alcohol?",
    answer:
      "Sí. El Peaje no exige una bebida concreta. Podéis utilizar puntos, pruebas breves, preguntas, agua o cualquier penalización segura acordada por el grupo.",
  },
  {
    question: "¿Cuándo termina una partida?",
    answer:
      "Termina al superar todas las posiciones de la dificultad elegida, al alcanzar el límite del modo cooperativo o cuando se agota la baraja.",
  },
  {
    question: "¿Qué ocurre cuando fallo?",
    answer:
      "La carta queda visible, el contador de fallos aumenta y retrocedes hacia la pregunta anterior. Si atraviesas un peaje al retroceder, también debes confirmarlo.",
  },
  {
    question: "¿En qué se diferencian uno y dos jugadores?",
    answer:
      "En un jugador, la web comprueba la respuesta. En dos jugadores, una persona responde en voz alta y la otra revela la carta y valida el resultado.",
  },
  {
    question: "¿Se guardan mis partidas?",
    answer:
      "No. El estado se mantiene únicamente mientras la partida está abierta y se descarta al recargar o cerrar la página.",
  },
];
