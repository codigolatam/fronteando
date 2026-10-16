# Reglas de guías de estilo para escritura técnica — referencias para EDITORIAL.md

**Fecha:** 2026-10

## Propósito

Recopilar las reglas generales y mejores prácticas de guías de estilo editoriales —las canónicas de documentación técnica y las de blogging técnico— para fundamentar `EDITORIAL.md` (tarea 012) en estándares verificables y no en preferencias.

## Hallazgos

### Guías de estilo canónicas

- **Google developer documentation style guide** [1]: la referencia más completa para documentación técnica. Reglas destacadas:
  - Jerarquía de referencias: primero las reglas del proyecto, luego la guía general, por último manuales de terceros (Merriam-Webster, Chicago). «Prioriza claridad y consistencia para tu dominio y lectores, incluso si implica desviarte de la guía.»
  - Proscribir modificadores subjetivos —_simply, properly, carefully_—: son vagos y minan la confianza.
  - Oraciones cortas y sin ambigüedad, voz activa, consistencia terminológica — pensando en audiencia global.
- **Mailchimp Content Style Guide** [2]: cuatro principios —claro, útil, amable, apropiado— y la licencia explícita: «rompemos reglas gramaticales por claridad». El tono se adapta a la situación; la guía es referencia viva, no camisa de fuerza.
- **Draft.dev Technical Blogging Style Guide** [3]: segunda persona, lenguaje conversacional de trabajo, no repetirse, sin _gatekeeping_ (nada de «es fácil», «obviamente»); la introducción responde tres preguntas —qué dolor resuelve, cuál es la solución, qué hará el artículo—; cada afirmación se sostiene con enlace o evidencia.

### Reglas de blogging técnico convergentes

- **Una idea por post, verificable en una frase:** «Después de leer esto, un ___ podrá ___» — si no se puede completar, el post no está listo [4].
- **El resultado primero:** mostrar el final —demo, salida, programa completo— antes de explicarlo, para ganar la atención del lector [4][5].
- **El código corre:** todo snippet funciona tal cual o se marca explícitamente como extracto; mostrar la salida que el lector verá; snippets cortos que explican el porqué, no solo el qué [4].
- **Honestidad sobre hype:** los trade-offs declarados generan más confianza que el entusiasmo [4].
- **Estructura escaneable:** encabezados descriptivos que permiten aprender hojeando; cada sección sirve la promesa — cortar tangentes [4].
- **Introducción sin calentamiento:** el primer párrafo lleva el problema y lo que el lector se lleva — «no throat-clearing» [4].
- **Cierre con takeaway:** dos o tres frases de conclusión más un siguiente paso — enlace, repo, pregunta [4].

### Niveles de edición aplicables a blogs

- La taxonomía profesional (Editors Canada, IPEd) separa edición **sustantiva** —estructura, promesa, adecuación—, de **corrección de estilo** y de **pruebas** — la mecánica corre sobre la versión final [6].
- El checklist de edición de blogs técnicos sigue ese mismo orden: estructura → claridad → edición de línea (proscribir _simply/just/obviously_, relleno, pasiva que oculta el actor) → revisión técnica por alguien que intente los pasos → lectura en voz alta de intro y cierre [4].

## Conclusión

Las reglas convergen y coinciden con lo que los dos posts de Fronteando ya practican: una promesa por post, el resultado primero, código ejecutable, límites honestos y una prosa directa sin _gatekeeping_. La guía puede codificarlas como contrato propio y remitir a manuales externos solo para la mecánica del español.

Dos decisiones que la evidencia soporta:

1. **Jerarquía de referencias como Google:** `EDITORIAL.md` manda primero; los manuales externos (RAE/Fundéu vía los skills genéricos) solo donde la guía calla.
2. **Proscripciones explícitas con sustitutos:** el mecanismo que funciona en todas las guías — palabra prohibida + alternativa — en vez de deseos vagos.

## Referencias

1. Google for Developers — «About this guide | Google developer documentation style guide». https://developers.google.com/style
2. Mailchimp — «Content Style Guide — Writing Goals and Principles». https://styleguide.mailchimp.com/writing-principles/
3. Draft.dev — «The Draft.dev Technical Blogging Style Guide». https://draft.dev/learn/styleguide
4. OpenCode Skills — «Tech Blog Post Skill». https://opencodeskills.dev/skills/writing/developer-blog-posts/
5. Ritza — «Guidance on writing technical guides». https://styleguide.ritza.co/
6. Editors Canada — «Professional Editorial Standards 2024»; IPEd — «Types of Editing». (citadas en `2026-10-procesos-gestion-editorial.md`)

## Anexo — taxonomías (añadido en ejecución de la 012)

Sobre categorías vs. tags y diseño de taxonomías, para fundamentar la
sección «Taxonomía» de la guía:

- **Una categoría por post** y vocabulario cerrado: las categorías
  son las secciones del blog, amplias y mutuamente excluyentes; el
  solape entre nombres confunde el filtrado (Hart & Vine [7];
  WordPress Learn [8]).
- **Tags específicos, varios por post, planos:** «las categorías
  separan, los tags unen» — describen el detalle, no agrupan [8].
- **Ningún término en ambas listas:** The Toast lo fija como regla
  editorial y Codemzy muestra el fallo concreto —un tag que solapa
  dos categorías deja de significar— [9][10].
- **Categorías como vocabulario controlado:** NN/g las define como
  lista cerrada que los autores no expanden ad hoc — crecer es
  decisión, no tecleo [11].
- **Ortogonalidad:** facetas independientes por dimensión (clásico de
  clasificación facetada); el caso que lo motivó: en un blog de
  frontend `javascript` no discrimina — casi todo lo usa — así que es
  tag, no categoría (corrección del usuario, validada por estas
  reglas) [12].

Referencias adicionales:

7. Hart & Vine — «Best practices for categories & tags». https://hartandvine.com/insights/best-practices-for-categories-tags/
8. WordPress Learn — «Categories vs. Tags: What's the difference?». https://learn.wordpress.org/tutorial/categories-vs-tags-whats-the-difference/
9. Responsive Web Design — «Taxonomy and Recirculation» (The Toast). https://responsivewebdesign.com/toast/taxonomy/
10. Codemzy — «Blog categories vs tags». https://www.codemzy.com/blog/blog-categories-vs-tags
11. NN/g — «Taxonomy 101». https://www.nngroup.com/articles/taxonomy-101/
12. The Discipline of Organizing — «Faceted Classification». https://berkeley.pressbooks.pub/tdo4p/chapter/faceted-classification/
