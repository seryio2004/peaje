# Compartir por QR y consentimiento

## Compartir

La ruta /compartir está enlazada desde el inicio y el pie de página. Su QR se genera en el build, sin peticiones a proveedores externos, y abre la URL pública definida por NEXT_PUBLIC_SITE_URL. Al comprar el dominio, cambia esa variable y recompila: el QR, enlace y metadatos se actualizarán juntos. Un QR ya impreso conservará su destino anterior; mantén una redirección si cambia el dominio.

Google Play y App Store aparecen como «En desarrollo», sin enlaces de descarga ni anuncios de disponibilidad. Cuando existan fichas públicas reales, añade sus enlaces y revisa texto y estado. No se implementa una app móvil en este cambio.

La acción de compartir esta página no se contabiliza como game_share, reservado a resultados de partidas.

## Aviso y preferencias

La primera capa aparece cuando hay analítica habilitada y falta una elección válida. Presenta rechazar, configurar y aceptar con el mismo estilo. Cuando solo hay almacenamiento necesario no se exige aceptar servicios inexistentes; las preferencias siguen disponibles.

El diálogo usa el elemento nativo dialog: gestiona foco, teclado y Escape. Cerrar sin guardar no acepta nada. Hay acceso desde el pie y la cabecera de la partida, también en móvil.

Las preferencias v2 se vinculan a los servicios configurados, caducan a los 180 días y sustituyen la v1. No se acepta publicidad ni analítica desactivada por anticipado. Añadir proveedores requiere actualizar la política, inventario y versión; esta configuración no sustituye una CMP.

Retirar analítica borra su sesión local. Si Web Analytics estaba cargado, recarga la página porque el proveedor no ofrece una API de retirada de sus escuchadores. El panel avisa de que se pierde la partida.

## Antes de publicar

Los datos legales del titular y el contacto de privacidad permanecen pendientes por decisión del propietario. Deben completarse y revisarse las políticas e información de proveedores antes de considerar terminada la publicación.

El comportamiento implementa criterios de elección y transparencia de la [guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf), pero no es una certificación jurídica ni una CMP certificada. Para AdSense hay que integrar la CMP que corresponda, configurar proveedores y probar sus señales según los [requisitos de Google](https://support.google.com/adsense/answer/13554116?hl=es). No basta con este panel.

## Validación

- npm test incluye decodificación del QR con una biblioteca independiente.
- Prueba un build de staging con métricas habilitadas para ver la primera capa: rechazar no debe solicitar el beacon; configurar y cerrar tampoco.
- Aceptar analítica permite solo el proveedor configurado. Rechazar después debe limpiar la sesión y detener la carga al recargar.
- Comprueba teclado, navegación entre páginas, pantallas estrechas y el acceso a preferencias durante la partida.
- Actualiza las políticas y renueva el consentimiento cada vez que incorpores nuevos proveedores o finalidades.
