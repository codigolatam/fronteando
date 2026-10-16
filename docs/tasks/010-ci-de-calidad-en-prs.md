# CI de calidad en pull requests con GitHub Actions

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Correr automáticamente la suite de calidad del sitio —`astro check`, `lint`, `format:check` y `build`— en cada pull request, para que la puerta de ejecución tenga señal de CI además de la verificación local del agente.

## Dependencias

- Ninguna

## Entrada

- Los scripts de calidad ya definidos en `site/package.json`: `check`, `lint`, `format:check`, `build`.
- El sitio vive en `site/` — el workflow corre dentro de ese directorio.
- El proyecto usa Node ≥ 22 (requisito de Astro 7 y del binding de resvg-js).

## Resultado esperado

- `.github/workflows/ci.yml` que corre `check`, `lint`, `format:check` y `build` sobre `site/` en `pull_request` y en `push` a `master`.
- Los checks aparecen en los PRs: verde si la suite pasa, rojo si falla.

## Criterios de calidad

- El workflow corre en un PR de prueba —o en el propio PR que lo introduce— y reporta verde.
- Un fallo de `lint` o `check` se refleja como check rojo en el PR.
- Usa la versión de Node del proyecto y cachea `node_modules` (`actions/setup-node` con `cache: npm` y `cache-dependency-path` apuntando a `site/package-lock.json`).
- Sin secrets ni configuración extra: la suite corre con `npm ci` y los scripts existentes.

## Procedimiento sugerido

1. Crear `.github/workflows/ci.yml` con trigger `pull_request` + `push` a `master`, `defaults.run.working-directory: site`, `setup-node` con Node 22 y cache npm.
2. Instalar con `npm ci` y correr `npm run check`, `npm run lint`, `npm run format:check`, `npm run build` como pasos separados para que el check roto se identifique de un vistazo.
3. Verificar en el PR de la propia tarea que los checks aparecen y pasan.
4. Decidir con el usuario si se activa branch protection para que el merge exija checks verdes —fuera del alcance mínimo, pero es el paso que hace la señal obligatoria.

## Notas

- Workers Builds ya construye y despliega cada rama; este workflow cubre la señal de calidad, no el despliegue.
- El build incluye la generación de imágenes OG con `@resvg/resvg-js`: el runner necesita el binding nativo, que npm resuelve por plataforma —sin pasos extra esperados, pero es el punto a vigilar si el build falla en CI.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
