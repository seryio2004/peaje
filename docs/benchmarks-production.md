# Benchmarks del sitio publicado

Fecha de revisión: 5 de octubre de 2026. Destino: `https://elpejae.com`.

## Qué eran las mediciones anteriores

- Las primeras pasadas se hicieron contra un servidor local del export: primero sin compresión, después con gzip. Medían esa configuración local, no el alojamiento de producción.
- La medición posterior al push se ejecutó contra `/probabilidades/` publicada: 94 en rendimiento, 100 en accesibilidad, 92 en buenas prácticas y 100 en SEO. Era una sola pasada móvil.
- Las puntuaciones de Lighthouse no certifican aprobación de AdSense, capacidad de usuarios simultáneos ni experiencia real de todos los visitantes.

## Método de esta ejecución

- Lighthouse 13.5.0 y Chromium. Las versiones exactas, timestamps de las herramientas y parámetros se guardan en el JSON.
- 18 ejecuciones: tres páginas × dos perfiles × tres repeticiones. Ejecución secuencial, con un proceso/perfil limpio de Chrome por pasada y sin modificar la web entre pruebas.
- Las páginas se descargan del dominio público mediante HTTPS. Se incluyen la respuesta del hosting/CDN y los recursos que ese despliegue sirve.
- Se usan los perfiles estándar de Lighthouse: móvil con limitación simulada de red/CPU y escritorio con su preset. El JSON conserva `throttling`, `throttlingMethod` y `screenEmulation` de cada pasada.
- Se muestran mediana y rango mínimo–máximo. Cada métrica se agrega por separado; la fila agregada no pretende ser una única carga concreta.
- La caché del navegador empieza limpia, pero la caché de Cloudflare puede estar caliente. No se ha purgado el CDN ni controlado la ruta de red/geografía del host de pruebas.
- Son mediciones de laboratorio sobre producción. No se ha recogido telemetría de usuarios (CrUX/RUM), ni INP de partidas reales. TBT mide bloqueo durante la carga, no sustituye INP.

## Resultados

FCP indica cuándo aparece el primer contenido; LCP, cuándo aparece el elemento principal más grande; TBT, el tiempo acumulado de bloqueo del hilo principal durante la carga; CLS, los desplazamientos de diseño. `/jugar/` se mide en su pantalla inicial de configuración: estos resultados no son una medición de FPS ni de interacciones durante una partida.

| Perfil | Página | Rendimiento mediano (rango) | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Móvil | `/` | 97 (74–97) | 1.56 s | 2.44 s | 70 ms | 0.000 |
| Móvil | `/jugar/` | 98 (96–98) | 1.55 s | 2.29 s | 69 ms | 0.000 |
| Móvil | `/probabilidades/` | 96 (95–96) | 1.54 s | 2.42 s | 128 ms | 0.000 |
| Escritorio | `/` | 100 (100–100) | 0.50 s | 0.70 s | 0 ms | 0.000 |
| Escritorio | `/jugar/` | 100 (100–100) | 0.45 s | 0.63 s | 0 ms | 0.000 |
| Escritorio | `/probabilidades/` | 100 (100–100) | 0.51 s | 0.61 s | 0 ms | 0.000 |

Las cifras de tiempo y CLS de la tabla son medianas. Los rangos de todas las métricas están en el JSON.

| Perfil | Página | Accesibilidad | Buenas prácticas | SEO |
| --- | --- | --- | --- | --- |
| Móvil | `/` | 100 | 92 | 100 |
| Móvil | `/jugar/` | 100 | 92 | 100 |
| Móvil | `/probabilidades/` | 100 | 92 | 100 |
| Escritorio | `/` | 100 | 92 | 100 |
| Escritorio | `/jugar/` | 100 | 92 | 100 |
| Escritorio | `/probabilidades/` | 100 | 92 | 100 |

## Incidencias observadas

Todas las pasadas tienen 100 en accesibilidad y SEO, 92 en buenas prácticas y CLS 0. El aviso de buenas prácticas corresponde al intento de carga del beacon de Cloudflare que la CSP bloquea. La segunda pasada móvil de portada dio 74, con FCP 3,17 s y LCP 4,48 s; se conserva en el rango y en el cálculo, sin descartarla. Su TBT fue 101 ms. La causa exacta de esa variación no se ha aislado con estas mediciones.

- mobile `/`: errors-in-console, inspector-issues
- mobile `/jugar/`: errors-in-console, inspector-issues
- mobile `/probabilidades/`: errors-in-console, inspector-issues
- desktop `/`: errors-in-console, inspector-issues
- desktop `/jugar/`: errors-in-console, inspector-issues
- desktop `/probabilidades/`: errors-in-console, inspector-issues

Los detalles de cada incidencia están en los informes originales. Los errores de consola/CSP deben distinguirse de excepciones del motor del juego.

## Datos y reproducción

- [Resumen y todas las pasadas](benchmarks-production.json).
- [18 informes Lighthouse originales comprimidos](benchmarks-production-raw.tar.gz).

```bash
npx --yes lighthouse@13.5.0 https://elpejae.com/ --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/peaje-mobile.json
# Escritorio: añadir --preset=desktop
# Repetir tres veces por perfil y para /, /jugar/ y /probabilidades/.
```

Si Chrome no se detecta, indicar su ejecutable mediante `CHROME_PATH`. Los resultados pueden variar por condiciones del equipo, navegador, red y caché del CDN.

Referencias: [variabilidad de las puntuaciones Lighthouse](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) y [diferencia entre laboratorio y datos de usuarios reales](https://web.dev/articles/lab-and-field-data-differences).
