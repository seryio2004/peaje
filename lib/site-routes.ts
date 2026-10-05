/** Stable URLs: changing a label does not rename a route. */
export const SITE_PAGES = {
  "/compartir": { title: "Compartir El Peaje por QR y enlace", description: "Invita a otra persona con el QR o el enlace de El Peaje. Aprende qué se comparte y cómo abrir una partida independiente desde otro móvil.", label: "Compartir" },

  "/": { title: "El Peaje: juego online gratis de cartas para grupos", description: "Juega a El Peaje online y gratis, sin registro: predice cartas, supera peajes y elige entre seis modos para 1 a 8 personas. Ideal para una previa o una partida sin bebidas.", label: "Inicio" },
  "/jugar": { title: "Jugar a El Peaje online gratis", description: "Empieza una partida gratis de El Peaje en el navegador. Elige modo y dificultad y juega con 52 cartas, solo, en pareja o en grupo, sin registro.", label: "Jugar" },
  "/como-jugar": { title: "Cómo jugar a El Peaje: reglas de cartas y peajes", description: "Aprende las reglas de El Peaje: predice las cartas, avanza por la ruta, resuelve los peajes y descubre cuándo termina la partida.", label: "Reglas" },
  "/previa": { title: "El Peaje para la previa: reglas y formas de jugar", description: "Organiza una partida gratis de El Peaje para la previa: reglas rápidas, modos para grupos y peajes con puntos, preguntas o retos. Las bebidas son opcionales.", label: "Para la previa" },
  "/juegos-de-beber": { title: "Peajes con y sin bebidas en El Peaje", description: "Acuerda peajes voluntarios en El Peaje: preguntas, retos o puntos. Ejemplos para jugar sin alcohol y pautas para respetar la participación del grupo.", label: "Juegos de beber" },
  "/modos-de-juego": { title: "Modos de juego y dificultades", description: "Compara los seis modos de El Peaje, incluido La patata para grupos de 3 a 8 personas, y elige tu dificultad.", label: "Modos" },
  "/preguntas-frecuentes": { title: "Preguntas frecuentes sobre El Peaje", description: "Resuelve tus dudas sobre las cartas, los jugadores, los peajes, el final de partida y la privacidad de El Peaje.", label: "Preguntas" },
  "/sobre-el-juego": { title: "Sobre el juego", description: "Conoce el propósito y el funcionamiento de El Peaje, un juego de cartas online gratuito, sin registro y para jugar solo, en pareja o en grupo.", label: "Sobre el juego" },
  "/probabilidades": { title: "Probabilidades en El Peaje", description: "Consulta los trece valores de mayor o menor, el riesgo de empate y cómo cambian las probabilidades al retirar cartas conocidas de la baraja de El Peaje.", label: "Probabilidades" },
  "/estrategia": { title: "Estrategia y decisiones en El Peaje", description: "Aprende a decidir con cartas centrales y extremas, interpretar el historial y entender el coste de fallar o cruzar un peaje en cada modo de El Peaje.", label: "Estrategia" },
  "/variantes": { title: "Variantes para organizar una sesión de El Peaje", description: "Seis propuestas de sesión con los modos actuales de El Peaje: duelo, equipos, grupos y peajes de conversación, con preparación y reglas claras.", label: "Variantes" },
  "/desarrollo": { title: "Desarrollo técnico de El Peaje", description: "Descubre cómo El Peaje genera y mezcla las cartas, gestiona las fases de partida y exporta su frontend de Next.js para servirlo desde Cloudflare.", label: "Desarrollo" },
  "/contacto": { title: "Contacto", description: "Consulta cómo comunicar errores, dudas o sugerencias sobre el juego de cartas El Peaje.", label: "Contacto" },
  "/privacidad": { title: "Privacidad", description: "Conoce qué datos utiliza El Peaje, cómo funciona la analítica opcional y cómo gestionar tus preferencias de privacidad.", label: "Privacidad" },
  "/cookies": { title: "Cookies y preferencias de privacidad", description: "Consulta el almacenamiento utilizado por El Peaje y acepta o rechaza por separado la analítica y las preferencias de publicidad.", label: "Cookies" },
  "/aviso-legal": { title: "Aviso legal", description: "Información sobre el sitio El Peaje, el uso del contenido y sus condiciones de utilización.", label: "Aviso legal" },
} as const;
export type SitePath = keyof typeof SITE_PAGES;
export const HEADER_PATHS: SitePath[] = ["/", "/jugar", "/como-jugar", "/modos-de-juego", "/preguntas-frecuentes"];
export const FOOTER_PATHS: SitePath[] = ["/probabilidades", "/estrategia", "/variantes", "/desarrollo", "/juegos-de-beber", "/previa", "/compartir", "/sobre-el-juego", "/contacto", "/privacidad", "/cookies", "/aviso-legal"];
