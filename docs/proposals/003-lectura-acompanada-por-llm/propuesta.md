# Lectura acompañada por LLM: el puente entre el artículo y el asistente del lector

## Estado

[ ] Borrador | **[p] Pendiente de revisión** | [a] Aprobada | [d] Descartada

## Problema

Muchos lectores de Fronteando ya aprenden con un LLM al lado, pero el
artículo y el asistente viven desconectados: quien quiere profundizar
tiene que improvisar cada vez —copiar trozos, explicar de qué va el
texto, pedir que le hagan preguntas— porque el artículo no le da
estructura para hacerlo. El resultado es un acompañamiento pobre y a la
medida de cada quien, cuando la misión del blog es que el lector
entienda de verdad, no solo que vea cómo se hace algo.

Al autor le pasa lo simétrico: si quisiera ofrecer ese acompañamiento
hoy, tendría que reinventar las instrucciones en cada artículo,
repitiendo lo que es igual para todos.

## Oportunidad

Resolverlo convierte el acompañamiento en una práctica declarada y
común —el lector profundiza con estructura en vez de improvisar, y el
autor escribe solo lo propio de cada artículo—. Supera a la alternativa
actual, la improvisación manual con copiar y pegar, en estructura y
consistencia; esta solo gana en que no exige nada del blog. Es además el
diferenciador editorial: hace a Fronteando reconocible y honesto con
cómo aprende su audiencia.

## Forma de solución

Cada artículo lleva consigo la manera declarada de leerlo acompañado:
quien lee encuentra junto al texto el material para iniciar la lectura
con el asistente de su preferencia y recorre el contenido deteniéndose
donde el texto lo indica para contrastar lo que entendió. Categoría:
flujo nuevo — hoy ese recorrido no existe en el producto.

## Solución

Para el lector: al abrir un artículo, una tarjeta al inicio ofrece
leerlo acompañado con un texto listo para copiar —el protocolo— y, como
comodidad, un enlace que abre su asistente con ese texto ya precargado.
Al pegarlo, el asistente conoce su rol (acompañar, no dar la clase), las
reglas y las pausas del artículo. El lector lee normal y, al llegar a
cada marca de pausa, vuelve al chat para verificar comprensión, pedir
otro ejemplo o seguir.

Para el autor: escribe el artículo igual que hoy, más una declaración
pequeña —tema, nivel del lector, prerequisitos— y las pausas marcadas
dentro del propio texto donde ocurren, de modo que viajen con el
contenido al editar.

Las instrucciones comunes —rol del asistente y reglas— se escriben una
sola vez en el sitio; la declaración propia viaja con los metadatos de
cada artículo; el sitio compone ambas al publicar y produce la tarjeta,
el texto del protocolo y las marcas. Nada se duplica y todo queda
declarado, no en prosa suelta.

La declaración incluye la opción explícita de no acompañar —opt-out—
para las piezas que no se benefician del agente, como las de categoría
`meta`: así «sin tarjeta» puede ser una decisión editorial declarada,
no solo la ausencia de metadatos.

## Alternativas consideradas

- Solo convención editorial — cada artículo escribe a mano su sección de
  acompañamiento: se descarta porque deja la improvisación donde estaba,
  repite lo común en cada texto y nada queda declarado de forma que el
  sitio pueda componer ni la línea de máquinas consumir.
- Asistente propio embebido en la página: se descarta porque sustituye
  al asistente del lector, cuando la premisa es «el asistente de su
  preferencia», y multiplica el alcance mucho más allá del problema.
- Enlaces directos a asistentes concretos como forma principal: se
  descarta como forma porque acopla a proveedores y cubre solo el
  arranque, no la lectura con pausas; quedan como comodidad dentro de la
  forma elegida.

## Fuera de alcance

- Elegir o alojar el asistente: ningún chat embebido ni integración
  obligatoria con proveedores.
- Las salidas legibles por máquinas (`.md`, `llms.txt`): el esquema que
  esta línea defina es su entrada, pero producirlas es la idea 003.
- Las demos ejecutables (idea 004) y cualquier otra forma de enriquecer
  el artículo.
- Telemetría o medición de cuántos lectores usan el acompañamiento.

## Investigaciones de apoyo

- `docs/research/2026-10-enlaces-precargados-a-asistentes.md` — los
  enlaces precargados existen pero son no documentados, limitados a
  ~6k/10k caracteres y sin auto-envío garantizado: se ofrecen como
  comodidad sobre el camino principal, que es copiar el protocolo.

## Borradores

- `01-declaracion-y-protocolo-comun.md` — definir la declaración por
  artículo y escribir el protocolo común
- `02-composicion-del-material.md` — componer el protocolo completo por
  artículo (depende de 01)
- `03-experiencia-en-pagina.md` — tarjeta, marcas de pausa y enlaces en
  el artículo (depende de 01, 02)
- `04-adaptar-el-corpus.md` — declarar el acompañamiento en los posts
  publicados (depende de 03)

## Revisión

- Usuario: [fecha] — [Aprueba | Solicita cambios | Rechaza]
