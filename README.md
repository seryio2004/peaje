# El Peaje

Juego de cartas con Next.js y exportación estática.

Recomendado: Node.js 22 y npm.

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build:staging
npm run build:production
npm run preview
```

El resultado de build está en `out/`. Preview sirve ese resultado mediante Wrangler; no recompila.

Consulta [la guía de Cloudflare, analítica y anuncios](docs/cloudflare-analitica-anuncios.md) para configurar entornos, consentimiento, despliegue y siguientes fases.

Consulta [la guía de SEO y seguridad](docs/seo-y-seguridad.md) antes de cambiar textos, menús, rutas o dominio. Los builds verifican automáticamente el SEO del export y generan su CSP.

El [plan SEO basado en Search Console](docs/seo-search-console.md) documenta las palabras objetivo, los cambios y la revisión semanal. Para analizar una nueva exportación:

```bash
npm run seo:report -- ./carpeta-del-informe
# Sin carpeta, detecta la exportación si solo hay una en la raíz.
```

## Auditoría editorial y AdSense

La auditoría inicial está en [docs/adsense-audit.md](docs/adsense-audit.md) y los resultados finales en [docs/adsense-readiness.md](docs/adsense-readiness.md). No se solicita revisión de AdSense automáticamente.

```bash
npm run build:production
npm run audit:site -- --report docs/site-audit-results.json
# Comparar con la versión publicada, tras desplegar:
npm run audit:site -- --base https://elpejae.com --report /tmp/peaje-live-audit.json
# Vista local para comprobar móvil, escritorio y Lighthouse:
npm run preview:static
```

Sin `--base`, la auditoría inicia un servidor HTTP local efímero sobre `out/`, lo comprueba y lo cierra. Emite PASS/WARN/FAIL y devuelve un código distinto de cero si hay FAIL. No representa el estado publicado ni reproduce las cabeceras del hosting. Para staging, utiliza `--allow-noindex --origin https://DOMINIO-DE-STAGING` tras su build.
