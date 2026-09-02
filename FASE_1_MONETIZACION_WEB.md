# Fase 1 — Preparación y monetización de la web

**Fecha de revisión:** 30 de agosto de 2026  
**Ámbito:** España, persona física, un único desarrollador y web estática  
**Objetivo:** preparar El Peaje para solicitar AdSense y activar anuncios con el
menor coste posible, cumpliendo los requisitos técnicos, publicitarios y fiscales.

> Este documento es una guía operativa, no asesoramiento fiscal o laboral
> individualizado. La situación de alta en RETA depende de hechos concretos —cómo
> se trabaja, continuidad, otros empleos y organización de la actividad— que debe
> confirmar la Tesorería General de la Seguridad Social o un profesional.

## 1. Situación actual

Ya existe:

- [x] Juego funcional en Next.js.
- [x] Exportación estática.
- [x] Despliegue automático mediante GitHub Actions y GitHub Pages.
- [x] Interfaz responsive básica y contenido propio del juego.
- [x] La web no menciona alcohol ni muestra bebidas alcohólicas.

Todavía falta:

- [ ] Dominio propio y despliegue comercial en Cloudflare Pages.
- [ ] Páginas de contenido suficientes para que AdSense pueda evaluar el sitio.
- [ ] Navegación, pie de página y datos de contacto.
- [ ] Aviso legal, política de privacidad y política de cookies.
- [ ] CMP certificada por Google con TCF v2.3.
- [ ] Analítica y medición de los eventos principales.
- [ ] SEO técnico: sitemap, robots, canonical y metadatos sociales.
- [ ] Alta y configuración de AdSense.
- [ ] `ads.txt` y espacios publicitarios seguros.
- [ ] Resolver el alta fiscal, ROI/VIES y la posible obligación de RETA.

## 2. Respuesta breve: ¿es necesario darse de alta como autónomo?

### En Hacienda: sí debe formalizarse la actividad

Antes de iniciar una actividad económica o realizar operaciones se presenta el
**modelo 036** para entrar en el Censo de Empresarios, Profesionales y Retenedores.
El antiguo modelo 037 fue suprimido el 3 de febrero de 2025. Esto es independiente
de que el primer pago sea pequeño o tarde meses en llegar.

Como persona física no se paga normalmente una cuota de IAE, pero en el modelo 036
sí se declara la actividad y su epígrafe. Conviene confirmar el epígrafe concreto
con la Agencia Tributaria o un gestor; no debe escogerse únicamente copiándolo de
otra web.

### En Seguridad Social (RETA): depende de la habitualidad, no solo del ingreso

La ley incluye en RETA a quien realiza de forma **habitual, personal, directa, por
cuenta propia y con ánimo de lucro** una actividad económica. No existe una regla
general que permita trabajar sin alta simplemente por facturar menos del salario
mínimo.

La sentencia del Tribunal Supremo 941/2025 confirmó que estar por debajo del SMI
no excluye automáticamente la habitualidad; el ingreso es solo un indicio más. La
propia Seguridad Social responde que, si la actividad reúne las notas anteriores,
procede el alta aunque los ingresos sean mínimos.

En El Peaje hay dos interpretaciones posibles:

- **Menor riesgo de RETA:** experimento puntual, anuncios activos durante un plazo
  corto, ingresos marginales, sin campañas continuas y poca dedicación periódica.
- **Mayor probabilidad de RETA:** web disponible y monetizada todo el año, anuncios
  servidos de forma permanente, mantenimiento, SEO, publicaciones y promoción
  continuados. Este segundo escenario se parece más al plan de negocio previsto.

Por prudencia, **no debe asumirse que por ganar menos del SMI no hace falta RETA**.
La ruta segura es obtener criterio sobre el caso concreto y, si la actividad va a
ser continua, tramitar el alta antes de activar los anuncios. Estar ya contratado
por cuenta ajena tampoco elimina automáticamente el RETA; sería una situación de
pluriactividad.

### Recomendación práctica para este proyecto

1. Desarrollar, publicar y medir la versión sin anuncios mientras se prepara el
   producto. Esa fase no genera todavía ingresos publicitarios.
2. Cuando la web tenga contenido y tráfico suficiente, estimar el ingreso mensual
   esperado.
3. Antes de solicitar la activación económica, consultar el caso con TGSS/Importass
   o una gestoría y conservar la respuesta o informe.
4. Presentar el modelo 036 y solicitar ROI/VIES antes de la primera operación con
   Google Ireland.
5. Si el criterio aplicable exige RETA, tramitarlo antes del inicio efectivo de la
   monetización.
6. Activar AdSense solo cuando el ingreso previsto justifique las obligaciones y
   costes recurrentes.

Con las estimaciones del plan, 10.000 sesiones mensuales producirían alrededor de
5 €/mes y 60.000 sesiones unos 91 €/mes. AdSense acumula saldo hasta alcanzar el
umbral de pago de **70 €**. Monetizar con muy poco tráfico puede añadir trabajo
fiscal sin generar caja durante muchos meses y, si procede RETA, puede ser
claramente deficitario. Por eso la mejor puerta inicial es preparar AdSense pero
no activarlo hasta tener aproximadamente **40.000–60.000 sesiones al mes**, salvo
que ya se esté de alta por otra actividad compatible o se obtenga un criterio
favorable para un ensayo no habitual.

## 3. Fiscalidad básica de AdSense en España

Google informa de que los pagos europeos de AdSense se emiten mediante **Google
Ireland** y están sujetos al mecanismo de inversión del sujeto pasivo. La Agencia
Tributaria considera que una prestación de servicios de un empresario español a
otro empresario de la UE se localiza fuera del IVA español y debe informarse como
operación intracomunitaria.

Antes de monetizar hay que resolver estas tareas:

- [ ] Presentar el modelo 036 antes de iniciar la actividad.
- [ ] Declarar correctamente el epígrafe de la actividad.
- [ ] Solicitar el alta en el Registro de Operadores Intracomunitarios —ROI— en el
  modelo 036 y obtener NIF-IVA para aparecer en VIES.
- [ ] Verificar el VAT ID de Google Ireland y conservar la comprobación.
- [ ] Configurar el perfil de pagos de AdSense con nombre, NIF, dirección y cuenta
  bancaria coherentes con el titular fiscal.
- [ ] Registrar cada liquidación o pago de Google como ingreso de la actividad.
- [ ] Conservar facturas, justificantes y extractos de AdSense.
- [ ] Llevar libros de ingresos, gastos y bienes de inversión que correspondan.
- [ ] Presentar el modelo 349 en los períodos con servicios intracomunitarios.
- [ ] Confirmar si corresponden los modelos 130, 303, 390 u otros según el alta
  censal y las operaciones reales.
- [ ] Incluir el rendimiento de la actividad en la declaración anual de IRPF.

La prestación a Google Ireland se factura normalmente sin IVA español, indicando
la inversión del sujeto pasivo. La obligación exacta de emitir, conservar o enviar
la factura y los modelos periódicos debe configurarse con el 036; no conviene
improvisarla cuando llegue el primer pago.

## 4. Lista priorizada de tareas de producto y contenido

### P0 — Necesarias antes de solicitar AdSense

#### Infraestructura

- [ ] Comprar un dominio propio corto y fácil de recordar.
- [ ] Crear el proyecto en Cloudflare Pages y conectar el repositorio.
- [ ] Replicar el build estático actual y comprobar el despliegue automático.
- [ ] Configurar DNS, HTTPS, redirección del dominio y una única URL canónica.
- [ ] Mantener GitHub Pages solo como entorno temporal o redirigirlo al dominio.
- [ ] Crear un correo de contacto del dominio.

#### Contenido original

- [ ] Convertir la portada en una página que explique el juego antes de iniciar la
  partida; actualmente entra directamente al selector de modo.
- [ ] Crear `/como-jugar/` con reglas completas y ejemplos.
- [ ] Crear `/variantes/` con varias formas reales de jugar.
- [ ] Crear `/preguntas-frecuentes/`.
- [ ] Crear `/sobre-el-juego/` explicando autoría y propósito.
- [ ] Crear `/contacto/`.
- [ ] Añadir navegación y pie de página accesibles desde todas las pantallas.
- [ ] Revisar que los textos aporten información útil y no sean contenido de
  relleno creado únicamente para aprobar AdSense.
- [ ] Revisar audio, imagen, metadatos y futuras campañas para que describan
  fielmente el contenido real.

Google no publica un número mínimo de artículos o visitas. Sí exige contenido
propio, interesante, suficiente para revisar el sitio y conforme con sus
políticas. La calidad y navegación importan más que crear muchas páginas vacías.

#### Legal y privacidad

- [ ] Crear `/aviso-legal/` con la identidad del titular, NIF, domicilio o dirección
  profesional válida y correo de contacto, conforme a la LSSI.
- [ ] Crear `/privacidad/` con responsable, datos tratados, finalidades, bases
  jurídicas, destinatarios, transferencias, conservación y ejercicio de derechos.
- [ ] Crear `/cookies/` con cookies, proveedores, finalidad y duración reales.
- [ ] Instalar una CMP certificada por Google; la opción básica de «Privacidad y
  mensajes» de AdSense evita contratar otra herramienta al principio.
- [ ] Configurar TCF v2.3, obligatorio para nuevas cadenas de consentimiento desde
  el 1 de marzo de 2026.
- [ ] Mostrar en primera capa **Aceptar**, **Rechazar** y **Configurar** sin hacer
  más difícil rechazar que aceptar.
- [ ] Impedir que AdSense, Analytics u otras etiquetas no esenciales se ejecuten
  antes de la elección cuando el consentimiento sea necesario.
- [ ] Añadir un enlace permanente para cambiar o retirar el consentimiento.
- [ ] Probar aceptar, rechazar, retirar consentimiento y navegación privada.

#### SEO, calidad y medición

- [ ] Ampliar título y descripción de cada página.
- [ ] Añadir URL canonical, Open Graph e imagen para compartir.
- [ ] Crear `robots.txt` y `sitemap.xml` compatibles con el export estático.
- [ ] Registrar el dominio en Google Search Console.
- [ ] Comprobar que Google puede rastrear contenido sin iniciar una partida.
- [ ] Añadir analítica básica, preferiblemente con pocos datos y sin cookies, o
  cargar Google Analytics solo con el consentimiento correspondiente.
- [ ] Medir `game_started`, `game_completed`, modo, partidas por sesión y retorno,
  sin enviar nombres, respuestas u otros datos personales.
- [ ] Revisar Core Web Vitals, teclado, contraste y móvil.
- [ ] Crear una página 404 útil con regreso al juego y a las reglas.

### P1 — Necesarias durante el alta de AdSense

- [ ] Ser mayor de 18 años y crear una sola cuenta AdSense a nombre del titular.
- [ ] Introducir nombre y dirección exactamente como en la documentación y banco.
- [ ] Añadir el dominio desde la sección «Sitios».
- [ ] Verificar la propiedad con el snippet, meta tag o `ads.txt` ofrecido por
  AdSense.
- [ ] Publicar `https://dominio/ads.txt` con el `pub-ID` exacto.
- [ ] Comprobar que robots y cabeceras no bloquean al rastreador de AdSense.
- [ ] Elegir y configurar la CMP desde «Privacidad y mensajes».
- [ ] Solicitar revisión cuando todas las páginas estén publicadas y navegables.
- [ ] Esperar la revisión, que Google estima normalmente en unos días y en algunos
  casos entre 2 y 4 semanas.
- [ ] Si aparece «Needs attention», corregir la causa antes de reenviar; no borrar
  y volver a añadir el sitio repetidamente.

### P2 — Necesarias después de la aprobación

- [ ] Crear una unidad responsive en la zona informativa o selector de modo.
- [ ] Crear como máximo una segunda unidad después de terminar una partida.
- [ ] No colocar anuncios junto a botones de respuesta, continuar o reiniciar.
- [ ] No mostrar anuncios en pantallas de alerta, error o sin contenido propio.
- [ ] No pedir clics, no hacer clic en anuncios propios y no pedir a conocidos que
  lo hagan.
- [ ] Evitar más publicidad que contenido y no activar refrescos agresivos.
- [ ] Probar primero un anuncio durante 2–4 semanas.
- [ ] Medir RPM, visibilidad, finalización de partidas y rendimiento web.
- [ ] Añadir la segunda posición solo si no empeora la finalización más de un 5 %.
- [ ] Revisar semanalmente el Centro de políticas e informes de consentimiento.

### P3 — Cobros y operación continua

- [ ] Añadir una cuenta bancaria SEPA y verificar el ingreso de prueba si Google lo
  solicita.
- [ ] Completar las verificaciones de identidad, dirección y datos fiscales que
  aparezcan en AdSense.
- [ ] Introducir el PIN postal cuando corresponda; no intentar adivinarlo.
- [ ] Recordar que Google paga en EUR al alcanzar 70 €, si no existen retenciones
  o bloqueos en la cuenta.
- [ ] Cerrar cada mes registrando ingresos y gastos.
- [ ] Revisar cada trimestre los modelos fiscales aplicables.
- [ ] Revisar trimestralmente políticas de Google, CMP y cookies.
- [ ] Mantener dependencias, privacidad, contenido y datos de contacto actualizados.

## 5. Proceso completo, en orden

### Etapa A — Preparar sin monetizar

1. Comprar dominio y migrar a Cloudflare Pages.
2. Añadir contenido, navegación, SEO y páginas legales.
3. Instalar analítica mínima y medir tráfico orgánico.
4. Corregir accesibilidad, rendimiento y errores.
5. Alcanzar suficiente uso para estimar ingresos con datos propios.

**Resultado:** producto publicable y medible, todavía sin actividad publicitaria.

### Etapa B — Decidir si activar la actividad económica

1. Calcular sesiones, páginas/sesión, países y RPM estimado.
2. Comparar ingreso esperado con dominio, promoción, gestoría y posible RETA.
3. Consultar el encuadramiento con TGSS/Importass o un profesional.
4. Si no compensa, mantener la web sin anuncios y seguir creciendo.
5. Si compensa, tramitar 036, ROI/VIES y RETA cuando corresponda.

**Resultado:** decisión documentada y altas realizadas antes de operar.

### Etapa C — Solicitar AdSense

1. Crear la cuenta y perfil de pagos.
2. Añadir y verificar el dominio.
3. Publicar `ads.txt`.
4. Configurar la CMP de Google con TCF v2.3.
5. Solicitar revisión y esperar la aprobación.

**Resultado:** sitio con estado «Ready» y `ads.txt` autorizado.

### Etapa D — Activar anuncios de forma controlada

1. Publicar una unidad en una pausa natural.
2. Validar consentimiento, diseño y rendimiento en móvil.
3. Medir durante al menos dos semanas.
4. Añadir una segunda unidad solo si los datos lo justifican.
5. Registrar ingresos y cumplir el calendario fiscal.

**Resultado:** monetización activa sin degradar el juego ni crear tráfico inválido.

### Etapa E — Recibir el primer pago

1. Alcanzar los umbrales de verificación que muestre la cuenta.
2. Verificar identidad, dirección/PIN y banco.
3. Alcanzar 70 € de saldo finalizado.
4. Conciliar transferencia, documento de Google e ingreso contable.
5. Declarar la operación intracomunitaria en el período correspondiente.

## 6. Puertas de decisión recomendadas

| Decisión | Condición mínima sugerida |
|---|---|
| Migrar a Cloudflare | Inmediata; coste estático inicial 0 € |
| Preparar contenido y legal | Inmediata; necesario para crecer y solicitar AdSense |
| Crear cuenta AdSense | Sitio terminado, dominio propio y contenido navegable |
| Activar anuncios | Altas resueltas y previsión cercana a 40.000–60.000 sesiones/mes |
| Añadir segundo anuncio | Primera unidad estable y caída de finalización inferior al 5 % |
| Pagar adquisición | LTV real superior al CPI medido; no se cumple actualmente |

La cifra de tráfico no es una exigencia oficial de Google: es una recomendación
económica para no asumir obligaciones recurrentes a cambio de unos pocos euros.

## 7. Definición de fase terminada

La primera fase estará completada cuando:

- [ ] El dominio propio sirva la web desde Cloudflare con HTTPS.
- [ ] Existan contenido original, navegación y páginas legales completas.
- [ ] La CMP bloquee etiquetas cuando corresponda y permita rechazar fácilmente.
- [ ] Sitemap, robots, canonical y Search Console funcionen.
- [ ] La analítica mida inicio, finalización y retorno sin datos innecesarios.
- [ ] La decisión sobre 036, ROI/VIES y RETA esté resuelta y documentada.
- [ ] AdSense marque el sitio como «Ready» y `ads.txt` como autorizado.
- [ ] Los anuncios aparezcan solo en pausas seguras.
- [ ] Exista un sistema simple para registrar ingresos, gastos y plazos fiscales.

## 8. Fuentes oficiales

### Hacienda y Seguridad Social

- [Agencia Tributaria: modelo 036 y supresión del 037](https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/informacion-sobre-presentacion-modelos-no-periodicos/modelo-036.html)
- [Agencia Tributaria: servicios prestados a empresas de otros países](https://sede.agenciatributaria.gob.es/Sede/iva/iva-operaciones-comercio-exterior/prestaciones-servicios.html)
- [Agencia Tributaria: alta en ROI/VIES](https://sede.agenciatributaria.gob.es/Sede/iva/iva-operaciones-comercio-exterior/identificacion-realizar-operaciones-otros-empresarios-ue.html)
- [Agencia Tributaria: modelo 349](https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-iva-2025/capitulo-09-declaraciones-informativas-iva-379/declaracion-recapitulativa-operac-intracomunitarias-modelo-349.html)
- [Agencia Tributaria: exención de IAE para personas físicas](https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/folleto-actividades-economicas/2-impuesto-sobre-actividades-economicas.html)
- [Agencia Tributaria: libros registro de actividades](https://sede.agenciatributaria.gob.es/Sede/irpf/empresarios-individuales-profesionales/obligaciones-contables-registrales/actividades-profesionales-estimacion-directa.html)
- [Seguridad Social: campo de aplicación del RETA](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/Afiliacion/10548/32825/625)
- [Seguridad Social: guía de alta mediante Importass](https://revista.seg-social.es/-/guia-para-darte-de-alta-en-la-seguridad-social-como-trabajador-autonomo)
- [BOE: Ley 20/2007, Estatuto del trabajo autónomo](https://boe.es/buscar/act.php?id=BOE-A-2007-13409)
- [BOE: análisis de la STS 941/2025 sobre habitualidad y SMI](https://www.boe.es/biblioteca_juridica/anuarios_derecho/articulo.php?id=ANU-L-2025-00000003060)

### Web, privacidad y AdSense

- [BOE: LSSI, artículo 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758)
- [AEPD: aceptar y rechazar cookies al mismo nivel](https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-actualiza-guia-cookies-para-adaptarla-a-nuevas-directrices-cepd)
- [Google: requisitos para participar en AdSense](https://support.google.com/adsense/answer/9724)
- [Google: conectar y enviar un sitio a revisión](https://support.google.com/adsense/answer/7584263)
- [Google: CMP certificada y TCF v2.3](https://support.google.com/adsense/answer/9804260)
- [Google: guía de `ads.txt`](https://support.google.com/adsense/answer/12171612)
- [Google: umbrales de pago, 70 € para EUR](https://support.google.com/adsense/answer/1709871)
- [Google: pagos desde Google Ireland e IVA](https://support.google.com/adsense/answer/142362?hl=es)
- [Google: pagos SEPA en España](https://support.google.com/adsense/answer/2975858?hl=es)
