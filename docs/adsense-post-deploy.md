# Comprobación tras el despliegue

Fecha: 5 de octubre de 2026. Commit local: `59486d28` (`feat: expand editorial content and improve AdSense readiness`). Comprobaciones efectuadas sobre `https://elpejae.com`, sin publicar ni solicitar revisión de AdSense.

## Resultado

Las **52 páginas** esperadas responden con HTTP 200. Las cuatro páginas editoriales nuevas y las 35 rutas traducidas ya están publicadas. Títulos, descripciones, canonical, H1, OpenGraph, indexación, enlaces internos, sitemap y robots pasan la auditoría. `/modos/` devuelve 301 hacia `/modos-de-juego/`. El ads.txt responde correctamente.

El script devuelve **638 PASS, 1 WARN y 1 FAIL**. El WARN pide confirmar la titularidad del publisher ID. El único FAIL corresponde a la ausencia de noindex en una URL inexistente. Esa URL devuelve realmente HTTP 404, con cuerpo vacío: no es una página válida presentada como 200. Añadir noindex a un 404 real no es un requisito de aprobación identificado en esta revisión; sería útil configurar la página de error personalizada para ofrecer navegación al visitante.

## Navegador y Lighthouse

Pruebas de navegador en móvil (390 × 844) y escritorio (1280 × 900), más lectura sin JavaScript: 38 registros de comprobación, sin desbordamientos, enlaces de cabecera recortados ni excepciones JavaScript. El juego permite iniciar y responder; el panel de preferencias abre manualmente. Las guías, la tabla y la FAQ se leen sin JavaScript.

Lighthouse móvil sobre `/probabilidades/` publicada:

| Categoría / métrica | Resultado |
| --- | --- |
| Rendimiento | 94 |
| Accesibilidad | 100 |
| Buenas prácticas | 92 |
| SEO | 100 |
| LCP | 2,7 s |
| Bloqueo total | 140 ms |
| CLS | 0 |

Es una medición de laboratorio de esta URL, no una puntuación de todas las rutas ni datos de usuarios reales.

Lighthouse detectó un intento de cargar `static.cloudflareinsights.com/beacon.min.js/...` bloqueado por la CSP. Es el motivo de los avisos de consola/Issues que reducen buenas prácticas. El export local no contiene esa URL versionada. La inserción automática de Cloudflare Web Analytics es una causa probable; no se ha accedido a la configuración de la cuenta para confirmarla.

Con la analítica desactivada en el sitio, revisar en Cloudflare **Web Analytics → Manage site → Disable**. La [documentación de Cloudflare](https://developers.cloudflare.com/web-analytics/get-started/) indica que esa opción desactiva la inserción del script. Después, repetir Lighthouse para comprobar que el intento desaparece. Mantener la configuración de consentimiento del sitio si más adelante se activa la medición.

## Qué queda antes de solicitar revisión

- Confirmar los permisos aplicables a la imagen y el audio de cinco fallos, o sustituirlos por recursos propios/licenciados si no existe autorización.
- Identificar al responsable del sitio con los datos reales aplicables y verificar que el correo de contacto recibe mensajes.
- Confirmar que el publisher ID de ads.txt coincide con la cuenta y que AdSense reconoce la conexión del sitio.
- Resolver la inserción de analítica bloqueada por CSP. Es una incidencia técnica observada, no una causa de rechazo comunicada por AdSense.

El bloqueo anterior por cambios sin publicar está resuelto. La capa editorial y su navegación ya son accesibles en el dominio real. La decisión de aprobación por calidad de contenido sigue correspondiendo a Google; no se ha solicitado automáticamente.

## Reproducción

```bash
npm run audit:site -- --base https://elpejae.com --report /tmp/peaje-post-push-audit.json
npx --yes lighthouse@13.5.0 https://elpejae.com/probabilidades/ --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/peaje-production-lighthouse.json
```
