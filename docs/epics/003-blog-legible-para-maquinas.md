# Blog legible para máquinas

## Estado

[x] Planificada | [x] Completada

## Objetivo

Cada artículo publicado existe también como documento de texto plano
servido en su propia dirección `.md` —descubrible desde la página—, y
tanto el asistente del lector, al que el protocolo ya lo señala, como
el lector que quiere copiarlo lo consumen sin recomponer la página a
mano.

## Alcance

- **Dentro:** la emisión del `.md` por artículo desde la fuente
  markdown —preámbulo con título y URL canónica, marcas de pausa en
  su posición—, el descubrimiento por `rel="alternate"`, el acceso
  visible para el lector y la ficha del protocolo apuntando al texto
  plano.
- **Fuera:** `llms.txt` y `llms-full.txt`, la negociación de
  contenido, datos estructurados para buscadores, políticas hacia
  rastreadores de IA y las demos ejecutables (idea 004).

## Piezas

- [x] docs/tasks/026-version-markdown-por-articulo.md — versión en
      texto plano de cada artículo
- [x] docs/tasks/027-descubrimiento-y-acceso.md — descubrimiento para
      agentes y acceso para el lector

## Plan técnico

- **Orden:** 026 → 027, estrictamente secuencial.
- **Dependencias:** 027 anuncia, enlaza y apunta a lo que 026 emite;
  la forma exacta de la URL del `.md` sale de 026.
- **Decisiones transversales:**
  - La fuente markdown de la colección es la fuente del `.md` —no el
    HTML renderizado—; nada se escribe dos veces.
  - Las marcas `:::pausa` viajan en el texto plano —el agente que
    acompaña necesita sus posiciones—; el protocolo y la tarjeta no.
  - El opt-out de `agente` no excluye del `.md`: la legibilidad es
    universal.
  - El acceso del lector es universal: presente en toda pieza, con y
    sin acompañamiento declarado.
  - El `.md` se evalúa como prompt (docs/lessons/texto-para-agentes.md):
    el preámbulo identifica título y URL canónica para que el agente
    cite el origen.
  - La pieza visual del acceso sigue `DESIGN.md`; el comportamiento
    esperado del conjunto vive en
    `docs/prd/003-blog-legible-para-maquinas.md`.

## Criterio de cierre

Los tres artículos publicados responden su `.md` servido —contenido
íntegro, preámbulo y pausas en posición—; cada página anuncia su
versión legible; el lector tiene acceso al texto plano en todas las
piezas; y el protocolo generado apunta al `.md`.

## Revisión

- Usuario: 2026-10-25 — Aprueba
