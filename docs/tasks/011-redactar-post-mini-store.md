# Redactar y publicar el post inaugural: mini-store reactivo en vanilla JS

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Escribir el primer artículo técnico del blog —construir un store reactivo paso a paso en vanilla JS— y publicarlo en la colección de artículos.

## Dependencias

- Ninguna

## Entrada

- El plan de redacción aprobado en `docs/ideas/006-post-mini-store-reactivo.md`, sección «Plan de redacción»: audiencia, promesa, ejemplo conductor y arco de seis pasos.
- El código ya verificado en la prueba de concepto de la propuesta: `signal` + `effect` con auto-registro y `store` sobre `Proxy` funcionan en Node.
- La colección `articulos` con su frontmatter validado y `hola-fronteando.md` como referencia de formato.
- `DESIGN.md` como contrato de tono y la lección `flujo-de-escritura`: la ronda completa es `revisar-redaccion` y luego `pulir-escritura`.

## Resultado esperado

- `site/src/content/articulos/<slug>.md` publicado —sin `draft` o con `draft: false`— con frontmatter completo, el arco del plan de redacción y todo su código ejecutable tal como aparece.
- El post aparece en la portada, en el feed RSS y con su tarjeta OG generada — todo lo que el sitio ya produce por artículo.

## Criterios de calidad

- Cada fragmento de código del post corre tal cual está escrito — verificado ejecutándolo antes de incluirlo.
- El post sigue el arco aprobado: gancho → suscripción manual → `efectoActivo` → `store` con `Proxy` → límites honestos → cierre que puentea a la serie de patrones.
- La ronda de escritura completa corre antes de cerrar: `revisar-redaccion` y `pulir-escritura`, en ese orden.
- `check`, `lint`, `format:check` y `build` en verde; el artículo navegable desde la portada y presente en el feed.

## Procedimiento sugerido

1. Verificar cada fragmento de código ejecutándolo en Node antes de incluirlo en el texto.
2. Redactar el artículo siguiendo el arco aprobado; tono de la casa: denso en contenido, sin relleno.
3. Correr la ronda de escritura completa sobre el borrador.
4. Verificar el renderizado en el dev server, su entrada en portada, el feed y la tarjeta OG generada.

## Notas

- Es el primer post técnico: define el tono de los que siguen. Va sin bootstrap ni checkpoints a propósito — la reescritura con las estructuras de acompañamiento llega con la línea 002.
- Slug sugerido: `un-store-reactivo-en-vanilla-js` (o el que mejor le quede al título final).

## Contexto

- `Archivos similares:` `site/src/content/articulos/hola-fronteando.md` — modelo de frontmatter (title, description, date, tags) y de tono de la casa.
- `Patrones:` la colección `articulos` valida frontmatter con Zod; el previo del índice sale del cuerpo antes de `<!--more-->` (D002); portada, RSS y tarjeta OG absorben el artículo automáticamente en build.
- `Dominio:` sin documentación de dominio aplicable — es contenido.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre `revisar-redaccion` y luego `pulir-escritura`; `docs/lessons/formato-de-codigo-generado.md` — el archivo nuevo se escribe ya en el estilo del formatter.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el previo sale del cuerpo; `<!--more-->` tras el párrafo de gancho.

## Conectividad

**Veredicto: conectada.**

La colección `articulos` y todo lo que consume un artículo —página, portada, RSS, tarjeta OG— existen y funcionan. El código del post ya está verificado en Node durante el refinamiento de la propuesta. El artículo es un archivo Markdown nuevo: no necesita infraestructura adicional.

## Plan técnico

- [x] `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` — el artículo completo siguiendo el arco aprobado (gancho → suscripción manual → `efectoActivo` → `store` con `Proxy` → límites honestos → cierre-puente); cada fragmento de código verificado ejecutándolo en Node antes de incluirlo; `<!--more-->` tras el párrafo de gancho para el previo; ronda de escritura completa (`revisar-redaccion` + `pulir-escritura`)
  - Aporta: el primer contenido técnico del blog, publicado
  - Contexto: un solo archivo nuevo en la colección; portada, RSS y tarjeta OG lo absorben solos

## Suite de pruebas esperada

- `check` / `lint` / `format:check` / `build` en verde —(B)
- Cada snippet del post corre tal cual en Node —(B)
- El artículo aparece en portada con su previo, en el feed y con su OG —(B/O)
- Evidencia renderizada de la página en ambos temas —(O)

## Revisión

- Subagente: 2026-10-16 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
