# URLs de preview de rama

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que cada build de rama en Cloudflare Workers Builds produzca una URL de preview accesible, de modo que un pull request se pueda revisar renderizado antes de fusionarlo. Hoy el preview se despliega pero responde «no active URLs» —la configuración de `wrangler.jsonc` no la habilita—.

## Dependencias

- 002

## Entrada

- El despliegue continuo con Workers Builds ya funcionando (tarea 002).
- El log del build de la rama `tarea/004-tema-base-y-layout`, donde `wrangler preview` despliega correctamente pero declara «This Preview deployment has no active URLs» y sugiere las dos vías de habilitación.

## Resultado esperado

- `site/wrangler.jsonc` actualizado para habilitar las URLs de preview —`preview_urls: true` para el subdominio `workers.dev`, o `previews_enabled: true` en la ruta del custom domain para un subdominio de `fronteando.dev`—.
- Un push a una rama de trabajo produce una URL de preview que sirve el sitio compilado.
- La vía elegida y su motivo quedan registrados en la tarea.

## Criterios de calidad

- El log del build de una rama lista una URL de preview activa y la URL responde 200 sirviendo el sitio.
- El despliegue de producción en `www.fronteando.dev` no se ve afectado.
- La configuración es reproducible: queda declarada en `wrangler.jsonc`, sin pasos manuales en el dashboard.

## Procedimiento sugerido

1. Elegir la vía —`preview_urls` con `workers.dev` (más simple, sin tocar DNS de producción) frente a `previews_enabled` en la ruta del custom domain (subdominio propio)— y registrar la decisión.
2. Actualizar `site/wrangler.jsonc` y empujar a una rama para disparar el build.
3. Verificar que el log declara una URL de preview y que responde con el sitio.

## Notas

- La advertencia del log indica que `wrangler preview` está en beta abierta; si la opción elegida cambia de nombre conviene verificarla contra la documentación vigente de Wrangler.

## Contexto


- Archivos similares: `site/wrangler.jsonc` —el artefacto a modificar: ya declara worker, assets, `previews: {}` y la ruta del custom domain de producción—.
- Patrones: la configuración de despliegue vive versionada en el repo, no en el dashboard; el build de rama corre `npx wrangler preview` y ya sube los assets —solo falta que el despliegue exponga URL—.
- Dominio: ninguno —el proyecto no tiene `docs/domains/`—.
- Producto: ninguno —el proyecto no tiene `product-docs/`—.
- PRD: `docs/prd/001-sitio-base-del-blog.md` —las URLs de preview son tooling del flujo de revisión, no comportamiento del producto; ningún CU las declara—.
- Lecciones: `formato-de-codigo-generado` —el `wrangler.jsonc` se edita ya en el estilo del archivo (jsonc con comentarios por sección)—.
- Decisiones: `D001-despliegue-en-cloudflare-workers.md` —fija Worker con assets y config en `wrangler.jsonc`; la habilitación de previews entra en su alcance, no exige ADR nuevo—.
- Fuente externa: el propio build de `wrangler preview` documenta las dos vías —`preview_urls: true` (workers.dev) y `previews_enabled` en la ruta (subdominio propio)—.

## Conectividad


**Veredicto:** conectada.

Todo lo que la tarea asume existe: el worker `fronteando` despliega por Workers Builds, `wrangler preview` ya sube los assets de la rama —el log lo demuestra— y `wrangler.jsonc` es el punto de anclaje documentado por el propio comando para habilitar la URL. La única decisión abierta —workers.dev frente a subdominio propio— es una elección de implementación dentro del alcance, no una dependencia externa.

## Plan técnico


`site/wrangler.jsonc` ya orquesta el deploy —Worker, assets, `previews: {}` y la ruta del custom domain de producción—; `wrangler preview` sube los assets de la rama pero no expone URL porque la habilitación falta. La vía elegida es `preview_urls: true` —workers.dev—: la alternativa `previews_enabled` en la ruta generaría previews en `*.www.fronteando.dev`, más superficie sobre el dominio de producción sin beneficio para previews internas.

- [ ] Añadir `"preview_urls": true` a `site/wrangler.jsonc`
  - Aporta: cada build de rama expone `https://<preview>-fronteando.gilmrjc.workers.dev` —previews navegables para revisar PRs renderizados—
  - Contexto: `preview_urls` es un flag de nivel raíz, hermano de `routes`, no una propiedad del objeto route
- [ ] Verificar end-to-end: el push de esta misma rama dispara el build de preview y la URL declarada en el log responde 200
  - Aporta: la evidencia del criterio «URL de preview activa», verificada con el cambio en vuelo
  - Contexto: el build lo corre Workers Builds remoto; la URL la reporta el log —no hay comando local que la consulte—

## Suite de pruebas esperada


- El log del build de la rama declara una URL de preview activa —(I).
- La URL de preview responde 200 sirviendo el sitio compilado —(O).
- `www.fronteando.dev` sigue sirviendo producción sin cambios —regresión (B).
- La habilitación vive solo en `wrangler.jsonc`, reproducible desde el repo —(B).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
