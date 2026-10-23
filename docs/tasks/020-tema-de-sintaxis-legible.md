# Mejorar el tema de sintaxis del código

## Estado

[ ] Pendiente | **[~] En progreso** | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Mejorar el resaltado de sintaxis de los bloques de código para que distinga los elementos léxicos —palabras clave, cadenas, funciones, comentarios, números— en ambos temas del sitio: hoy el código es difícil de leer porque el resaltado no enfatiza las diferencias.

## Dependencias

- Ninguna

## Entrada

- `site/astro.config.mjs` — `shikiConfig` con `theme: "css-variables"`: los colores léxicos salen de variables CSS, no de un tema empaquetado.
- `site/src/styles/global.css` — donde viven las variables del tema y donde deben declararse los colores del resaltado por tema claro y oscuro.
- `DESIGN.md` — la paleta y los tokens del sitio; el resaltado debe salir de ella, no de colores ajenos.
- El skill `aplicar-guia-estilo` — valida que todo valor visual proviene de tokens y exige evidencia renderizada.
- `site/src/content/articulos/carrito-a-lo-bruto.md` — el post con más bloques de código, banco de pruebas natural.

## Resultado esperado

- Variables de resaltado definidas por elemento léxico para los temas claro y oscuro, derivadas de la paleta del sitio.
- Evidencia renderizada: un bloque de código variado legible y distinguido en ambos temas.

## Criterios de calidad

- Los elementos léxicos principales —keyword, string, function, comment, number, punctuation— son distinguibles entre sí y del texto plano.
- Contraste suficiente (objetivo AA) sobre el fondo del bloque de código en ambos temas.
- Todo color referencia los tokens de `DESIGN.md`; ningún literal fuera de la paleta sin justificar.
- `check`, `lint`, `format:check` y `build` en verde; evidencia renderizada adjunta al PR.

## Procedimiento sugerido

1. Inspeccionar el resaltado actual renderizado (dev server en background) e identificar qué variables `--astro-code-*` faltan o repiten color.
2. Definir la asignación de variables por elemento léxico desde los tokens de `DESIGN.md`, para ambos temas.
3. Verificar con `aplicar-guia-estilo` —estática y renderizada— sobre el capítulo 1 y ajustar.
4. Publicar por el ciclo general.

## Notas

- El tema `css-variables` de Shiki emite clases `--astro-code-token-*`; sin variables declaradas el navegador hereda el color del texto — por eso hoy no hay énfasis.
- Si la paleta de `DESIGN.md` no cubre los roles léxicos, extenderla documentando la decisión antes de asignar literales.

## Contexto

- Archivos similares: `site/src/styles/global.css` —los tokens `--astro-code-*` ya están declarados en `:root` como indirección a `--color-*`, el problema es el reparto: seis roles léxicos comparten `--color-accent`, dos caen en `--color-text` y tres en `--color-text-muted`—; `site/astro.config.mjs` —Shiki con `theme: "css-variables"`, emite un conjunto fijo de variables `--astro-code-token-*`—.
- Patrones: dos capas de indirección —`--astro-code-*` es la plomería de Shiki y `--color-*` son los tokens de diseño; el tema oscuro vive en dos bloques (`prefers-color-scheme` y `[data-theme="dark"]`) que repiten la misma paleta; `DESIGN.md` es el contrato y sus reglas se escriben atemporales.
- Dominio: ninguno —el proyecto no tiene `docs/domains/`—.
- Producto: ninguno —el proyecto no tiene `product-docs/`—.
- PRD: `docs/prd/001-sitio-base-del-blog.md` — CU-2 exige prosa y código legibles con la identidad; el principio «el código es contenido» de `DESIGN.md` pide resaltado sobrio.
- Lecciones: `formato-de-codigo-generado` —el CSS nuevo se escribe ya en estilo Prettier—; `reglas-atemporales` —la extensión de `DESIGN.md` se redacta sin precedentes con nombre ni historia de construcción—.
- Decisiones: ninguna vigente aplica —D001 cubre solo el despliegue; D002–D005 son editoriales—.
- Guía de estilo: `DESIGN.md` —su paleta no cubre roles léxicos: solo `text`, `text-muted`, `accent` y `danger` (reservados a interactividad y errores); la tarea contempla extenderla documentando la decisión.
- Datos medidos: en los dos posts con más código, `keyword` (84+73), `constant` (64+42) y `string-expression` (58+11) —los tres roles más frecuentes— comparten hoy el mismo teal; `parameter` no aparece en el corpus, `string` tampoco (las cadenas JS caen en `string-expression`).

## Conectividad

**Veredicto:** conectada.

Todo lo que la tarea asume existe: el tema `css-variables` de Shiki emite un conjunto fijo de variables (`token-keyword`, `token-constant`, `token-string`, `token-string-expression`, `token-function`, `token-parameter`, `token-comment`, `token-punctuation`, `token-link`, `token-inserted/deleted/changed`); `global.css` ya concentra los tokens en `:root` con overrides de tema; `DESIGN.md` es el contrato a extender; el sitio es servible para la evidencia renderizada (`astro dev --background`). La única pieza abierta —los hues concretos de la sub-paleta de sintaxis— es decisión de esta tarea, no dependencia externa.

## Plan técnico

El resaltado hoy solo tiene cuatro colores efectivos porque el reparto de variables colapsa los roles en `accent`/`text`/`muted`. La paleta de `DESIGN.md` no tiene hues para código —el acento está reservado a la señal interactiva y el danger a errores—, así que la tarea la extiende con una sub-paleta de sintaxis por tema y remapea las variables de Shiki a ella. Criterio de asignación: `keyword` al violeta (el rol de control), `constant` al ámbar quemado, `string` y `string-expression` al verde —las etiquetas HTML dentro de template literals siguen siendo contenido de cadena—, `function` al azul, `parameter` al texto plano (son identificadores), `comment` y `punctuation` al muted —el ruido se atenúa—, `link` al acento —es la única pieza interactiva del código—, `inserted` al verde de cadena, `deleted` al danger y `changed` al ámbar de constante —semántica convencional de diffs—.

- [x] Extender `DESIGN.md` en la sección «Color» con la sub-paleta «Sintaxis»: `--color-syntax-keyword`, `--color-syntax-string`, `--color-syntax-function` y `--color-syntax-constant` para ambos temas, con la regla atemporal —los colores de sintaxis no reutilizan acento ni danger, viven solo en bloques de código y cada par con `surface` cumple AA—
  - Aporta: la fuente única de valores léxicos que el criterio exige
  - Contexto: comment/punctuation reutilizan `text-muted` y no ganan token propio —se documenta en la regla—
- [x] Declarar los cuatro tokens en `global.css`: `:root` claro —keyword `#7c3aed` (4.96), string `#3f6212` (6.16), function `#1d4ed8` (5.83), constant `#9a3412` (6.35)— y los dos bloques oscuros —`#a78bfa` (6.03), `#86efac` (11.69), `#93c5fd` (9.11), `#fdba74` (9.74)—, todos AA ≥4.5 sobre su `surface`
  - Aporta: cuatro hues distinguibles por tema sin salir del carácter «terminal viva» —violeta/azul/verde/ámbar sobrios, no neón—
- [x] Remapear `--astro-code-*` a la sub-paleta: keyword→syntax-keyword, constant→syntax-constant, string y string-expression→syntax-string, function→syntax-function, parameter→text, comment y punctuation→text-muted, link→accent, inserted→syntax-string, deleted→danger, changed→syntax-constant
  - Aporta: los tres roles más frecuentes del corpus dejan de compartir color
  - Contexto: el bloque de tokens de código queda solo en `:root` —los valores ya son indirección a `--color-*` y cambian solos con el tema—
- [x] Validación estática: ningún literal fuera de `:root` y sus overrides; recomputar el contraste de cada par syntax/surface en ambos temas; `check`, `lint`, `format:check` y `build` en verde
- [x] Evidencia renderizada: `astro dev --background`, capturar un bloque variado del capítulo 1 en ambos temas (`data-theme` claro y oscuro) y confrontar distinguibilidad y sobriedad con `aplicar-guia-estilo`
  - Aporta: el criterio de evidencia renderizada adjunta al PR

## Suite de pruebas esperada

- Un bloque de código variado del capítulo 1 distingue keyword, constant, string, function, punctuation y comment entre sí y del texto plano —en ambos temas— (I).
- Cada par `--color-syntax-*`/`--color-surface` mide ≥4.5:1 en ambos temas —AA— (B).
- La hoja no contiene literales de color fuera de `:root` y sus overrides de tema; `--astro-code-*` solo referencia tokens (B).
- El acento ya no colorea keywords, strings ni constants dentro del código —solo `token-link`, la pieza interactiva— (B).
- `DESIGN.md` declara los tokens nuevos con regla atemporal —sin literales en el mapa de Shiki justificados por omisión— (B).
- `astro check`, ESLint, Prettier y `build` pasan limpios —arnés del proyecto— (I).

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
