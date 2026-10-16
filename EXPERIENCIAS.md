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

- Id: 20261016T133602
  Tarea: 010-ci-de-calidad-en-prs
  Esperado: que todos los checks de calidad informen su resultado en cada PR, aunque uno falle
  Obtenido: un solo job con los cuatro checks como pasos secuenciales —un fallo saltaba el resto y solo se veía el primer check roto
  Corrección: un job por check vía strategy.matrix con fail-fast: false, de modo que un fallo no enmascare a los demás y el PR muestre un check independiente por verificación
  Estado: consolidada

- Id: 20261016T151944
  Tarea: 011-redactar-post-mini-store
  Esperado: la ronda de escritura cubre el texto que se entrega
  Obtenido: la ronda corrió sobre el borrador, pero dos párrafos reescritos después por la revisión técnica quedaron sin revisar —el usuario lo detectó preguntando si la ronda había corrido—
  Corrección: la ronda de escritura corre sobre la versión final; cualquier reescritura posterior necesita una pasada nueva sobre lo cambiado
  Estado: consolidada

- Id: 20261016T151952
  Tarea: 011-redactar-post-mini-store
  Esperado: el previo de la portada funciona como pieza propia
  Obtenido: el extracto de dos párrafos resultó largo y dejó una línea huérfana; el usuario pidió cerrar el gancho dentro del previo e integrar «No lo es.» en el párrafo
  Corrección: diseñar el previo como unidad —breve, que cierra su gancho dentro del extracto— y colocar el marcador de corte donde eso se cumple
  Estado: consolidada

- Id: 20261016T151954
  Tarea: 011-redactar-post-mini-store
  Esperado: el artículo nuevo encabeza la portada por ser el más reciente
  Obtenido: aparecía segundo: dos artículos el mismo día empatan en el orden por fecha y el desempate cae al alfabeto
  Corrección: las fechas de publicación llevan la hora real —la del commit/merge de cada artículo— para que el orden sea determinista
  Estado: consolidada
