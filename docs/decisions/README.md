# Decisiones de diseño

<!-- Índice de decisiones de diseño del proyecto. Cada entrada apunta a un
     archivo de decisión y declara sus disparadores —la vía de descubrimiento
     léxico que usa consultar-decisiones—.

     Formato de cada entrada:
     - <archivo-de-la-decisión>.md
       - Disparadores: <archivos, artefactos y palabras clave aplicables>
       - Resumen: <qué decidió el documento en una frase>
       - Estado: <opcional: Sustituida por DNNN | Obsoleta>

     Las entradas nuevas se añaden al final. Gestionado por el skill
     decisiones-diseno. -->

- D001-despliegue-en-cloudflare-workers.md
  - Disparadores: cloudflare, workers, wrangler, deploy, despliegue, wrangler.jsonc, CDN, astro.config
  - Resumen: el sitio se despliega como Worker de assets estáticos en Cloudflare (Workers Builds), no en Pages

- D002-previo-de-articulos-desde-el-cuerpo.md
  - Disparadores: excerpt, previo, more, artículos, portada, índice, frontmatter, description, excerpt.ts
  - Resumen: el previo del índice sale del cuerpo del artículo —antes de `<!--more-->` o el primer párrafo— en texto plano; `description` queda para metadatos y como respaldo
