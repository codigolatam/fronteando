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
