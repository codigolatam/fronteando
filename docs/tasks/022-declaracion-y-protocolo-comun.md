# Definir la declaración de acompañamiento por artículo y el protocolo común

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Definir la forma en que cada artículo declara su acompañamiento —el
contexto del lector y las pausas con su posición— y escribir las
instrucciones comunes del protocolo una sola vez, dejando documentada la
convención para quien escribe.

## Dependencias

- Ninguna.

## Entrada

- La forma de solución aprobada en la propuesta: lo común vive una sola
  vez en el sitio, lo propio con los metadatos del artículo y las pausas
  marcadas dentro del texto.
- `site/src/content.config.ts` — el esquema actual de la colección.
- `EDITORIAL.md` — donde vive la convención para quien escribe.
- `docs/research/2026-10-enlaces-precargados-a-asistentes.md` — el
  protocolo compuesto debe caber en ~6k caracteres para mantener viables
  los enlaces precargados.

## Resultado esperado

- El esquema de la colección `articulos` extendido con la declaración
  de acompañamiento: contexto (tema, nivel del lector, prerequisitos),
  pausas y el opt-out explícito.
- La forma de marcar una pausa dentro del cuerpo definida, de modo que
  viaje con el contenido al editar.
- El protocolo común escrito en un único lugar del sitio: el rol del
  asistente y las reglas de la lectura acompañada.
- La convención de declaración documentada en `EDITORIAL.md` para los
  próximos posts.

## Criterios de calidad

- La declaración cubre contexto y pausas —posición en el texto y qué se
  verifica en cada una— sin piezas ambiguas.
- Nada del protocolo común se duplica por artículo: un solo origen
  editable.
- La declaración es opt-in y ofrece opt-out explícito: una pieza puede
  declarar que no se acompaña —decisión editorial declarada—, lo que se
  distingue de un artículo simplemente sin declarar.
- El protocolo compuesto típico —común más declaración— cabe en el
  presupuesto de ~6k caracteres.

## Procedimiento sugerido

1. Diseñar el esquema de declaración: campos, obligatoriedad y la forma
   de marcar una pausa en el cuerpo.
2. Escribir el protocolo común en el español del blog —rol, reglas y el
   formato de las pausas—, breve por el presupuesto de tamaño.
3. Extender el esquema de la colección y documentar la convención en
   `EDITORIAL.md`.

## Notas

- El esquema definido aquí es la entrada directa de la idea 003 —blog
  legible para máquinas—: conviene que la declaración sea portable como
  texto plano.

## Contexto

- **Archivos similares:**
  - `site/src/content.config.ts` — el esquema de la colección `articulos`: objeto zod plano con enums cerrados (`nivel`, `categoria`), arrays con `default` y `draft` booleano; la declaración de acompañamiento se extiende sobre esta forma.
  - `site/src/utils/excerpt.ts` — la mecánica del marcador `<!--more-->`: comentario HTML en línea propia detectado con regex sobre `body`, invisible en el HTML renderizado; el precedente directo para la marca de pausa en el cuerpo.
  - `site/src/content/articulos/*.md` — los tres posts publicados: frontmatter completo con `nivel` opcional omitido en la pieza `meta`; muestran la forma real de los metadatos.
  - `site/src/pages/articulos/[...id].astro` — la página de artículo renderiza con `render()` estándar de Astro (sin plugins remark/rehype): lo que el marcador de pausa produzca en HTML lo decide la composición, no un plugin.
  - `astro.config.mjs` — la pipeline de Markdown solo configura Shiki; no hay capa de transformación de contenido donde apoyarse.
- **Patrones:**
  - Marcador editorial en el cuerpo como comentario HTML en línea propia: invisible en el renderizado, detectable por regex sobre el cuerpo crudo, viaja con el contenido al editar (D002).
  - Metadato estructural opcional con vocabulario cerrado: `nivel` ya existe como enum opcional y lo omiten las piezas que no enseñan por grados; la declaración de acompañamiento sigue el mismo patrón de opt-in.
  - El contrato de metadatos para quien escribe vive en `EDITORIAL.md`, sección «Contrato de metadatos».
- **Dominio:** ninguno aplica — el proyecto no tiene directorio de documentos de dominio.
- **Producto:** ninguno aplica — el proyecto no tiene directorio de documentación de producto.
- **PRD:** `docs/prd/002-lectura-acompanada-por-llm.md` — CU-4 (declarar el acompañamiento: el autor declara contexto y marca pausas en el texto; el sitio produce el material completo sin repetir lo común), su variante (opt-out cuando la pieza no se beneficia) y CU-3 (leer sin acompañamiento: ausencia de declaración y opt-out producen la página de siempre, con el opt-out distinguible como decisión). El comportamiento esperado fija: el protocolo que el lector se lleva incluye instrucciones comunes, contexto y pausas en orden de lectura.
- **Lecciones:**
  - `docs/lessons/reglas-atemporales.md` — la convención que se documenta en `EDITORIAL.md` describe el estado final, sin conjuntos móviles ni historia de construcción.
  - `docs/lessons/espanol-del-blog.md` — el protocolo común se escribe en español latinoamericano neutro con giros hablados.
  - `docs/lessons/incisos-entre-parentesis.md` — paréntesis sobre raya larga en los incisos del protocolo.
  - `docs/lessons/taxonomia-de-contenido.md` — vocabulario cerrado en metadatos estructurales; `nivel` es opcional porque hay piezas que no enseñan por grados.
  - `docs/lessons/lineas-completas-en-artefactos.md` — ítems accionables a una línea por ítem en los artefactos que se documenten.
  - `docs/lessons/changelog-de-producto.md` — esta tarea agrega capacidad del producto: la entrada de changelog corresponde al cierre del conjunto que la hace usable, no a cada pieza interna.
- **Decisiones:**
  - **D002** — el previo sale del cuerpo con un marcador HTML en línea propia: fija el precedente de que los marcadores editoriales viven en el Markdown, invisibles al lector que no los busca.
- **Vacíos detectados:** ninguno; los archivos de entrada declarados en la tarea existen.

## Conectividad

**Conectada.** Todo lo que la tarea asume existe: el esquema de la
colección (`site/src/content.config.ts`) es un objeto zod extensible
con el vocabulario cerrado ya instalado; el precedente de marcador
editorial en el cuerpo (`<!--more-->` en `site/src/utils/excerpt.ts`)
demuestra que un comentario HTML en línea propia viaja invisible por
la pipeline estándar de Markdown —no hay plugins remark/rehype que lo
alteren— y se detecta por regex sobre `body`; `EDITORIAL.md` tiene la
sección «Contrato de metadatos» donde vive la convención para quien
escribe; y la nota de investigación del presupuesto de tamaño existe.
El lugar único del protocolo común no existe aún —no hay capa de datos
compartida—, pero crearlo es el propio resultado esperado de la
tarea, no infraestructura ausente.

## Plan técnico

La colección `articulos` es un esquema zod plano sobre frontmatter
YAML cargado por glob; el cuerpo viaja crudo a `render()` con la
pipeline estándar de Markdown (sin remark/rehype). No existe capa de
datos compartida. La declaración de acompañamiento extiende el
esquema con un campo opt-in/opt-out, las pausas viven íntegras en el
cuerpo como bloques directiva, el protocolo común vive como archivo
de datos importable y la convención se documenta en `EDITORIAL.md`.

- [x] Extender el esquema de `articulos` en `site/src/content.config.ts` con `agente` opcional: `false` (opt-out explícito) u objeto `{ tema, prerequisitos (default []) }`
  - Aporta: materializa los tres estados —ausente = sin declarar, `false` = decisión editorial, objeto = declarado— en un solo campo; el campo solo ajusta el prompt común y no conoce las pausas
  - Contexto: el nivel del lector se reutiliza del `nivel` top-level existente (no se duplica dentro de la declaración); la convención exige `nivel` en las piezas acompañadas
- [x] Escribir el protocolo común en `site/src/data/protocolo-acompanamiento.md`: rol del asistente, reglas de la lectura acompañada y semántica de las pausas, en la voz del blog, ~≤2k caracteres
  - Aporta: la fuente única editable de lo común; la tarea 023 lo importa como texto crudo (`?raw`) y le anexa el contexto del artículo y las pausas extraídas del cuerpo
  - Contexto: presupuesto total del protocolo compuesto ~6k caracteres (docs/research/2026-10-enlaces-precargados-a-asistentes.md); el bloque común debe dejar margen para el bloque del artículo
- [x] Activar la feature `directive` del procesador Sätteri en `astro.config.mjs` (`markdown.processor: satteri({ features: { directive: true } })`) como sustrato de los bloques `:::pausa`, y fijar la sintaxis: la indicación es el contenido del bloque
  - Aporta: posición e indicación viajan juntas en el cuerpo al editar; el orden en el texto da la numeración (Pausa 1, 2…); sin handler la directiva no renderiza nada, nunca markup roto
  - Contexto: Astro 7 usa Sätteri como procesador por defecto —los plugins remark exigen el procesador legado `@astrojs/markdown-remark`—; el plugin queda inerte (ningún artículo publicado usa la sintaxis hasta la 025), la transformación visible es de la 024 y el parseo para componer de la 023
- [x] Documentar la convención en `EDITORIAL.md`: el campo `agente` (objeto o `false`), el bloque `:::pausa`, cuándo declarar (piezas que enseñan) vs opt-out (piezas meta) y la guía para elegir pausas
  - Aporta: CU-4 usable por quien escribe sin leer el código; reglas atemporales —describen el estado final sin historia de construcción
- [x] Ejercitar el esquema de punta a punta con un artículo temporal `draft: true` (declaración válida, opt-out y casos rechazados) y retirarlo antes de cerrar
  - Aporta: prueba el contrato real contra la pipeline de contenido sin tocar el corpus publicado, que es alcance de la 025

## Suite de pruebas esperada

- **CU-4 — Declarar el acompañamiento:**
  - Un artículo con `agente` completo (`tema`, `prerequisitos`) pasa la validación del esquema y el build. (O)
  - `prerequisitos` omitido valida con lista vacía por defecto. (Z)
  - Una declaración sin `tema` hace fallar el build. (E)
  - Un `agente` con forma irreconocible (ni `false` ni objeto) hace fallar el build. (E)
- **CU-3 — Leer sin acompañamiento:**
  - Un artículo sin `agente` valida y su dato parseado distingue «ausente» de «opt-out». (I)
  - `agente: false` valida como opt-out explícito. (I)
- **CU-2 — Leer con pausas:**
  - Un bloque `:::pausa` en el cuerpo se parsea como directiva sin romper el render del artículo y su indicación queda localizable en el cuerpo crudo. (I)
- **Protocolo común:**
  - El archivo del protocolo común importa como texto crudo y su tamaño deja margen dentro del presupuesto ~6k (≤~2.5k solo). (B)
  - El texto del protocolo cumple la voz del blog (revisión de redacción y pulido).
- **Arnés:**
  - `check`, `lint`, `format:check` y `build` en verde.

## Desviaciones del plan

- **Sustrato de `:::pausa`: de `remark-directive` a la feature nativa de Sätteri.** El plan proponía registrar `remark-directive`; al ejecutar, `astro check` evidenció que Astro 7 usa Sätteri como procesador de Markdown por defecto y que los plugins remark exigen instalar el procesador legado `@astrojs/markdown-remark`. Sätteri soporta directivas `:::` de forma nativa (`features: { directive: true }`), así que se optó por `markdown.processor: satteri({ features: { directive: true } })` con `@astrojs/markdown-satteri@0.4.4` —la versión que Astro 7.4 ya fija como dependencia, no la 0.4.5 publicada hace dos días—. Menor: no cambia el objetivo ni los criterios de la tarea; el resultado es mejor (pipeline nativo, sin procesador legado). Efecto colateral verificado: sin handler la directiva no renderiza nada —degrada a invisible, no a párrafo—, lo que conviene anotar para la 024.

## Revisión

- Subagente: 2026-10-23 — Aprueba
- Usuario (ejecución): 2026-10-23 — Aprueba
- Usuario (cierre): 2026-10-23 — Aprueba
