# Versión en texto plano de cada artículo

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Emitir, junto a cada artículo publicado, su versión en texto plano
consumible por agentes: la fuente markdown del artículo servida en su
misma dirección terminada en `.md`, con un preámbulo breve que
identifique la pieza, generada al publicar el sitio a partir de la
misma fuente que produce la página.

## Dependencias

- Ninguna.

## Entrada

- La colección `articulos` y su esquema de declaración
  (`site/src/content/`, `site/src/content.config.ts`).
- La investigación
  `docs/research/2026-10-version-legible-para-maquinas.md` — el
  patrón del mercado: la URL del artículo terminada en `.md`, el
  contenido fuente sin chrome y un preámbulo con título y URL
  canónica.
- EDITORIAL.md — las marcas `:::pausa` que sí viajan en el texto
  plano, en su posición de lectura.

## Resultado esperado

- Cada artículo responde en `/articulos/<id>.md` (o la variante de la
  convención que decida el plan: `<id>/index.md`) con el contenido de
  la pieza en texto plano.
- El texto plano abre con un preámbulo breve —título y URL canónica—
  para que el agente identifique y cite el origen.
- Las marcas de pausa viajan en el texto plano, en su posición de
  lectura: el protocolo dice qué verificar en cada pausa, pero solo
  el texto sabe dónde cae cada una —sin ellas el agente que acompaña
  no sabe cuándo detener al lector—.
- El resto del material de acompañamiento no viaja: ni el protocolo
  ni la tarjeta forman parte de la versión en texto plano.
- Todos los artículos lo producen, incluidos los que declaran
  `agente: false`: el opt-out es del acompañamiento, no de la
  legibilidad.
- La generación ocurre al publicar el sitio, a partir de la fuente
  markdown de la colección —no del HTML renderizado—.

## Criterios de calidad

- El texto plano reproduce el artículo íntegro: encabezados, código,
  listas y enlaces llegan como en la fuente.
- Las marcas `:::pausa` aparecen en su posición de lectura, en la
  forma del fuente; ningún otro material de acompañamiento se cuela
  en la salida.
- El preámbulo identifica título y URL canónica sin duplicar el
  cuerpo.
- Una pieza nueva publicada produce su `.md` sin pasos extra.
- `check`, `lint`, `test` y `build` en verde; la salida se verifica
  servida, no solo generada.

## Procedimiento sugerido

1. Definir el mecanismo de emisión —endpoint de la colección o
   archivos estáticos en build— y la forma exacta de la URL.
2. Definir el preámbulo —campos y formato— sobre la fuente del
   artículo, conservando las marcas de pausa.
3. Verificar cada artículo publicado servido en su `.md`.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
