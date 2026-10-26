# Descubrimiento para agentes y acceso para el lector

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Hacer que la versión en texto plano se descubra sola —el agente que
llega a una página encuentra su `.md` sin intervención—, que el
protocolo de acompañamiento señale al asistente esa versión en lugar
de la página HTML, y que el lector tenga un acceso visible para ver o
copiar el texto plano del artículo.

## Dependencias

- 026 — produce las versiones en texto plano que se anuncian,
  se enlazan y se ofrecen.

## Entrada

- La especificación de descubrimiento en llmstxt.org, resumida en
  `docs/research/2026-10-version-legible-para-maquinas.md`:
  `rel="alternate" type="text/markdown"` hacia la versión en texto
  plano, como elemento `<link>` de la página.
- La práctica del mercado para el lector: «copiar/ver markdown» junto
  al artículo (PostHog, Expo, Cloudflare).
- `site/src/pages/articulos/[...id].astro` y los componentes del
  artículo —donde viven los metadatos y la superficie junto al texto—.
- DESIGN.md — la afordancia debe salir de los tokens de la guía.
- El protocolo de acompañamiento (`site/src/utils/accompaniment.ts`):
  su ficha hoy apunta a la URL HTML del artículo.

## Resultado esperado

- Cada página de artículo declara en sus metadatos el enlace a su
  versión en texto plano (`rel="alternate" type="text/markdown"`).
- El lector encuentra en el artículo un acceso visible a la versión
  en texto plano —verla o copiarla—, presente en todas las piezas,
  tengan o no acompañamiento.
- El protocolo de acompañamiento señala al asistente la versión en
  texto plano del artículo, no la página HTML: el agente que recibe el
  protocolo consume la fuente limpia, con las pausas en su posición.
- La afordancia visible sigue la guía de estilo.

## Criterios de calidad

- El elemento de descubrimiento aparece en cada artículo con la URL
  correcta.
- El acceso para el lector funciona con y sin acompañamiento declarado
  —no depende de la tarjeta—.
- El protocolo generado apunta a la URL `.md` y la suite de pruebas lo
  refleja.
- `check`, `lint`, `test` y `build` en verde; el descubrimiento se
  verifica en el HTML servido y la afordancia con evidencia
  renderizada.

## Procedimiento sugerido

1. Emitir el elemento de descubrimiento en la página del artículo.
2. Apuntar la ficha del protocolo a la versión en texto plano.
3. Diseñar y colocar la afordancia del lector —ubicación y forma según
   la guía—.
4. Verificar en el navegador y en el protocolo compuesto.

## Notas

- Si la afordancia para el lector resulta más simple como un enlace
  discreto junto a los metadatos del artículo que como parte de la
  nota de acompañamiento, esa es la opción: la nota solo existe en
  piezas acompañadas y el acceso debe ser universal.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
