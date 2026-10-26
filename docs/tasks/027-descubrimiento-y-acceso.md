# Descubrimiento para agentes y acceso para el lector

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Hacer que la versión en texto plano se descubra sola —el agente que
llega a una página encuentra su `.md` sin intervención—, que el
protocolo de acompañamiento señale al asistente esa versión en lugar
de la página HTML, y que el lector tenga un acceso visible para ver o
copiar el texto plano del artículo.

## Dependencias

- 026 — produce las versiones en texto plano que se anuncian,
  se enlazan y se ofrecen.

## Entrada

- La especificación de descubrimiento en llmstxt.org, resumida en
  `docs/research/2026-10-version-legible-para-maquinas.md`:
  `rel="alternate" type="text/markdown"` hacia la versión en texto
  plano, como elemento `<link>` de la página.
- La práctica del mercado para el lector: «copiar/ver markdown» junto
  al artículo (PostHog, Expo, Cloudflare).
- `site/src/pages/articulos/[...id].astro` y los componentes del
  artículo —donde viven los metadatos y la superficie junto al texto—.
- DESIGN.md — la afordancia debe salir de los tokens de la guía.
- El protocolo de acompañamiento (`site/src/utils/accompaniment.ts`):
  su ficha hoy apunta a la URL HTML del artículo.

## Resultado esperado

- Cada página de artículo declara en sus metadatos el enlace a su
  versión en texto plano (`rel="alternate" type="text/markdown"`).
- El lector encuentra en el artículo un acceso visible a la versión
  en texto plano —verla o copiarla—, presente en todas las piezas,
  tengan o no acompañamiento.
- El protocolo de acompañamiento señala al asistente la versión en
  texto plano del artículo, no la página HTML: el agente que recibe el
  protocolo consume la fuente limpia, con las pausas en su posición.
- La afordancia visible sigue la guía de estilo.

## Criterios de calidad

- El elemento de descubrimiento aparece en cada artículo con la URL
  correcta.
- El acceso para el lector funciona con y sin acompañamiento declarado
  —no depende de la tarjeta—.
- El protocolo generado apunta a la URL `.md` y la suite de pruebas lo
  refleja.
- `check`, `lint`, `test` y `build` en verde; el descubrimiento se
  verifica en el HTML servido y la afordancia con evidencia
  renderizada.

## Procedimiento sugerido

1. Emitir el elemento de descubrimiento en la página del artículo.
2. Apuntar la ficha del protocolo a la versión en texto plano.
3. Diseñar y colocar la afordancia del lector —ubicación y forma según
   la guía—.
4. Verificar en el navegador y en el protocolo compuesto.

## Notas

- Si la afordancia para el lector resulta más simple como un enlace
  discreto junto a los metadatos del artículo que como parte de la
  nota de acompañamiento, esa es la opción: la nota solo existe en
  piezas acompañadas y el acceso debe ser universal.

## Contexto

- **Archivos similares:**
  - `site/src/layouts/Base.astro` — el `<head>` ya emite un
    `rel="alternate"` (RSS) y recibe metadatos por props; el enlace al
    `.md` entra por la misma vía.
  - `site/src/pages/articulos/[...id].astro` — la página del artículo:
    monta `Base`, las líneas `article-meta`/`article-meta-struct` y la
    tarjeta de acompañamiento.
  - `site/src/utils/accompaniment.ts` — `protocolOf` compone la ficha;
    la línea `URL:` hoy apunta al HTML.
  - `site/src/utils/article-markdown.ts` — el compositor de la tarea
    026: la forma de la URL `.md` (`/articulos/<id>.md`) que esta
    tarea anuncia y enlaza.
  - `site/src/styles/global.css` — `.article-meta` (mono, muted,
    `--font-size-meta`) y los enlaces en prosa (acento + subrayado).
- **Patrones:**
  - Metadatos de página entran al layout por props tipadas
    (`title`, `description`, `image`…); el head no recibe markup
    suelto.
  - La voz de metadatos es monoespaciada y muted; los enlaces usan el
    acento (DESIGN.md: la familia mono se reserva a código, metadatos,
    navegación y botones).
  - Sin JS obligatorio para accesos de lectura: la página funciona
    completa sin scripts (el toggle de tema y los botones de copiado
    son mejora progresiva).
- **Dominio:** ninguna aplica —el proyecto no tiene `docs/domains/`.
- **Producto:** ninguna aplica —el proyecto no tiene documentación de
  producto.
- **PRD:** `docs/prd/003-blog-legible-para-maquinas.md` — CU-1 (la
  ficha del protocolo señala el `.md`), CU-2 (acceso visible en toda
  pieza, con o sin acompañamiento) y CU-3 (`rel="alternate"
  type="text/markdown"` en los metadatos).
- **Lecciones:**
  - `texto-para-agentes.md` — la ficha apuntando al `.md` se evalúa
    como prompt: el agente consume la fuente limpia con las pausas en
    posición.
  - `plantillas-de-astro.md` — cuidado con la semántica JSX de las
    plantillas: whitespace junto a etiquetas, `{" "}` para forzar
    espacio.
  - `formato-de-codigo-generado.md` — estilo Prettier desde la
    escritura.
- **Decisiones:**
  - `D006` — en pantallas ≥1240px la nota de acompañamiento vive en
    una columna lateral; el acceso al `.md` es universal y no puede
    depender de esa tarjeta.
- **Investigación:**
  - `docs/research/2026-10-version-legible-para-maquinas.md` —
    `rel="alternate" type="text/markdown"` como elemento `<link>` y la
    afordancia «copiar/ver markdown» junto al artículo.

## Conectividad

**Veredicto: conectada.**

- La emisión del `.md` existe desde la 026: `/articulos/<id>.md`
  servido en build; esta tarea solo lo anuncia y enlaza.
- `Base.astro` ya emite `rel="alternate"` (RSS) y acepta props de
  metadatos —la vía para el enlace de descubrimiento—.
- `protocolOf` compone la línea `URL:` en un solo punto
  (`accompaniment.ts`) con su suite de tests.
- La superficie `article-meta` del artículo es visible en toda pieza,
  con o sin acompañamiento —hogar natural del acceso universal—.
- Las guías de estilo cubren la afordancia: enlaces con acento y
  subrayado, metadatos en mono muted.

## Plan técnico

**Subsistema:** la página del artículo monta `Base.astro` pasando
metadatos por props tipadas; el head ya emite un `rel="alternate"`
—el RSS— junto al canonical. El protocolo se compone en un solo
punto (`protocolOf`). El acceso del lector debe ser universal —la
tarjeta de acompañamiento no existe en todas las piezas—, así que
vive en la superficie de metadatos del artículo, que sí lo es.

- [x] Extender `Base.astro` con una prop opcional `alternateMarkdown`
  que emite `<link rel="alternate" type="text/markdown" href={…}>`
  en el head
  - Aporta: el descubrimiento vive en los metadatos como declara la
    convención; la prop opcional no obliga a las páginas que no son
    artículo
  - Contexto: el head ya emite el alternate del RSS junto al
    canonical —la prop nueva va en esa misma zona—
- [x] Emitir la prop desde `[...id].astro` con `/articulos/<id>.md`
  - Aporta: cada artículo publicado anuncia su `.md` (CU-3)
- [x] Apuntar la línea `URL:` de `protocolOf` a la versión `.md` y
  actualizar la suite de `accompaniment`
  - Aporta: el asistente consume la fuente limpia con las pausas en
    posición (CU-1)
  - Contexto: un solo punto de composición; el test que espera la URL
    HTML cambia a `.md`
- [x] Añadir el acceso del lector en la línea `article-meta-struct`:
  un enlace discreto a la versión `.md`, presente en toda pieza
  - Aporta: acceso universal sin depender de la tarjeta de
    acompañamiento y sin JavaScript (CU-2)
  - Contexto: la nota de acompañamiento no existe en todas las piezas
    —ni el rail de D006 la salva—; DESIGN.md: metadatos en mono
    muted, enlace con acento y subrayado
- [x] Verificación renderizada: comprobar el `<link>` en el HTML
  servido de los tres artículos, el protocolo compuesto apuntando al
  `.md` y el acceso visible con evidencia de navegador
  - Aporta: el criterio exige descubrimiento en HTML servido y
    afordancia con evidencia renderizada

## Suite de pruebas esperada

- La página de cada artículo declara `<link rel="alternate"
  type="text/markdown">` apuntando a su `.md` (CU-3; M — verificado
  en el HTML servido).
- Las páginas que no son artículo no declaran el alternate markdown
  (CU-3; Z).
- El protocolo compuesto señala la URL `.md` del artículo, no la
  página HTML (CU-1; I — test de unidad).
- El acceso al texto plano enlaza al `.md` en toda pieza —acompañada,
  con `agente: false` y sin declarar— (CU-2; M, B — verificado
  renderizado).
- El acceso funciona sin JavaScript, porque es un enlace (CU-2; B).

## Revisión

- Subagente: 2026-10-26 — Aprueba
- Usuario (ejecución): 2026-10-26 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
