# Página 404 servida por Cloudflare

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que una ruta inexistente del sitio responda 404 con la página propia del blog en lugar de la respuesta genérica de Cloudflare. La página ya existe —`site/src/pages/404.astro` compila a `dist/404.html`—, pero `site/wrangler.jsonc` no declara `not_found_handling` en el bloque `assets` y el comportamiento por defecto (`none`) hace que el Worker responda con su 404 genérico, sin servir el archivo.

## Dependencias

- Ninguna

## Entrada

- `site/src/pages/404.astro` y su salida `dist/404.html`, ya versionadas.
- `site/wrangler.jsonc`, donde vive la configuración de assets del Worker (D001).
- La documentación vigente de Workers Static Assets sobre `not_found_handling`.

## Resultado esperado

- `site/wrangler.jsonc` declara `assets.not_found_handling` con el valor que sirve `404.html` con estado 404 (`"404-page"`).
- Verificación de que una ruta inexistente en una URL de preview responde HTTP 404 con el HTML propio; si el comportamiento no aplicara en previews, la desviación y la verificación post-merge quedan registradas en la tarea.
- Ajustes en `404.astro` solo si la verificación los hace necesarios.

## Criterios de calidad

- Una ruta inexistente responde con estado 404 y el cuerpo es la página propia del blog (la salida de `404.astro`), verificable en una URL de preview o en producción.
- Las rutas existentes y el despliegue de producción en `fronteando.dev` y `www.fronteando.dev` no se ven afectados.
- La configuración es reproducible: queda declarada en `wrangler.jsonc`, sin pasos manuales en el dashboard.

## Procedimiento sugerido

1. Añadir `not_found_handling: "404-page"` al bloque `assets` de `site/wrangler.jsonc`.
2. Empujar la rama para disparar el build de Workers Builds y comprobar en la URL de preview que una ruta inventada responde 404 con la página propia.
3. Si la opción no se observa en la preview, verificar tras el deploy —como ocurrió con `preview_urls` en la tarea 009— y registrar la desviación.

## Notas

- La tarea nace de la observación de que el sitio parecía carecer de 404; en realidad la página existe desde el hito del sitio base y solo falta el cableado con Cloudflare. Rediseñar o enriquecer la página queda fuera del alcance: si interesa, es otra tarea.

## Contexto

- Archivos similares: `site/wrangler.jsonc` —el artefacto a modificar: jsonc con comentarios por sección, hoy declara `assets.directory`, `previews`, `preview_urls` y las dos rutas del custom domain—; `site/src/pages/404.astro` —la página que se servirá: usa el layout `Base` con `noindex` y compila a `dist/404.html`—; `docs/tasks/009-urls-de-preview-de-rama.md` —tarea hermana: mismo tipo de cambio, un flag de `wrangler.jsonc` verificado end-to-end contra la URL de preview de Workers Builds—.
- Patrones: la configuración de despliegue vive versionada en el repo, no en el dashboard; el comportamiento del Worker se verifica contra el despliegue real —la URL de preview de la rama—, no con un servidor local.
- Dominio: ninguno —el proyecto no tiene `docs/domains/`—.
- Producto: ninguno —el proyecto no tiene `product-docs/`—.
- PRD: `docs/prd/001-sitio-base-del-blog.md` —CU-3 «Descubrir el sitio» declara «una URL inexistente responde con una página de error acorde al tono del sitio»; la página ya está construida, lo que falta es que el Worker la sirva—.
- Lecciones: `formato-de-codigo-generado` —el `wrangler.jsonc` se edita ya en el estilo del archivo, jsonc con comentarios por sección—.
- Decisiones: `D001-despliegue-en-cloudflare-workers.md` —Worker de assets estáticos con configuración en `wrangler.jsonc` y publicación por Workers Builds; `not_found_handling` entra en su alcance y no exige decisión nueva—.
- Fuente externa: la documentación de Workers Static Assets —`assets.not_found_handling: "404-page"` sirve el `404.html` más cercano con estado `404 Not Found` cuando la ruta no casa ningún asset; es además el ejemplo propio de la guía de framework de Astro—.

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: la página `src/pages/404.astro` compila a `dist/404.html` en la raíz del directorio de assets —la posición exacta que `not_found_handling: "404-page"` busca—, `wrangler.jsonc` es el punto de anclaje con su bloque `assets` ya declarado y la opción está documentada por Cloudflare para este mismo montaje —Astro estático sobre Workers con assets—. La infraestructura de verificación también existe: las builds de rama publican URL de preview (`preview_urls: true`, tarea 009). La única duda abierta —si la build de preview aplica el flag o solo el deploy de producción— es un detalle de verificación con plan alternativo ya previsto en la tarea, no una capacidad ausente.

## Plan técnico

El Worker `fronteando` sirve `site/dist` como assets estáticos y el enrutado lo resuelve la capa de assets de Cloudflare según `wrangler.jsonc`: las rutas que casan un archivo se sirven directas y el resto cae hoy al 404 genérico —`not_found_handling` sin declarar vale `none`—. El cambio es declarativo: un literal en el bloque `assets` hace que esas rutas sirvan `/404.html` —que `astro build` ya genera desde `src/pages/404.astro`— con estado 404. La verificación no corre como test del repo porque el comportamiento vive en la capa de assets desplegada: se comprueba end-to-end contra una versión desplegada.

- [x] Declarar `not_found_handling: "404-page"` en el bloque `assets` de `site/wrangler.jsonc`
  - Aporta: es el cambio completo —convierte el 404 genérico del Worker en la página propia con estado 404 y hace efectivo CU-3—
  - Contexto: el archivo es jsonc con comentarios por sección; el valor es el literal documentado y busca `404.html` en la raíz de `assets.directory`, que el build ya produce
- [x] Verificar el 404 propio en una versión desplegada de la rama
  - Aporta: la evidencia del criterio principal —la página propia sirviéndose con estado 404—, observable solo en el despliegue real
  - Contexto: la URL de preview de Workers Builds es la primera vía; si `wrangler preview` no aplica el flag —precedente de `preview_urls` en la 009— la verificación se traslada tras el merge y queda registrada como desviación

## Suite de pruebas esperada

- Una URL inexistente responde con estado 404 y el cuerpo es la página propia del blog —cabecera del sitio, «Esta página no existe», enlace a la portada— —(O)— CU-3.
- Una URL inexistente anidada —bajo `/articulos/`, por ejemplo— responde igual: 404 con la página propia —(M)— CU-3.
- La respuesta llega como documento HTML completo con `content-type: text/html`, no como el error genérico en texto plano —(I)— CU-3.
- Las rutas existentes —portada, artículos, `rss.xml`— siguen respondiendo 200 con su contenido —regresión— CU-1, CU-2, CU-5.
- La habilitación vive solo en `wrangler.jsonc`, reproducible desde el repo sin pasos en el dashboard —criterio de calidad, sin CU.

## Desviaciones del plan

- **La build de preview de Workers Builds no aplica `not_found_handling`:** el plan preveía verificar en la URL de preview de la rama, pero esa versión —desplegada por `wrangler preview`— responde el «Not found» genérico en las rutas inexistentes mientras `/404` sí sirve la página. Mismo precedente que `preview_urls` en la tarea 009: la configuración solo se aplica con el deploy, no con el preview. Motivo: comportamiento real de Workers Builds. Decisión: verificar e2e con `wrangler versions upload` —equivalente a lo que hará el deploy de producción post-merge, según el precedente de la 009—: en la URL de versión `f80a550d-fronteando.gilmrjc.workers.dev` las rutas inexistentes responden 404 con la página propia y las existentes siguen en 200.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
