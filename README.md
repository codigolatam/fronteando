# Fronteando

Blog técnico de desarrollo web frontend —CSS, JavaScript, frameworks,
accesibilidad, rendimiento y todo lo que ocurre del lado del navegador—
diseñado para leerse con un LLM de acompañamiento.

## Qué es

Más que una colección de tutoriales, Fronteando es un espacio donde
conviven la tecnología y el aprendizaje: un medio de información útil
que no solo muestra cómo se hace algo, sino que ayuda a que el lector
realmente lo entienda.

## Lectura acompañada por LLM

La línea editorial asume una realidad: muchos lectores ya usan LLMs
(ChatGPT, Claude, etc.) como herramienta de aprendizaje. Los artículos
están diseñados para navegarse con el asistente que el lector prefiera —
el sitio no integra un chatbot, sino que ofrece un protocolo que el
lector ejecuta por su cuenta, en dos capas:

- **Protocolo de inicio (bootstrap):** un bloque al comienzo del
  artículo que el lector pega una sola vez en su LLM. Establece el rol
  del asistente —compañero de lectura— y sus reglas: pausar en los
  checkpoints, verificar comprensión antes de avanzar, profundizar solo
  cuando el lector lo apruebe.
- **Checkpoints:** marcadores distribuidos a lo largo del texto, cada
  uno con su prompt sugerido («hazme un quiz de esta sección»,
  «explícame la diferencia con un ejemplo»). El lector menciona el
  número del checkpoint o pega la instrucción.

El artículo es el punto de partida y el LLM la forma de profundizar:
preguntar, pedir otro ejemplo, explorar una tangente, verificar que se
entendió.

## Una fuente, varias salidas

Las instrucciones de acompañamiento se definen una sola vez a nivel de
sitio; cada artículo solo declara lo propio: sus checkpoints y su
contexto (tema, nivel del lector, prerequisitos). De esa fuente única se
generan:

- La **card de acompañamiento** al inicio del artículo, con el bootstrap
  listo para copiar y acciones para abrir la conversación en ChatGPT o
  Claude con el contexto precargado.
- Los **bloques de checkpoint** intercalados en el texto, copiables
  individualmente.
- Una **versión en texto plano** (`.md`) de cada artículo, con el
  bootstrap y los checkpoints embebidos en orden de lectura —para pegar
  completa en un LLM o para que un agente la lea directamente.
- Un **índice del sitio** (`llms.txt`) que describe qué es Fronteando y
  qué artículos existen.

Así se cubren dos caminos: el lector que copia a su propio ritmo y el
agente que llega al artículo y encuentra el protocolo completo.

## Stack

- **Sitio estático:** los artículos viven en Markdown en este
  repositorio —con historial y revisión antes de publicar— y se
  compilan a HTML servido desde una CDN (Cloudflare Pages, Netlify o
  similar), sin servidor ni base de datos que mantener.
- **Generador: Astro.** Permite mezclar texto con componentes
  interactivos (demos embebidas, cards de acompañamiento), declara el
  contenido con esquema validado —cada post define sus checkpoints en
  campos estructurados— y produce las versiones `.md`, el `llms.txt` y
  las cards en build time, sin costo por visita.
- **Newsletter desacoplada:** servicio independiente (Buttondown,
  MailerLite, Listmonk u otro), integrado por formulario y
  automatizable por RSS; cambiar de proveedor no toca el blog.

