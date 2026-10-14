# Brief — Fronteando

## ¿Qué es Fronteando?

Fronteando es un blog técnico enfocado en desarrollo web frontend: CSS, JavaScript, frameworks, accesibilidad, rendimiento y todo lo que ocurre del lado del navegador.

Pero más que una colección de tutoriales, Fronteando es un espacio donde conviven la tecnología y el aprendizaje. La misión es ser un medio de información útil — no solo mostrar cómo se hace algo, sino ayudar a que el lector realmente lo entienda.

## La línea editorial: leer con un LLM de acompañamiento

Fronteando asume una realidad: muchos lectores ya usan LLMs (ChatGPT, Claude, etc.) como herramienta de aprendizaje. En lugar de ignorarlo, la línea editorial lo incorpora.

Los artículos están diseñados para navegarse con un LLM de acompañamiento: cada post incluye material pensado para que el lector lo use con el asistente de su preferencia — contextos, prompts sugeridos y rutas de exploración. El sitio no tiene un chatbot integrado: lo que ofrece son pasos y contenido para lectores que usan LLMs por su cuenta.

La idea es que el artículo sea el punto de partida y el LLM sea la forma de profundizar: preguntar, pedir otro ejemplo, explorar una tangente, verificar que se entendió.

### Cómo funciona el acompañamiento

El LLM no sabe en qué parte del artículo está el lector — no existe un canal entre la página y el chat — así que el acompañamiento funciona como un protocolo que el lector ejecuta, con dos capas:

- **Protocolo de inicio (bootstrap)**: un bloque al comienzo del artículo que el lector pega una sola vez en su LLM. Establece el rol ("actúa como compañero de lectura de este artículo") y las reglas de comportamiento: hacer pausas en los checkpoints, verificar comprensión antes de avanzar, profundizar solo cuando el lector lo apruebe, sugerir recursos relacionados al cerrar cada tema.
- **Checkpoints en el texto**: marcadores distribuidos a lo largo del artículo, junto al contenido al que pertenecen. Cada uno indica cuándo pausar y qué pedir ("hazme un quiz de esta sección", "explícame la diferencia con un ejemplo", "sugiéreme dónde profundizar"). El lector solo menciona el número del checkpoint o pega una instrucción corta.

### Modelo de contenido: fuente única, varias salidas

Las instrucciones de acompañamiento son iguales para todos los artículos, así que se definen una sola vez a nivel de sitio — no se repiten en cada post. El autor de un artículo solo declara lo que es propio de ese texto:

- Sus **checkpoints**: la posición y el prompt sugerido de cada pausa.
- Su **contexto particular**: tema, nivel esperado del lector, prerequisitos y temas para profundizar.

De esa fuente única se generan varias salidas:

- La **card visible** al inicio del artículo, con el bootstrap listo para copiar y botones para abrir la conversación directamente en ChatGPT o Claude con el contexto precargado.
- Los **bloques de checkpoint** intercalados en el texto, cada uno copiable individualmente.
- Una **versión en texto plano** de cada artículo (`.md`), con el bootstrap y los checkpoints embebidos en su posición de lectura — pensada para pegarse completa en un LLM, o para que un agente la lea directamente.
- Un **índice del sitio** (`llms.txt`) que describe qué es Fronteando y qué artículos existen, siguiendo la convención que ya usan sitios de documentación técnica (Temporal, Cloudflare, Mintlify y otros publican versiones `.md` por página, botones "copy for LLM" y enlaces que abren conversaciones con contexto).

Así se cubren dos caminos: el lector que copia y pega a su propio ritmo, y el agente que llega al artículo directamente y encuentra el protocolo completo en orden de lectura.

## ¿Qué necesita el blog?

- **Control total del contenido**: los artículos viven en nuestro repositorio, con historial de cambios y revisión antes de publicar.
- **Ejemplos de código**: mucho código — para leer, copiar e idealmente ejecutar o modificar dentro del artículo (demos embebidas, sandboxes, bloques interactivos).
- **Material de acompañamiento**: cada post lleva asociados sus checkpoints y contexto para el LLM, generados desde una definición única.
- **Newsletter**: avisar a suscriptores cuando hay contenido nuevo.
- **Rendimiento y mantenimiento simple**: páginas rápidas y una infraestructura mínima — el equipo que gestiona el blog es técnico.

## Decisiones de implementación

El blog se construye como **sitio estático**: los artículos se escriben en Markdown en el repositorio, y al publicar se compilan a HTML que se sirve desde una CDN — sin servidor ni base de datos que mantener, con hosting gratuito (Cloudflare Pages, Netlify o similar) y tiempos de carga mínimos.

Como generador se usa **Astro**, elegido entre varias alternativas (Ghost, Hugo, Next.js, Eleventy) por tres razones que atacan directamente los requisitos:

- Los artículos pueden mezclar texto con **componentes interactivos** justo donde se necesitan — las demos de código y las cards de acompañamiento son componentes reutilizables, no hacks.
- El contenido se declara con **esquema validado** (cada post define sus checkpoints y contexto en campos estructurados), lo que hace natural el modelo "una fuente, varias salidas" descrito arriba.
- Generar las versiones `.md`, el índice `llms.txt` y las cards es trabajo de **build time**: se produce una vez al publicar, sin costo en cada visita.

La **newsletter** se conecta como servicio independiente (Buttondown, MailerLite o similar, o una opción self-hosted como Listmonk), integrada vía formulario y automatizable por RSS. Al estar desacoplada, se puede cambiar de proveedor sin tocar el blog.

La herramienta es un medio; lo importante es la misión: un lugar donde aprender frontend, con o sin asistente de por medio.
