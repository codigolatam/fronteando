# Crear el planeador editorial — pipeline de contenido

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el planeador editorial del blog: un pipeline de contenido en `docs/editorial/` —índice por estados y un archivo por pieza— más un skill gestor que idee posts, los dé de alta y los mueva por el pipeline, como adaptación de `lluvia-de-ideas` a la gestión de contenido.

## Dependencias

- Ninguna

## Entrada

- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: patrón kanban por estados; separación entre bandeja de captura y lista de «lista para escribir» —una idea solo está lista con pregunta del lector, ángulo y soporte—; separar la herramienta de ideación de la de producción.
- El patrón de `lluvia-de-ideas` en `.agents/skills/` — modelo de gestión de ideas por fases que este skill adapta.
- Los archivos de `docs/ideas/` — el registro mínimo ya coincide: Problema ≈ pregunta del lector, Qué desbloquea ≈ ángulo.
- Las ideas de contenido ya persistidas: `007-serie-mvc-en-vanilla-js` como primera pieza a migrar al pipeline.

## Resultado esperado

- `docs/editorial/` con un índice kanban por estados —`idea` → `lista` → `en redacción` → `en revisión` → `publicado`— y un archivo por pieza con pregunta del lector, ángulo, soporte, próximo paso y notas sueltas.
- `.agents/skills/` con el skill gestor: idear (lluvia de ideas de posts), dar de alta una pieza, promover `idea`→`lista` solo cuando tiene los tres requisitos, y arrancar el flujo de escritura al mover a `en redacción`.
- La serie MVC registrada como primera pieza del pipeline.

## Criterios de calidad

- El pipeline distingue captura de compromiso: `idea` no implica intención de escribir; `lista` sí — con sus tres requisitos verificables.
- El skill delega las lecturas/escrituras mecánicas del formato en las capacidades de artefactos existentes, o declara las operaciones nuevas que el catálogo necesita.
- El pipeline no duplica `docs/ideas/`: las ideas de contenido viven en `docs/editorial/`; las de producto/siguientes líneas siguen en `docs/ideas/` — la separación queda documentada.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `lluvia-de-ideas` y `consultar-artefactos`/`actualizar-artefactos` para reutilizar el patrón de artefacto + gestor.
2. Diseñar el formato del índice y del archivo de pieza; crear `docs/editorial/` y migrar la serie MVC.
3. Redactar el skill gestor con sus operaciones y la regla de promoción a `lista`.

## Notas

- El pipeline es el nivel 1 del flujo — alimenta las tareas de tipo `contenido` que el nivel 2 (encuadre→redacción→revisión) procesa.
- Mantenimiento de publicados queda fuera — declarado como tensión conocida en la investigación y en `EDITORIAL.md`.

## Contexto

- `Archivos similares:` `.agents/skills/lluvia-de-ideas/`, `docs/ideas/` — modelo de gestión de ideas y su formato de archivo.
- `Patrones:` artefacto del sistema = índice + archivos por elemento + skill gestor que delega operaciones mecánicas.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` sin lecciones aplicables — es artefacto nuevo.
- `Decisiones:` sin decisiones aplicables — el formato se fija en esta tarea y puede derivar una.
