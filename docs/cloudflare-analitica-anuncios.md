# Cloudflare, analítica y anuncios de El Peaje

Actualizado: 8 de septiembre de 2026.

## Estado de la implementación

La aplicación sigue siendo una exportación estática de Next.js (`out/`). No necesita un servidor Next ni un dominio comprado para publicarse en Cloudflare Pages.

Implementado: registro central de eventos, IDs estables, almacenamiento aislado, preferencias por finalidad, carga condicional de Cloudflare Web Analytics, espacios de anuncios, perfiles de entorno y workflow de despliegue. Todas las métricas y espacios publicitarios están desactivados por defecto.

Pendiente en servicios externos: crear el proyecto Pages, conectar credenciales, publicar y obtener el token de Web Analytics. No se ha publicado automáticamente ni se ha conectado una cuenta. CMP certificada, GA4/Zaraz y AdSense son fases posteriores; no hay scripts de Google ni anuncios reales en esta versión.

## 1. Preparar el entorno

Usa Node.js 22 (incluido en `.nvmrc`; Wrangler lo requiere):

```bash
nvm install
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

En Windows sin nvm, instala Node.js 22 y copia los archivos desde el explorador. Los ejemplos no contienen credenciales reales. No subas los archivos `.local`.

| Comando | Perfil | Resultado |
| --- | --- | --- |
| npm run dev | development | Servidor local |
| npm run build:staging | staging | Exportación con noindex |
| npm run build:production / npm run build | production | Exportación indexable |
| npm run preview / npm start | Sin recompilar | Sirve out con Wrangler |

Los valores base están en `config/environments/`. Prioridad ascendente: perfil, `.env`, `.env.local`, `.env.<perfil>.local`, variables del proceso/CI. `NEXT_PUBLIC_APP_ENV` lo fija el comando. Staging compila con `NODE_ENV=production`, nunca con un valor inventado de NODE_ENV.

Las variables NEXT_PUBLIC se incorporan al JavaScript durante el build: cambiar valores en Cloudflare después de subir `out/` no modifica ese build. Hay que recompilar y desplegar. Nunca contienen secretos.

| Variable | Finalidad |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | URL canónica sin barra final; afecta enlaces compartidos, metadata y sitemap |
| NEXT_PUBLIC_ANALYTICS_ENABLED | Interruptor maestro de eventos y Web Analytics |
| NEXT_PUBLIC_ANALYTICS_DEBUG | Consola local; forzado a false en build de production |
| NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ENABLED | Habilita el beacon, junto con el maestro y consentimiento |
| NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN | Token público del fragmento Web Analytics; 32 caracteres hexadecimales |
| NEXT_PUBLIC_ADS_ENABLED | Solo muestra placeholders AdSlot, sin SDK ni ingresos |
| PAGES_BASE_PATH | Vacío en Cloudflare; /peaje para el alojamiento actual de GitHub |

Para Cloudflare, copia `.env.production.example` a `.env.production.local` y `.env.staging.example` a `.env.staging.local`. Sustituye los nombres de proyecto de ejemplo por los reales. No conserves localhost como URL de producción. Staging usa un sitemap vacío y noindex en HTML y cabecera `X-Robots-Tag`; esto no restringe el acceso. Si necesitas staging privado, añade control de acceso.

## 2. Primera publicación sin dominio

Este repositorio prepara **Direct Upload mediante Wrangler/GitHub Actions**. No necesitas configurar otra integración de builds en el panel.

1. Crea tu cuenta Cloudflare.
2. Autentica Wrangler en tu equipo:
   `npx wrangler login`.
3. Crea el proyecto (nombre de ejemplo, puede estar ocupado):
   `npx wrangler pages project create el-peaje --production-branch main`.
4. Cambia también `name` en `wrangler.jsonc` si eliges otro nombre.
5. Configura `NEXT_PUBLIC_SITE_URL=https://TU-PROYECTO.pages.dev` en `.env.production.local`, con métricas y anuncios en false.
6. Ejecuta:

```bash
npm run lint
npm test
npm run build:production
npx wrangler pages deploy out --project-name TU-PROYECTO --branch main
```

Cloudflare devolverá la URL real. Comprueba inicio, /jugar/, recarga directa de /cookies/, imágenes y audio. Cloudflare debe servir la raíz sin /peaje. Si el nombre asignado cambia, corrige SITE_URL y vuelve a compilar.

Para una preview estable, configura la URL de staging según el alias que devuelva Cloudflare y ejecuta:

```bash
npm run build:staging
npx wrangler pages deploy out --project-name TU-PROYECTO --branch staging
```

No publiques un build de staging en main ni el de producción en staging: el perfil queda dentro del artefacto.

Referencia: [Next.js estático en Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) y [Direct Upload con CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

## 3. Activar GitHub Actions

El workflow `.github/workflows/deploy-cloudflare.yml` está preparado pero permanece desactivado hasta establecer la variable de repositorio `CLOUDFLARE_DEPLOY_ENABLED=true`.

Crea los entornos de GitHub `production` y `staging`. En cada uno configura:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| Secret | CLOUDFLARE_API_TOKEN | Token restringido a la cuenta, permiso Account / Cloudflare Pages / Edit |
| Secret | CLOUDFLARE_ACCOUNT_ID | ID de la cuenta |
| Variable | CLOUDFLARE_PROJECT_NAME | Nombre del proyecto creado |
| Variable | SITE_URL | URL de producción o alias de staging |
| Variable | ANALYTICS_ENABLED | false al principio |
| Variable | CLOUDFLARE_ANALYTICS_ENABLED | false al principio |
| Variable | CLOUDFLARE_ANALYTICS_TOKEN | Token público del beacon, después |
| Variable | ADS_ENABLED | false al principio |

No pegues el API token en código, NEXT_PUBLIC ni mensajes. El token de API y el del beacon son distintos.

Los pushes a main usan production; los de staging usan staging. También puedes lanzarlo manualmente desde esas ramas. El workflow comprueba configuración, instala con npm ci, ejecuta lint/tests, compila y publica. El workflow existente de GitHub Pages se conserva: desactívalo en Actions cuando hayas comprobado Cloudflare y quieras cerrar esa publicación paralela. Hasta entonces pueden publicarse ambas.

## 4. Cloudflare Web Analytics para el MVP

1. Publica primero en pages.dev.
2. En Cloudflare Web Analytics añade el hostname público siguiendo el asistente y copia el token del fragmento JavaScript.
3. Usa una propiedad/token separado para staging si quieres medirlo; evita mezclar pruebas con producción.
4. Configura el token, ANALYTICS_ENABLED=true y CLOUDFLARE_ANALYTICS_ENABLED=true. Recompila/despliega.
5. **Desactiva la inyección automática de Web Analytics de Pages** (y cualquier beacon añadido por otra vía). La aplicación ya lo inserta tras aceptar analítica. La inyección automática duplicaría visitas y eludiría este control.
6. En incógnito, antes de decidir o al rechazar, verifica que no se solicita `static.cloudflareinsights.com/beacon.min.js`.
7. Acepta solo analítica: debe cargar una única vez, incluso al navegar entre páginas. Rechazar desde Cookies recarga el documento para retirar el beacon; la partida en memoria se pierde.
8. Comprueba visitas y rendimiento en el panel. Bloqueadores y denegaciones reducen la cobertura.

Esta decisión de producto exige consentimiento también para el beacon sin cookies. No pretende afirmar que todos los usos de esta herramienta tengan la misma obligación legal.

**Web Analytics no es el receptor de los eventos personalizados de partida.** En este MVP estos pasan por la capa local y pueden verse en consola de development/staging con debug habilitado; no se almacenan en un backend ni aparecerán como game_start en el panel de Cloudflare.

Referencias: [Instalación de Web Analytics](https://developers.cloudflare.com/web-analytics/get-started/) y [seguimiento de navegación SPA](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/).

## 5. Contrato de eventos y almacenamiento

`lib/game-catalog.ts` asigna IDs explícitos a tipos de pregunta, categorías, variantes, número de jugadores y dificultad. No dependen del texto traducido ni de posiciones de arrays. Conserva los IDs existentes al cambiar etiquetas; un concepto distinto necesita un ID nuevo. El peaje es un paso, no una pregunta que se pueda saltar.

| Evento | Momento |
| --- | --- |
| game_start | Se crea una partida, incluida la repetición |
| game_end | Se alcanza el final por recorrido, mazo o límite de fallos; una vez |
| game_abandon | Nueva configuración, salida de la ruta o pagehide sin bfcache; una vez si seguía abierta |
| game_repeat | Se pulsa Jugar otra vez después de terminar; también emite el nuevo game_start |
| game_share | Compartir nativo termina correctamente o copiar enlace se completa |

No hay función de saltar preguntas ni métrica de salto, por decisión del proyecto.

Los eventos incluyen schema_version, environment, session_id, game_id, IDs del catálogo y valores numéricos relevantes. No envían texto libre, contenido de cartas, nombres, emails ni URLs. Compartir con éxito no prueba que otra persona haya leído el enlace. El abandono al cerrar es orientativo: un cierre forzado del móvil puede no emitir pagehide. Ir a segundo plano no se considera abandono; bfcache conserva la partida.

`lib/analytics.ts` es el punto de entrada. `registerAnalyticsAdapter` permite conectar un receptor futuro; devuelve una función para retirarlo. El adaptador debe respetar también la CMP del proveedor. Los fallos del receptor no rompen el juego. No hay cola ni reenvío retroactivo: una partida iniciada sin permiso no genera un final huérfano si se acepta a mitad.

Todo acceso localStorage/sessionStorage vive en `lib/storage.ts`, con fallback si está bloqueado:

| Clave | Almacén | Finalidad / duración |
| --- | --- | --- |
| peaje.consent.v2 | localStorage | Preferencias, 180 días; al caducar se solicita otra elección |
| peaje.analytics-session.v1 | sessionStorage, solo con permiso y métricas habilitadas | ID y contador por pestaña; nueva sesión tras 30 minutos sin eventos |

No se guarda la partida ni un identificador permanente de visitante. La revocación borra la sesión analítica desde el runtime y olvida el seguimiento de la partida; no borra datos que un proveedor ya hubiera recibido.

## 6. CMP + GA4 o Zaraz (siguiente fase)

El panel actual es una base de preferencias, **no una CMP certificada**. No reutilices la aceptación actual como autorización automática para proveedores futuros: actualiza textos, incrementa la versión de consentimiento y recaba la elección aplicable.

Antes de integrar:
1. Completa responsable, contacto, proveedores, finalidades, plazos y política de privacidad/cookies.
2. Elige la CMP y define cómo sincronizar sus decisiones con la capa central.
3. Configura GA4 y su consentimiento, sin cargar herramientas opcionales antes de la decisión correspondiente. Añade el adaptador con los nombres/propiedades del contrato y verifica denegación, aceptación y revocación.
4. Registra solo las dimensiones necesarias. Evita usar game_id/session_id como dimensiones de informes de alta cardinalidad.
5. Si eliges Zaraz, recuerda que en Pages requiere **dominio personalizado**. No bloquea publicar ahora el MVP en pages.dev.
6. Evita enviar el mismo evento mediante GA4 directo y Zaraz simultáneamente.

Referencia: [Zaraz en Pages](https://developers.cloudflare.com/pages/how-to/enable-zaraz/).

## 7. Comprar y conectar el dominio, después

Puedes comprarlo en Cloudflare u otro registrador. Añádelo primero desde Pages > Custom domains y sigue la configuración DNS indicada; no crees únicamente un CNAME por tu cuenta. Actualiza SITE_URL, la propiedad de analítica y los enlaces públicos, y vuelve a desplegar. Define un único dominio canónico y redirecciones para las otras variantes.

Referencia: [Dominios personalizados de Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## 8. AdSense y medición de impacto (fase final)

`AdSlot` reserva posiciones estables: after-rules, after-modes, after-faq y after-game. ADS_ENABLED=true solo muestra marcadores: no solicita anuncios, no mide impresiones y no genera ingresos. En partida activa no se muestra el espacio after-game; en móvil se mantiene oculto para preservar la pantalla de juego.

Pasos pendientes:
1. Tener contenido y páginas legales completas y solicitar revisión de AdSense. La aprobación y los ingresos no están garantizados.
2. Para servir anuncios a usuarios del EEE, Reino Unido y Suiza, implementar una CMP certificada por Google compatible con TCF según sus requisitos vigentes.
3. Obtener publisher ID y unidades reales, publicar ads.txt con el valor indicado por AdSense y verificar dominio.
4. Crear un adaptador publicitario que solo cargue el SDK con las señales adecuadas de la CMP. Incorporar estados de carga, sin inventario, error y retirada de consentimiento.
5. Mantener tamaños reservados para evitar saltos de diseño y probar vertical/horizontal. Empezar por páginas informativas y pausas entre partidas.
6. Medir impresiones reales reportadas por el proveedor, nunca contar la mera presencia del placeholder como impresión.

Referencia: [Requisitos de CMP certificada de Google](https://support.google.com/adsense/answer/13554116?hl=en-GB).

## 9. Qué medir antes de aumentar anuncios

Con un receptor de eventos ya conectado:
- Partidas por sesión: game_start / sesiones con al menos un game_start. game_repeat no se suma otra vez.
- Finalización: partidas con game_end / partidas iniciadas, agrupando por game_id.
- Repetición: partidas terminadas seguidas de game_repeat / partidas terminadas.
- Abandono por modo, dificultad y paso; considerar los cierres que no llegan a notificarse.
- Rendimiento: LCP, INP y CLS junto con ingresos por sesión y partidas por sesión.

Actualmente ad_variant distingue off de placeholder para depurar; no existe un experimento de anuncios reales ni asignación aleatoria. Antes de comparar ingresos, añade variantes reales, exposición confirmada y asignación estable por sesión. Separa dispositivos y fuentes de tráfico, y evita sacar conclusiones de diferencias entre fechas con públicos distintos.

La retención D1/D7 necesita reconocer retornos entre sesiones con un mecanismo y consentimiento apropiados. Esta base deliberadamente no lo implementa: no puede calcularla a partir de su sessionStorage ni solo de Cloudflare Web Analytics. Define esa fase con el proveedor elegido y documenta el sesgo de usuarios que rechazan medición.

## Comprobación antes de activar producción

`npm run lint`, `npm test`, build de staging y producción. En navegador: rechazo sin solicitudes opcionales, aceptación por finalidad, revocación, navegación sin doble beacon, partidas completas/repetición/abandono, compartir cancelado y correcto, almacenamiento bloqueado y móvil vertical/horizontal. Verifica en el servicio remoto la recepción real cuando conectes un adaptador: que trackEvent acepte un evento localmente no implica entrega.

Para la migracion al dominio y el mantenimiento de textos, menus y seguridad, sigue la [guia de SEO y seguridad](seo-y-seguridad.md).
