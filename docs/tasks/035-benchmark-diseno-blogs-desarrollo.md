# Revisar el diseño del sitio con benchmark frente a blogs de desarrollo web

## Estado

[x] Completada

## Tipo

desarrollo

## Objetivo

Mejorar el diseño visual y de lectura del sitio comparándolo con blogs populares de desarrollo web. La tarea busca sitios comparables por temática, los revisa en un navegador real, describe las mejores prácticas que muestran y aplica las que encajen con el sitio.

## Dependencias

Ninguna

## Entrada

- El sitio en `site/` y su estado actual de diseño, revisado en un navegador.
- Navegador para abrir y revisar los sitios de referencia.
- Selección de blogs de desarrollo web populares y comparables por temática (documentación técnica, artículos largos, código de ejemplo).
- Excluido de esta referencia: `DESIGN.md`. No se toma como fuente de decisiones de diseño en esta tarea.

## Resultado esperado

- Un documento de investigación en `docs/research/` con los sitios de referencia elegidos, por qué son comparables, las observaciones de cada uno y la lista de mejores prácticas descritas.
- Cambios de diseño aplicados sobre el sitio (CSS, HTML o componentes en `site/`) que implementan las prácticas seleccionadas.
- Registro en esta tarea de qué prácticas se aplicaron y cuáles se descartaron, con su razón.

## Criterios de calidad

- Hay al menos tres sitios de referencia, cada uno abierto con el navegador y revisado en vista de escritorio y móvil.
- Cada práctica descrita indica el sitio o sitios donde se observó y el problema del sitio actual que resuelve.
- Los cambios aplicados no alteran el contenido de los artículos ni el comportamiento de las demos interactivas.
- El build del sitio y las pruebas existentes pasan tras los cambios.
- Las páginas principales (portada, índice de artículos y página de artículo) se revisan renderizadas tras los cambios, sin errores visibles de layout en escritorio ni en móvil.
- Ningún cambio se justifica por `DESIGN.md`.

## Procedimiento sugerido

1. Seleccionar al menos tres blogs de desarrollo web populares y comparables, y anotar por qué lo son.
2. Abrir cada sitio con el navegador, revisar su portada, un artículo y su navegación en escritorio y móvil, y capturar observaciones.
3. Abrir el sitio local y revisar las mismas vistas con los mismos criterios.
4. Describir las mejores prácticas observadas y priorizarlas según el impacto en la lectura.
5. Aplicar las prácticas priorizadas sobre el sitio y verificar el resultado renderizado.
6. Registrar en esta tarea las prácticas aplicadas y las descartadas.

## Contexto

- Archivos similares: `site/src/styles/global.css` (tokens y estilos globales, 764 líneas), `site/src/layouts/Base.astro` (cabecera, pie, tema claro/oscuro), `site/src/pages/index.astro` (portada con la lista de artículos), `site/src/pages/articulos/[...id].astro` (página de artículo), `site/src/components/AccompanimentCard.astro` (nota de acompañamiento).
- Patrones: todo valor visual sale de las custom properties de `:root` en `global.css`; los temas claro y oscuro se definen en `:root` y `:root[data-theme="dark"]`; las medidas de texto usan `--container-max` (68ch) y el espaciado usa `--space-*`.
- Dominio: ninguna aplica (el proyecto no tiene documentación de dominio).
- Producto: ninguna aplica (no hay directorio de documentación de producto).
- PRD: tarea suelta, sin PRD de conjunto. Como referencia de comportamiento, `docs/prd/001-sitio-base-del-blog.md` declara CU-2 (lectura con identidad propia, código copiable), CU-3 (portada que presenta el blog con identidad propia y lista por fecha) y CU-4 (imagen de compartir con la identidad).
- Lecciones: `alcance-de-la-verificacion.md` (el diseño se verifica con evidencia renderizada en el navegador, no con tests automatizados; «mismo resultado» significa mismo diseño y no mismo HTML) y `metadatos-clave-valor.md` (la identidad arbitra los patrones de UI: el metadato estructural va como `clave: valor`, sin chips que insinúen interactividad).
- Decisiones: `D006-columna-lateral-para-el-acompanamiento-en-pantallas-anchas.md` (la columna única es la regla general; la única excepción es la columna lateral de 280px desde 1240px para la nota de acompañamiento). Vigente aunque `DESIGN.md` quede fuera de la referencia de esta tarea.
- Vacíos detectados: ninguno que bloquee la planeación.

## Conectividad

**Veredicto: conectada.**

Lo que la tarea asume existe en el codebase: el sitio renderiza portada, página de artículo y cabecera con tema claro y oscuro (`Base.astro`, `index.astro`, `[...id].astro`); el diseño vive en tokens de `global.css` que cualquier cambio visual puede reutilizar; y las páginas se pueden servir localmente para revisarlas en el navegador. El benchmark no depende de código del proyecto. No hay una capacidad base que falte.

## Notas

- Tarea general de diseño, sin hito propio.
- `DESIGN.md` queda fuera de la referencia de esta tarea. Si algún cambio aplicado contradice ese documento, no se modifica en esta tarea; se anota aquí para decidir después.
- Documento de investigación: `docs/research/2026-10-benchmark-diseno-blogs-desarrollo.md` (sitios, observaciones, prácticas aplicadas y descartadas).
- Prácticas aplicadas: alinear cabecera y pie con el texto cuando hay columna lateral (1240px); marcar la sección activa en la navegación con `aria-current`; título de artículo de 30px en móvil mediante el token `--font-size-title-narrow`.
- Prácticas descartadas: cambiar paleta o fuentes, añadir hero o imágenes de cabecera, añadir categorías o contenido popular en columna lateral, publicidad, cambiar la medida de lectura (ya era adecuada).
- Segunda ronda (portada): presentación bajo el título, etiqueta «último artículo» y separadores entre entradas, con referencias ishadeed.com, lea.verou.me/blog y ohyescss.com. Filtros por categoría descartados por requerir JavaScript y una decisión de producto.
- Verificación: `prettier --check`, `astro check`, `eslint`, `vitest` (74 pruebas) y `astro build` en verde. Escritorio y móvil revisados renderizados en el sitio local y en las tres referencias, en ambos temas en escritorio.

## Plan técnico

El sitio es Astro con estilos globales en `site/src/styles/global.css`: todos los valores visuales salen de custom properties de `:root`, y los temas claro y oscuro se definen en el mismo bloque. La cabecera y el pie viven en `Base.astro`; la portada en `index.astro`; la página de artículo en `articulos/[...id].astro`. El cambio es solo de presentación: no toca el contenido de los artículos ni las demos.

- [x] Seleccionar tres sitios de referencia por temática y registrar por qué son comparables.
  - Aporta: da una base externa para juzgar el diseño sin depender de `DESIGN.md`.
- [x] Revisar las referencias y la línea base local en escritorio y móvil, en el navegador.
  - Aporta: convierte la comparación en observaciones concretas y medibles, no en impresiones.
- [x] Describir las prácticas observadas y priorizarlas en `docs/research/2026-10-benchmark-diseno-blogs-desarrollo.md`.
  - Aporta: deja trazable qué práctica viene de qué sitio y por qué se aplica o se descarta.
- [x] Alinear cabecera y pie con el texto cuando hay columna lateral, reutilizando el bloque de 1240px que ya existe.
  - Aporta: elimina la desalineación medida (cabecera en x=256, texto en x=100) sin cambiar la medida de lectura de D006.
- [x] Marcar la sección activa de la navegación con `aria-current`, con el estilo de foco existente.
  - Aporta: la navegación indica dónde está el lector sin añadir elementos.
- [x] Reducir el título de artículo a 30px en móvil mediante el token `--font-size-title-narrow`.
  - Aporta: evita que el título ocupe tres líneas en 390px.
- [x] Añadir presentación bajo el título de la portada, etiqueta «último artículo» y separadores entre entradas, con tokens existentes.
  - Aporta: da contexto al listado y separa las entradas. Ver la desviación 2.

## Suite de pruebas esperada

Las pruebas automatizadas cubren la lógica; el diseño se verifica renderizado (lección `alcance-de-la-verificacion`).

- Las pruebas existentes siguen en verde: `prettier --check`, `astro check`, `eslint`, `vitest` (74 pruebas) y `astro build`. (CU-2, CU-3 y CU-4 no cambian de comportamiento.)
- CU-3 (portada): la lista sigue ordenada por fecha y la entrada más reciente es la única con la etiqueta. Comprobado en escritorio.
- CU-2 (lectura): el artículo no desborda en 390px y el título baja a 30px. Comprobado.
- D006: desde 1240px la cabecera, el texto y el pie comparten el mismo borde izquierdo, y la nota de acompañamiento sigue en su columna. Comprobado en 1280px.
- Sección activa: «artículos» tiene `aria-current` en la portada y en los artículos. Comprobado.
- Temas: claro y oscuro se ven con el contraste de los tokens existentes. Comprobado en escritorio.
- Sin desbordamiento horizontal en 390px y 1280px. Comprobado.

## Desviaciones del plan

1. **El plan se ejecutó antes de registrarse en el archivo.** Se presentó en el chat y se aprobó con «comienza», pero la sección de plan y la de suite no se escribieron antes de editar el código. Se registran ahora, con lo realizado. La planeación debe quedar en el archivo antes de ejecutar; así lo marca el flujo.
2. **Cambios en la portada fuera de la lista original.** El plan citaba `index.astro` solo para ajustar el listado. Después se añadieron la presentación bajo el título, la etiqueta «último artículo» y los separadores, a partir de la segunda ronda de benchmark pedida por el usuario. Son cambios de presentación con tokens existentes y no alteran la lógica de la portada.
3. **La página de artículo no se tocó.** El plan la listaba como zona de aplicación; el único ajuste que le afecta es el título en móvil, que se resuelve en la hoja global.
4. **La presentación de la portada ocupa cuatro líneas en móvil a 24px.** No estaba en el plan. Es un punto de atención, no un defecto verificado: si el usuario lo considera pesado, pasa a 20px.
5. **Estilo de la sección activa.** El plan pedía «el estilo de foco existente». Se implementó un subrayado con los tokens propios `--nav-current-width` y `--nav-current-offset`, no con `:focus-visible`, porque la sección activa no es un estado de foco y debe verse sin teclado.
6. **Título de 30px solo en la página de artículo.** La regla de 640px se acota a `article.prose h1`. Así la portada conserva su título de 36px, que no estaba en el plan.
7. **Criterio de referencias redactado sin el navegador concreto.** El criterio decía «abierto con Firefox». Se cambió a «abierto con el navegador» para seguir la indicación del usuario de no mencionar el navegador concreto en la tarea. El criterio cambia solo en la redacción, no en lo que se exige.

## Revisión

- Subagente: 2026-10-31 — Aprueba (ronda 4; las rondas 1 a 3 solicitaron cambios, aplicados en la tarea)
- Usuario (ejecución): 2026-10-31 — Aprueba
- Usuario (cierre): 2026-11-01 — Aprueba
