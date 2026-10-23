# PRD — Lectura acompañada por LLM

El artículo y el asistente del lector viven desconectados: este conjunto
entrega la forma declarada de leer cada artículo acompañado —un
protocolo listo para llevarse al asistente propio y pausas señaladas en
el texto— para que profundizar deje de ser la improvisación de cada
quien.

## Usuarios

- **El lector acompañado:** lee el artículo con el asistente de su
  preferencia al lado.
- **El lector sin asistente:** lee el mismo artículo sin que nada
  estorbe.
- **El autor:** declara el acompañamiento de cada artículo que escribe.

## Casos de uso

- **CU-1 — Iniciar la lectura acompañada:** el lector abre un artículo
  con acompañamiento, encuentra la tarjeta al inicio y copia el
  protocolo a su asistente; la conversación arranca sabiendo el rol,
  las reglas y las pausas del artículo.
  - Variante: un enlace abre el asistente con el protocolo ya cargado,
    sin copiar nada.
  - Borde: si el protocolo excede lo que el enlace puede transportar,
    el camino es copiar — nunca un enlace roto.
- **CU-2 — Leer con pausas:** el lector recorre el artículo y, al
  llegar a una marca de pausa, vuelve a su asistente para contrastar lo
  entendido —verificación, otro ejemplo o seguir— antes de continuar.
- **CU-3 — Leer sin acompañamiento:** el lector abre un artículo sin
  declaración o con opt-out y lo lee igual que hoy: ninguna tarjeta ni
  marca aparece.
- **CU-4 — Declarar el acompañamiento:** el autor escribe un artículo,
  declara su contexto y marca las pausas en el texto donde ocurren; el
  sitio produce el material completo sin que el autor repita las
  instrucciones comunes.
  - Variante: el autor declara el opt-out cuando la pieza no se
    beneficia del agente.

## Comportamiento esperado

- **Presencia del acompañamiento:** un artículo muestra tarjeta y
  marcas solo cuando lo declara; la ausencia de declaración y el
  opt-out producen la página de siempre, y el opt-out queda
  distinguible como decisión.
- **Protocolo:** el texto que el lector se lleva incluye las
  instrucciones comunes, el contexto del artículo y sus pausas en orden
  de lectura; se copia en un gesto.
- **Enlaces a asistentes:** cuando el protocolo cabe en el límite del
  proveedor, el enlace abre una conversación nueva con el texto
  precargado; cuando no cabe o el mecanismo falla, copiar sigue
  funcionando.
- **Pausas:** las marcas aparecen junto al contenido al que pertenecen
  y viajan con él al editar; son distinguibles sin depender solo del
  color.

## Criterios de éxito

- Un lector puede llevarse el acompañamiento de un artículo publicado a
  su asistente sin editar ni improvisar el texto.
- Los artículos técnicos publicados presentan el acompañamiento; el
  post de presentación declara su opt-out.
- Quien escribe un artículo nuevo declara solo lo propio; lo común
  cambia en un solo lugar para todos.

## Fuera de alcance

- Elegir o alojar el asistente del lector: ningún chat embebido ni
  integración obligatoria con proveedores.
- Las salidas legibles por máquinas (idea 003) y las demos ejecutables
  (idea 004).
- Medir cuántos lectores usan el acompañamiento.
- Que la conversación ocurra dentro de la página del blog: tiene lugar
  en el asistente del lector.
