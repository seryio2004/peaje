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
