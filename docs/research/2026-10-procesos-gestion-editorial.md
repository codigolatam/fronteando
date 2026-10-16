# Procesos de gestión editorial y estándares de escritura — validación del flujo de posts

**Fecha:** 2026-10

## Propósito

Validar el diseño propuesto del flujo de escritura de Fronteando —encuadre → redacción → revisión → publicación, con guía editorial propia y un pipeline de contenido— contra los procesos de gestión editorial documentados y los estándares de la profesión de edición, antes de dar de alta el hito que lo implementa.

## Hallazgos

### El pipeline editorial converge en las mismas etapas

Las fuentes consultadas describen el mismo recorrido con nombres distintos: captura de idea → brief → borrador → edición → revisión/aprobación → publicación → distribución/medición.

- Mindstamp lo resume en siete etapas —intake, brief, draft, review, approval, publish+distribute, measure— y fija tres reglas: un responsable por etapa, entrada/salida definidas y un criterio de «terminado» por etapa [1].
- SparkBlog lo describe en ocho, añadiendo la investigación de intención antes del brief, y declara el principio clave: «aprobar el brief antes de que nadie redacte, porque es el punto más barato para cambiar un tema o un ángulo» [2].
- MultiCollab da los estados canónicos del kanban editorial: Idea → Brief aprobado → Asignado → Redacción → En revisión → Cambios solicitados → Aprobado → Programado → Publicado → Actualización [3].
- Todas las fuentes coinciden en dos puertas: revisión por alguien distinto del autor —contra el brief— y aprobación humana explícita antes de publicar [1][2][3].

### Existen estándares formales de la profesión de edición

La profesión editorial tiene taxonomías estandarizadas de niveles de edición, convergentes entre asociaciones:

- **Editors Canada — Professional Editorial Standards (2024):** cuatro etapas cuando el contenido ya existe —edición estructural, estilística, corrección de estilo (copyediting) y corrección de pruebas—, más las tareas de dirección editorial que deciden qué nivel de intervención corresponde [4].
- **IPEd (Institute of Professional Editors):** tres tipos —edición sustantiva (estructura, contenido, estilo para la audiencia prevista), corrección de estilo (precisión, claridad, consistencia) y corrección de pruebas (listo para publicar)— [5].
- **Style Manual del gobierno australiano:** misma taxonomía, y una regla que valida directamente nuestra lección de hoy: «si hay más edición sustantiva o reescritura tras la corrección de estilo, el contenido necesita otra corrección de estilo» — la mecánica corre sobre la versión final [6].
- La edición sustantiva explícitamente no incluye la verificación de hechos — es una labor separada [6]; en nuestro contexto, la verificación de código por ejecución es el análogo del fact-check, que el ejemplo de workflow de urlmd lista como paso propio («verify factual claims and source support») [7].

### La guía editorial es un artefacto estándar

- HubSpot y ContentWriters describen la «content/editorial style guide» como el artefacto de referencia de toda operación de contenido: misión y audiencia, voz y tono, manual de estilo de referencia, palabras problemáticas, formato, ejemplos y —relevante— un resumen del proceso editorial [8][9].
- Las guías se definen una sola vez y se referencian desde cada brief — la pieza no repite las reglas, las hereda [9].

### El backlog editorial tiene forma conocida

- El patrón kanban por estados es el dominante (Atlassian/Trello: Incoming → Forming → Writing → Editing → Final Edits → Ready → Scheduled → Published) [10].
- Para autor único, el ritmo «Plan, Write, Ship, Own» usa cuatro estados —Idea, Draft, Review, Published— con una acción por estado [11].
- Dos refinamientos útiles: separar la bandeja de captura de la lista de «lista para escribir» —una idea solo está lista cuando tiene pregunta del lector, ángulo y soporte— [12]; y separar la herramienta de ideación de la de producción porque «no toda idea se vuelve borrador» [13].
- Un registro de idea mínimo: pregunta del lector, ángulo propio, soporte, próximo paso [12] — equivalente funcional a las secciones Problema/Qué desbloquea/Flujos de nuestros archivos de idea.

### Una etapa que nuestro diseño no cubre: mantenimiento

Todas las fuentes incluyen un paso post-publicación —medición y actualización del contenido— [1][2][3][7]. Nuestro flujo termina en la publicación; corregir o actualizar un artículo publicado queda fuera del diseño.

## Conclusión

El diseño propuesto es el pipeline editorial estándar adaptado a una operación de una sola persona con agente: el encuadre es el brief con su puerta (el punto barato para cambiar el tema), la redacción integra la verificación técnica como análogo del fact-check, la revisión separa los niveles de edición —la ronda de escritura cubre corrección de estilo y pruebas, y `revisar-post` cubre la sustantiva—, y la publicación corre por el ciclo general con su puerta humana. `EDITORIAL.md` responde al artefacto estándar de guía de estilo, y el pipeline propuesto al patrón kanban de backlog editorial.

Tres ajustes que la evidencia sugiere incorporar:

1. **Nombrar los niveles de edición en el diseño:** sustantiva (estructura, promesa, veracidad — `revisar-post`) vs. mecánica (estilo, ortotipografía — ronda de escritura sobre la versión final). Es el vocabulario estándar y clarifica qué verifica cada paso.
2. **El planeador distingue captura de listo-para-escribir:** estados `idea` → `lista` → `en redacción` → `en revisión` → `publicado`; una idea solo pasa a `lista` cuando tiene pregunta del lector, ángulo y soporte.
3. **Mantenimiento como tensión conocida:** decidir conscientemente qué hacer con artículos publicados que envejecen — puede quedar fuera del hito, pero declarado.

## Limitaciones

- Investigación de profundidad rápida: dos rondas de búsqueda, una o dos fuentes por afirmación. Las taxonomías citadas (Editors Canada, IPEd, Style Manual AU) convergen, así que el riesgo de error es bajo.
- Los estándares citados son de la edición en inglés; para español no se localizó un equivalente formal equivalente — la mecánica queda cubierta por RAE/Fundéu, que `pulir-escritura` ya usa.
- La medición post-publicación (analítica, correcciones de fondo) quedó fuera del alcance de esta validación.

## Referencias

1. Mindstamp — «Content Creation Workflow: 7 Stages, Roles, and a Template». https://mindstamp.com/blog/content-creation-workflow
2. SparkBlog — «How to Build a Content Workflow That Actually Ships». https://sparkblog.dev/blogs/content-workflow
3. MultiCollab — «Editorial Workflow: 8 Steps, Examples & Template (2026)». https://www.multicollab.com/blog/guide-editorial-workflow/
4. Editors Canada — «Professional Editorial Standards 2024». https://editors.ca/wp-content/uploads/2024/05/EditorsCanada_ProfessionalEditorialStandards_2024.pdf
5. IPEd — «Types of Editing». https://www.iped-editors.org/about-editing/types-of-editing/
6. Australian Government Style Manual — «Editing and proofreading». https://www.stylemanual.gov.au/writing-and-designing-content/editing-and-proofreading
7. Stephen James Hall — «An Example Editorial Workflow: From Article Idea to Published Page». https://urlmd.com/example-editorial-workflow/
8. HubSpot — «How to create a content style guide». https://blog.hubspot.com/blog/tabid/6307/bid/31247/the-simple-template-for-a-thorough-content-style-guide.aspx
9. ContentWriters — «How to Create an Effective Editorial Style Guide for Your Business». https://contentwriters.com/blog/how-to-create-an-editorial-style-guide/
10. Atlassian — «How to create your perfect editorial calendar with Trello». https://www.atlassian.com/blog/trello/moved-to-published-using-trello-as-an-editorial-calendar
11. Writers' Kitchen — «The Solo Writer's Editorial Calendar Template». https://writers.kitchen/resources/editorial-calendar/
12. Distinctful — «How to Organize Content Ideas Into a Usable Backlog». https://www.distinctful.com/blog/how-to-organize-content-ideas
13. WP Pioneer — «How to Create a WordPress Content Calendar and Publishing Workflow». https://wppioneer.com/marketing-seo/content-strategy/wordpress-content-calendar-publishing-workflow/
