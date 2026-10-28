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

- Id: 20261023T105834
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: la redacción del blog usa el español de su lector
  Obtenido: el borrador y el corpus traían formas peninsulares («carrito de la compra», «amañado») que la revisión editorial solo cazó tarde, sin criterio escrito
  Corrección: la variante del blog es español latinoamericano neutro —entre dos formas correctas se elige la que se entiende en todo el continente y los regionalismos quedan fuera—; quedó declarada en EDITORIAL.md
  Estado: consolidada

- Id: 20261023T105835
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: el borrador sale en la voz de la casa —claro y sin ornamento—
  Obtenido: salió telegráfico y cargado de figuras propias; el usuario reescribió la voz del post ya aprobado y de la edición salieron varias reglas nuevas de la guía
  Corrección: comprensibilidad antes que densidad —frase que no exige deducir nada, metáfora simple y de uso común o ninguna—; quedó codificado en EDITORIAL.md («claro antes que denso», metáforas comunes, eco de la promesa, título descriptivo)
  Estado: consolidada

- Id: 20261023T105836
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: la `description` se evalúa por su función real —preview social, SERP y RSS—
  Obtenido: se evaluó como «útil» por cumplir requisitos formales —longitud, gancho declarado— sin comprobar si abre la pregunta que el post cierra; el usuario preguntó si la redacción servía de verdad al propósito
  Corrección: evaluar el copy por su propósito, no por su cumplimiento formal —la segunda mitad enumeraba la agenda del post en lugar de prometer lo que el lector gana—; cumplir requisitos no equivale a servir al propósito
  Estado: consolidada

- Id: 20261023T105837
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: las decisiones de redacción se resuelven comparando alternativas
  Obtenido: se proponía una redacción por turno y el usuario tuvo que pedir «3 opciones para poder comparar y elegir la mejor» —dos veces en la sesión—
  Corrección: cuando el usuario debe elegir una redacción, presentar 2-4 opciones comparables con su estrategia y una recomendación, no iterar de a una
  Estado: consolidada

- Id: 20261023T105838
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: el hook del preview pone la palabra central donde está el valor para el lector
  Obtenido: la propuesta centraba el mecanismo —«enredo»—; el usuario aclaró que lo central es el efecto y la consecuencia
  Corrección: en el copy que se lee fuera del post, centrar el efecto y la consecuencia que el lector reconoce —«cada cambio nuevo sale más caro»—, no el nombre del mecanismo interno
  Estado: consolidada

- Id: 20261023T105839
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: las frases del post suenan a español hablado en el continente
  Obtenido: construcciones de calco o figuras poco comunes —«espantapájaros», «no es un código roto: es un código sin reparto», «versión difícil de ver»— fueron rechazadas una a una
  Corrección: ante una regresión de sentido, buscar el giro más idiomático en lugar de revertir al original —«no es que falle, sino que cada parte hace de todo»—
  Estado: consolidada

- Id: 20261023T105840
  Tarea: docs/tasks/018-validar-flujo-con-post-mvc.md
  Esperado: el changelog registra solo capacidades del producto
  Obtenido: se registró como entrada la publicación del capítulo 1 —contenido, no capacidad—
  Corrección: las publicaciones de artículos no van al changelog; el changelog registra lo que el producto puede hacer, no el contenido que el blog publica
  Estado: consolidada

- Id: 20261023T143838
  Tarea: docs/tasks/023-composicion-del-material.md
  Esperado: el código nuevo sale en inglés
  Obtenido: el plan e implementación trajeron identificadores, comentarios y nombres de archivo en español (acompanamiento.ts, protocolo-acompanamiento.md, decl, ficha)
  Corrección: funciones, variables, comentarios y nombres de archivo de código en inglés; solo el contenido editorial —metadato agente, texto compuesto del protocolo— sigue en español del blog
  Estado: consolidada

- Id: 20261023T143840
  Tarea: docs/tasks/023-composicion-del-material.md
  Esperado: los nombres de los tests siguen convenciones de testing
  Obtenido: los nombres llevaban referencias internas del proyecto —CU-1, letras ZOMBIE— en lugar de describir el comportamiento
  Corrección: describe nombra la unidad, when el contexto e it el comportamiento esperado; nada de identificadores internos del proyecto en los nombres de test
  Estado: consolidada

- Id: 20261025T171103
  Tarea: docs/tasks/024-experiencia-en-pagina.md
  Esperado: la suite de pruebas esperada pedía tests de render —card, details, marcadores— y HTML idéntico para artículos sin declaración.
  Obtenido: el agente propuso automatizar las expectativas de render y leer el criterio «mismo HTML» literalmente.
  Corrección: el usuario indicó que los tests son para lógica, no para diseño —el diseño se verifica con evidencia renderizada—, y que el criterio es el mismo diseño, no el mismo HTML.
  Estado: consolidada

- Id: 20261025T171104
  Tarea: docs/tasks/024-experiencia-en-pagina.md
  Esperado: la suite pedía HTML idéntico en artículos sin acompañamiento.
  Obtenido: el agente señaló el wrapper article-content como incumplimiento del criterio.
  Corrección: el criterio es el mismo diseño —posiciones, márgenes, fuentes—, no la estructura del DOM; el usuario lo aclaró y se verificó con mediciones renderizadas.
  Estado: consolidada

- Id: 20261025T211939
  Tarea: docs/tasks/025-adaptar-el-corpus.md
  Esperado: las indicaciones de pausa como verificación de la comprensión del lector.
  Obtenido: el agente las redactó como capacidad —«verifica que puedas decir X»—, forma que invita a una pregunta sí/no cuando el asistente la aplica literalmente.
  Corrección: el usuario pidió evaluar el protocolo como instrucción para un agente; las indicaciones quedaron como la acción que el lector produce —«explica», «señala», «nombra»— y el tema como texto explicativo, no oración nominal.
  Estado: consolidada

- Id: 20261025T211940
  Tarea: docs/tasks/025-adaptar-el-corpus.md
  Esperado: la ficha del protocolo suficiente para que el asistente identifique el artículo.
  Obtenido: la ficha llevaba URL, tema, nivel y prerequisitos, pero no el título; propuesto como mejora y el usuario la ordenó aplicar.
  Corrección: evaluar el material que viaja a un asistente como prompt —un agente sin acceso a la URL reconoce el texto por su título—.
  Estado: consolidada

- Id: 20261026T161722
  Tarea: docs/tasks/030-demo-del-carrito.md
  Esperado: que los archivos nuevos cart.ts y cart.test.ts salieran ya escritos en el estilo de Prettier del proyecto
  Obtenido: los archivos se escribieron con un estilo ajeno y el usuario los reformateó a mano
  Corrección: el usuario reformató ambos archivos y recordó que el código nuevo debe escribirse ya en el estilo de Prettier, no a la espera de un pase posterior
  Estado: consolidada

- Id: 20261028T015908
  Tarea: docs/tasks/031-capitulo-2-serie-mvc.md
  Esperado: título y description idiomáticos en español, no calcos del inglés.
  Obtenido: el título decía «el estado que notifica» y la description «un modelo que avisa», ambos calcos (*state that notifies*, *a model that notifies* sin complemento).
  Corrección: el usuario rechazó ambos; se verificó en fuentes técnicas en español que el verbo instalado del patrón es «notificar» y que «avisar» exige complemento («avisar a alguien de algo»). Quedó «un modelo que notifica sus cambios» en título, código y prosa.
  Estado: consolidada
