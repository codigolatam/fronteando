# Revisar el post de presentación con la guía editorial nueva

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Actualizar «Hola, Fronteando» a la guía editorial vigente —español latinoamericano neutro, claro antes que denso, `description` como pieza de preview, incisos entre paréntesis— para que el post de presentación hable con la misma voz que el resto del corpus.

## Dependencias

- docs/tasks/019-post-reactividad-al-dia-con-la-guia.md — fija los precedentes de revisión de corpus (incisos, criterios de voz) que esta tarea hereda.

## Entrada

- `EDITORIAL.md` vigente y las lecciones `espanol-del-blog` y `copy-fuera-del-post`.
- `site/src/content/articulos/hola-fronteando.md` — el post de presentación, publicado en la tarea 006.
- La lista de divergencias de la 019 como referencia del tipo de correcciones esperadas.

## Resultado esperado

- El post revisado —voz y metadatos conformes a la guía— publicado vía PR.
- Confirmación de que el precedente de corpus de la 019 se aplica tal cual o registro de las diferencias del post de presentación.

## Criterios de calidad

- La `description` queda reescrita como pieza propia para preview; el título se evalúa contra la regla descriptiva.
- Incisos y regionalismos conformes a la decisión de corpus vigente; sin figuras fuera de lo simple y común.
- La ronda mecánica corre sobre la versión final y la revisión editorial cubre el diff completo.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Releer el post contra `EDITORIAL.md` registrando divergencias —es un post corto y sin código, la revisión es de voz y metadatos—.
2. Aplicar las correcciones heredando las decisiones de corpus de la 019.
3. Ronda mecánica y revisión editorial sobre el diff; publicar por el ciclo general.

## Notas

- Es el primer post del blog y el de categoría `meta`: su promesa es presentar el proyecto, no enseñar — la revisión debe preservar esa función, no convertirlo en post técnico.

## Contexto

- `Lecciones:` `docs/lessons/espanol-del-blog.md`, `docs/lessons/copy-fuera-del-post.md`

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
