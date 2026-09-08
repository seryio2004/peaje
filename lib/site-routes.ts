/** Stable URLs: changing a label does not rename a route. */
export const SITE_PAGES = {
  "/compartir": { title: "Compartir El Peaje por QR y próximas apps", description: "Comparte El Peaje con un código QR o un enlace. Conoce el estado de las apps para Google Play y App Store, todavía en desarrollo.", label: "Compartir y apps" },

  "/": { title: "El Peaje: juego de cartas online gratis", description: "Juega a El Peaje gratis y sin registro. Predice cartas, cruza peajes y elige entre cinco modos y tres dificultades para uno o dos jugadores.", label: "Inicio" },
  "/jugar": { title: "Jugar a El Peaje online", description: "Empieza una partida gratis de El Peaje con una baraja de 52 cartas. Configura el modo y la dificultad para jugar solo o con otra persona.", label: "Jugar" },
  "/como-jugar": { title: "Cómo jugar a El Peaje: reglas de cartas y peajes", description: "Aprende las reglas de El Peaje: predice las cartas, avanza por la ruta, resuelve los peajes y descubre cuándo termina la partida.", label: "Reglas" },
  "/modos-de-juego": { title: "Modos de juego y dificultades", description: "Compara los cinco modos de El Peaje y elige entre dificultad fácil, media o difícil con rutas y peajes adaptados.", label: "Modos" },
  "/preguntas-frecuentes": { title: "Preguntas frecuentes sobre El Peaje", description: "Resuelve tus dudas sobre las cartas, los jugadores, los peajes, el final de partida y la privacidad de El Peaje.", label: "Preguntas" },
  "/sobre-el-juego": { title: "Sobre el juego", description: "Conoce el propósito y el funcionamiento de El Peaje, un juego de cartas online gratuito, sin registro y para uno o dos jugadores.", label: "Sobre el juego" },
  "/contacto": { title: "Contacto", description: "Consulta cómo comunicar errores, dudas o sugerencias sobre el juego de cartas El Peaje.", label: "Contacto" },
  "/privacidad": { title: "Privacidad", description: "Conoce qué datos utiliza El Peaje, cómo funciona la analítica opcional y cómo gestionar tus preferencias de privacidad.", label: "Privacidad" },
  "/cookies": { title: "Cookies y preferencias de privacidad", description: "Consulta el almacenamiento utilizado por El Peaje y acepta o rechaza por separado la analítica y las preferencias de publicidad.", label: "Cookies" },
  "/aviso-legal": { title: "Aviso legal", description: "Información sobre el sitio El Peaje, el uso del contenido y sus condiciones de utilización.", label: "Aviso legal" },
} as const;
export type SitePath = keyof typeof SITE_PAGES;
export const HEADER_PATHS: SitePath[] = ["/", "/jugar", "/como-jugar", "/modos-de-juego", "/preguntas-frecuentes"];
export const FOOTER_PATHS: SitePath[] = ["/compartir", "/sobre-el-juego", "/contacto", "/privacidad", "/cookies", "/aviso-legal"];
