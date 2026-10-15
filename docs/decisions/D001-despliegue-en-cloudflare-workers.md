# D001: Despliegue en Cloudflare Workers con assets estáticos

## Estado

Aceptada

## Contexto

El brief fijó hosting gratuito de sitio estático con Cloudflare Pages
como opción por defecto. Al conectar el repositorio, el dashboard de
Cloudflare ya no ofrece el flujo de Pages para proyectos nuevos: la
plataforma unificada es Workers con assets estáticos (Workers Builds).

## Decisión

Desplegamos el sitio como un Worker de Cloudflare que sirve los assets
de `site/dist`, con la configuración versionada en `site/wrangler.jsonc`
y la integración Git (Workers Builds) publicando cada merge a `master`.

## Justificación

Es la vía soportada por el proveedor elegido —Pages queda como producto
legado— y conserva los requisitos: gratuito, CDN global, sin servidor y
publicación continua sin CI propio. Además deja la configuración del
despliegue en el repositorio (nombre del worker, assets, dominio de
producción), mejorando la reproducibilidad respecto a la alternativa de
configurar todo en el dashboard.

## Referencias

- `docs/tasks/002-despliegue-continuo-a-cdn.md`
- `docs/epics/001-sitio-base-del-blog.md`
