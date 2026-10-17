# Lecciones

<!-- Índice de lecciones aprendidas del proyecto. Cada entrada apunta a una
     nota del directorio y declara sus disparadores —la vía de descubrimiento
     léxico que usan consultar-lecciones y destilar-lecciones—.

     Formato de cada entrada:
     - <archivo-de-la-nota>.md
       - Disparadores: <patrones de archivo, de comando o palabras clave>
       - Resumen: <qué enseña la nota en una frase>
       - Estado: <opcional>

     Las entradas nuevas se añaden al final. Gestionado por el skill
     destilar-lecciones. -->

- formato-de-codigo-generado.md
  - Disparadores: prettier, format, formatter, .astro, astro.config, archivos nuevos, código generado
  - Resumen: el código nuevo debe escribirse ya en el estilo del formatter del proyecto, no con un estilo ajeno a la espera de un pase posterior

- plantillas-de-astro.md
  - Disparadores: .astro, páginas Astro, plantillas, markup inline, whitespace, JSX, expresiones
  - Resumen: trampas de la semántica JSX de las plantillas `.astro` —p. ej. el whitespace con saltos de línea junto a etiquetas desaparece y el espacio se fuerza con `{" "}`—

- flujo-de-escritura.md
  - Disparadores: escritura, redacción, revisión de texto, pulir, artículos, documentos en español, ronda de escritura
  - Resumen: una ronda de revisión de escritura corre el flujo completo —`revisar-redaccion` para el estilo y `pulir-escritura` para la mecánica, en ese orden—

- checks-de-ci-independientes.md
  - Disparadores: github actions, workflow, ci.yml, CI, checks, matrix, .github/workflows, pull request
  - Resumen: en CI, un job por check —no pasos secuenciales— para que un fallo no enmascare al resto y el PR muestre un check por verificación

- previos-de-articulos.md
  - Disparadores: previo, excerpt, more, portada, índice de artículos, artículos, gancho, introducción
  - Resumen: el previo se diseña como pieza propia —breve y con el gancho cerrado dentro del extracto—; el corte va donde la unidad se cumple

- fechas-de-publicacion.md
  - Disparadores: date, fecha, publicación, orden de artículos, frontmatter, sort, portada, RSS
  - Resumen: las fechas de publicación llevan la hora real del commit/merge; sin ella dos artículos el mismo día empatan y el orden cae al alfabeto

- incisos-entre-parentesis.md
  - Disparadores: inciso, raya, em-dash, guiones, paréntesis, ortotipografía, EDITORIAL.md
  - Resumen: la casa prefiere paréntesis sobre la raya larga para incisos —aplica a posts y a la escritura del proyecto—

- reglas-atemporales.md
  - Disparadores: guía, referencia, DESIGN.md, EDITORIAL.md, contrato, reglas, convenciones, documento de estilo
  - Resumen: las reglas de una guía de referencia se escriben atemporales —sin conjuntos móviles, precedentes con nombre ni historia de construcción—

- taxonomia-de-contenido.md
  - Disparadores: categoria, tags, taxonomía, pilares, nivel, frontmatter, enum, metadatos, ortogonal
  - Resumen: las categorías son especializaciones ortogonales mutuamente excluyentes —lo que todo el corpus comparte es tag, no pilar—; nivel es opcional

- metadatos-clave-valor.md
  - Disparadores: metadatos, chips, badges, patrones UI, article-meta, nivel, pilar, terminal
  - Resumen: la identidad también arbitra patrones de UI —el metadato estructural va en `clave: valor`, no en chips que insinúan interactividad—

- preparacion-como-artefacto.md
  - Disparadores: brief, artefacto, plan, planeación, preparación, encuadre, archivo de tarea, documento de trabajo, SKILL.md
  - Resumen: cuando la preparación de un trabajo excede una sección administrativa —investigación, material, esqueleto— merece artefacto propio con su estado; la tarea conserva solo el puntero de avance

- assets-de-skills.md
  - Disparadores: skill, SKILL.md, assets, plantilla, template, ejemplo, references, artefacto, formato, sesgo, anatomía
  - Resumen: los artefactos que un skill produce se definen como plantilla en `assets/`, no en prosa; la plantilla se explica mejor con un ejemplo completado sobre material real en `references/` y lleva solo el contrato universal, no la forma de una pieza concreta

- lineas-completas-en-artefactos.md
  - Disparadores: artefacto, checklist, línea, formato, plantilla, brief, markdown, marcar-item, lista anidada
  - Resumen: en artefactos con ítems accionables —checklists, campos enumerados, beats— una línea por ítem y enumeraciones como listas anidadas; las operaciones mecánicas casan por línea
