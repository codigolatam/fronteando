# Tema base y layout

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Materializar la identidad visual definida en `DESIGN.md` como el tema del sitio: tokens, tipografía, layout de lectura y estilos de prosa y código.

## Dependencias

- 001
- 003

## Entrada

- `DESIGN.md` actualizado con la identidad visual acordada.
- El proyecto Astro funcional y su página de prueba.
- El enfoque de `aplicar-guia-estilo` como guía de cumplimiento del contrato.

## Resultado esperado

- Tokens de diseño declarados como custom properties en `:root`, según la guía.
- Layout de página completo: cabecera con el nombre del sitio y navegación, columna de lectura, pie.
- Estilos de prosa para el contenido —títulos, párrafos, listas, enlaces— y de bloques de código con su botón copiar, según el contrato de la guía.
- La página de prueba del andamiaje muestra el tema aplicado.

## Criterios de calidad

- Todo valor visual del código referencia los tokens de la guía: sin literales fuera de `:root`.
- El layout cumple el contrato de experiencia: lectura estable, foco visible, objetivos de 44px, contraste AA.
- El resultado se verifica renderizado, con evidencia visual —no solo estática.

## Procedimiento sugerido

1. Declarar los tokens de `DESIGN.md` como custom properties.
2. Construir el layout base: cabecera, columna de lectura, pie.
3. Aplicar la escala tipográfica y los estilos de prosa y código.
4. Verificar contra la guía con evidencia renderizada.

## Contexto


- Archivos similares: `site/src/layouts/Base.astro` —layout mínimo a extender con cabecera, columna de lectura y pie— y `site/src/pages/index.astro` —página de prueba que ejercita el tema—; la maqueta temporal `/tmp/fronteando-identidad/index.html` —fuera del repo— es la referencia visual acordada en 003, no un entregable.
- Patrones: todo valor visual sale de tokens en `:root`; Astro sin framework de UI, estilos en hoja global o `<style>` de componente; todo lo derivado se produce en build time, sin runtime; `DESIGN.md` es el contrato y `aplicar-guia-estilo` valida el resultado con evidencia renderizada.
- Dominio: ninguno —el proyecto no tiene `docs/domains/`—.
- Producto: ninguno —el proyecto no tiene `product-docs/`—.
- PRD: `docs/prd/001-sitio-base-del-blog.md` — CU-2 exige prosa y código legibles con la identidad y código copiable en un gesto; el comportamiento «Identidad» exige que ninguna página se sirva con la apariencia por defecto del generador.
- Lecciones: `formato-de-codigo-generado` —el código nuevo se escribe ya en el estilo del formatter del proyecto—.
- Decisiones: ninguna vigente aplica —D001 cubre solo el despliegue—.
- Guía de estilo: `DESIGN.md` —contrato que esta tarea materializa: paleta dual, trío IBM Plex, tokens de espaciado/forma/layout, marca `fronteando_`, checkpoints `> NN` y contrato de experiencia—.

## Conectividad


**Veredicto:** conectada.

Todo lo que la tarea asume existe: `DESIGN.md` declara el contrato completo con tokens nombrados —color dual, tipografía, espaciado, forma y layout—; el proyecto Astro de `site/` compila y se despliega; `Base.astro` e `index.astro` son los puntos de anclaje donde el tema aterriza. La única pieza no resuelta —cómo llegan las fuentes IBM Plex al sitio— es una decisión de implementación absorbible dentro del alcance, no una dependencia externa.

## Plan técnico


`site/` es Astro estático sin estilos: `Base.astro` solo declara html/head/body con slot y `index.astro` es la página de prueba. El tema aterriza en una hoja global con todos los tokens, el layout extendido y la carga de fuentes. Decisiones transversales: todo valor visual referencia tokens de `DESIGN.md`; no hay runtime —el JS de cliente para el tema y el copiado es estático, servido como asset—; los componentes del acompañamiento LLM (checkpoints, cards) no se implementan —fuera del alcance de la épica— aunque sus tokens ya están declarados.

- [x] Crear `site/src/styles/global.css` con los tokens: `:root` tema claro y overrides en `prefers-color-scheme: dark` y en `[data-theme]` explícito
  - Aporta: materializa la fuente única de valores —color dual, `--font-*`, `--space-*`, `--radius`, `--container-*`, `--gutter*`
  - Contexto: `data-theme` convive con la media query porque la guía exige «elección explícita del lector»
- [x] Autoalojar IBM Plex vía `@fontsource/*` (Serif 700; Sans 400/600; Mono 400/500), importadas en el frontmatter del layout
  - Aporta: cumple cortes declarados y `font-display: swap` sin depender de CDN externo
  - Contexto: `@fontsource` sirve woff2 con `display: swap` por defecto; importar solo los pesos declarados
- [x] Extender `Base.astro`: cabecera con marca `fronteando_` (Mono 500, cursor acento estático) enlazando a `/`, nav en mono minúsculas, `<main>` en columna `--container-max` con gutters y pie en mono meta
  - Aporta: el layout de columna única del contrato
  - Contexto: no hay secciones que enlazar todavía —005/006 las crean—; la cabecera lleva marca y toggle con la estructura de nav lista
- [x] Conmutador de tema en la cabecera: botón ghost mono y script inline en `<head>` que resuelve `data-theme` antes del primer paint —localStorage, si no `prefers-color-scheme`— y persiste la elección
  - Aporta: la «elección explícita del lector» sin flash de tema ni desplazamiento —lectura estable—
- [x] Estilos de prosa en la hoja global: h1 Serif 700 a `--font-size-title`, h2 a `--font-size-section`, h3 Sans 600 a `--font-size-body`, prosa Sans a `--font-size-body` lh 1.65, enlaces con acento y subrayado permanente, `strong` 600 y código inline en chip `surface` con borde a 0.9em
  - Aporta: CU-2 — prosa legible con identidad
- [x] Bloque de código: `pre` en `surface` con `--radius`, Mono a `--font-size-code`, scroll horizontal sin wrap y botón copiar visible al hover/foco con confirmación ≤150ms —posicionado absoluto para no desplazar layout—
  - Aporta: CU-2 — código copiable en un gesto con confirmación
- [x] Garantías transversales: `:focus-visible` con contorno `--color-accent`, objetivos interactivos de al menos 44×44px y transiciones de estado ≤150ms
  - Aporta: el contrato de experiencia —operable por teclado y táctil—
- [x] Extender `index.astro` para ejercitar el tema: h2/h3, enlace, `strong`, lista, código inline y bloque de código con copia
  - Aporta: el banco de pruebas renderizado que el criterio de calidad exige como evidencia

## Suite de pruebas esperada


- El build compila sin errores y `/` sirve la página de prueba con la identidad aplicada — CU-2 (I).
- La hoja de estilos no contiene literales de color, tamaño o espaciado fuera de `:root` y sus overrides de tema — CU-2 (B).
- Alternando el tema —media query o conmutador— todos los roles de color cambian juntos, sin superficie del tema contrario — CU-2 (I).
- Todo par texto/fondo usado cumple AA ≥4.5:1 en ambos temas — CU-2 (B).
- El bloque de código muestra el botón copiar al foco o al puntero, confirma el copiado en ≤150ms y el código desplaza horizontalmente sin ajuste de línea — CU-2 (I).
- Recorrer la página por teclado muestra foco visible en cada interactivo y cada objetivo mide ≥44×44px — CU-2 (B).
- La elección explícita de tema persiste entre cargas, sin flash ni desplazamiento de bloques — CU-2 (E).
- `astro check`, ESLint y Prettier pasan limpios — arnés del proyecto (I).

## Desviaciones del plan


- **Conmutador como variante secondary, no ghost:** el plan lo describía ghost; la implementación usa texto `--color-text` con borde `--color-border` —la variante secondary de la guía— por mejor affordance y coherencia con la jerarquía de acciones. Motivo: coherencia con `DESIGN.md`.
- **Tema sin `data-theme` por defecto:** el plan fijaba `data-theme` siempre resuelto antes del primer paint; la revisión detectó que eso congelaba el tema ante cambios del SO tras la carga. Ahora `data-theme` solo se fija cuando hay elección explícita persistida; sin ella la media query responde en vivo y el toggle se muestra con la clase `js`. Motivo: corrección de la revisión técnica.
- **Tokens derivados no nombrados en la guía:** la hoja declara `--line-height-*`, `--border-width`, `--focus-*`, `--duration-fast` y `--target-min` —valores que `DESIGN.md` declara sin nombre de token— para cumplir «sin literales fuera de `:root`». Motivo: hacer verificable el contrato; candidatos a absorber en la guía.

## Revisión

- Subagente: 2026-10-16 — Solicita cambios (hallazgos resueltos en fa4b37e)
- Usuario (ejecución): 2026-10-16 — Aprueba
- Usuario (cierre): 2026-10-16 — Aprueba
