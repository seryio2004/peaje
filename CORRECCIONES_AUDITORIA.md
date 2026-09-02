# Correcciones derivadas de la auditoría técnica

Fecha: 2 de septiembre de 2026

## Objetivo

Este documento describe el proceso seguido para corregir los cuatro problemas
detectados en la auditoría del proyecto El Peaje y para añadir controles que
eviten que vuelvan a introducirse.

## Resumen del resultado

| Problema | Estado | Solución aplicada |
| --- | --- | --- |
| GitHub Actions basadas en Node 20 | Corregido | Actualización a versiones compatibles con Node 24 |
| Contenido recortado sin scroll | Corregido | Altura mínima y desplazamiento vertical de respaldo |
| Compilación obsoleta versionada en `out/` | Corregido | Eliminación de `out/` del índice de Git |
| Animación que no se reiniciaba al cambiar una carta | Corregido | Identidad de React basada en `card.id` |
| Ausencia de pruebas y lint en CI | Corregido | Pruebas de regresión y pasos obligatorios en el workflow |

## 1. Actualización del workflow de GitHub Pages

### Diagnóstico

El workflow configuraba Node 22 para compilar el proyecto, pero varias Actions
seguían ejecutándose internamente con Node 20. El runtime interno de una Action
no depende de la versión instalada mediante `setup-node`.

GitHub está retirando Node 20 de sus runners. Se contrastaron las versiones con
la documentación y los repositorios oficiales de las Actions.

### Cambios

Se actualizaron las siguientes referencias en
`.github/workflows/deploy-pages.yml`:

- `actions/checkout@v4` → `actions/checkout@v7`.
- `actions/setup-node@v4` → `actions/setup-node@v7`.
- `actions/cache@v4` → `actions/cache@v5`.
- `actions/upload-pages-artifact@v3` →
  `actions/upload-pages-artifact@v5`.
- `actions/deploy-pages@v4` → `actions/deploy-pages@v5`.
- `actions/configure-pages@v5` se mantuvo porque ya es compatible.

También se añadieron dos barreras antes del build:

```yaml
- name: Lint source code
  run: npm run lint

- name: Run tests
  run: npm test
```

Referencias consultadas:

- [Retirada de Node 20 en GitHub Actions](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)
- [Checkout](https://github.com/actions/checkout)
- [Setup Node](https://github.com/actions/setup-node)
- [Cache](https://github.com/actions/cache)
- [Upload Pages Artifact](https://github.com/actions/upload-pages-artifact)
- [Deploy Pages](https://github.com/actions/deploy-pages)

## 2. Recuperación del desplazamiento en viewports reducidos

### Diagnóstico

La combinación de `height: 100dvh` y varios `overflow: hidden` impedía acceder
al contenido que excediera la pantalla. Esto podía ocurrir con zoom, texto
ampliado, teclado virtual o ventanas de poca altura.

### Cambios

En `app/globals.css` se realizaron los siguientes ajustes:

- Se eliminó el ancho mínimo global de 320 px.
- `html` y `body` usan `min-height` en lugar de una altura rígida.
- Se mantiene oculto únicamente el desbordamiento horizontal.
- `body` permite `overflow-y: auto`.
- Los contenedores principales usan `min-height: 100dvh`.
- El panel de configuración y la pantalla de juego ya no recortan su contenido.

En una pantalla normal el diseño sigue ocupando como mínimo todo el viewport.
Cuando el contenido necesita más espacio, la página crece y se puede desplazar.

## 3. Eliminación de la compilación obsoleta

### Diagnóstico

La carpeta `out/` ya aparecía en `.gitignore`, pero 40 archivos generados
continuaban registrados en el índice de Git. El JavaScript comprometido contenía
la regla anterior del peaje (`bebe doble`) y un contador de fallos distinto al
código fuente actual.

### Cambios

Se retiró `out/` del índice mediante:

```bash
git rm -r --cached out
```

La operación no borra la carpeta local: únicamente prepara la eliminación de
los artefactos del repositorio. El workflow seguirá generando una carpeta
`out/` nueva antes de cada despliegue y la subirá como artefacto de Pages.

Después del cambio, `git ls-files out` devuelve cero archivos.

## 4. Reinicio de la animación al reemplazar cartas

### Diagnóstico

Una casilla que ya contenía un componente `PlayingCard` conservaba la misma
identidad de React al recibir una carta nueva. Como la clase CSS de animación no
cambiaba, el navegador actualizaba el contenido sin volver a ejecutar la
animación de revelado.

### Cambio

Se añadió una clave dependiente de la carta:

```tsx
<PlayingCard key={card.id} card={card} />
```

Cada carta nueva crea ahora una instancia visual nueva y las animaciones
`card-land` y `card-flip` vuelven a comenzar.

## 5. Pruebas automatizadas añadidas

Se añadió `tsx` como dependencia de desarrollo y el siguiente script:

```json
"test": "node --import tsx --test tests/*.test.ts"
```

El archivo `tests/game.test.ts` contiene seis casos de regresión:

1. Creación de las 52 cartas sin identificadores duplicados.
2. Barajado sin mutar el mazo original ni perder cartas.
3. Recorrido completo con un único peaje hacia delante.
4. Empate en mayor/menor contabilizado como fallo.
5. Fallo que atraviesa el peaje hacia atrás sin duplicar fallos.
6. Modo de dos jugadores: una sola extracción antes del juicio.

## 6. Verificación final

Se ejecutaron correctamente:

```bash
npm run lint
npm test
npx tsc --noEmit
PAGES_BASE_PATH=/peaje npm run build
```

El build de Pages se realizó en una copia aislada para evitar que los archivos
generados modificaran el árbol de trabajo. La comprobación confirmó que:

- La aplicación, la página 404 y `icon.png` se exportan estáticamente.
- Los chunks y el favicon utilizan el prefijo `/peaje`.
- El favicon se declara como PNG de 348 × 348 px.
- El bundle generado no contiene `bebe doble` ni `bebido doble`.
- ESLint y TypeScript no producen diagnósticos.
- Las seis pruebas de regresión terminan correctamente.
- `npm audit` no detectó vulnerabilidades conocidas al instalar la dependencia.

## Archivos principales modificados

- `.github/workflows/deploy-pages.yml`
- `app/game.tsx`
- `app/globals.css`
- `package.json`
- `package-lock.json`
- `tests/game.test.ts`
- `CORRECCIONES_AUDITORIA.md`

Además, la retirada de los archivos registrados bajo `out/` aparecerá como un
conjunto de eliminaciones en Git. Es el resultado esperado y debe incluirse en
el mismo commit.

La sustitución preexistente de `app/favicon.ico` por `app/icon.png` se conservó
y se verificó durante el build, pero corresponde a la petición anterior sobre
el favicon. La modificación preexistente de `next-env.d.ts` y los documentos de
planificación sin seguimiento tampoco formaron parte de estas correcciones.
