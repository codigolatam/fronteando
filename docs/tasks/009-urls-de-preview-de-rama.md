# URLs de preview de rama

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
