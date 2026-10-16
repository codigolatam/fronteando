# Crear el skill planear-post — encuadre editorial

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `planear-post` —la mitad de planeación del flujo de escritura— que lleva un post desde el planeador editorial hasta un encuadre aprobado en su archivo de tarea: audiencia, promesa, arco seccional y checklist de publicación, con puerta humana antes de redactar.

## Dependencias

- docs/tasks/012-guia-de-tono-editorial.md

## Entrada

- `EDITORIAL.md` (tarea 012) — la guía que el encuadre consulta y contra la que se verifica.
- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: el brief se aprueba antes de redactar porque es el punto más barato para cambiar el tema.
- El patrón de `planear-tarea` en `.agents/skills/` — modelo de skill de la mitad de planeación.
- La experiencia de la tarea 011: el encuadre de un post es distinto del plan técnico — tiene promesa y arco, no suite de pruebas.

## Resultado esperado

- `.agents/skills/planear-post/SKILL.md` (o el directorio de skills del proyecto) que: toma una pieza del planeador en estado `lista` o una tarea de tipo `contenido`, produce en su archivo las secciones editoriales —Encuadre (audiencia, promesa, arco, ejemplo conductor, alcance) y Checklist de publicación—, y exige aprobación del usuario antes de dar el post por planeado.
- Las secciones del archivo de tarea de contenido quedan definidas aquí: Encuadre + Checklist, análogas a Plan técnico + Suite del tipo desarrollo.

## Criterios de calidad

- El skill delega las lecturas mecánicas del formato (estado de la tarea, secciones presentes) en las capacidades de artefactos existentes.
- La puerta humana es explícita: no se redacta sin encuadre aprobado — la regla universal del brief.
- El checklist codifica las lecciones editoriales: código ejecutable, `<!--more-->` tras el gancho, previo como unidad, fecha con hora real, ronda completa sobre versión final.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `planear-tarea` y el formato de los skills existentes; leer `EDITORIAL.md`.
2. Redactar el skill con su cuándo usar/cuándo no, entradas, salidas y puerta.
3. Verificar que las secciones que produce encajan con lo que el tipo `contenido` necesitará en el enrutado (tarea 017).

## Notas

- La pieza «lista para escribir» del planeador ya trae pregunta del lector, ángulo y soporte — el encuadre los convierte en promesa y arco, no los re-inventa.
- El skill no toca `ejecutar-tareas`; eso es la tarea 017.

## Contexto

- `Archivos similares:` `.agents/skills/` — `planear-tarea`, `desarrollar-tarea` como modelos de skills de mitad de flujo.
- `Patrones:` cada skill declara cuándo usar/no usar, entrada, salida y procedimiento; los formatos de artefactos los operan las capacidades mecánicas.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre sobre la versión final; el checklist la codifica.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el checklist la exige.
