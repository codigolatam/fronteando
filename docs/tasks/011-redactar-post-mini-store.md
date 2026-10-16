# Redactar y publicar el post inaugural: mini-store reactivo en vanilla JS

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
