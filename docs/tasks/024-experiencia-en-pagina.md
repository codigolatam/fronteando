# Experiencia de lectura acompañada en la página del artículo

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Que la página del artículo presente el acompañamiento al lector —la
tarjeta con el protocolo listo para copiar, los enlaces de apertura
precargada y las marcas de pausa junto al contenido— cuando el artículo
lo declara.

## Dependencias

- Borradores 01 y 02.

## Entrada

- El material compuesto del borrador 02.
- `DESIGN.md` y la guía de estilo — la tarjeta y las marcas son piezas
  visuales nuevas.
- `docs/research/2026-10-enlaces-precargados-a-asistentes.md` —
  formatos, límites y fragilidad de los enlaces precargados.

## Resultado esperado

- Una tarjeta al inicio del artículo con el protocolo listo para copiar
  y enlaces «abrir en ChatGPT/Claude» cuando el protocolo cabe en el
  límite del proveedor; cuando no, solo copiar.
- Marcas de pausa junto al contenido, en los puntos que el artículo
  declara.
- Los artículos sin declaración no muestran nada nuevo.

## Criterios de calidad

- Todo valor visual referencia tokens declarados en `DESIGN.md`.
- Copiar el protocolo funciona con degradación declarada si no hay
  JavaScript.
- Los enlaces precargados van correctamente codificados y dentro del
  límite del proveedor; fuera de él, degradan a copiar.
- Accesible: la tarjeta no interrumpe la lectura y las marcas son
  distinguibles sin depender solo del color.
- Evidencia renderizada en ambos temas.

## Procedimiento sugerido

1. Diseñar la tarjeta y las marcas con los tokens de la guía.
2. Construir el componente e integrarlo en la página del artículo.
3. Verificar renderizado en ambos temas con un artículo declarado.

## Notas

- `aplicar-guia-estilo` gobierna la pieza visual: tokens antes que
  literales, evidencia renderizada antes de darse por conforme.

## Contexto

- **Archivos similares:**
  - `site/src/utils/accompaniment.ts` — la composición de la 023:
    `protocolOf(articulo)` devuelve el protocolo completo en texto plano
    o `null` (sin declaración y con opt-out); es la única entrada que la
    tarjeta necesita. `pausesOf` numera las pausas por orden en el
    cuerpo — el mismo orden que debe llevar la marca visual.
  - `site/src/pages/articulos/[...id].astro` — la página del artículo:
    la tarjeta se inserta entre `article-meta-struct` y `<Content />`;
    `render(articulo)` produce el cuerpo donde viven los `:::pausa`.
  - `site/astro.config.mjs` — el procesador Sätteri ya corre con
    `features: { directive: true }`; admite `mdastPlugins` con el
    visitante `containerDirective` (verificado: `setProperty(node,
    'data', { hName, hProperties })` materializa el bloque como
    elemento conservando su contenido, y `ctx.data.astro.frontmatter`
    expone la declaración `agente`).
  - `site/src/layouts/Base.astro` — el patrón de copiado ya existe:
    script que envuelve `.prose pre` en `.code-block` e inyecta
    `.copy-btn` con `navigator.clipboard` y confirmación copiado/error;
    y la degradación sin JS del theme-toggle (`html:not(.js)` oculta el
    control). El mismo patrón sirve para protocolo y pausas.
  - `site/src/styles/global.css` — todos los tokens de `DESIGN.md`
    declarados; la tarjeta y el checkpoint consumen `--color-surface`,
    `--color-border`, `--color-accent`, `--font-mono` 500, `--radius`,
    `--radius-pill`, `--space-*`, `--duration-fast`, `--target-min`.
  - `docs/research/2026-10-enlaces-precargados-a-asistentes.md` —
    formatos y límites: ChatGPT `https://chatgpt.com/?q=` (~6000
    caracteres), Claude `https://claude.ai/new?q=` (~10000); los enlaces
    precargan sin enviar; copiar es el camino garantizado.
- **Patrones:**
  - `DESIGN.md` ya describe las dos piezas: «Card de acompañamiento
    (bootstrap)» (superficie con borde, protocolo listo para copiar,
    acciones ChatGPT/Claude) y «Bloque de checkpoint» (recuadro
    `--color-surface` con marcador `> NN` en Mono 500 acento, texto
    sugerido copiable individualmente).
  - Un `containerDirective` sin handler no emite HTML (verificado): la
    marca es un `mdastPlugin` que materializa `:::pausa` como
    `<details class="pause">` — posición e indicación viajan juntas.
  - El numerado de pausa por contador CSS (`counter-reset` en `.prose`,
    `counter-increment` en `.pause`) garantiza la misma numeración que
    el protocolo compuesto: ambos derivan del orden en el cuerpo.
- **Dominio:** ninguno aplica.
- **Producto:** ninguno aplica.
- **PRD:** `docs/prd/002-lectura-acompanada-por-llm.md` — CU-1 (iniciar:
    copiar el protocolo o abrir un enlace precargado), CU-2 (leer con
    pausas: marcas junto al contenido, distinguibles sin depender solo
    del color) y CU-3 (sin declaración ni opt-out: la página no muestra
    nada nuevo).
- **Lecciones:**
  - `docs/lessons/idioma-del-codigo.md` — identificadores, clases CSS y
    nombres de archivo en inglés; el texto visible sigue en español.
  - `docs/lessons/formato-de-codigo-generado.md` — el código nuevo sale
    en estilo Prettier desde la escritura.
  - `docs/lessons/plantillas-de-astro.md` — whitespace junto a etiquetas
    en `.astro`: forzar el espacio con `{" "}` donde aplique.
  - `docs/lessons/metadatos-clave-valor.md` — la voz «terminal viva»
    arbitra la tarjeta: `clave: valor`, marcador `>`, nada de chips.
  - `docs/lessons/espanol-del-blog.md` e `incisos-entre-parentesis.md` —
    el copy de la tarjeta va en la voz del blog.
  - `docs/lessons/nombres-de-tests.md` — los tests nuevos nombran
    comportamiento.
- **Decisiones:** D006 registra la columna lateral de acompañamiento, la
  única excepción a la columna única de la guía (D001 cubre el
  despliegue; aquí no se toca).
- **Vacíos detectados:** no existe `site/src/components/` — se crea con
  la tarjeta; los estilos de tarjeta y checkpoint son nuevos en
  `global.css`; no hay artículo declarado en el corpus — la verificación
  renderizada usa un fixture temporal (el corpus se adapta en la 025).

## Conectividad

**Conectada.** Todo lo que la experiencia necesita existe: la
composición `protocolOf` lista (023), el sustrato `:::pausa` parseado
por Sätteri con materialización verificada a `<details>` y acceso al
frontmatter desde el plugin (022), las dos piezas ya especificadas en
`DESIGN.md`, el patrón de copiado con clipboard y degradación `no-js`
instalados en `Base.astro`, y los límites de enlaces investigados. El
único hueco absorbible: ningún artículo publicado declara
acompañamiento todavía — la verificación renderizada lo ejercita con un
fixture temporal que se retira antes de cerrar.

## Plan técnico

- [x] `assistantUrlsOf(protocol)` en `site/src/utils/accompaniment.ts` — devuelve `{ chatgpt?, claude? }` con la URL precargada por proveedor solo si el protocolo cabe en su límite (6000 / 10000 caracteres, de la investigación)
  - Aporta: la decisión «enlace o degradación a copiar» en un solo punto, pura y testeable
- [x] Plugin `pause` en `astro.config.mjs` — `mdastPlugins` con visitante `containerDirective`: si `node.name === 'pausa'` y el frontmatter declara `agente` (objeto, vía `ctx.data.astro.frontmatter`), materializa `<details class="pause"><summary>pausa</summary>…indicación…</details>`; sin declaración u opt-out el bloque no emite HTML
  - Aporta: la marca vive donde el autor la escribió; `agente` gobierna toda la experiencia (CU-3 hermético); cerrada solo muestra el marcador —la indicación es del agente, ya viaja en el protocolo— y `<details>` opera sin JS (degradación nativa)
  - Contexto: materialización `hName`/`hProperties` + `prependChild` verificada contra `satteri.markdownToHtml`; desviación informada de DESIGN.md (checkpoint con texto tras la marca en lugar de visible), la arbitra el principio 3 «el acompañamiento no interrumpe» y la indicación del usuario — se actualiza la línea del componente en la guía
- [x] `site/src/components/AccompanimentCard.astro` — card `--color-surface` con borde: línea de explicación en la voz del blog, botón primario «copiar protocolo» (JS; oculto sin `.js` como el theme-toggle), enlaces «abrir en ChatGPT/Claude» solo cuando `assistantUrlsOf` los ofrece, y `<details>` con el protocolo en `<pre>` (degradación declarada de copiar + transparencia de qué se pega). Un `<script>` cablea el botón de la card y los `.copy-btn` de cada `.pause` (patrón copiar/copiado/error del bloque de código)
  - Aporta: CU-1 completo — copiar garantizado, enlaces como comodidad, todo con tokens
- [x] `site/src/pages/articulos/[...id].astro` — `const protocol = protocolOf(articulo)`; renderiza la card entre el meta y `<Content />` solo cuando no es `null`
- [x] Estilos en `site/src/styles/global.css` — `.accompaniment` (card) y `.pause` (checkpoint con marcador `> NN` vía `counter-reset` en `.prose` y `counter-increment` en `.pause`, `summary::before` en Mono 500 acento, distinguible por marcador y recuadro, no solo color) y posición del `.copy-btn` de pausa. Solo tokens
- [x] Fixture temporal — artículo con `agente` + dos `:::pausa` para la evidencia renderizada en ambos temas; se retira antes de cerrar
- [x] Tests — extender `accompaniment.test.ts` con el comportamiento de `assistantUrlsOf`
- [x] Arnés — `check`, `lint`, `format:check`, `test`, `build` + evidencia renderizada claro/oscuro

## Suite de pruebas esperada

- **CU-1 — Iniciar la lectura acompañada:**
  - Un artículo declarado muestra la card al inicio del contenido. (O)
  - Con protocolo ≤6k caracteres, la card ofrece ambos enlaces con el `?q=` codificado. (I)
  - Con protocolo >6k y ≤10k, solo aparece el enlace de Claude. (B)
  - Con protocolo >10k, no hay enlaces: solo copiar. (Z)
  - El `<details>` expone el texto completo del protocolo. (I)
  - El botón copia el protocolo exacto que compone `protocolOf`. (I)
- **CU-2 — Leer con pausas:**
  - Cada `:::pausa` renderiza `<details class="pause">` con su indicación dentro. (O)
  - Varias pausas llevan marcadores `> 01`, `> 02` en el orden del cuerpo. (M)
  - La marca se distingue sin depender del color: marcador `>` y recuadro. (I)
  - Cada pausa ofrece su copiar individual junto al texto. (I)
- **CU-3 — Leer sin acompañamiento:**
  - Sin `agente`, la página no muestra ni card ni marcas aunque el cuerpo tenga `:::pausa`. (Z)
  - Con `agente: false`, igual. (I)
  - Un artículo sin nada de esto produce el mismo HTML de antes. (I)
- **Guía de estilo:**
  - Cero literales visuales fuera de `:root`; foco visible y ≥44px en controles; evidencia renderizada en tema claro y oscuro.
- **Arnés:**
  - `check`, `lint`, `format:check`, `test` y `build` en verde.

## Desviaciones del plan

- **Tarjeta sin caja.** El plan decía superficie `--color-surface` con borde. Motivo: con caja, la nota pesaba más que el texto que acompaña. Decisión: espina de `--color-accent` sin caja, validada en Firefox en ambos temas. La espina es una excepción a la reserva del acento en `DESIGN.md`.
- **Columna lateral desde 1240px.** No estaba en el plan. Motivo: la nota en la columna única interrumpe el arranque de la lectura y se pierde al hacer scroll. Decisión: aprobada por el usuario tras evaluar variantes y registrada en D006. Limitación abierta: si la nota supera la altura del artículo, empuja el texto (170px medidos en un artículo corto).
- **Protocolo con altura máxima.** No estaba en el plan. Motivo: el protocolo de 2099 caracteres ocupaba 2917px dentro de la columna de 280px e impedía el sticky. Decisión: `--protocol-max-height` de 30vh con scroll interno y `tabindex="0"` para el teclado.
- **Compuerta de pausas en módulo propio.** El plan la ubicaba en `astro.config.mjs`. Motivo: es lógica funcional y debe tener prueba. Decisión: se movió a `site/src/utils/pause-directive.ts` con cinco pruebas; la configuración solo la importa.
- **Diseño verificado sin tests de render.** La suite pedía pruebas de tarjeta, `<details>` y marcadores. Motivo: indicación del usuario, los tests son para lógica y no para diseño. Decisión: el diseño se verificó con evidencia renderizada en Firefox, en ambos temas y a 1500, 1100 y 500px; la lógica tiene pruebas.
- **Criterio de CU-3.** La suite pedía el mismo HTML para los artículos sin declaración. Motivo: indicación del usuario, el criterio es el mismo diseño. Decisión: estos artículos reciben el wrapper `article-content`; se verificó que las 34 posiciones de bloques y márgenes coinciden con y sin el wrapper a 1500 y 500px.
- **Copiado verificado en navegador.** La suite pedía que el botón copie el protocolo exacto. Motivo: la copia vive en un script de cliente y el proyecto no tiene entorno DOM para pruebas; agregarlo requiere una dependencia nueva. Decisión: verificado con portapapeles simulado (protocolo exacto de 2099 caracteres y cada pausa con su indicación). Queda sin prueba automatizada, pendiente de tu decisión.
- **Regla de ancho acotada en revisión.** La regla de `.site-main` a partir de 1240px se aplicaba a todas las páginas y ensanchaba el texto de los artículos sin acompañamiento a 1080px. Se acotó con `:has(.prose.has-rail)`; el texto mide 768px con y sin nota.
- **Apertura de la nota sin JS.** Con JS, la nota de la columna lateral se abre al cargar; sin JS queda plegada y se abre al pulsarla. Queda declarado en `DESIGN.md`, sección Componentes.
- **Protocolo con caja propia.** El `pre` del protocolo usa `--color-background` y `--font-size-meta`, no el bloque de código del artículo, para leerse como terminal dentro de la nota.
- **Pausas vacías numeradas.** `pausesOf` conserva los `:::pausa` sin texto, para que la numeración de la página y la del protocolo coincidan. Cubierto por una prueba.
- **Token de hover.** `--color-accent-hover` reemplaza el filtro `brightness` del botón primario. Contraste calculado: 5.81:1 en tema claro y 10.33:1 en tema oscuro.
- **Espaciado del primer encabezado en la columna lateral.** Dentro de la columna, el margen del primer `h2` o `h3` no colapsa con la metadata: medido 72px frente a 48px en la columna única. Se compensa con una regla por encabezado (`h2:first-child` y `h3:first-child`), y el resultado queda en 48px y 32px.
- **Alineación del texto con nota.** Por decisión del usuario, el texto de los artículos con nota queda 156px a la izquierda de la cabecera a 1500px, porque el conjunto se centra. Documentado en `DESIGN.md`, sección Layout. D006 no se modifica.
- **Excepción de mono en la nota.** La frase de instrucción de la nota usa IBM Plex Mono por decisión del usuario. Se documenta como excepción en `DESIGN.md`, sección Tipografía.
- **Dependencia de tipos.** Por decisión del usuario, `satteri` 0.10.5 se agrega como dependencia de desarrollo con versión exacta, para el tipo `MdastPluginDefinition`. No entra al bundle.
- **Ajuste de línea en el protocolo.** El `pre` del protocolo ajusta la línea (`pre-wrap`), a diferencia del bloque de código del artículo. Es texto para pegar, no código, y con scroll horizontal en 280px sería ilegible. Documentado en `DESIGN.md`, sección Componentes.
- **Resumen de la nota sin JS.** Con JS, el resumen de la nota en columna lateral no responde al puntero (`pointer-events: none` solo con `html.js`), y un listener la reabre si se cierra. Sin JS el resumen funciona con normalidad: un clic real abre la nota.
- **Residuales aceptados de la cuarta revisión.** Por decisión del usuario quedan sin corregir: la nota dice «siempre abierta» en D006 sin la condición «con JS» (D006 no se reescribe; DESIGN.md y la tarea llevan la degradación sin JS); `pausesOf` no cubre `:::pausa` dentro de citas, listas ni comentarios HTML (sin casos en el corpus hoy); y con JS, Enter sobre el resumen cierra y reabre la nota, con parpadeo.

## Revisión

- Subagente: 2026-10-23 — Solicita cambios (residuales aceptados por el usuario)
- Usuario (ejecución): 2026-10-23 — Aprueba
- Usuario (cierre): 2026-10-23 — Aprueba
