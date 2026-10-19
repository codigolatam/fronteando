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

- Id: 20261016T172500
  Tarea: 012-guia-de-tono-editorial
  Esperado: incisos con raya larga pegada como patrón de la casa
  Obtenido: el usuario prefiere paréntesis sobre guiones para incisos
  Corrección: la casa prefiere paréntesis sobre la raya larga para incisos —aplica a posts y a la escritura del proyecto en general—; la guía lo codifica y los documentos nuevos lo siguen
  Estado: consolidada

- Id: 20261016T172515
  Tarea: 012-guia-de-tono-editorial
  Esperado: la guía justificaba reglas citando «los posts publicados» y la construcción en curso («que las tareas 013-015 crean»)
  Obtenido: el usuario señaló que «los posts publicados» es un referente móvil (cada publicación lo redefine) y que nombrar skills inexistentes deja la guía pendiente de actualizar
  Corrección: las reglas de una guía de referencia se escriben atemporales —sin referencias a conjuntos que cambian, precedentes con nombre ni la propia historia de construcción—
  Estado: consolidada

- Id: 20261016T172530
  Tarea: 012-guia-de-tono-editorial
  Esperado: categorías como pilares del manifiesto (css, javascript, frameworks, accesibilidad, rendimiento, meta)
  Obtenido: el usuario objetó que javascript no discrimina en un blog de frontend —rendimiento y arquitectura hablan de javascript igual—: no es ortogonal
  Corrección: las categorías son especializaciones ortogonales y mutuamente excluyentes (una por post, vocabulario cerrado); lo que todo el corpus comparte es tag, no pilar; nivel es opcional para piezas que no enseñan por grados
  Estado: consolidada

- Id: 20261016T172545
  Tarea: 012-guia-de-tono-editorial
  Esperado: chips de metadato para nivel y categoría, reutilizando la forma del chip de código inline
  Obtenido: el usuario pidió evaluar si el chip era el patrón adecuado; al discutirlo, el chip insinúa interactividad que no existe y la voz terminal nativa es `clave: valor`
  Corrección: la identidad «terminal viva» también arbitra patrones de UI, no solo tokens —el metadato estructural va en una segunda línea `clave: valor` en mono muted, diferenciado por etiqueta y no por decoración—
  Estado: consolidada

- Id: 20261017T040043
  Tarea: 013-skill-planear-post
  Esperado: encuadre y checklist como secciones del archivo de tarea, análogas a Plan técnico y Suite del tipo desarrollo
  Obtenido: el usuario propuso un brief como artefacto propio con temas de investigación, material recopilado y borrador del outline —una preparación que permita escribir sin recopilar contexto en la redacción
  Corrección: cuando la preparación de un trabajo excede una sección administrativa —investigación, material, esqueleto— merece artefacto propio con su estado; el archivo de tarea conserva solo el puntero de avance
  Estado: consolidada

- Id: 20261017T040044
  Tarea: 013-skill-planear-post
  Esperado: el formato de las secciones editoriales descrito en la prosa del skill
  Obtenido: el usuario recordó que los skills pueden traer assets de plantilla, y luego pidió un asset de ejemplo completado para entender la plantilla llena
  Corrección: los artefactos que un skill produce se definen como plantilla en `assets/`, no en prosa; y la plantilla se explica mejor con un ejemplo completado sobre material real en `references/`
  Estado: consolidada

- Id: 20261017T040045
  Tarea: 013-skill-planear-post
  Esperado: prosa envuelta en columna (~80 caracteres) por convención del repositorio
  Obtenido: el usuario eligió línea completa para el brief —los ítems se marcan y sustituyen mecánicamente y el corte en columnas produce diffs ruidosos— y enumeraciones como listas anidadas (metadatos, arco, beats del outline)
  Corrección: en artefactos con ítems accionables —checklists, campos enumerados, beats— una línea por ítem y enumeraciones como listas anidadas; las operaciones mecánicas casan por línea
  Estado: consolidada

- Id: 20261017T125004
  Tarea: docs/tasks/014-skill-redactar-post.md
  Esperado: la plantilla del post materializa el contrato del artefacto sin prescribir una forma concreta
  Obtenido: assets/post.md describía en sus placeholders la anatomía del tutorial explicativo (gancho con tensión, resultado primero, límites con sección propia) — el formato del primer post, sesgando los futuros
  Corrección: la plantilla conserva solo lo universal — frontmatter, `<!--more-->` y placeholders neutros —; la anatomía la gobierna la guía y el orden concreto el brief
  Estado: consolidada

- Id: 20261018T191223
  Tarea: docs/tasks/016-planeador-editorial.md
  Esperado: la description del skill declara su razón de ser —el para qué— como hacen las hermanas del catálogo
  Obtenido: la description de gestionar-piezas enumeraba las operaciones del procedimiento (captura, promueve, mueve) en lugar del propósito
  Corrección: la description dice para qué existe el skill —vista única del contenido, captura sin compromiso, escritura solo de piezas listas— y el procedimiento vive en el cuerpo
  Estado: consolidada

- Id: 20261018T191224
  Tarea: docs/tasks/016-planeador-editorial.md
  Esperado: el índice muestra de un vistazo dónde está cada elemento
  Obtenido: las líneas de «## series» eran punteros desnudos — la posición en lista plana no codifica el estado del arco, a diferencia de las secciones kanban
  Corrección: la línea del índice lleva como sufijo aquello que la posición no codifica — «- [título](series/<slug>.md) — <estado>»
  Estado: consolidada
