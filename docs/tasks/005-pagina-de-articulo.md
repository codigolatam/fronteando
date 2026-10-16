# Colección de artículos y página de artículo

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dar al blog su contenido: la colección de artículos en Markdown con esquema validado y la página que los presenta para leer.

## Dependencias

- 004

## Entrada

- El tema y el layout implementados.
- El modelo de contenido del brief: el artículo como unidad, escrito en Markdown en el repositorio.
- Un primer artículo real de muestra —la presentación del blog—, escrito con el usuario o redactado para su revisión.

## Resultado esperado

- Colección de contenido de artículos con esquema validado: título, fecha, resumen, etiquetas y estado de borrador o publicado.
- Página de artículo que renderiza el Markdown sobre el tema: prosa legible, código resaltado, metadatos visibles.
- URL por artículo y orden por fecha.
- Un primer artículo publicado que demuestra el pipeline completo, de Markdown a página.

## Criterios de calidad

- El build falla ante un frontmatter que incumpla el esquema: la validación es real.
- La página de artículo cumple la guía de estilo en prosa y código.
- Los borradores no se publican.

## Procedimiento sugerido

1. Declarar la colección con su esquema.
2. Crear la ruta y la plantilla de artículo.
3. Escribir o incorporar el primer artículo.
4. Verificar build, esquema y render.

## Notas

- El esquema no incluye todavía los campos del acompañamiento —checkpoints y contexto—: es la idea `lectura-acompanada-por-llm`, que los declarará sobre esta colección.

## Contexto

- Archivos similares:
  - `site/src/pages/index.astro` — único consumidor actual de `Base` + `.prose`; modelo de página.
  - `site/src/layouts/Base.astro` — layout a reutilizar; su script ya envuelve cualquier `.prose pre` con el botón copiar, así que el Markdown renderizado hereda la copia sin trabajo extra.
  - `site/src/styles/global.css` — tokens semánticos duales y estilos `.prose` vigentes; punto de extensión para los tokens de sintaxis.
  - `site/astro.config.mjs` — donde se declara `markdown.shikiConfig`.
- Patrones:
  - Todo valor visual referencia tokens de `DESIGN.md`; los valores derivados se declaran como custom properties en `:root`, nunca literales en reglas.
  - El código nuevo sale ya en estilo Prettier (dos espacios, comillas dobles).
  - En plantillas `.astro`, el espacio entre texto y etiqueta que cruza un salto de línea se fuerza con `{" "}`.
  - El sitio compila estático en build time, sin runtime; el servidor de desarrollo corre con `astro dev --background`.
- Dominio: ninguna aplica — el proyecto no tiene documentación de dominio.
- Producto: ninguna aplica — el proyecto no tiene documentación de producto.
- PRD (`docs/prd/001-sitio-base-del-blog.md`):
  - CU-1: publicar es fusionar un Markdown cuyo frontmatter rompe el build si incumple el esquema; el borrador nunca se publica.
  - CU-2: leer un artículo con la identidad — prosa y código legibles, código copiable en un gesto.
- Épica (`docs/epics/001-sitio-base-del-blog.md`):
  - El plan técnico fija que el esquema de la colección es la frontera donde `lectura-acompanada-por-llm` declarará sus campos después: no se anticipan.
  - Todo lo derivado se produce en build time.
- Lecciones:
  - `formato-de-codigo-generado.md` — escribir archivos nuevos ya en el estilo del formatter.
  - `plantillas-de-astro.md` — `{" "}` en los bordes texto-etiqueta de `.astro`.
- Decisiones:
  - D001 — el sitio es un Worker de assets estáticos: la colección compila a HTML en build; no hay runtime.
- Otras fuentes:
  - `DESIGN.md` — contrato visual: bloque de código con resaltado sobrio; prosa con medida, jerarquía y contraste ya implementados en `.prose`.
  - API vigente de Astro 7 verificada en la documentación oficial: colecciones en `src/content.config.ts` con `defineCollection` + loader `glob()` + esquema Zod (`astro/zod`); consulta con `getCollection` y render con `render()` de `astro:content`; rutas dinámicas `[...id]` con `getStaticPaths`; `markdown.shikiConfig` acepta el tema `css-variables`, que emite `var(--astro-code-*)` —la vía documentada para resaltar sin colores ajenos al contrato—.

## Conectividad

Conectada — todo lo que la tarea asume existe con la forma esperada: `Base.astro` y los estilos `.prose`/tokens ya implementados y genéricos (el script de copia actúa sobre cualquier `.prose pre`, incluido el que renderiza Markdown); el directorio `site/src/content/` existe vacío; Astro 7 trae integrada la capa de contenido (colecciones, `glob`, Zod, `render`) y Shiki con el tema `css-variables`. No se necesita capacidad base nueva.

## Plan técnico

Aprobado por el usuario.

- [x] `site/src/content.config.ts` — colección `articulos` con `glob({ base: "./src/content/articulos" })` y esquema Zod: `title`, `description`, `date`, `tags` (default `[]`), `draft` (default `false`)
  - Aporta: la frontera validada — frontmatter inválido rompe el build (CU-1); sin campos del acompañamiento, que son de la idea LLM
  - Contexto: `z` se importa de `astro/zod` en Astro 7; `glob` de `astro/loaders`
- [x] `site/astro.config.mjs` — `markdown.shikiConfig.theme: "css-variables"`
  - Aporta: Shiki emite `var(--astro-code-*)` en lugar de colores hex — el resaltado queda gobernado por nuestros tokens
  - Contexto: los temas predefinidos meterían literales hex fuera del contrato de `DESIGN.md`
- [x] `site/src/styles/global.css` — tokens `--astro-code-*` en `:root` y en los dos selectores del tema oscuro, mapeados a colores semánticos
  - Aporta: resaltado sobrio en ambos temas sin un solo literal fuera de la guía
  - Contexto: regla del proyecto — valor no tokenizado → token derivado en `:root`
- [x] `site/src/pages/articulos/[...id].astro` — `getStaticPaths` con `getCollection` filtrando `!data.draft`; página `Base` con título (h1), línea de metadatos (fecha localizada + tags) en mono muted y `<Content />` en `.prose`
  - Aporta: URL por artículo `/articulos/<slug>`, metadatos visibles, borradores sin página (CU-1/CU-2)
  - Contexto: el script de copia de `Base` ya cubre el `pre` del Markdown; los metadatos van en mono según la guía
- [x] `site/src/content/articulos/hola-fronteando.md` — primer artículo: presentación del blog, redactado para revisión del usuario en el PR; ejercita h2/h3, listas, código inline, un bloque `js` y enlace
  - Aporta: el banco end-to-end del pipeline y el primer contenido real
  - Contexto: requisito de la tarea — «escrito con el usuario o redactado para su revisión»

Fuera de alcance (queda para la 006): portada/índice con orden por fecha — `index.astro` sigue siendo el banco del tema.

## Suite de pruebas esperada

Aprobada por el usuario.

- `check` / `lint` / `format:check` / `build` pasan —(B)
- El build produce `/articulos/hola-fronteando/` —(O)
- Artículo renderizado: título Serif, meta en mono muted, bloque `astro-code` con `var(--astro-code-*)`, botón copiar funcional — en ambos temas, con evidencia —(O)
- `draft: true` no produce página —(B)
- Frontmatter inválido rompe el build —(I)
- El HTML del código solo lleva `var(--astro-code-*)`, ningún hex —(B)

## Desviaciones del plan

- Los tokens `--astro-code-*` se declararon una sola vez en `:root`, sin duplicarlos bajo los dos selectores del tema oscuro que mencionaba el plan: como referencian los tokens semánticos (`--color-text`, `--color-accent`, …), que ya alternan por tema, la resolución es automática. El plan describía la ubicación; el resultado —resaltado por tema sin literales— es idéntico con una definición.
- Se corrigió un error de tipos preexistente en `Base.astro` (`querySelectorAll` devuelve `Element`, sin `tabIndex`): la capa de contenido endureció el typecheck de `astro check` y lo detectó. Fix absorbido: `querySelectorAll<HTMLElement>`.
- El artículo final no incluye h3 ni la sección de funcionamiento: la ronda editorial con el usuario llevó el texto a presentación pura del proyecto (qué representa, a quién habla, qué promete). Conserva h2, lista, código inline, bloque `js` (hola mundo) y enlace —el resto del banco queda cubierto; el h3 lo demostrará el primer artículo técnico.

## Revisión

- Subagente: 2026-10-16 — Aprueba
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
