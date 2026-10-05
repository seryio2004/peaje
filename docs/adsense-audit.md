# Auditoría inicial de El Peaje

Fecha: 5 de octubre de 2026. Alcance: código presente en el directorio de trabajo, incluidos los cambios previos de internacionalización. No se han descartado esos cambios. Las observaciones describen la situación **antes** de esta intervención; los resultados posteriores están en `adsense-readiness.md`.

## Inventario completo de rutas públicas

| Ruta española | Intención y problemas iniciales |
| --- | --- |
| `/` | Presentación y acceso al juego. Contenido legible en HTML, pero anuncia apps que no existen y exagera el fallo como peaje automático. |
| `/jugar/` | Interactiva por naturaleza. Configuración prerenderizada, partida requiere JavaScript. `GameWithAds` permite un espacio publicitario tras completar una partida: debe retirarse. |
| `/como-jugar/` | Reglas correctas pero faltan ejemplos numéricos, explicación del retroceso sobre peajes y agotamiento de cartas. |
| `/modos-de-juego/` | Seis variantes reales; varias descripciones demasiado breves. Mantener esta URL estable en vez de duplicarla con `/modos/`. |
| `/preguntas-frecuentes/` | Resuelve mecánicas reales; faltan compatibilidad, recarga, conectividad y preguntas sobre reparto/puntuación. |
| `/sobre-el-juego/` | Muy breve: tres ventajas y una declaración de diseño. Faltan arquitectura, evolución verificable y referencias al mantenimiento. |
| `/previa/` | Se solapa con juegos de beber en preparación, elección de modo y peajes. Necesita una intención propia: organizar la sesión. |
| `/juegos-de-beber/` | Repite presentación, preparación y modos. Reorientar a acuerdos de peajes y participación voluntaria; no presentar un catálogo inexistente. |
| `/compartir/` | QR y enlace útiles; las tarjetas de Google Play/App Store son placeholders. El QR abre la web, no comparte el estado de una partida. |
| `/contacto/` | Breve pero cumple su propósito: correo e incidencias. No necesita relleno; evitar espacios de anuncios aquí. |
| `/privacidad/` | Política accesible. Confirmar las afirmaciones contra el almacenamiento y runtime; ninguna integración publicitaria activa. |
| `/cookies/` | Política y controles de consentimiento. Evitar anuncios/espacios vacíos en esta ruta. |
| `/aviso-legal/` | Información de uso y contacto; no identifica por nombre al titular. La identidad no puede inventarse. |

Además hay **35 rutas traducidas** (7 por idioma) bajo `/en/`, `/it/`, `/de/`, `/fr/` y `/pt/`: inicio, juego, reglas, modos, juegos de beber, previa y FAQ. El inventario exacto está definido en `lib/i18n.ts` y `lib/translations/`. Todas se generaban estáticamente. Sus modos son breves y sus páginas de previa/bebidas también se solapan. El footer traducido solo enlaza FAQ, previa y aviso legal: faltan accesos explícitos a contacto, privacidad, cookies y sobre el proyecto.

Recursos públicos de descubrimiento: `/robots.txt`, `/sitemap.xml`, `/ads.txt`, `/share-image.png`, icono y recursos de cartas/audio. La página de error `404.html` es noindex y no debe figurar en sitemap. No había páginas vacías completas; sí módulos de apps inexistentes y placeholders publicitarios activables mediante configuración.

## SEO inicial

- Registro centralizado de títulos/descripciones y canonical en `lib/site-routes.ts`/`lib/seo.ts`; origen de producción `https://elpejae.com`, con barra final.
- Sitemap incluye las 13 rutas españolas y 35 traducidas; faltan las cuatro nuevas páginas solicitadas porque aún no existen.
- Robots permite rastreo y declara sitemap en producción. Staging conserva noindex intencionado; no trasladarlo a producción.
- OpenGraph y Twitter presentes. Hreflang relaciona traducciones reales. JSON-LD de sitio y juego; no inventa reseñas o puntuaciones.
- Las verificaciones existentes inspeccionan el export, pero no prueban HTTP ni producen PASS/WARN/FAIL por comprobación. No comprueban unicidad de descripciones.
- Metadatos de compartir prometen apps futuras. Los títulos de bebidas son demasiado genéricos para una página de un único juego.

## UX y publicidad iniciales

- La capa editorial es Server Component y el contenido principal está en el HTML. FAQ con `details` funciona sin JavaScript. El juego y copiar/compartir requieren JavaScript por su naturaleza.
- La cabecera móvil usa navegación horizontal con scrollbar oculto; comprobar que no recorta enlaces y mejorar su ajuste. No se ha completado aún una verificación visual ni Lighthouse.
- Footer español consistente por layout; footer extranjero incompleto.
- Publicidad desactivada por defecto; `AdSlot` muestra un placeholder cuando se activa la bandera. Hay posiciones en contacto/políticas y después del juego. Retirar esos usos y no mostrar espacios vacíos.
- `ads.txt` contiene una línea de Google con identificador de editor. La sintaxis puede comprobarse; su pertenencia a la cuenta solo la puede confirmar el titular.

## Verificación inicial y límites

`npm test`: 7 archivos de pruebas pasan antes de los cambios. Build inicial de producción iniciado para verificar export/SEO. No hay pruebas de navegador ni resultados Lighthouse iniciales todavía.

El acceso a la web publicada mediante la herramienta web no ha sido posible. Esto no prueba que la web esté caída. La auditoría del código y del export local no confirma la versión desplegada, DNS, permisos de AdSense, actividad del correo ni identidad del titular.

## Prioridad de corrección

1. Retirar publicidad del juego y promesas de apps.
2. Añadir probabilidades calculadas con la misma baraja del motor, estrategia, variantes de sesión y explicación técnica.
3. Ampliar reglas, modos, FAQ y sobre el juego; diferenciar las páginas de sesión/bebidas.
4. Completar navegación, metadatos y sitemap; crear auditoría reproducible de todas las rutas y enlaces.
5. Ejecutar tests, lint, builds, auditoría HTTP y Lighthouse/QA móvil; declarar los pendientes sin ocultarlos.

## Comprobación posterior del estado publicado (antes de desplegar estos cambios)

El script HTTP consiguió acceder al dominio: las 13 páginas españolas iniciales devuelven 200, robots y sitemap también. Las cuatro nuevas páginas y las 35 rutas traducidas del trabajo previo devuelven 404 porque todavía no están publicadas. La respuesta 404 del hosting no contiene una meta noindex detectada por el script; una petición adicional confirmó también la ausencia de la cabecera X-Robots-Tag. El export local sí incorpora su 404 noindex; verificar también cabeceras/respuesta del hosting después del despliegue. El fallo inicial de acceso de la herramienta web no era una caída del sitio.

El registro completo de esta comprobación está en `docs/site-audit-live-before.json`. Sus FAIL incluyen la ausencia de metadatos/contenido en URLs todavía no publicadas; no son 315 problemas distintos del juego.
