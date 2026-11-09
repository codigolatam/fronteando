# Página 404 servida por Cloudflare

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
