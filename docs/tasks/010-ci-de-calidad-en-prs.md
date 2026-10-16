# CI de calidad en pull requests con GitHub Actions

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

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

## Contexto

- `Archivos similares:` ninguno — es el primer workflow del repositorio; no existe `.github/`.
- `Patrones:` los scripts de calidad viven en `site/package.json` (`check`, `lint`, `format:check`, `build`); el lockfile es `site/package-lock.json`; `engines.node` exige `>=22.22.0`. Commits por PR con squash a `master`.
- `Dominio:` sin documentación de dominio aplicable — el cambio es infraestructura de CI, no toca el modelo del sitio.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/formato-de-codigo-generado.md` — escribir el YAML nuevo ya en el estilo del formatter del proyecto.
- `Decisiones:` `docs/decisions/D001-despliegue-en-cloudflare-workers.md` — el despliegue sigue siendo de Workers Builds; este workflow solo da señal de calidad, sin paso de deploy.

## Conectividad

**Veredicto: conectada.**

Los cuatro scripts que el workflow invoca existen en `site/package.json`; `site/package-lock.json` existe para `cache-dependency-path`; `gh` está autenticado y el repo remoto es GitHub con rama por defecto `master`. El binding nativo de `@resvg/resvg-js` se instala vía `npm ci` por plataforma — punto a vigilar en el primer run.

## Plan técnico

- [x] `.github/workflows/ci.yml` — workflow `ci`: dispara en `pull_request` y en `push` a `master`; un job `calidad` en `ubuntu-latest` con `defaults.run.working-directory: site`; pasos: `actions/checkout` → `actions/setup-node` (Node 22, `cache: npm` con `cache-dependency-path: site/package-lock.json`) → `npm ci` → cuatro pasos separados: `check`, `lint`, `format:check`, `build`
  - Aporta: señal de CI en cada PR; el paso roto se identifica de un vistazo
  - Contexto: primer workflow del repo; sin secrets; el despliegue sigue siendo de Workers Builds (D001)

Punto a decidir durante la ejecución: activar o no branch protection para exigir el check verde antes del merge — se consulta en la puerta de cierre.

## Suite de pruebas esperada

- El PR de la propia tarea muestra el check `calidad` en verde —(O)
- Un commit temporal que rompa `format:check` produce check rojo en el PR; se revierte antes del merge squash —(O)
- Los logs del run confirman Node 22.x y cache de npm efectivo —(O)
- Tras el merge, el push a `master` dispara el workflow —(O)

## Desviaciones del plan

- Se añadieron `concurrency` (grupo por workflow+ref con cancel-in-progress) y `timeout-minutes: 10` al job — observaciones menores de la revisión técnica, aplicadas por coste casi nulo.
- Los cuatro pasos secuenciales se reemplazaron por un job por check vía  con  — decisión del usuario en la puerta de ejecución: un fallo ya no enmascara al resto y el PR muestra un check independiente por script.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
