# El mecanismo de piezas interactivas en el artículo

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dar al sitio la capacidad de hospedar piezas interactivas dentro de
los artículos: una forma declarada de insertar una demo donde el
texto la necesita, que la página la ejecute en su lugar con la
apariencia de la guía de estilo, y un convenio de autoría para que
cada pieza nueva sea un artefacto propio del sitio y no un apaño
insertado a mano.

## Dependencias

- Ninguna.

## Entrada

- La colección `articulos` y la página del artículo
  (`site/src/content/`, `site/src/pages/articulos/[...id].astro`).
- La infraestructura de directivas del procesador markdown
  (`satteri`, `pause-directive.ts`): las marcas `:::` ya viajan del
  fuente a la página.
- `DESIGN.md` — las piezas interactivas salen de los tokens de la
  guía.
- `EDITORIAL.md` — donde vive el convenio de autoría del blog.
- La versión en texto plano del artículo (`/articulos/<id>.md`): la
  pieza interactiva no viaja como markdown y la forma de su marca en
  esa versión es parte de esta tarea.

## Resultado esperado

- El autor puede insertar una pieza interactiva en el cuerpo de un
  artículo con una declaración en el fuente —un marcador o forma de
  marcado que el plan decide— sin tocar la página ni el procesador.
- Cada pieza es un artefacto propio del sitio: su markup, su lógica y
  su estilo viven en un lugar convencionado y reutilizable, no
  incrustados a mano en el texto del artículo.
- La pieza se ejecuta en su lugar de lectura y su superficie visible
  sale de los tokens de `DESIGN.md`.
- El comportamiento sin JavaScript está resuelto: lo que la pieza
  deja en su lugar cuando no puede ejecutarse —un texto, el marcador,
  un estado estático— es decisión de esta tarea.
- La versión `.md` del artículo trata la marca de la pieza de una
  forma decidida: el agente que la consume encuentra un texto honesto
  sobre qué hay ahí, no markup ilegible ni silencio.
- `EDITORIAL.md` documenta cómo se declara y se construye una pieza
  nueva.

## Criterios de calidad

- Insertar una pieza no exige editar la plantilla de la página: el
  punto de extensión está en el fuente del artículo.
- Una pieza de ejemplo —mínima, construida para verificar el
  mecanismo— se ejecuta en su lugar de lectura en un artículo real o
  de apoyo, con la apariencia de la guía.
- Sin JavaScript la página no se rompe ni muestra una pieza muerta
  sin explicación.
- El `.md` del artículo con la pieza sigue siendo legible y honesto
  para un agente.
- `check`, `lint`, `test`, `build` y `format:check` en verde; la
  pieza se verifica renderizada en el navegador.

## Procedimiento sugerido

1. Decidir el vehículo de la declaración en el fuente (directiva
   `:::`, HTML en línea, elemento personalizado) y dónde viven los
   artefactos de las piezas —con prueba de concepto si el plan la
   necesita—.
2. Definir el contrato entre fuente, página y artefacto de la pieza:
   cómo se declara, cómo se monta, cómo se carga su lógica.
3. Resolver el comportamiento sin JavaScript y la forma de la marca
   en el `.md`.
4. Construir una pieza mínima que ejercite el mecanismo y documentar
   el convenio en `EDITORIAL.md`.
5. Verificar renderizado y las puertas del proyecto.

## Contexto

- **Archivos similares:**
  - `site/src/utils/pause-directive.ts` — el modelo del plugin mdast: `containerDirective` sobre satteri con `ctx.setProperty(node, "data", {hName, hProperties})` y `ctx.prependChild`; los atributos `{k="v"}` llegan en `node.attributes`.
  - `site/src/components/AccompanimentCard.astro` — el componente con markup + script de cliente en el mismo archivo.
  - `site/src/utils/article-markdown.ts` y `site/src/pages/articulos/[...id].md.ts` — la vía `.md`: el cuerpo viaja crudo, lo que el autor escribe en la marca es lo que el agente lee.
  - `site/src/pages/articulos/[...id].astro` — la página del artículo: punto donde un componente condicional podría cargar los scripts de piezas.
  - `site/src/styles/global.css` — los tokens `--*` en `:root` que la superficie de la pieza consume.
- **Patrones:**
  - Plugins mdast registrados en `astro.config.mjs` vía `mdastPlugins` con `features.directive: true`; cada directiva es un `MdastPluginDefinition` nombrado.
  - Scripts `<script>` en componentes Astro: procesados (TypeScript, bundle, `type="module"`, deduplicados por página); viajan solo si el componente se renderiza.
  - Sin literales visuales fuera de tokens; tests con Vitest junto al archivo (`*.test.ts`); estilo Prettier (2 espacios, comillas dobles).
  - El código de piezas corre solo en el cliente: nada de globals de navegador en el ámbito del módulo durante SSR/build.
- **Dominio:** sin aportación —el proyecto no tiene `docs/domains/`—.
- **Producto:** sin aportación —el proyecto no tiene `product-docs/`—.
- **PRD:** `docs/prd/004-demos-de-codigo-ejecutables.md` — CU-3 (el autor declara la pieza sin editar la plantilla), CU-4 (sin JS la lectura no se rompe y conserva lo esencial), CU-5 (el `.md` describe la pieza con texto honesto); CU-1 y CU-2 los ejercitan las piezas reales de 029/030 sobre el mecanismo.
- **Lecciones:**
  - `texto-para-agentes` — el contenido interno de la pieza se evalúa como prompt para el agente, no como prosa.
  - `nombres-de-tests` — `describe` nombra la unidad, `when` el contexto, `it` el comportamiento.
  - `formato-de-codigo-generado` — el código nuevo nace en estilo Prettier.
  - `plantillas-de-astro` — whitespace JSX junto a etiquetas: `{" "}` donde importe.
  - `opciones-comparables` — las alternativas evaluadas en el plan deben ser comparables entre sí.
- **Decisiones:**
  - D001 — el sitio es estático sobre Cloudflare Workers: las piezas no pueden depender de ejecución en servidor.
  - D006 — la columna lateral es solo para acompañamiento: las piezas viven en el flujo del artículo, nunca en el rail.
- **Investigación de la tarea** (corpus propio en `docs/research/`, rama de esta tarea):
  - `2026-10-vehiculos-para-piezas-interactivas.md` — custom elements como vehículo, verificado en el DOM de seis referentes.
  - `2026-10-mecanica-de-elementos-personalizados.md` — shadow DOM + tokens `--*` que cruzan el límite, atributos, carga por artículo, ciclo de vida.
  - `2026-10-degradacion-y-representacion-de-piezas.md` — el contenido interno como contrato para tres lectores.
  - `2026-10-sintaxis-de-declaracion-de-piezas.md` — `:::demo{nombre=…}` como declaración; el markdown dentro de HTML crudo no se procesa (CommonMark §HTML blocks).
  - `2026-10-el-genero-explorable-explanations.md` — el género, su taxonomía y el vocabulario de tipos de pieza.

## Conectividad

**Veredicto: conectada.**

Todo lo que la tarea asume existe con la forma esperada: la colección
`articulos` y su página, la infraestructura de directivas `:::` de
satteri —`pause-directive` ya emite `hName`/`hProperties` y la API
expone `attributes` del contenedor—, los tokens de `DESIGN.md` en
`global.css`, el endpoint `.md` por artículo y los scripts procesados
por página de Astro. Las piezas son JS de cliente puro —compatible con
el despliegue estático de D001—.

Lo que la tarea debe crear —el plugin de la directiva de demo, el
directorio de artefactos de piezas, la clase base del elemento y el
convenio en `EDITORIAL.md`— es el propio alcance de la tarea, no
capacidad base ausente. Única incertidumbre técnica, absorbible en el
plan: que el parser de satteri pueble `node.attributes` con la sintaxis
`{k="v"}` y propague el `hName` de elemento personalizado —el tipado lo
declara y `:::pausa` demuestra el mecanismo; el plan lo cierra con una
prueba de concepto—.

## Plan técnico

**Resumen del subsistema:** los artículos se compilan con satteri —
`features.directive` convierte las marcas `:::` en nodos
`containerDirective` que los plugins mdast transforman a HTML vía
`hName`/`hProperties`, con los hijos procesados como markdown normal—.
La página del artículo renderiza `Content` dentro de `.prose` y sirve
además el cuerpo crudo en `/articulos/<id>.md`. La prueba de concepto
verificó la hipótesis clave: `:::demo{nombre="x"}` puebla
`node.attributes` y un `hName` de elemento personalizado emite
`<fronteando-demo nombre="x">` con el contenido ya renderizado dentro
—la vía de declaración queda confirmada con código—.

**Decisiones transversales:**

- La declaración es la directiva de contenedor `:::demo{nombre="…"}`:
  el cuerpo es el fallback en markdown pleno y los atributos nombran la
  pieza y su configuración simple.
- Un único elemento `fronteando-demo` hospeda toda pieza: el atributo
  `nombre` selecciona el artefacto —la directiva queda tonta y el
  registro en un solo sitio—.
- Cada pieza es un artefacto propio en `site/src/demos/<nombre>/` —
  módulo autocontenido con su lógica y su estilo—.
- La pieza usa shadow DOM: los tokens `--*` del sitio cruzan el límite
  por herencia de custom properties; los hijos no sloteados dejan de
  renderizarse al mejorar el elemento —el fallback se ve hasta el
  upgrade y viaja literal en el `.md`—.
- El script del mecanismo viaja solo en artículos que declaran demos:
  la página lo detecta en el cuerpo del artículo.
- La pieza puede reservar altura con el atributo `altura` —el contrato
  de «lectura estable» de `DESIGN.md`—.

- [x] Crear el plugin `demo-directive` —`:::demo{nombre="…"}` emite
      `<fronteando-demo nombre="…">`, los atributos pasan a
      `hProperties` y los hijos quedan intactos— y registrarlo en
      `astro.config.mjs`
  - Aporta: el autor declara la pieza en el fuente sin tocar la
    plantilla (CU-3); el cuerpo es el fallback en markdown pleno
  - Contexto: mismo patrón que `pause-directive`; el PoC verificó que
    `node.attributes` llega poblado; `nombre` ausente reporta
    diagnóstico de error en build vía `ctx.report`
- [x] Crear la clase del elemento `fronteando-demo`: en
      `connectedCallback` lee `nombre`, resuelve el módulo de la pieza
      con `import.meta.glob` sobre `src/demos/*/index.ts` y lo monta en
      su shadow root; `disconnectedCallback` la libera
  - Aporta: un solo elemento y una sola convención; cada pieza carga su
    código solo cuando se declara (code splitting por pieza)
- [x] Establecer la convención de artefacto `site/src/demos/<nombre>/`
      y construir la pieza mínima de ejemplo que ejercita el mecanismo
  - Aporta: el punto de extensión reutilizable y la pieza de
    verificación del criterio de calidad
- [x] Cargar el script del mecanismo solo en artículos con demos:
      `[...id].astro` detecta `:::demo` en el cuerpo y renderiza el
      `<script>` del registro condicionalmente
  - Aporta: «rápido por defecto» de `DESIGN.md` —los artículos sin
    demos no pagan el bundle—
  - Contexto: el script procesado se deduplica por página; si el
    `<script>` condicional diera problemas, la alternativa es un loader
    ínfimo siempre incluido que retorna sin elementos `fronteando-demo`
- [x] Dar el marco de la pieza: `:host` con borde `--color-border`,
      `--radius` y fondo `--color-surface`; `fronteando-demo` con
      `display: block` en el CSS global —sin ello el fallback nace
      inline—; `altura` opcional como altura mínima reservada
  - Aporta: superficie consistente de la guía y sin salto de layout al
    mejorar (contrato «lectura estable»)
- [x] Resolver sin-JS y `.md` por construcción y verificarlo: los
      hijos no sloteados desaparecen al mejorar —el fallback se ve hasta
      entonces y viaja literal en el `.md`—
  - Aporta: CU-4 y CU-5 salen del modelo de upgrade nativo, sin trabajo
    adicional
- [x] Verificar la pieza mínima durante el desarrollo: se declara
      temporalmente en un artículo del árbol de trabajo —sin
      commitear—, se verifica renderizada y se revierte la
      declaración; nada de la pieza de ejemplo queda en la
      publicación final
  - Aporta: verificación en artículo real sin tocar contenido
    publicado ni adelantar las demos de 029/030
  - Contexto: decisión del usuario —la pieza mínima es solo de
    desarrollo; el artefacto de `src/demos/` sí queda como
    implementación de referencia del convenio—
- [x] Documentar el convenio en `EDITORIAL.md`: sintaxis `:::demo`,
      layout del artefacto, contrato del fallback —tres lectores,
      evaluado como prompt—, tipos de pieza según el género
      (simulación, vista instrumentada, stepper) y comportamiento sin
      JS
  - Aporta: la convención de autoría que el objetivo exige
- [x] Verificación renderizada: dev server en background + Firefox —
      pieza en su lugar, interacción, página sin JS, salida `.md`,
      ambos temas—
  - Aporta: el criterio de calidad exige evidencia renderizada, no solo
    build

## Suite de pruebas esperada

- `:::demo{nombre="x"}` emite `<fronteando-demo nombre="x">` con el
  contenido de la directiva como hijos renderizados (CU-3; I).
- Los atributos adicionales de la directiva viajan como atributos del
  elemento (CU-3; M).
- `:::demo` sin `nombre` reporta diagnóstico y no emite el elemento
  (CU-3; E).
- `:::pausa` y el resto del documento quedan intactos (regresión).
- La página de un artículo con `:::demo` incluye el script del
  mecanismo; un artículo sin demos no lo incluye (CU-3; Z/O —
  verificado en el HTML servido).
- Sin JavaScript el contenido de la pieza se ve en su lugar (CU-4; B).
- El `.md` del artículo muestra la marca `:::demo` con su texto de
  fallback legible para un agente (CU-5; I).
- Un `nombre` sin pieza registrada deja el fallback visible (CU-4; E).
- La pieza mínima monta, responde a la interacción y es operable por
  teclado (CU-1; B).

## Desviaciones del plan

- **El marco de la pieza vive en el CSS global sobre el elemento, no en
  `:host` dentro del shadow.** El plan preveía reglas `:host`; la
  implementación estiliza `fronteando-demo` desde `global.css`
  (surface, borde, radio, padding, `display: block`). Motivo: el host
  es estilizable desde fuera con o sin shadow, y así el fallback
  anterior a la mejora ya lleva el mismo marco —no hay salto visual al
  hacer upgrade—. La decisión no cambia la superficie prometida; el
  shadow queda libre para los estilos internos de cada pieza.
- **`mount` recibe un `DocumentFragment`, no el `ShadowRoot`.** La
  pieza construye su interfaz en un fragmento que el elemento anexa al
  shadow solo si `mount` terminó sin error: si la pieza falla, no se
  adjunta shadow y el fallback no desaparece (un shadow vacío lo
  ocultaría para siempre). Refuerza el criterio «nombre sin pieza
  deja el fallback visible» que el plan ya fijaba.
- **`nombre` reactivo además de `altura`.** El plan solo declaraba
  `altura` observado; `nombre` también quedó observado para permitir
  remontar si el atributo cambia en runtime —caso barato de cubrir con
  la misma vía de `attributeChangedCallback`—.
- **El shadow mantiene un `<slot>` como estado degradado, no solo para el primer montaje.** La revisión encontró que `attachShadow` no puede deshacerse y que un shadow vacío oculta el fallback para siempre en remontaje, reconexión y nombre inválido. Decisión: el shadow contiene siempre la pieza o un `<slot>` que proyecta el fallback —toda ruta de fallo (pieza desconocida, mount que lanza, mount vacío, nombre ausente, desconexión) devuelve el elemento al fallback en lugar de romperse—. También quedó `nombre` reactivo con deduplicación de cargas en vuelo y verificación del atributo tras el `await`.

## Revisión

- Subagente: 2026-10-26 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
