# PRD — Blog legible para máquinas

El artículo solo existe como página para el ojo humano: este conjunto
entrega cada pieza también como texto plano servido en su propia
dirección, para que llevarla a un asistente —o leerla con él— deje de
ser recomponer la página a mano.

## Usuarios

- **El lector acompañado:** su asistente recibe la fuente limpia del
  artículo, con las pausas en su posición.
- **El lector que copia:** toma el texto plano sin copiar la página.
- **El agente que llega por su cuenta:** descubre la versión legible
  desde la página.
- **El autor:** publica igual que hoy; el texto plano sale solo.

## Casos de uso

- **CU-1 — El asistente lee la fuente limpia:** el lector arranca la
  lectura acompañada con el protocolo; el asistente sigue el enlace de
  la ficha y recibe el artículo en texto plano, con las pausas en su
  posición de lectura.
  - Variante: el asistente no puede navegar; el lector abre el `.md`
    y pega su contenido —el mismo texto, el mismo resultado—.
- **CU-2 — El lector copia el texto plano:** desde el artículo, el
  lector accede a la versión `.md` —verla o copiarla— y la lleva donde
  quiera; el acceso está presente en toda pieza, con o sin
  acompañamiento.
- **CU-3 — El agente descubre la versión legible:** un agente que
  llega a la página encuentra en sus metadatos el enlace a la versión
  en texto plano y la consume directamente.
- **CU-4 — Publicar produce el texto plano:** el autor publica un
  artículo nuevo igual que hoy y su `.md` existe al desplegar, sin
  pasos extra.

## Comportamiento esperado

- **Emisión:** cada artículo responde su versión en texto plano en la
  misma dirección terminada en `.md`; el contenido llega íntegro —
  encabezados, código, listas, enlaces— desde la fuente markdown.
- **Contenido:** el texto plano abre con un preámbulo de título y URL
  canónica; las marcas de pausa viajan en su posición; el protocolo y
  la tarjeta no viajan.
- **Universalidad:** todo artículo produce su `.md`, incluidos los que
  declaran el opt-out de acompañamiento.
- **Descubrimiento:** cada página declara su versión legible en los
  metadatos (`rel="alternate" type="text/markdown"`).
- **Acceso:** el lector encuentra dónde ver o copiar el texto plano en
  cada pieza.
- **Protocolo:** la ficha del protocolo señala la versión en texto
  plano del artículo, no la página HTML.

## Criterios de éxito

- Un lector lleva el artículo completo a su asistente sin copiar la
  página ni recomponer el texto.
- La lectura acompañada consume la fuente limpia con las pausas
  localizadas.
- Publicar un artículo nuevo produce su `.md` sin trabajo extra.

## Fuera de alcance

- La declaración del sitio (`llms.txt`, `llms-full.txt`) y la
  negociación de contenido.
- Datos estructurados para buscadores y políticas hacia rastreadores.
- El material de acompañamiento en el texto plano, salvo las marcas
  de pausa.
- Las demos ejecutables (idea 004).
