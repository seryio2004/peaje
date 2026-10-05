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
    text: "Acierta para avanzar y retrocede cuando falles. La partida termina al superar la última pregunta o al agotar la baraja. Es el punto de partida para aprender: no añade un objetivo de puntuación ni un límite de fallos. Puedes jugar solo con comprobación automática o en pareja con una persona que revela y valida la respuesta verbal.",
  },
  {
    number: "02",
    title: "Por puntos",
    summary: "Fallo +1 · Peaje +2",
    text: "El marcador calcula automáticamente un punto por fallo y dos por cada peaje. El objetivo es completar la ruta con la puntuación más baja. Por ejemplo, tres fallos y dos cruces de peaje suman siete puntos. Los cruces hacia atrás también cuentan, por lo que repetir una zona de la ruta puede aumentar el coste. Sirve para comparar partidas de la misma dificultad; las barajas se mezclan de nuevo en cada intento.",
  },
  {
    number: "03",
    title: "Cooperativo",
    summary: "Un equipo · Seis fallos",
    text: "Todos comparten el mismo recorrido. El equipo debe llegar al final antes de alcanzar el sexto fallo, que termina la partida inmediatamente. Podéis debatir cada respuesta y dejar que una persona pulse: el motor mantiene un único recorrido, no perfiles individuales. Es apropiado para decidir juntos; no es una competición entre miembros del equipo.",
  },
  {
    number: "04",
    title: "Turnos rápidos",
    summary: "Dos partidas · Cambio al fallar",
    text: "Cada jugador tiene su propia ruta, cartas, fallos y peajes. La web valida cada respuesta automáticamente; al fallar, la partida queda guardada y el turno pasa al otro jugador. Cada ruta parte de una baraja mezclada por separado; acertar no cede el turno. Cuando te toque de nuevo, continúas tu estado pendiente, incluidos retrocesos y peajes. Es una opción para dos personas que quieren alternar sin que una tenga que actuar como juez.",
  },
  {
    number: "05",
    title: "Peaje seguro",
    summary: "Retos sin bebidas",
    text: "Sustituye las instrucciones del peaje por una prueba breve, una pregunta divertida o un reto seguro acordado por el grupo. El cambio está en los mensajes y en vuestra consecuencia social: las predicciones, los fallos y los cruces siguen funcionando igual. No hay un catálogo automático de retos. Preparad una pregunta breve o un punto simbólico y permitid omitirlo; también podéis jugar sin alcohol en cualquiera de los otros modos.",
  },
  {
    number: "06",
    title: "La patata",
    summary: "3–8 personas · Cartas de pase ocultas",
    text: "Compartís móvil y recorrido. Al empezar se eligen al azar 20 de las 51 cartas del mazo: si aciertas una de ellas, puedes pasar el móvil a otra persona o quedártelo. Si fallas, retrocedes y sigues tú. Los peajes se cumplen antes de pasar. No hay temporizador: termina al completar la ruta o agotar la baraja.",
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
  { question: "¿Funciona en móvil y en ordenador?", answer: "El Peaje se juega desde un navegador actual en ambos dispositivos. La interfaz ajusta el tablero y los controles al tamaño y la orientación. Para una partida en grupo compartid una pantalla; abrir el mismo enlace en dos móviles crea partidas independientes." },
  { question: "¿Hace falta conexión durante toda la partida?", answer: "Necesitas conexión para abrir la web y descargar sus recursos. Las decisiones y el mazo se gestionan en el navegador, pero no hay un modo offline instalado ni se garantiza que todos los recursos sigan disponibles sin conexión." },
  { question: "¿Un fallo en la primera pregunta cambia la carta de referencia?", answer: "No. La primera pregunta sigue comparando con la carta inicial. La carta fallada queda visible en la posición del tablero y sale del mazo, pero no sustituye esa referencia." },
  { question: "¿Un peaje consume una carta?", answer: "No. Confirmarlo cambia la posición y permite continuar. Cada respuesta que revela una carta sí reduce el mazo, incluso si fallas o repites una pregunta." },
  { question: "¿Cómo se calcula el resultado por puntos?", answer: "Se suma un punto por fallo y dos por cada cruce de peaje, incluyendo los de retroceso. Cuatro fallos y tres peajes son diez puntos. Compara resultados de la misma dificultad y distingue las rutas completadas de las partidas que agotan el mazo." },

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
      "Sí. Aunque algunas personas buscan El Peaje como juego de beber para la previa, la web no asigna bebidas ni exige consumir alcohol. Podéis utilizar puntos, pruebas breves, preguntas, agua o cualquier penalización segura acordada por el grupo.",
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
      "En un jugador, la web comprueba la respuesta. En el modo normal de dos jugadores, una persona responde en voz alta y la otra revela la carta y valida el resultado. Turnos rápidos es distinto: la web valida y cada jugador conserva su propia partida.",
  },
  {
    question: "¿Cómo funcionan los turnos rápidos?",
    answer:
      "Hay dos partidas independientes, una por jugador. Un acierto permite seguir jugando con la misma partida; un fallo guarda ese estado y cede el turno a la otra persona. Cuando el turno vuelve, puedes retomar tu ruta exactamente donde la dejaste.",
  },
  {
    question: "¿Se guardan mis partidas?",
    answer:
      "No. El estado se mantiene únicamente mientras la partida está abierta y se descarta al recargar o cerrar la página.",
  },
  {
    question: "¿Cómo se juega a La patata?",
    answer: "Elegid entre 3 y 8 jugadores y repartíos los números. Empieza el jugador 1. Aproximadamente el 40 % de las cartas permite pasar el móvil si aciertas; no se indican antes de responder. Puedes elegir a cualquier otra persona o quedártelo. Al fallar, retrocedes según las reglas habituales y mantienes el móvil. Cumple los peajes antes de cederlo. Normal tiene el recorrido difícil habitual; Difícil añade par o impar antes del palo exacto.",
  },
  {
    question: "¿Las figuras y el as cuentan como pares o impares?",
    answer: "En La patata difícil, J vale 11 y K vale 13: son impares. Q vale 12 y A vale 14: son pares. Las demás cartas usan su número. El as sigue siendo la carta más alta en mayor o menor.",
  },
];
