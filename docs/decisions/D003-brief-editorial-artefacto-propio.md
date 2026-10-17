# D003: El brief editorial es artefacto propio, no sección de la tarea

## Estado

Aceptada

## Contexto

El flujo de escritura divide la producción de un post en planeación y
ejecución, como el flujo de desarrollo. El molde de desarrollo
registra plan técnico y suite de pruebas esperada como secciones del
archivo de la tarea, y el encuadre editorial se diseñó igual al
principio: `## Encuadre` y `## Checklist de publicación` dentro de la
tarea `contenido`. La preparación editorial, sin embargo, excede una
sección: temas de investigación que hay que resolver, material
verificado que hay que recopilar, un borrador del outline que evoluciona.

## Decisión

El documento de preparación de un post es un artefacto propio —el
brief— en `docs/editorial/briefs/<slug>.md`, con su `## Estado` por
campos (`estado: borrador|aprobado`, `aprobado: <fecha>`) y su
plantilla en `assets/brief.md` del skill `planear-post`. El archivo de
la tarea conserva solo el puntero de avance: la sección `## Encuadre`
con la ruta del brief, la fecha de aprobación y la promesa en una
línea —la señal de «planeación completa» del tipo `contenido`—.

## Justificación

Una sección administrativa no sostiene una superficie de trabajo: la
investigación y el material crecen durante la planeación y piden un
documento con ciclo de vida propio (borrador → aprobado, retomable
entre sesiones). Un solo artefacto por tarea sigue valiendo —la tarea
es uno, el brief es otro con función distinta—: la tarea registra el
trabajo, el brief concentra la preparación. `## Estado` por campos y
no por línea de opciones porque el juego del catálogo reescribe los
conjuntos de tareas y propuestas enteros; un artefacto nuevo lee y
escribe su estado directamente. Los ítems accionables del brief van a
línea completa y en listas anidadas porque las operaciones mecánicas
casan por línea.

Consecuencias: el checklist de publicación vive en el brief, no en la
tarea —la escritura lee un solo documento—; `docs/editorial/` queda
parcialmente definido antes del planeador (su layout lo adopta);
`redactar-post` y el enrutado del tipo `contenido` consumen el contrato
de aquí: brief `aprobado` + sección `## Encuadre` presente.

## Referencias

- `docs/tasks/013-skill-planear-post.md`
- `.agents/skills/planear-post/SKILL.md` y `assets/brief.md`
- `docs/research/2026-10-procesos-gestion-editorial.md` — el brief como
  salida definida de la etapa de preparación
