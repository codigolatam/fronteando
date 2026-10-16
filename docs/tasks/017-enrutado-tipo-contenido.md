# Enrutar el tipo contenido en ejecutar-tareas

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Registrar el tipo de tarea `contenido` en `ejecutar-tareas` con su sub-flujo propio —encuadre (`planear-post`) → redacción (`redactar-post`) → revisión editorial (`revisar-post`)— y adaptar la consulta de «planeación completa» a las secciones editoriales, de modo que un post siga el flujo de escritura y no el de desarrollo.

## Dependencias

- docs/tasks/013-skill-planear-post.md
- docs/tasks/014-skill-redactar-post.md
- docs/tasks/015-skill-revisar-post.md
- docs/tasks/016-planeador-editorial.md

## Entrada

- Los tres skills del flujo (013–015) con las secciones editoriales definidas: Encuadre + Checklist.
- El planeador editorial (016) — origen de las piezas que entran al flujo.
- `ejecutar-tareas` en `.agents/skills/` — el orquestador donde el enrutado por tipo vive.
- La experiencia de la tarea 011: un post corrió por el sub-flujo de desarrollo y el molde apretó — el tipo `contenido` lo resuelve.

## Resultado esperado

- `ejecutar-tareas` enruta las tareas de tipo `contenido` al sub-flujo de escritura: Encuadre aprobado como equivalente de la mitad de planeación, redacción con su checklist, revisión editorial en lugar de revisión técnica de implementación.
- La consulta de «planeación completa» reconoce las secciones editoriales (Encuadre + Checklist) para el tipo `contenido` — sin tocar las del tipo `desarrollo`.
- Las puertas generales del ciclo —rama, PR, checks, veredictos, cierre— se conservan intactas para el nuevo tipo.

## Criterios de calidad

- Una tarea `contenido` no puede saltarse el encuadre ni la revisión editorial — las puertas del sub-flujo son tan firmes como las de desarrollo.
- La publicación sigue por el ciclo general: PR con los cuatro checks, aprobación y merge — el sub-flujo solo cambia la mitad interna.
- El enrutado no rompe el tipo `desarrollo` ni los existentes — verificado con una tarea de cada tipo.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `ejecutar-tareas` y localizar dónde vive el enrutado por tipo y la consulta de planeación.
2. Añadir el tipo `contenido` con su sub-flujo y la consulta adaptada.
3. Recorrer el flujo en seco con una tarea de prueba o contra la 018.

## Notas

- El tipo `contenido` de la tarea 018 la convierte en el primer ejemplar real del flujo — esta tarea debe quedar antes.
- Si la consulta de planeación necesita una operación nueva en `consultar-artefactos`, se añade aquí como parte del alcance.

## Contexto

- `Archivos similares:` `.agents/skills/ejecutar-tareas/` — el orquestador; los skills 013–015 que este enrutado invoca.
- `Patrones:` enrutado por tipo con sub-flujos de dos mitades + revisión, y puertas del ciclo general intactas.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/checks-de-ci-independientes.md` — las puertas del ciclo general no se negocian.
- `Decisiones:` sin decisiones aplicables.
