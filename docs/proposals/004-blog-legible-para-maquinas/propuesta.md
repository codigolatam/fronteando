# Blog legible para máquinas: el contenido consumible por agentes

## Estado

[ ] Borrador | [p] Pendiente de revisión | **[a] Aprobada** | [d] Descartada

## Problema

Cada artículo de Fronteando se publica únicamente como una página
pensada para el ojo humano. Cuando el lector quiere llevarse el texto
completo a su asistente —que es justo lo que la lectura acompañada le
propone al inicio de cada pieza— lo que puede copiar es la página tal
como se ve: el contenido llega mezclado con la interfaz, sin una forma
estable, y el material de acompañamiento (las pausas con sus
indicaciones) no viaja en el orden de lectura que el protocolo espera.
Llevar el artículo completo a la conversación exige recomponer a mano
lo que la página ya sabe.

Afecta también al agente que llega al sitio por su cuenta —un
asistente que navega, un rastreador, una herramienta que indexa—: no
encuentra el contenido en una forma que pueda consumir ni una
descripción legible de qué es Fronteando y qué artículos hay. Hoy la
web entera habla a personas; para las máquinas que cada vez leen más
por ellas, el sitio es opaco.

## Oportunidad

Resolverlo haría que cada artículo existiera también en una forma
pensada para llevarse completa a una conversación —con su
acompañamiento en orden de lectura— y que el sitio se presentara ante
los lectores automáticos declarando qué es y qué contiene. Supera a
las alternativas actuales: copiar desde la página, que pierde
estructura y orden, y el canal de suscripción, que anuncia las
entregas pero no publica el contenido en forma consumible. Y habilita
el segundo camino del acompañamiento: junto al lector que copia a su
ritmo, el agente que llega directo encuentra el material completo.

## Forma de solución

Cada artículo existe también como documento de texto plano en su
propia dirección —la misma URL del artículo terminada en `.md`— con el
contenido de la pieza tal como viaja a una conversación. La página
anuncia su versión legible para que el agente la descubra solo, el
protocolo de acompañamiento apunta a ella para que el asistente
consuma la fuente limpia y el lector tiene dónde tomarla sin copiar
la página a mano. Categoría: flujo nuevo — hoy no hay camino dentro
del producto para llevarse el artículo completo en forma consumible.

## Solución

El sitio emite, junto a cada artículo, su versión en texto plano: la
fuente markdown del artículo con un preámbulo breve que identifica
título y URL canónica, servida en la misma dirección del artículo
terminada en `.md`. Las marcas de pausa viajan en el texto plano —
el protocolo dice qué verificar en cada pausa, pero solo el texto
sabe dónde cae cada una—; lo que no viaja es el resto del material
de acompañamiento, que sigue viviendo en la página y en el protocolo
que de ella se copia.

Cada página de artículo anuncia su versión legible en sus metadatos,
para que el agente la descubra sin intervención del lector, y ofrece
al lector un acceso para ver o copiar el texto plano. El protocolo de
acompañamiento señala al asistente la versión en texto plano, no la
página HTML: quien acompaña consume la fuente limpia, con las pausas
en su posición. Todo se genera al publicar el sitio, a partir de la
misma fuente que produce las páginas: nada se escribe dos veces.

## Alternativas consideradas

- Acción de copiado en la página (cambio de UX): un botón que copie el
  artículo serializado al portapapeles. Se descarta porque resuelve
  solo la mitad humana del problema —el agente que llega por su cuenta
  sigue sin encontrar nada— y porque lo copiado sería la página
  recomponiendo a mano.
- Usar los canales existentes (RSS y sitemap) como vía legible: se
  descarta porque anuncian y localizan entregas, pero no presentan el
  sitio ni publican el artículo completo; un agente que busca «qué es
  esto y qué hay» no lo encuentra en un feed de suscripción.
- Dejarlo a herramientas externas: que el lector o el agente conviertan
  la página por su cuenta. Se descarta porque el blog pierde el
  control sobre lo que el asistente recibe —el contenido se degrada al
  convertir la página— y contradice la misión de que el contenido sea
  ejemplar en lectura con LLM.
- La declaración del sitio (`llms.txt`) como pieza de la forma: la
  convención está adoptada por quienes publican —Anthropic, Stripe,
  Vercel, PostHog, Cloudflare la sirven hoy— pero ningún proveedor de
  LLM confirma consumirla y la medición disponible muestra que casi
  nadie la solicita. Se descarta por beneficio no demostrado; su
  coste de entrada futura es bajo si la evidencia cambia.
- La negociación de contenido (`Accept: text/markdown`) como pieza de
  la forma: el proveedor de despliegue la ofrece activable, pero es
  complemento de red sobre la forma publicada, no una capacidad del
  producto; queda como opción operativa evaluable aparte.

## Fuera de alcance

- La declaración del sitio para máquinas (`llms.txt`) y la
  compilación única del corpus (`llms-full.txt`): descartadas por
  consumo no demostrado; se reconsideran si la evidencia cambia o el
  catálogo crece.
- La negociación de contenido en el proveedor.
- El material de acompañamiento en el texto plano, salvo las marcas de
  pausa: el protocolo y la tarjeta no viajan en esa forma.
- Otras serializaciones del contenido (JSON, API de contenido).
- Datos estructurados para buscadores (JSON-LD, Schema.org) ni
  políticas hacia rastreadores de IA.
- Demos ejecutables dentro del contenido: es la idea 004.

## Investigaciones de apoyo

- `docs/research/2026-10-version-legible-para-maquinas.md` — cómo
  exponen hoy los sitios la versión para humanos y la versión para
  agentes: `llms.txt`, `.md` por página, descubrimiento y negociación.

## Borradores

- `docs/tasks/026-version-markdown-por-articulo.md` — versión en texto plano de cada artículo
- `docs/tasks/027-descubrimiento-y-acceso.md` — descubrimiento para agentes y acceso para el lector (depende de 026)

## Revisión

- Usuario: 2026-10-25 — Solicita cambios
- Usuario: 2026-10-25 — Aprueba

