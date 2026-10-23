# Revisar el post de reactividad con la guía editorial nueva

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

mantenimiento

## Objetivo

Actualizar «Un store reactivo en vanilla JS» a la guía editorial vigente —español latinoamericano neutro, claro antes que denso, metáforas simples y comunes, `description` como pieza de preview, eco de la promesa, título descriptivo, incisos entre paréntesis— para que el corpus publicado hable con una sola voz.

## Dependencias

- Ninguna

## Entrada

- `EDITORIAL.md` vigente — la guía que el dogfooding de la 018 dejó actualizada.
- `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` — el post a revisar, publicado en la tarea 011.
- `docs/lessons/espanol-del-blog.md` y `docs/lessons/copy-fuera-del-post.md` — las lecciones que esta revisión debe aplicar.
- `site/src/content/articulos/carrito-a-lo-bruto.md` — el capítulo 1 como referencia de voz al día.
- La fricción abierta de la 018 sobre incisos: este post usa raya larga sistemáticamente; su revisión decide el precedente del corpus.

## Resultado esperado

- El post revisado —voz, estructura y metadatos conformes a la guía— publicado vía PR.
- Una lista de las divergencias encontradas entre el texto publicado y la guía vigente, para evaluar si la guía cubre bien la revisión de corpus.

## Criterios de calidad

- Los incisos quedan según la decisión tomada (paréntesis o regla relajada), los regionalismos fuera y las figuras restringidas a metáforas simples y comunes.
- La `description` está reescrita como pieza propia para preview —efecto y consecuencia que el lector reconoce—; el título se evalúa contra la regla descriptiva.
- El código del post sigue ejecutándose igual; si un snippet se toca, se verifica su comportamiento.
- La ronda mecánica corre sobre la versión final y la revisión editorial cubre el diff completo.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Releer el post completo contra `EDITORIAL.md` y las lecciones, registrando cada divergencia —voz, metáforas, regionalismos, incisos, description, título, eco de la promesa—.
2. Decidir con el usuario el precedente de los incisos (normalizar el corpus a paréntesis o relajar la regla) y la lista de correcciones antes de tocar el texto.
3. Aplicar las correcciones, correr la ronda mecánica y la revisión editorial sobre el diff.
4. Publicar por el ciclo general.

## Notas

- Es la primera revisión de corpus: las divergencias registradas alimentan la evaluación de si la guía cubre bien la actualización de posts ya publicados.
- El post fue el precedente de voz antes de que existiera la guía completa; la decisión sobre incisos afecta también a `hola-fronteando.md` si la tuviera.

## Contexto

- `Lecciones:` `docs/lessons/espanol-del-blog.md`, `docs/lessons/copy-fuera-del-post.md`, `docs/lessons/incisos-entre-parentesis.md`
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el previo sale del cuerpo.

## Divergencias encontradas

Lo que el post publicado tenía contra la guía vigente — todas las divergencias mapeaban a regla escrita, así que la guía cubre bien la revisión de corpus:

- **Incisos con raya larga:** 7 incisos en el cuerpo — la fricción abierta de la 018. _Decisión del usuario:_ normalizar el corpus a paréntesis; donde el contenido era enumerativo o causal se usaron dos puntos, más claros.
- **«no el animal completo»:** figura poco común. _Corregida_ al literal «no el framework completo», más preciso con la frase que sigue.
- **Eco de la promesa:** el ancla «cincuenta líneas» no reaparecía en el cuerpo. _Corregida_ con el paréntesis «(en unas cincuenta líneas)» en el cierre de la sección de límites.
- **Conforme de origen:** anatomía completa, sin proscritos ni regionalismos, `description` con gancho y promesa en 148 caracteres, `title` descriptivo — el post fue precedente de voz y envejeció bien.
- **Hallazgos de segunda pasada (revisión editorial):** la nominalización proscrita «la suscripción colgada del dato equivocado» —estaba en la tabla y la primera lectura no la cazó— y cuatro giros menores («levantar» una bandera, «los de» elíptico, «recorre a», «con eso» telegráfico). _Dato para la evaluación:_ la guía cubre todo lo encontrado, pero la revisión de corpus necesita la pasada sistemática por regla, no solo lectura general.

## Revisión

- Subagente: 2026-10-23 — Solicita cambios (los 5 hallazgos aplicados)
- Usuario (ejecución): 2026-10-23 — Aprueba
- Usuario (cierre): 2026-10-23 — Aprueba
