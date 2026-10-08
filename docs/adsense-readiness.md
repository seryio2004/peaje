# Preparación de El Peaje para una nueva revisión de AdSense

Fecha: 5 de octubre de 2026.

> **Actualización tras el push:** el despliegue ya publica las 52 páginas. Consulta [la comprobación de producción](adsense-post-deploy.md), que sustituye las observaciones históricas de este documento sobre rutas todavía sin publicar.

**Estado: cambios locales terminados y comprobados; no solicitar todavía revisión sobre la versión publicada anterior.** Primero publicar este export de producción, repetir la auditoría contra el dominio y confirmar los datos del titular, la cuenta publicitaria y los permisos de los recursos audiovisuales. No se ha desplegado ni solicitado revisión de AdSense.

## Cambios realizados

- Auditoría inicial de todas las rutas españolas y los 35 destinos traducidos presentes en el directorio de trabajo: `adsense-audit.md`.
- Cuatro artículos originales, escritos contra las reglas de `lib/game.ts`, sin modificar el motor ni las mecánicas existentes.
- Cálculos de probabilidades que comparten `createDeck()` con el juego; pruebas de los trece rangos, empates, extremos, historial, baraja agotada y entradas inválidas.
- Más ejemplos y situaciones especiales en reglas; descripciones completas para los seis modos; FAQ sobre dispositivos, historial, recarga y puntuación.
- Explicación del propósito, diseño, evolución funcional y mantenimiento del proyecto, sin inventar una biografía, fechas de origen ni métricas de jugadores.
- Inicio con enlaces a los artículos y descripción precisa del retroceso. Diferenciación entre organizar una sesión (`/previa/`) y acordar peajes voluntarios (`/juegos-de-beber/`).
- Retirada de tarjetas de apps inexistentes en compartir y de sus promesas en inicio/metadatos. QR explicado como enlace al sitio, sin prometer transferencia de partidas.
- Todas las rutas de juego sin publicidad, incluso pospartida. Retirada de placeholders publicitarios aunque se active la bandera. Eliminación de puntos publicitarios en contacto, compartir y políticas; integración editorial futura limitada por tipos y conjunto explícito de posiciones.
- Publicidad analítica identificada como `off`, sin reportar una exposición a placeholders inexistentes.
- Footer español con artículos nuevos; footer traducido con accesos explícitos a sobre el juego, contacto, privacidad y cookies, indicando que esas páginas están en español.
- Modos traducidos ampliados con ejemplos, límites y diferencias reales. Reglas con ejemplo de empate, previa con logística de una pantalla, peajes con alternativas concretas y FAQ con compatibilidad/recarga en los cinco idiomas existentes.
- Canonical, OpenGraph y sitemap de los artículos nuevos mediante el registro central de rutas. Sin versiones vacías o traducciones inventadas de esos artículos.
- Se conserva `/modos-de-juego/`; `/modos/` es una redirección 301, evitando un artículo duplicado. Sitemap solo contiene el destino canónico.
- Navegación móvil que puede ajustar sus enlaces a varias líneas. Tabla con desplazamiento horizontal y acceso por teclado, sin ensanchar el documento.
- Contraste corregido en CTA editoriales y cabecera; nombre accesible de marca basado en su texto.
- Precarga especulativa de enlaces editoriales desactivada; la navegación con enlaces de Next sigue funcionando.
- Consentimiento accesible manualmente desde todas las páginas; no aparece un modal automático cuando la analítica está desactivada. Si se activa analítica, se conserva la solicitud previa de consentimiento.
- Privacidad y cookies describen claramente el estado actual sin publicidad y distinguen la información de una futura integración.
- Script `scripts/site-audit.mts`: HTTP, metadatos, H1, canonical, robots HTML/cabeceras, indexación, OpenGraph, contenido prerenderizado, footer, enlaces internos, sitemap, robots, 404 y formato de ads.txt. PASS/WARN/FAIL, JSON opcional y salida 1 si hay fallos.
- Vista local `scripts/serve-export.mjs` con rutas reales, redirecciones, 404 y compresión gzip. No reproduce las cabeceras ni certifica la configuración de Cloudflare.
- Ajustes de tipado en pruebas existentes de consentimiento/medición: mutaciones de configuración con `Object.assign`, conservando las aserciones. Eliminación de tipos generados antiguos que apuntaban a rutas anteriores a la internacionalización.
- README y documentación de publicidad actualizados con comandos reproducibles y la separación entre auditoría local y publicada.

Los cambios de internacionalización y reorganización de rutas que ya existían antes de esta tarea se han conservado. El motor, el tablero y las cartas tenían modificaciones previas del usuario; no se han revertido ni atribuido a esta intervención.

## Páginas creadas

| URL | Objetivo propio |
| --- | --- |
| `/probabilidades/` | Tabla de mayor/menor para 2–A, empates, actualización con cartas conocidas, color, forma, paridad y metodología calculada. |
| `/estrategia/` | Interpretar información disponible, extremos, cartas centrales, coste de retrocesos y decisiones de grupo. |
| `/variantes/` | Seis acuerdos de sesión con participantes, preparación, reglas, tiempo presupuestado y diferencias; no promete nuevos modos programados. |
| `/desarrollo/` | Arquitectura, frontend, mezcla, estados de partida, responsive, exportación y comprobaciones. |

## Páginas modificadas

| Página | Cambio editorial o funcional |
| --- | --- |
| `/` | Presentación precisa, descubrimiento de artículos, compartir sin apps futuras. |
| `/jugar/` y sus cinco traducciones | Interfaz y mecánicas preservadas, eliminación del espacio publicitario pospartida. |
| `/como-jugar/` | Flujo completo, ejemplos de acierto/empate, retroceso sobre peaje, baraja agotada y enlaces a modos/FAQ. |
| `/modos-de-juego/` | Explicaciones de cada variante con uso, límites y consecuencias. |
| `/sobre-el-juego/` | Propósito, adaptación a pantalla, diseño, funciones presentes, repositorio y tecnología. |
| `/preguntas-frecuentes/` | Compatibilidad, conectividad, referencia inicial, consumo de cartas y cálculo de puntos. |
| `/previa/` | Preparación de pantalla, números, cierre de sesión y cambios de participantes. |
| `/juegos-de-beber/` | Intención centrada en peajes voluntarios, ejemplos sin alcohol y separación de puntuación/bebidas. |
| `/compartir/` | Retirada de tarjetas futuras; alcance del QR y alternativas sin JavaScript. |
| `/privacidad/`, `/cookies/` | Estado publicitario real, controles conservados y retirada de puntos publicitarios. |
| `/contacto/`, `/aviso-legal/` | Sin puntos publicitarios; contenido de servicio breve preservado. |
| Páginas traducidas | Modos, ejemplos de reglas, logística, peajes, compatibilidad y footer completados; se mantienen URLs y hreflang existentes. |

Todas las páginas heredan los ajustes de cabecera, footer, contraste y consentimiento de su layout.

## Problemas todavía existentes

1. **Cambios sin publicar.** La comprobación del dominio antes del despliegue encontró 13 páginas españolas iniciales con HTTP 200 y las cuatro nuevas + 35 traducidas con HTTP 404. El sitemap publicado corresponde a la versión anterior. No solicitar revisión hasta publicar y verificar todas las URLs. Registro: `site-audit-live-before.json`; sus 315 FAIL incluyen múltiples comprobaciones de cada URL ausente, no 315 averías independientes.
2. **Identidad y contacto del titular.** El repositorio y el correo `help@elpejae.com` están en el código, pero no se ha confirmado la operatividad del correo ni una identidad legal completa. El titular debe aportar y validar su información antes de la revisión; no se han inventado nombres o datos personales.
3. **ads.txt:** formato correcto del registro ya existente. Confirmar que su publisher ID coincide con la cuenta que solicita revisión. La auditoría no accede a esa cuenta.
4. **Publicidad futura:** no hay SDK, unidades reales ni CMP publicitaria configurada en esta versión. Antes de activar anuncios hay que configurar consentimiento, proveedores y CSP, revisar políticas y probar rechazo/retirada. Los controles locales de analítica no sustituyen una CMP publicitaria.
5. **Hosting y 404:** la respuesta de error pública anterior devolvió 404 sin noindex detectable. El export local sí genera 404 noindex. Repetir esa comprobación después de publicar; no basta con ver el archivo local.
6. **Rendimiento publicado pendiente:** las mediciones locales no son Core Web Vitals de usuarios reales. La vista local tampoco reproduce las cabeceras/cache de Cloudflare. Hay que repetir Lighthouse en producción después del despliegue.
7. **Idiomas:** los cuatro artículos nuevos están en español; las políticas también. Los enlaces del footer extranjero identifican el idioma del destino. No se han creado traducciones vacías para ampliar el sitemap.
8. **Partidas en memoria:** recargar pierde el progreso; no hay sincronización entre móviles ni offline instalado. Son límites existentes que ahora están explicados, no funciones anunciadas como disponibles.

## SEO

El export final contiene **52 páginas indexables**: 17 españolas y 35 traducidas. Tiene títulos y descripciones distintos, una canonical con origen `https://elpejae.com` y barra final por página, un H1, OpenGraph, enlaces rastreables y sitemap completo. Las traducciones existentes mantienen hreflang. Los artículos tienen breadcrumbs visibles; no se añadieron reseñas, calificaciones ni datos estructurados ficticios.

Robots permite rastreo público y declara el sitemap. Producción es indexable; staging conserva noindex y sitemap vacío. La página 404 queda fuera del sitemap y contiene noindex en el export.

Resultado reproducible local: **639 PASS, 1 WARN, 0 FAIL**, en `site-audit-results.json`. El WARN corresponde a la titularidad de ads.txt. La auditoría también fue probada con errores controlados: detectó los diez tipos de fallo introducidos (HTTP, title, description, canonical, H1, noindex de cabecera, enlace, cobertura de sitemap, rastreo y declaración de sitemap) y terminó con código 1.

```bash
npm run build:production
npm run audit:site -- --report docs/site-audit-results.json
# Después de publicar:
npm run audit:site -- --base https://elpejae.com --report /tmp/peaje-live-audit.json
```

## Contenido

El contenido nuevo aporta cálculos y ejemplos que solo describen este motor. La tabla usa 51 cartas después de retirar la referencia, y separa los tres empates de los resultados favorables. El ejemplo de un 8 con cuatro cartas bajas conocidas obtiene 24 mayores, 20 menores y 3 iguales entre 47 cartas. Explica que el tablero puede sobrescribir cartas retiradas y no es un historial completo.

La estrategia no inventa una probabilidad de victoria del recorrido ni trata las preguntas como independientes. Las variantes distinguen reglas implementadas de acuerdos en papel. Sus tiempos son presupuestos orientativos, no estadísticas medidas. El desarrollo y la evolución se describen desde el código presente, sin inventar la historia del creador.

El contenido editorial es HTML prerenderizado. La FAQ funciona con `details` sin JavaScript y el QR queda visible. Jugar, copiar/compartir con API del navegador y modificar preferencias requieren JavaScript razonablemente.

## Validación, rendimiento y UX

- `npm run lint`: sin errores ni avisos.
- `npx tsc --noEmit`: correcto.
- `npm test`: pasan los 8 archivos de pruebas, incluidos motor, La patata, consentimiento, internacionalización y probabilidades.
- `npm run build:staging` y `npm run build:production`: correctos; ambos verifican export, SEO y CSP. `out/` queda con el build de producción.
- Navegador Chromium, 390 × 844 y 1280 × 900: sin desbordamientos horizontales, enlaces de cabecera dentro de pantalla, H1 único y sin errores de JavaScript. Inicio de partida y respuesta automática funcionan; preferencias abren manualmente.
- Lectura sin JavaScript comprobada en reglas, FAQ, compartir y los cuatro artículos. Tabla de trece filas y FAQ desplegable disponibles. Resultados: `browser-qa-results.json`.
- Lighthouse móvil sobre portada, probabilidades y juego: contraste y nombre accesible corregidos; accesibilidad, buenas prácticas y SEO a 100; CLS 0.

Las mediciones del primer servidor local **sin compresión** dieron rendimiento 85/77/83 y LCP 4,3/4,7/4,8 s para portada/probabilidades/juego. No se ocultan: fueron útiles para detectar el contraste y distinguir el coste del servidor de prueba. La vista local actual comprime respuestas textuales con gzip; sus resultados son **99/96/98** en rendimiento, con LCP **2,1/2,2/2,2 s** (portada/probabilidades/juego), accesibilidad/buenas prácticas/SEO **100** y CLS **0**. Ambas mediciones quedan en `lighthouse-results.json`. Esta compresión no cambia la configuración del hosting publicado.

Para reproducir Lighthouse (versión usada: 13.5.0), iniciar `npm run preview:static` y ejecutar, con Chromium/Chrome instalado:

```bash
npx --yes lighthouse@13.5.0 http://127.0.0.1:4173/probabilidades/ --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/peaje-lighthouse.json
```

Repetir para `/` y `/jugar/`. Si la CLI no encuentra el navegador, indicar su binario mediante `CHROME_PATH`. Las puntuaciones pueden variar con la carga del equipo; contrastar también LCP, bloqueo y CLS.

## Publicidad

Páginas candidatas, si se activa una integración real: reglas, modos, probabilidades, estrategia, variantes, desarrollo y sobre el juego. Como máximo empezar con una unidad claramente identificada entre secciones completas, con tamaño reservado, alejada de CTA y navegación. FAQ o previa solo tras valorar si el contenido justifica esa unidad.

Mantener sin anuncios `/jugar/` y todos sus equivalentes traducidos, incluidos finales de partida. También se excluyen contacto, políticas, compartir y errores. El inicio debe priorizar el acceso al juego. No hay anuncios activos ni espacios vacíos en esta entrega.

La arquitectura conserva puntos de integración editorial tipados. `ads.txt` ya está presente. La bandera ADS_ENABLED no activa nada por sí sola y el adaptador futuro deberá revisar CSP, consentimiento, errores/sin inventario y estabilidad visual.

Referencias consultadas el 5 de octubre de 2026: [Políticas del programa AdSense](https://support.google.com/adsense/answer/48182?hl=es), [Políticas para Editores de Google](https://support.google.com/adsense/answer/10502938?hl=es) y [gestión del consentimiento para anuncios personalizados en EEE, Reino Unido y Suiza](https://support.google.com/adsense/answer/13554116?hl=es). La valoración editorial aquí es una evaluación del proyecto, no una decisión de aprobación de Google.

## Segunda revisión de preparación

Revisión adicional del 5 de octubre de 2026, solicitada para comprobar si falta algo más. Se ha repetido la auditoría HTTP contra producción y revisado los recursos utilizados por el juego y las guías oficiales actuales.

### Pendientes confirmados o por verificar

1. **Publicar la versión revisada sigue siendo el paso principal.** La nueva comprobación mantiene 13 páginas españolas con 200 y 39 destinos con 404: cuatro artículos nuevos y 35 traducciones. El rechazo por poco valor todavía se estaría evaluando contra la versión anterior. El resultado HTTP repetido es 285 PASS, 1 WARN y 315 FAIL; los fallos de metadatos en destinos 404 son consecuencias de esas rutas ausentes.
2. **Revisar los derechos de los recursos de cinco fallos.** `app/game.tsx` utiliza `public/images/cinco-fallos.webp` y `public/audio/cinco-fallos.mp3`. El README del audio explica cómo colocarlo, pero no documenta autor, fuente ni licencia; tampoco se encontró un registro de permisos para la imagen. Esto no demuestra una infracción. El titular debe confirmar que puede utilizarlos y conservar la documentación; si no tiene autorización aplicable, sustituirlos por recursos propios o con licencia adecuada antes de monetizar. Véase la [política de propiedad intelectual](https://support.google.com/publisherpolicies/answer/10402772?hl=es).
3. **Identificación del responsable y contacto.** El aviso legal contiene el correo pero no identifica por nombre o denominación al responsable; sobre el juego remite a GitHub. Completar la identificación real y revisar la información de privacidad con esos datos. Es una cuestión de transparencia y de obligaciones aplicables, no una garantía de aprobación de AdSense. Si el prestador está sujeto a la LSSI española, revisar la información exigida por su [artículo 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10). Los registros MX del dominio apuntan a Cloudflare Email Routing, pero no prueban que el alias `help@elpejae.com` reciba mensajes; comprobarlo desde un correo propio. Los enlaces al repositorio y a incidencias responden con 200.
4. **Confirmar conexión del sitio en la cuenta AdSense.** El ads.txt publicado responde con 200 y contiene `pub-1831631135188737`. Debe coincidir con la cuenta y su estado en el panel. No es necesario añadir un SDK publicitario solo para verificar: Google admite ads.txt o una metaetiqueta como alternativas. La etiqueta de Search Console y la de AdSense son conceptos diferentes. Véase [conectar un sitio a AdSense](https://support.google.com/adsense/answer/12169212?hl=es). No se ha accedido al panel ni solicitado revisión.

### Lo que no debe confundirse con un bloqueo de aprobación

- Lighthouse y las verificaciones SEO comprueban calidad técnica, no certifican la valoración editorial de Google. La [guía de preparación de páginas](https://support.google.com/adsense/answer/7299563?hl=es) pone el foco en utilidad, originalidad y navegación. No se propone añadir páginas o palabras para cumplir una cifra arbitraria.
- El 404 público observado es un 404 real. La ausencia de una meta noindex adicional no se ha identificado como causa del rechazo; conservar el 404 correcto es lo esencial. El export nuevo ya añade noindex.
- Mantener el juego sin publicidad y sin SDK durante esta fase es compatible con verificar el dominio mediante los métodos alternativos de Google. La integración de anuncios y el consentimiento publicitario deben resolverse antes de servir los anuncios que los requieran, no activarse prematuramente para intentar corregir «contenido de poco valor».
- La mera mención de juegos de beber no basta para afirmar una infracción. La [restricción sobre alcohol](https://support.google.com/publisherpolicies/answer/10438039?hl=es) se refiere, entre otros supuestos, a promover consumo irresponsable, excesivo o en competiciones. Mantener los textos centrados en participación voluntaria y alternativas sin alcohol, y revisar el audio si contiene mensajes que contradigan ese enfoque. No se ha escuchado ni certificado el contenido del MP3 en esta revisión.

**Decisión actual:** publicar y verificar la versión nueva, confirmar permisos de los recursos, identificación/contacto y conexión de AdSense. La capa editorial local ya ofrece material específico del juego; no se ha encontrado una necesidad de crear más URLs para esta solicitud. La evaluación final sigue correspondiendo a Google.

## Checklist final

Los checks marcados se refieren al export local comprobado; el despliegue se trata por separado.

- [x] Capa original sustancial y útil añadida, ligada a mecánicas verificadas.
- [x] Sin placeholders de apps ni publicidad.
- [x] Navegación completa y footer con canales de confianza.
- [x] Políticas accesibles y estado publicitario actual explicado.
- [x] Responsive comprobado en móvil y escritorio.
- [x] Enlaces internos correctos en las 52 páginas locales.
- [x] Sitemap correcto en producción; vacío en staging.
- [x] Robots correcto.
- [x] Páginas indexables en producción; 404 noindex local.
- [x] ads.txt presente y sintaxis correcta.
- [x] Interfaz del juego separada de publicidad en todos los idiomas.
- [ ] Confirmar permisos de uso de la imagen y el audio de cinco fallos, o sustituirlos si no hay autorización aplicable.
- [ ] Confirmar publisher ID y conexión del sitio en la cuenta AdSense.
- [ ] Confirmar identidad del titular y recepción del correo de contacto.
- [ ] Publicar el export de producción y repetir auditoría HTTP/Lighthouse en el dominio.
- [ ] Solicitar manualmente la revisión, solo después de resolver los puntos anteriores.

**Recomendación:** el contenido y el SEO local están preparados para publicar y revisar. La web pública anterior todavía no está preparada para una nueva solicitud: no muestra estos cambios. Una vez publicados y comprobados los pendientes, el titular podrá decidir solicitarla manualmente. La aprobación por «contenido de poco valor» sigue siendo una valoración de Google, no una propiedad que un script pueda certificar.
