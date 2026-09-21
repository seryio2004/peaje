# SEO y seguridad: publicación y mantenimiento de El Peaje

Actualizado: 8 de septiembre de 2026.

## Qué está preparado

- Título, descripción, URL canónica, Open Graph y tarjeta social por página.
- Imagen PNG de 1200 × 630 generada durante el build.
- Datos estructurados WebSite y VideoGame, sin valoraciones ni cifras inventadas.
- Catálogo compartido por metadatos, sitemap y menús.
- Página 404 con enlaces útiles.
- Validación automática de páginas exportadas, enlaces internos y configuración SEO.
- CSP con hashes de los scripts incluidos en cada HTML, más cabeceras para Cloudflare.
- Actualizaciones de dependencias propuestas semanalmente por Dependabot.

Estas medidas no garantizan posiciones en Google ni aprobación de AdSense. El dominio, Search Console y la configuración de la cuenta Cloudflare requieren pasos externos.

## 1. Dominio de producción y publicación

La única URL pública canónica es `https://elpejae.com`. El build de producción rechaza otros dominios y subdirectorios. `wrangler.jsonc` registra ese dominio personalizado para el Worker que sirve `out/`; el dominio debe pertenecer a una zona de Cloudflare a la que tenga acceso la cuenta que despliega. Consulta [Custom Domains de Workers](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

1. Comprueba que `elpejae.com` está activo en Cloudflare con DNS y certificado válidos.
2. Ejecuta `npm run build:production` y después `npx wrangler deploy` en la cuenta correcta. El build genera canonicals, sitemap, datos estructurados, imagen social, QR y enlaces compartidos con el dominio canónico.
3. Comprueba directamente `https://elpejae.com/`, `/jugar/`, `/como-jugar/`, `/previa/`, `/cookies/`, `/share-image.png`, `/robots.txt` y `/sitemap.xml`. Las páginas públicas deben responder 200 sin `noindex`.
4. Configura en Cloudflare redirecciones permanentes desde `www.elpejae.com`, `elpeaje.com` si controlas ese dominio, y cualquier alojamiento público anterior. Conserva la ruta y la query. La configuración del Worker solo sirve `elpejae.com`; las redirecciones de otros hosts necesitan acceso a esos hosts.
5. Verifica la propiedad de dominio en Google Search Console por DNS, envía `https://elpejae.com/sitemap.xml` e inspecciona inicio, juego, reglas y previa.

Staging lleva `noindex` y un sitemap vacío. Su URL de compilación apunta a la versión canónica de producción, aunque la vista previa se sirva desde otra dirección.

### Si Google ya conoce la versión de GitHub Pages

Haz un mapa de URLs: `https://seryio2004.github.io/peaje/como-jugar/` debe llevar a `https://elpejae.com/como-jugar/`.

GitHub Pages no interpreta el archivo Cloudflare `_redirects`. La redirección debe resolverse en el alojamiento de origen con las posibilidades disponibles. Cambiar `NEXT_PUBLIC_SITE_URL` solo cambia las URLs generadas, no redirige el sitio antiguo.

Mantén una señal de traslado en el origen y evita dejar dos sitios indexables indefinidamente. Un canonical ayuda a consolidar señales, pero no sustituye una redirección. La herramienta Cambio de dirección de Search Console tiene limitaciones para traslados de subdirectorios como /peaje; comprueba su aplicabilidad a las propiedades que controles. No cambies simultáneamente dominio, rutas y toda la estructura de contenido si puedes hacer la migración por fases. Sigue la [guía de Google para migraciones](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## 2. Dónde editar cada cosa

| Cambio | Archivo |
| --- | --- |
| Título SEO, descripción o etiqueta de menú | `lib/site-routes.ts` |
| Qué enlaces aparecen y su orden en los menús | HEADER_PATHS / FOOTER_PATHS en `lib/site-routes.ts` |
| Texto visible de una página | `app/<ruta>/page.tsx`; inicio en `app/page.tsx` |
| Reglas, FAQ y explicaciones compartidas | `lib/site-content.ts` |
| Construcción de canonicals y datos estructurados | `lib/seo.ts` |
| Diseño de tarjeta social | `app/share-image.png/route.tsx` |
| Lógica del sitemap y robots | `app/sitemap.ts`, `app/robots.ts` |
| Redirecciones de rutas antiguas en Workers Static Assets | `public/_redirects` |
| CSP y cabeceras de seguridad exportadas | `scripts/security.mjs` |
| Comprobación del HTML final | `scripts/verify-export.ts` |

No edites archivos de `out/`: se regeneran.

## 3. Si cambias textos

Mantén alineados tres elementos: el contenido visible, el título SEO y la descripción. Ejemplo: si explicas nuevas dificultades, actualiza la página de modos y su entrada en SITE_PAGES.

- Escribe para la duda concreta del visitante. Describe el juego, sus reglas y sus diferencias con precisión.
- Utiliza un H1 principal que identifique la página y H2/H3 para sus apartados. Los tamaños visuales se ajustan con CSS, no cambiando encabezados sin motivo.
- Haz títulos distintos, descriptivos y fáciles de leer. `pageMetadata` añade la marca a las páginas interiores; no la dupliques manualmente.
- Resume el contenido en la descripción; no acumules palabras clave ni prometas funciones inexistentes.
- Un título o descripción pueden aparecer recortados o reescritos por Google. No existe un número de caracteres que garantice su presentación.
- Usa texto alternativo descriptivo en imágenes informativas; las decorativas deben tener alt vacío o quedar ocultas a tecnología asistiva.
- Mantén enlaces contextuales: desde una explicación de dificultades, enlaza a modos; desde dudas sobre reglas, a cómo jugar.
- Si cambias una característica real, revisa también inicio, FAQ, texto compartido y datos estructurados. No añadas reseñas, puntuaciones ni características inexistentes al JSON-LD.

Google explica cómo forma los [títulos de los resultados](https://developers.google.com/search/docs/appearance/title-link). Los metadatos ayudan a describir la página; el contenido visible sigue siendo esencial.

## 4. Si cambias el menú

**Cambiar una etiqueta no requiere cambiar la URL.** Puedes mostrar “Cómo jugar” donde antes decía “Reglas” conservando `/como-jugar`.

Edita `label` en SITE_PAGES. Para añadir, quitar o reordenar enlaces, modifica HEADER_PATHS o FOOTER_PATHS. El menú utiliza enlaces Next Link que producen elementos `<a href>` rastreables.

No sustituyas enlaces por botones que solo navegan con JavaScript. Usa nombres que indiquen el destino y evita páginas útiles sin enlaces desde ninguna otra página. Revisa el menú en móvil: una etiqueta más larga puede alterar el ajuste aunque el SEO sea correcto.

La [guía de enlaces de Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) explica qué enlaces puede descubrir y cómo escribir sus textos.

## 5. Si añades, renombras o eliminas una página

### Añadir

1. Crea `app/nueva-ruta/page.tsx` como componente servidor para sus metadatos.
2. Añade `"/nueva-ruta"` a SITE_PAGES con título, descripción y etiqueta.
3. Exporta `export const metadata = pageMetadata("/nueva-ruta");`.
4. Añade un H1 y contenido propio útil.
5. Enlázala desde un menú o página relacionada.
6. Ejecuta las comprobaciones. El sitemap se actualiza desde el catálogo.

El catálogo actual contiene páginas públicas e indexables. Si necesitas una ruta privada o noindex, amplía el catálogo para expresar esa condición y exclúyela del sitemap; no la añadas sin revisar esta lógica.

### Renombrar

Evita cambiar una ruta publicada solo para introducir una palabra clave. Si el cambio tiene sentido, actualiza carpeta, catálogo y todos los enlaces que apuntan a ella, incluidos los de `lib/site-content.ts` y otros textos.

Añade en `public/_redirects` una redirección a la URL final, por ejemplo:

```text
/reglas/ /como-jugar/ 301
/reglas /como-jugar/ 301
```

Son ejemplos: solo actívalos si esa ruta antigua existía. Prueba con curl que cada variante llega al destino correcto sin cadenas ni bucles. El validador comprueba los enlaces del HTML, pero las redirecciones deben comprobarse en Pages o Wrangler.

### Eliminar

Si hay un sustituto equivalente, redirige hacia él. Si no existe, devuelve un 404 real y retira la ruta del catálogo y de los enlaces. No redirijas todas las páginas eliminadas al inicio: puede confundir al visitante y producir errores de indexación. La página 404 incluida ofrece caminos de vuelta; comprueba que el alojamiento conserva el estado HTTP 404.

## 6. Antes de publicar cualquier cambio

Usa Node.js 22:

```bash
npm ci
npm run lint
npm test
npm run build:staging
npm run preview
```

El build ejecuta automáticamente la comprobación SEO/seguridad. Puedes repetirla sobre el mismo artefacto:

```bash
npm run check:site
```

Comprueba títulos únicos, descripción, canonical/og:url, enlaces internos, H1, sitemap, hashes CSP y presencia de la imagen social. No sustituye una revisión de redirecciones, contraste, calidad de contenido ni políticas del proveedor.

Prueba el juego completo, compartir, aceptar/rechazar analítica y navegar entre páginas. Revisa móvil en vertical y horizontal. Mide LCP, INP y CLS con las herramientas de rendimiento antes y después de introducir imágenes o anuncios. La tarjeta social se genera como PNG; no añade una descarga de imagen a la portada del juego.

Después:

```bash
npm run build:production
```

Comprueba que el dominio canónico es el definitivo. Publica ese artefacto. En producción:

```bash
curl -I https://tudominio.es/
curl -I https://tudominio.es/una-ruta-inexistente/
curl -I https://tudominio.es/share-image.png
```

La portada debe responder 200, la ruta desconocida 404 y la imagen con tipo image/png. Busca las cabeceras de seguridad y confirma que no haya noindex en páginas públicas. Envía el sitemap en Search Console y revisa su informe de indexación. No inventes fechas lastmod ni las actualices automáticamente por cada build sin cambios de contenido. Consulta la [documentación de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### Staging

Staging emite noindex en HTML y cabecera, y un sitemap vacío. Robots permite el rastreo para que los buscadores puedan leer noindex: bloquearlo con Disallow puede impedir que vean la instrucción. Noindex no protege información privada; utiliza Cloudflare Access si el entorno debe ser privado. Consulta la [explicación de Google sobre noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## 7. Cómo funciona la seguridad preparada

El sitio es estático y no tiene API propia ni cuentas. El build calcula SHA-256 del contenido exacto de los scripts inline generados por Next e inserta la CSP al comienzo de cada documento. Permite esos scripts, los recursos del propio origen y, solo cuando está habilitada, la procedencia de Cloudflare Web Analytics.

La política bloquea scripts inline arbitrarios, eval, scripts de terceros no autorizados, marcos y envíos de formularios. Los estilos inline siguen permitidos porque el tablero los utiliza para animaciones y variables CSS. Una CSP reduce ciertas vías de ataque; no reemplaza corregir vulnerabilidades.

El archivo generado `out/_headers` añade:
- Protección frente a incrustación en marcos (frame-ancestors y X-Frame-Options).
- X-Content-Type-Options: nosniff.
- Política de referencia y bloqueo de cámara, micrófono, geolocalización, USB y pagos.
- HSTS de un día, sin includeSubDomains ni preload.
- Noindex y no-store adicionales en staging.

Parte de la CSP se envía mediante meta para usar hashes por documento sin superar los límites de cabeceras de Pages. frame-ancestors requiere cabecera HTTP. GitHub Pages no aplica `_headers`: allí permanece la CSP del HTML, pero no se deben dar por activadas las protecciones que dependen de cabeceras. El servidor next dev tampoco reproduce la configuración final; verifica el export con Wrangler y después el alojamiento real.

Cloudflare documenta [el formato y límites de _headers](https://developers.cloudflare.com/pages/configuration/headers/) y los [orígenes necesarios para Web Analytics](https://developers.cloudflare.com/web-analytics/faq/).

### Al conectar el dominio

Activa MFA en Cloudflare y GitHub, restringe el token de despliegue a Pages y conserva los secretos fuera de NEXT_PUBLIC. Revisa HTTPS y certificado antes de ampliar HSTS; no actives includeSubDomains o preload sin revisar todos los subdominios.

No actives transformaciones del HTML o de scripts como Rocket Loader sin probarlas: cambiar los bytes de scripts después del build invalida los hashes CSP. Mantén desactivada la inyección automática del beacon, porque la aplicación ya gestiona su carga tras consentimiento.

Revisa los avisos de dependencias y las PR de Dependabot; no se fusionan automáticamente. Puedes comprobar el estado con `npm audit`. Antes de actualizar Next vuelve a probar navegación, CSP e hidratación.

## 8. Cuando lleguen CMP, GA4/Zaraz y AdSense

El dominio comprado no activa anuncios ni sustituye la revisión de AdSense. Completa primero los datos legales pendientes y la CMP prevista en la [guía de hosting y anuncios](cloudflare-analitica-anuncios.md).

La CSP actual bloquea esos proveedores porque todavía no están integrados. Cuando los incorpores:
1. Revisa su documentación vigente y los orígenes realmente necesarios para scripts, conexiones, imágenes y marcos.
2. Añade permisos concretos en `scripts/security.mjs`, condicionados a la integración.
3. Mantén los controles de consentimiento independientes de la CSP: permitir un origen no autoriza cargarlo antes del permiso.
4. Prueba rechazo, revocación, publicidad sin inventario y bloqueadores, además de las partidas.
5. Comprueba rendimiento y espacios reservados; evita tapar contenido o botones.
6. Si pasas a Workers/SSR, genera cabeceras en las respuestas y revisa CSP; la estrategia del export estático no se traslada sin cambios.

No resuelvas un error de integración añadiendo `*`, unsafe-eval o unsafe-inline a script-src de forma general.
