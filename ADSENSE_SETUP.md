# Estructura publicitaria de El Peaje

La compilación de producción mantiene `NEXT_PUBLIC_ADS_ENABLED=false`. Desarrollo y staging muestran únicamente marcadores visuales: no cargan el script de AdSense ni generan solicitudes publicitarias.

## Ubicaciones

- `/` no tiene anuncios.
- `/jugar` solo tiene el espacio `after-game`, después de terminar una partida y a más de 150 px de los controles. No hay banners durante el juego ni en la pantalla de configuración.
- Las otras diez páginas públicas tienen una ubicación fija en el contenido. Reglas, modos, preguntas frecuentes, previa y compartir usan un banner horizontal; sobre el juego, contacto y las tres páginas legales usan un lateral que pasa a horizontal en pantallas estrechas.

Los identificadores de ubicación están centralizados en `app/ad-slot.tsx`. Los marcadores se ocultan completamente cuando el flag está desactivado.

## Cadencia de partidas

`lib/ad-cadence.ts` asigna un punto a las partidas Fácil y Media, y dos a Difícil y Normal. Cada dos puntos se habilita un único espacio `after-game`. Solo cuentan partidas que llegan a la fase `complete`; abandonar o empezar otra no incrementa el contador. El contador vive en memoria y se reinicia al recargar o volver a montar la página del juego.

## Antes de solicitar anuncios reales

1. Obtener el ID `ca-pub-…`, la aprobación del sitio y los IDs de unidad de AdSense. Añadir `ads.txt` con el ID real.
2. Publicar y configurar «Privacidad y mensajes» de Google para las regiones aplicables. El consentimiento local actual solo cubre la analítica; no sirve para anuncios.
3. Sustituir el marcador de `AdSlot` por las unidades oficiales y cargar el script publicitario según la CMP. Mantener el control de anuncios de juego separado de los banners editoriales. Si se elige un formato de pantalla completa para la pausa entre partidas, utilizar la API oficial de H5 Games Ads y sus reglas de frecuencia, sin construir un intersticial propio con anuncios de contenido.
4. Revisar las páginas de contacto y legales antes de insertar anuncios reales: Google puede limitar inventario en páginas con poco contenido. Verificar la separación respecto a controles, el tamaño móvil y que no haya desplazamientos de diseño.

Referencias: [anuncios en páginas de juego](https://support.google.com/adsense/answer/2768340?hl=es), [H5 Games Ads](https://support.google.com/adsense/answer/9959170?hl=es), [CMP de Google](https://support.google.com/adsense/answer/13554116?hl=es) y [ads.txt](https://support.google.com/adsense/answer/12171612?hl=es).
