# SEO de El Peaje: decisiones y seguimiento

Revisión: 10 de noviembre de 2026. Cambios preparados en el repositorio; este documento no acredita un despliegue ni una mejora de posiciones.

## Fuentes y alcance

- Artículo solicitado: [Nicholas Dulait, How to use Claude Fable 5.2 for SEO so well it feels illegal](https://x.com/nicholasdulait/status/2120063043614716174). Recuperado completo mediante la API pública de FxTwitter, incluido el contenido de los bloques de código del artículo enlazado. No se han comprobado sus afirmaciones comerciales sobre modelos: no son necesarias para mejorar el sitio.
- Datos propios: `elpejae.com-Performance-on-Search-2026-11-10/`, exportación Web de 28 días, del 12 de octubre al 8 de noviembre.
- [Análisis reproducible](search-console-2026-11-10.json) y [auditoría HTTP del export local](seo-audit-2026-11-10.json).
- Documentación de la versión instalada de Next.js: metadata, JSON-LD, sitemap y exportación estática en `node_modules/next/dist/docs/`.

El sitio combina un juego y guías, no una tienda. La intención de conversión es abrir una partida. La recomendación comercial del artículo se adapta a esa acción; el marcado corresponde a un videojuego y una aplicación web gratuitos.

## Punto de partida

El gráfico suma **24 clics, 225 impresiones y un CTR del 10,67 %**. Móviles aporta 22 clics y 201 impresiones: 91,7 % de los clics y 89,3 % de las impresiones.

| Página | Clics | Impresiones | CTR | Posición |
| --- | ---: | ---: | ---: | ---: |
| `/` | 14 | 145 | 9,66 % | 4,65 |
| `/juegos-de-beber/` | 4 | 60 | 6,67 % | 3,93 |
| `/jugar/` | 3 | 55 | 5,45 % | 4,18 |
| `/como-jugar/` | 3 | 25 | 12 % | 4,96 |
| `/sobre-el-juego/` | 0 | 26 | 0 % | 8 |
| `/modos-de-juego/` | 0 | 12 | 0 % | 6,58 |
| `/previa/` | 0 | 6 | 0 % | 5 |

Los totales por página pueden diferir del gráfico: no deben sumarse para reconstruir el total del sitio. Las seis consultas visibles tienen 21 impresiones y ningún clic; Google omite consultas anonimizadas. Tampoco hay un cruce consulta–URL, una exportación anterior, volúmenes mensuales de mercado ni datos de enlaces externos. Estos datos no demuestran canibalización, una caída de tráfico o un problema de indexación.

## 1. Elegir búsquedas e intención

Se prioriza la demanda observada antes de abrir nuevas URLs. Este es el mapa editorial; la asignación de consultas a páginas es una decisión, no una asociación demostrada por el CSV.

| Consulta observada | Impresiones | Posición | Intención estimada | Página elegida |
| --- | ---: | ---: | --- | --- |
| el peaje | 9 | 13,22 | Marca, ambigua fuera del contexto del juego | `/` |
| peaje juego de beber | 8 | 4,12 | Encontrar y jugar El Peaje | `/juegos-de-beber/` |
| juegos de cartas beber | 1 | 1 | Encontrar juegos con cartas | `/juegos-de-beber/` |
| cartas para previas | 1 | 2 | Organizar una partida en grupo | `/previa/` |

Las otras consultas, `el paje` y `el pz`, tienen una impresión cada una. No justifican páginas para errores de escritura. El artículo propone diez palabras iniciales; solo hay cuatro consultas relevantes observadas, así que no se completan diez con métricas inventadas.

Para una investigación posterior: `el peaje online`, `jugar al peaje`, `reglas del peaje`, `el peaje cartas`, `el peaje sin alcohol` y `juego de cartas para grupos`. Son hipótesis sin volumen ni posición conocidos, no nuevos objetivos aprobados para publicar páginas. Si se validan, se asignarán primero a las URLs actuales.

## 2. Usar datos y concentrar el trabajo

La exportación local sustituye la lectura de Search Console por un MCP. No se ha instalado ChatSEO, actualizado Claude ni contratado un servicio: son herramientas del ejemplo, no cambios del blog. La selección y las comprobaciones se ejecutan con un script local; el trabajo editorial se concentra en una guía existente.

Las búsquedas públicas revisadas no equivalen a una captura exacta del top 3 de Google en España ni permiten medir dificultad, autoridad o volúmenes. El término exacto con marca ofrece resultados ruidosos. Para comparar necesidades se han leído tres páginas afines:

| Fuente | Contenido observado | Aplicación en El Peaje |
| --- | --- | --- |
| [Previa, Rondita](https://rondita.com.ar/juegos/previa) | Mecánica, acceso a jugar, jugadores y dispositivo compartido | Explicar preparación y pantalla compartida antes de desarrollar los peajes |
| [Previando, PASANDOLA](https://pasandola.com/previando) | Pasos, configuración y preguntas sobre acceso y participantes | Añadir secuencia inicial y elección por tamaño de grupo |
| [A través del puente, Ridrunkulous](https://ridrunkulous.com/es-es/rules/across-the-bridge) | Preparación, reglas y variantes de cartas | Mostrar una secuencia verificable de acierto, empate y peaje |

La aportación propia es explicar la implementación real: predicciones con 52 cartas sin reposición, empate como fallo, peajes al retroceder, dos rutas en Turnos rápidos y pases ocultos en La patata. Los ejemplos y límites se contrastan con el motor y las guías del proyecto. No se copian reglas ni penalizaciones de otros juegos.

## 3. Una página existente, una necesidad principal

Se amplía `/juegos-de-beber/` con:

- Título y H1: «El Peaje: juego de beber con cartas online gratis».
- Descripción que explica acceso, reglas, móvil compartido y alternativa sin alcohol.
- Índice con enlaces a secciones, cinco pasos para empezar, tabla de modos por jugadores y ejemplo de turno y puntuación.
- Acceso directo al juego y enlaces a reglas, modos, variantes y preparación de la previa.
- Enlaces descriptivos desde inicio y previa; la página de jugar ya enlazaba a la guía. El verificador comprueba las tres entradas dentro del contenido principal.

Se conservan las URLs. No se crea otra página que compita por la misma búsqueda. `/previa/` conserva la organización de la reunión; `/como-jugar/`, las reglas detalladas; `/modos-de-juego/`, la comparación completa; `/sobre-el-juego/`, la presentación del proyecto. Se precisan los títulos de previa, modos y presentación, sin reescribir sus artículos completos.

## 4. Comprobar el SEO de la página y el sitio

- Se elimina el sufijo repetido «El Peaje» cuando el título ya contiene la marca. Todos los títulos españoles quedan entre 19 y 52 caracteres. El límite de 60 es una pauta editorial del artículo, no un límite técnico de Google.
- Un H1, descripción, canónico y metadatos sociales por página; URLs estables, idiomas y sitemap existentes conservados.
- Migas visibles y JSON-LD `WebPage`/`BreadcrumbList` en las quince páginas españolas de guías e información. Se verifican contra el canónico.
- El marcado existente del juego se completa con `WebApplication`, categoría de juegos y oferta gratuita de 0 EUR. No se añaden valoraciones, existencias de productos, autores o fechas ficticias.
- Se comprueba que las imágenes HTML españolas llevan atributo `alt`. La ilustración principal está hecha en CSS y las cartas decorativas ya usan `aria-hidden`; no necesitan nuevas imágenes pesadas. La imagen social exportada mide 1200 × 630 y pesa aproximadamente 55 KB.
- El build verifica las 52 URLs públicas, los enlaces, hreflang, robots, sitemap y hashes CSP, incluido el JSON-LD nuevo. La auditoría adicional comprueba HTTP y anclas del índice.

Referencias: [títulos](https://developers.google.com/search/docs/appearance/title-link), [descripciones](https://developers.google.com/search/docs/appearance/snippet), [enlaces internos](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) y [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). Google puede elegir otros títulos o fragmentos; el marcado no garantiza una presentación enriquecida.

## 5. Revisión semanal y registro de cambios

Cada lunes, exportar los últimos 28 días con el mismo tipo de búsqueda. Ejecutar:

```bash
npm run seo:report -- ./carpeta-exportada
# JSON limpio para guardarlo o compararlo:
node scripts/search-console.mjs ./carpeta-exportada --as-of 2026-11-10 > /tmp/informe-seo.json
```

Sin carpeta, el script detecta la exportación si solo hay una en la raíz. No accede a Google ni programa ejecuciones: analiza los CSV que se le entregan. Devuelve métricas globales, consultas, páginas, dispositivos, oportunidades en posiciones 5–15 y hasta tres páginas sin cambios recientes, ordenadas por impresiones. El filtro adicional de 500 impresiones y CTR inferior al 1 % no encuentra ninguna página en esta exportación.

`config/seo-refreshes.json` registra las revisiones de contenido/metadatos de hoy; el script también consulta el historial Git de las páginas, incluidas las traducciones. Las fechas desconocidas no habilitan automáticamente una nueva revisión. La mayoría de páginas se editó el 5 de octubre; por tanto, el análisis actual no recomienda repetir una revisión automática. La petición actual se trata como una corrección explícita del desajuste de intención y de la lista técnica, no como evidencia de una caída ni como una serie de reescrituras semanales.

Después de publicar estos cambios, registrar la fecha real del despliegue. El plazo de 60 días del artículo es una heurística de revisión, no una regla sobre cuándo Google rastrea. Mantener el registro alineado con esa fecha para las siguientes revisiones; medir antes de volver a editar. Con fecha efectiva del 10 de noviembre, las páginas revisadas se reconsiderarían a partir del 9 de enero de 2027.

Solicitar el cruce consulta–página de Search Console para confirmar las URLs que Google muestra antes de decidir fusiones o nuevas páginas. Comparar periodos equivalentes y dispositivos; con tan pocos datos, observar varias semanas. No atribuir resultados a esta intervención sin datos posteriores.

Tras el despliegue, comprobar el sitio real:

```bash
npm run audit:site -- --base https://elpejae.com --report /tmp/peaje-seo-publicado.json
```

Después verificar `/sitemap.xml` y usar Inspección de URLs en Search Console para la guía modificada. El CSV no concede acceso a esas acciones y no se ha enviado ninguna solicitud de indexación.

## Validación de esta entrega

- Build de producción completado, con 52 rutas verificadas.
- Pruebas del proyecto, incluidas CSV, métricas, pausa entre revisiones y JSON-LD, y ESLint.
- Auditoría HTTP local: 643 comprobaciones correctas, 0 errores y 1 aviso existente sobre titularidad de AdSense, ajeno a los cambios SEO.
- Comprobación TypeScript y validación adicional del export. En el entorno restringido se usa `node --import tsx` para evitar el socket IPC de la CLI de `tsx`.
