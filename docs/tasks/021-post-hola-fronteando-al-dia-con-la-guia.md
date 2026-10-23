# Revisar el post de presentación con la guía editorial nueva

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

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

## Divergencias encontradas

Post corto, sin código, de categoría `meta` — la revisión es de voz y metadatos; las divergencias mapean todas a regla escrita:

- **`description` en modo agenda:** «Qué es Fronteando, para quién es y qué vas a encontrar aquí.» enumera las secciones del post en vez de prometerle algo a quien aún no lo abrió — la pieza de preview que la guía y `copy-fuera-del-post` piden. _Corregida:_ «Un blog de frontend en español para quien quiere entender, no solo resolver la tarea de hoy.» — línea promesa-y-contraste elegida por el usuario; los asistentes quedan fuera por ser apoyo, no idea central.
- **«sobre lo que usas a diario»:** accesibilidad y rendimiento no se usan, son propiedades de lo que se construye. _Corregido_ a «sobre lo que construyes a diario» — segunda pasada con la descripción como lente.
- **Dos incisos con raya larga:** «—piezas para entender, no recetas para copiar—» y «—o asistentes—» → paréntesis, decisión de corpus vigente desde la 019.
- **`<!--more-->` ausente:** sin marcador el previo de portada cae al primer párrafo solo; los otros dos posts lo usan y el segundo párrafo completa la unidad del gancho (qué es + para quién). _Corregido_ insertando el marcador tras ese párrafo.
- **«sacar partido a un agente»:** la forma continental más común es «sacar provecho de». _Corregido_ a «sacar provecho de un agente como apoyo».
- **Conforme de origen:** título descriptivo, español neutro sin regionalismos ni nominalizaciones proscritas, metáforas simples («primera página», «acaba de nacer»), voz y función `meta` intactas —presentar el proyecto, no enseñar—.

## Revisión

- Subagente: 2026-10-23 — Aprueba (previo en dos párrafos —desviación formal sin efecto visible, a decidir—; solape tagline/description del sitio preexistente —nota de corpus, fuera de alcance—)
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
