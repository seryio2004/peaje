# Plan de negocio de El Peaje

**Fecha del análisis:** 30 de agosto de 2026  
**Mercado inicial:** España, con expansión posterior a usuarios hispanohablantes  
**Producto actual:** juego web de cartas local, gratuito, sin cuentas ni servidor

**Documento operativo de la primera fase:**
[FASE_1_MONETIZACION_WEB.md](./FASE_1_MONETIZACION_WEB.md)

> Las cifras son estimaciones de planificación, no promesas de ingresos. Se expresan
> en euros, antes de IVA, IRPF o Impuesto sobre Sociedades. Como todavía no hay
> analítica real de tráfico, retención ni países, se utilizan tres escenarios y se
> indican todas las hipótesis para poder sustituirlas por datos reales. El proyecto
> lo desarrolla y mantiene una sola persona, por lo que las horas propias se
> consideran esfuerzo, pero **no un coste de caja**.

## 1. Resumen ejecutivo

El Peaje puede funcionar como un pequeño negocio digital rentable, pero no es
realista esperar rentabilidad relevante solo con banners y poco tráfico. La vía
recomendada es un modelo híbrido:

1. Validar primero la demanda en web con coste bajo.
2. Hacer el producto apto para anunciantes y añadir AdSense con poca presión
   publicitaria.
3. Publicar primero en Android cuando la web demuestre tracción.
4. Monetizar la app con AdMob más una compra de eliminación de anuncios y packs
   de juego.
5. Publicar en iOS después de validar retención y conversión en Android.

El producto actual **no menciona alcohol ni muestra bebidas alcohólicas**: los
únicos textos relacionados son «bebe» y «ya he bebido». Por tanto, no debe darse
por hecho que Google lo vaya a clasificar como contenido alcohólico. La
restricción de Google se aplica al contenido que facilita la venta de alcohol o
promueve su consumo irresponsable; no a cualquier uso genérico del verbo beber.
El riesgo aparecería si el marketing, las reglas, las imágenes, el audio o futuras
modalidades convirtieran explícitamente el producto en un juego de beber alcohol.

El riesgo inmediato más importante para AdSense es otro: una única pantalla de
juego puede considerarse contenido de poco valor. La monetización debe partir de
una edición **Party / apta para marcas**, con reglas, variantes, preguntas
frecuentes y suficiente contenido propio. Las penalizaciones configurables
—puntos, reto, agua o bebida sin especificar— se recomiendan para ampliar público
y anunciantes, pero no son un requisito derivado del texto actual.

### Conclusión financiera

- La web puede ponerse en producción con unos **70–265 € de caja el primer año**:
  dominio, Cloudflare Pages a 0 € y entre 5–20 €/mes de promoción opcional. Sin
  publicidad pagada, el coste puede quedarse prácticamente en el dominio. Esta
  cifra no incluye una posible cuota de RETA, que debe resolverse antes de activar
  AdSense y podría cambiar el punto de equilibrio.
- El desarrollo de una app híbrida Android+iOS tiene **0 € de mano de obra pagada**.
  Los desembolsos inevitables serían 25 USD una sola vez para Google Play y 99 USD
  al año para Apple, más el pequeño presupuesto publicitario que se decida usar.
- Con **25.000 usuarios activos mensuales (MAU)** en móvil, el escenario base
  produciría unos **567 €/mes** netos de red publicitaria y comisión de tienda,
  antes de impuestos. Después de gastos mínimos quedarían aproximadamente
  **6.400–6.600 €/año de beneficio de caja**.
- Con **100.000 MAU**, el mismo modelo produciría unos **2.270 €/mes** o cerca de
  **27.000 €/año de beneficio de caja**, sin valorar económicamente las horas del
  desarrollador.
- No conviene comprar instalaciones al inicio: el LTV estimado del producto
  actual es de solo **0,07–0,10 € por instalación**, inferior incluso a muchos
  benchmarks de adquisición de juegos casuales.

## 2. Cliente y propuesta de valor

### Público inicial

- Adultos jóvenes que juegan en grupo en reuniones, viajes o fiestas.
- Grupos que quieren empezar una partida sin baraja, registro ni preparación.
- Mercado prioritario: España; segundo mercado: México, Argentina, Colombia y
  resto de Latinoamérica; tercero: versión inglesa y portuguesa.

### Problema que resuelve

Los juegos sociales físicos requieren aprender reglas, llevar material y resolver
discusiones sobre turnos o resultados. El Peaje crea y baraja la partida, muestra
las reglas y lleva el estado desde cualquier móvil.

### Diferenciación necesaria

El juego actual es sencillo de copiar. Antes de escalar debe incorporar activos
que mejoren retención y marca:

- Modo grupo de 3–8 jugadores con nombres y turnos.
- Penalizaciones configurables para ampliar el público y evitar que el marketing
  futuro asocie obligatoriamente el juego a una bebida concreta.
- Packs temáticos: viaje, pareja, fiesta, rápido y familiar/adulto.
- Partida offline, vibración, sonido, animaciones y accesibilidad.
- Enlace o QR para compartir una partida y reglas.
- Historial local, logros y estadísticas no sensibles.
- Español e inglés; portugués si Brasil demuestra demanda.

Estas funciones también reducen el riesgo de rechazo de Apple: su regla 4.2 exige
que una app aporte funcionalidad, contenido e interfaz por encima de una web
reempaquetada.

## 3. Modelo de monetización

### 3.1 Web: Google AdSense

Google Ads es la herramienta del anunciante. Para cobrar por anuncios en la web
se utiliza **Google AdSense**; para las aplicaciones se utiliza **Google AdMob**.

Implementación recomendada:

- Un anuncio responsive en la pantalla de reglas o selección de modo.
- Un anuncio al terminar la partida, nunca encima de botones ni durante una
  secuencia de toques.
- Máximo aproximado de 1,5–2 impresiones por sesión al principio.
- Sin refresco automático agresivo.
- Páginas indexables de reglas, variantes, preguntas frecuentes, juego
  responsable, privacidad, cookies y contacto.
- CMP certificada por Google para consentimiento en EEE, Reino Unido y Suiza.

Google indica que el editor recibe el 80 % después de la comisión de la plataforma
del anunciante; cuando la compra procede de Google Ads, el editor conserva de
media alrededor del 68 % del importe original. El eCPM de este plan ya representa
lo cobrado por el editor, por lo que **no se vuelve a descontar ese porcentaje**.

### 3.2 Aplicaciones: AdMob + compras dentro de la app

La mejor combinación para un juego casual pequeño es:

- Intersticial: uno cada dos partidas completadas, en una pausa natural.
- Rewarded ad voluntario: desbloqueo temporal de un pack, diseño de baraja o
  estadística; nunca como obligación para seguir jugando.
- Banner solo en menús, no durante la interacción principal.
- Compra «Sin anuncios»: **2,99 €**.
- Pack permanente de modos/reglas: **3,99 €**.
- Bundle completo: **6,99 €** si existen al menos tres packs con valor real.

No se recomienda una suscripción mensual mientras el juego no publique contenido
nuevo con frecuencia. Una compra única encaja mejor con el valor actual.

Las tiendas no cobran comisión sobre los ingresos de AdMob, pero sí sobre las
compras digitales:

- Apple: 15 % al inscribirse y ser aceptado en App Store Small Business Program
  hasta el umbral de 1 millón USD; la tarifa estándar es 30 %.
- Google Play en España/EEE, para instalaciones nuevas desde el 30 de junio de
  2026: una compra no recurrente usa actualmente un 20 % de servicio más 5 % de
  facturación en el tramo inicial. El plan financiero descuenta por prudencia un
  **25 %**. Desde el 30 de septiembre de 2026, los juegos que cumplan todos los
  requisitos de Play Games Level Up pueden optar a una tarifa menor; no debe
  presupuestarse hasta obtener la validación de Google.

## 4. Estimación de ingresos web

Fórmula:

`ingreso = sesiones × impresiones por sesión × fill rate × eCPM / 1.000`

| Escenario mensual | MAU aprox. | Sesiones | Imp./sesión | Fill | eCPM editor | Ingreso/mes | Ingreso/año |
|---|---:|---:|---:|---:|---:|---:|---:|
| Validación | 4.000 | 10.000 | 1,5 | 55 % | 0,60 € | 5 € | 60 € |
| Crecimiento | 20.000 | 60.000 | 1,8 | 70 % | 1,20 € | 91 € | 1.092 € |
| Escala | 80.000 | 250.000 | 2,0 | 80 % | 2,00 € | 800 € | 9.600 € |

Los eCPM son hipótesis conservadoras para tráfico principalmente español y
latinoamericano. Estacionalidad, país, consentimiento, visibilidad y políticas
pueden variar mucho. Con el contenido actual no hay una mención explícita de
alcohol que justifique aplicar por defecto una penalización a estas estimaciones.
Solo si el marketing o futuras funciones promovieran consumo irresponsable podría
restringirse el inventario y aproximarse a **0 €** la demanda procedente de Google
Ads.

### Punto de equilibrio web

Con Cloudflare Pages gratuito, dominio de 10–25 €/año y promoción opcional de
5–20 €/mes, el gasto anual previsto es de **70–265 €**. No hay inversión de
desarrollo que recuperar:

- En validación, con 10.000 sesiones/mes y 60 €/año de ingresos, se cubre el
  dominio pero no necesariamente la promoción.
- A 60.000 sesiones/mes, quedarían unos **827–1.022 €/año** antes de impuestos.
- A 250.000 sesiones/mes, quedarían unos **9.335–9.530 €/año** antes de impuestos.

Con un RPM por sesión similar al escenario de crecimiento, el punto de equilibrio
de caja estaría aproximadamente entre **4.000 y 15.000 sesiones mensuales**, según
cuánto se gaste en promoción. Esto puede convertir la web en un pequeño negocio
rentable, aunque los ingresos bajos todavía no remuneren las horas dedicadas.

## 5. Estimación de ingresos de las apps

### Hipótesis del escenario base

- 2,5 sesiones al mes por usuario activo.
- Por sesión: 0,5 intersticiales, 0,1 rewarded y 1 banner/menú.
- eCPM estimado: 3,50 € intersticial, 6 € rewarded y 0,20 € banner.
- Ingreso publicitario resultante: **0,0064 €/MAU/mes**.
- Nuevas instalaciones mensuales equivalentes al 35 % del MAU.
- 1,5 % de las nuevas instalaciones compra un producto medio de 3,99 €.
- Mix estimado 70 % Android / 30 % iOS.
- Neto de tienda conservador: 75 % Android y 85 % iOS.

Los eCPM móviles son coherentes con el orden de magnitud observado en informes
sectoriales de juegos móviles: banner muy bajo e intersticial/rewarded varias veces
superior. España no aparece de forma separada en todas las fuentes, por lo que no
se presenta como una tarifa garantizada.

| Escenario mensual | MAU | Ads/mes | Compras/mes netas | Total/mes | Total/año |
|---|---:|---:|---:|---:|---:|
| Lanzamiento | 5.000 | 32 € | 82 € | 114 € | 1.368 € |
| Tracción | 25.000 | 159 € | 408 € | 567 € | 6.804 € |
| Escala | 100.000 | 638 € | 1.634 € | 2.272 € | 27.264 € |

Si no se pueden servir anuncios por la temática, quedaría solo la columna de
compras. Si la conversión de pago baja del 1,5 % al 0,5 %, los ingresos por compras
se reducen a un tercio.

### Punto de equilibrio de caja de las apps

Con web, Android e iOS, el desembolso previsto del primer año es de 185–400 €.
Incluso el escenario de lanzamiento de 5.000 MAU generaría 1.368 €/año y dejaría
aproximadamente **968–1.183 € de beneficio de caja antes de impuestos**. Las cuotas
y la promoción mínima se cubrirían en unos **2–4 meses** desde que se mantuviera
ese tráfico.

Este punto de equilibrio solo mide dinero cobrado y pagado. No significa que
1.368 € al año compensen las 200–380 horas aproximadas necesarias para preparar
ambas aplicaciones; esa decisión depende del valor que el desarrollador asigne a
su tiempo.

### LTV y adquisición pagada

Con cuatro meses de actividad media:

- LTV publicitario: aproximadamente 0,026 €.
- LTV esperado de compra: aproximadamente 0,047 € por instalación.
- LTV total inicial: aproximadamente **0,073 €**.

Un benchmark global publicado para juegos casuales situó el CPI alrededor de
0,14 USD en Android y 1,41 USD en iOS. Aunque cada campaña es distinta, el orden de
magnitud demuestra que comprar usuarios perdería dinero con la economía prevista.
La adquisición debe ser orgánica hasta que el LTV real supere claramente el CPI
medido en una campaña pequeña.

## 6. Costes previstos

No se contrata agencia ni personal. Las horas se conservan para planificar la carga
de trabajo del único desarrollador, pero su coste de caja es 0 €. Si en el futuro
se externaliza diseño, soporte, legal o desarrollo, habría que crear un presupuesto
nuevo y no mezclarlo con este escenario bootstrapped.

| Fase | Trabajo incluido | Horas propias | Coste de mano de obra |
|---|---|---:|---:|
| Web monetizable | reglas/contenido, SEO básico, analítica, CMP y AdSense | 50–80 h | 0 € |
| PWA de validación | offline, instalación, iconos, manifest, caché y QA móvil | 30–60 h | 0 € |
| Android híbrida | Capacitor o equivalente, AdMob, consentimiento, IAP, offline, haptics, fichas y QA | 120–220 h | 0 € |
| iOS incremental | adaptación, StoreKit/IAP, ATT si aplica, QA, TestFlight y revisión | 60–100 h | 0 € |
| Producto avanzado | cuentas, nube, multijugador remoto, moderación y backend | +250–500 h | 0 € mientras no se contraten servicios ni se superen capas gratuitas |

### Costes fijos y recurrentes

| Concepto | Coste aproximado |
|---|---:|
| Dominio propio | 10–25 €/año |
| Hosting estático en Cloudflare Pages | 0 € mientras el producto siga dentro de sus condiciones y límites gratuitos |
| Google Play Console | 25 USD una sola vez |
| Apple Developer Program | 99 USD/año o equivalente local |
| CMP de Google | 0 € en su opción básica |
| Analítica básica de Cloudflare o Google | 0 € |
| Desarrollo y mantenimiento propios | 0 € de caja |
| Publicidad mínima opcional | 5–20 €/mes; 60–240 €/año |
| Creatividades y fichas de tienda hechas por el desarrollador | 0 € |
| Asesoramiento legal o contable externo | No presupuestado; solo si resulta necesario |
| Cotización RETA | No incluida; depende del encuadramiento, rendimientos y posibles reducciones |

### Presupuesto de caja resumido

| Alcance | Primer año | Años siguientes |
|---|---:|---:|
| Solo web | 70–265 € | 70–265 €/año |
| Web + Android | 95–290 € aprox. | 70–265 €/año |
| Web + Android + iOS | 185–400 € aprox. | 155–365 €/año |

Los importes en euros de las cuentas de las tiendas son aproximados porque se
pagan en USD o en el equivalente local. No se incluye comprar un Mac: se asume que
el desarrollador ya dispone del equipo o de un flujo de compilación válido. Si no
fuera así, iOS tendría un coste adicional y debería reevaluarse. Los totales de la
tabla tampoco incluyen RETA; véase la guía operativa de la primera fase para la
decisión fiscal y laboral previa a monetizar.

El despliegue actual usa GitHub Pages. GitHub declara que Pages no está pensado
como hosting gratuito para operar un negocio online y aplica un límite blando de
100 GB/mes. Para monetizar se recomienda dominio propio y Cloudflare Pages, cuyos
activos estáticos tienen peticiones gratuitas e ilimitadas según su documentación
actual.

## 7. Beneficios y costes de cada canal

| Canal | Beneficios | Costes/riesgos |
|---|---|---|
| Web | enlace inmediato, SEO, actualizaciones rápidas, sin comisión por venta directa, coste técnico bajo | RPM bajo, menor retención, AdSense exige contenido valioso y cumplimiento estricto |
| PWA | instalación y offline con una sola base de código | poca visibilidad en tiendas y monetización móvil menos potente |
| Google Play | descubrimiento, confianza, Android amplio, AdMob e IAP nativos, pago único de cuenta | fragmentación de dispositivos, revisión, 25 % conservador en IAP de nuevas instalaciones EEE, mantenimiento continuo |
| App Store | usuarios con mayor valor publicitario y de compra, TestFlight, buen canal de confianza | 99 USD/año, revisión más estricta, riesgo de rechazo si parece una simple web, 15 % solo tras entrar en Small Business |

## 8. Estrategia de lanzamiento

### Fase 0 — Preparación y medición (0–2 meses)

1. Cambiar el posicionamiento a juego social de penalizaciones configurables.
2. Añadir modo grupo, reglas, privacidad, cookies y juego responsable.
3. Configurar dominio, analítica respetuosa y eventos: inicio, partida completada,
   partidas por sesión, compartido y retorno.
4. Publicar contenido corto mostrando partidas reales, no anuncios del producto.
5. No integrar AdSense hasta disponer de contenido suficiente y señales de uso.

**Puerta de avance:** 10.000 sesiones/mes, al menos 50 % de partidas completadas y
10 % de retorno a 30 días.

### Fase 1 — Monetización web (2–5 meses)

1. Activar CMP certificada y solicitar AdSense.
2. Probar una sola posición publicitaria; añadir la segunda solo si no empeora la
   finalización más de un 5 %.
3. Trabajar SEO de reglas y variantes, vídeos cortos, QR y enlaces compartidos.
4. Medir RPM por país y porcentaje de inventario restringido.

**Puerta de avance a app:** 25.000 sesiones/mes durante tres meses, 15 % de retorno
a 30 días o 1,8 partidas por sesión, y una lista de espera de 500 usuarios.

### Fase 2 — Android (5–9 meses)

1. Construir una app híbrida, pero con funciones nativas suficientes: offline,
   haptics, audio, compartir, packs y persistencia.
2. Lanzamiento cerrado; corregir ANR, crashes y flujos de consentimiento.
3. Publicar gratis con AdMob y «Sin anuncios».
4. Priorizar adquisición orgánica; si se necesita medir CPI, hacer una prueba de
   **50–100 €** y detenerla si el coste supera claramente el LTV, sin escalar.

**Puerta de avance a iOS:** 10.000 instalaciones Android, valoración superior a
4,3, sesiones sin fallos superiores a 99,5 %, D30 superior al 8 % y LTV medido.

### Fase 3 — iOS y expansión (9–12 meses)

1. Adaptar la experiencia a iOS y aportar valor nativo para superar la revisión
   4.2 de Apple.
2. Lanzar los mismos productos de compra con precios equivalentes.
3. Localizar al inglés y probar mercados con mayor eCPM.
4. Valorar multijugador remoto solo si la retención justifica backend y soporte.

## 9. KPIs del negocio

- Adquisición: usuarios orgánicos, coste por instalación, tasa de compartido.
- Activación: porcentaje que inicia y completa la primera partida.
- Engagement: partidas por sesión y duración útil.
- Retención: D1, D7 y D30.
- Publicidad: impresiones por sesión, fill rate, eCPM, RPM y caída de finalización.
- Compras: conversión, ingreso medio por comprador y reembolsos.
- Calidad: crash-free sessions, ANR y valoración de tienda.
- Unidad económica: LTV por país y plataforma frente a CPI.

## 10. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Una futura versión o campaña asocia el juego explícitamente con consumo irresponsable de alcohol | inventario restringido y menor ingreso | conservar lenguaje genérico, revisar audio/imágenes/metadata y separar cualquier modalidad adulta |
| Rechazo por contenido de poco valor | no aprobación de AdSense/App Store | páginas editoriales propias y funciones nativas/partidas con profundidad |
| Poca retención | LTV insuficiente | modo grupo, packs, compartir, eventos y medir antes de crear app |
| Publicidad empeora la partida | abandono e invalid traffic | anuncios solo en pausas, frecuencia limitada y pruebas A/B |
| Coste de adquisición superior al LTV | pérdidas al crecer | crecimiento orgánico y campañas pequeñas hasta validar LTV/CPI |
| Cambios de tarifas o privacidad | caída de margen y trabajo recurrente | revisión trimestral de políticas, SDK y consentimientos |

## 11. Decisión recomendada

La decisión económicamente sensata es fijar un presupuesto de caja de
**70–265 € para el primer año web**, incluyendo dominio y promoción mínima. La
web no necesita recuperar una inversión de desarrollo, así que puede alcanzar
beneficio de caja con tráfico modesto siempre que no haya que sumar una cotización
RETA. Esa obligación debe resolverse antes de activar anuncios permanentes.

Android solo añade unos 25 USD de entrada y puede desarrollarse cuando la web sea
estable, aunque todavía conviene esperar a tener señales de uso para no consumir
120–220 horas en un producto sin demanda. iOS debe reservarse para después de
validar Android porque añade 99 USD cada año, más revisión y 60–100 horas propias.

La app tiene sentido si sucede al menos una de estas condiciones:

- 25.000 sesiones web mensuales sostenidas y crecimiento orgánico.
- 500 personas apuntadas a la app más señales claras de retorno.
- Un pack premium convierte al 2 % o más en una prueba web.
- Un socio de distribución aporta audiencia sin coste de adquisición alto.

Si a los seis meses la web no supera 10.000 sesiones mensuales ni un 10 % de
retorno D30, conviene mantenerla como proyecto de bajo coste. En ese caso no hay
una pérdida grande de dinero, pero sí sería prudente no dedicar todavía cientos de
horas a las aplicaciones.

## Fuentes consultadas

- [Google: restricciones para editores, incluido alcohol](https://support.google.com/adsense/answer/10437795)
- [Google: reparto de ingresos de AdSense](https://support.google.com/adsense/answer/180195)
- [Google: requisitos de CMP para EEE, Reino Unido y Suiza](https://support.google.com/adsense/answer/13554020)
- [Google: políticas sobre contenido de poco valor](https://support.google.com/adsense/answer/10502938)
- [Google AdMob: uso recomendado de intersticiales](https://support.google.com/admob/answer/6201350)
- [Google AdMob: políticas de anuncios con recompensa](https://support.google.com/admob/answer/7313578)
- [Appodeal: informe eCPM móvil 2025](https://appodeal.com/wp-content/uploads/2025/03/Appodeal-The-Latest-eCPM-Report-2025.pdf)
- [Apple: coste, comisiones y membresía](https://developer.apple.com/programs/whats-included/)
- [Apple: Small Business Program](https://developer.apple.com/app-store/small-business-program/)
- [Apple: App Review Guideline 4.2](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play: alta de desarrollador](https://support.google.com/googleplay/android-developer/answer/6112435)
- [Google Play: tarifas vigentes desde junio de 2026](https://support.google.com/googleplay/android-developer/answer/112622)
- [Google Play Games Level Up](https://play.google.com/console/about/levelup/)
- [GitHub Pages: límites y uso comercial](https://docs.github.com/pages/getting-started-with-github-pages/github-pages-limits)
- [Cloudflare Pages: precios de activos estáticos](https://developers.cloudflare.com/pages/functions/pricing/)
- [Benchmark global de CPI casual](https://www.statista.com/statistics/1241651/global-cpi-gaming-apps-genre-platform/)
