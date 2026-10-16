# Experiencias

<!-- Registro append-only de las correcciones que el usuario hace al agente
     durante la ejecución de tareas. Cada entrada documenta la brecha entre
     el resultado esperado y el obtenido.

     Las entradas nunca se editan ni se borran. Gestionado por el skill
     destilar-lecciones. -->

- Id: 20261015T134400
  Tarea: docs/tasks/001-andamiaje-del-sitio.md
  Esperado: el código nuevo sale ya conforme al formatter del proyecto —Prettier: dos espacios, comillas dobles—
  Obtenido: los archivos .astro y astro.config.mjs se escribieron con indentación de tabs y comillas simples, estilo ajeno al del proyecto
  Corrección: escribir el código directamente en el estilo del formatter del proyecto —o pasar el formatter antes de presentarlo— en lugar de confiar en un pase posterior
  Estado: consolidada

- Id: 20261016T094353
  Tarea: docs/tasks/004-tema-base-y-layout.md
  Esperado: que el texto de la página de prueba renderizara «algo de énfasis» con su espacio
  Obtenido: «algo deénfasis» — el salto de línea entre texto y etiqueta desapareció en el HTML servido
  Corrección: Astro trata la plantilla con semántica JSX y elimina el whitespace con saltos de línea adyacente a etiquetas en vez de colapsarlo a espacio como HTML; forzar el espacio con la expresión {" "} — también revisar otros bordes texto-etiqueta, que el padding del chip de código disimulaba el mismo bug
  Estado: consolidada

- Id: 20261016T105915
  Tarea: docs/tasks/005-pagina-de-articulo.md
  Esperado: una «ronda de revisión de escritura» corre el flujo completo de escritura del proyecto
  Obtenido: solo se ejecutó revisar-redaccion; el usuario tuvo que pedir explícitamente también el pulido mecánico
  Corrección: una ronda de escritura comprende revisar-redaccion seguida de pulir-escritura —estilo y luego ortotipografía/formato—; no detenerse tras el primer skill
  Estado: consolidada
