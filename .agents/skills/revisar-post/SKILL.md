---
name: revisar-post
description: >
  Revisión editorial de un post: un subagente de contexto aislado
  somete el borrador a edición sustantiva contra EDITORIAL.md y el
  brief aprobado, con verificación técnica del código contra la
  prosa (ejecutada, no leída), y produce un informe con hallazgos
  anclados y veredicto. Al aprobar retira el draft: la aprobación
  editorial equivale a listo para publicar. Usar cuando la tarea
  de contenido tiene el post escrito en borrador.
  Sinónimos: revisar post, revisión editorial, editar artículo,
  aprobación editorial, flujo de escritura.
---

# Revisar post

Instrucciones para que un agente someta el borrador de un post a revisión editorial por un subagente independiente. El revisor arranca con contexto aislado (recibe las rutas de la tarea, el brief, el post y `EDITORIAL.md`, no el razonamiento del redactor) y con un rol explícitamente adversarial: ejecuta cada fragmento de código y lo confronta con la prosa, verifica la promesa y la anatomía contra el contrato, y produce un informe con hallazgos citados por severidad y un veredicto. La aprobación retira el `draft` (la aprobación editorial equivale a listo para publicar; el merge publica, decisión D004).

## Cuándo usar

- Cuando una tarea de tipo `contenido` tiene el post escrito en borrador (`draft: true`): en el ciclo, `ejecutar-tareas` la enruta aquí tras `redactar-post`, o la invocación sigue a la de redacción en la misma iteración.
- Cuando el usuario pida revisar editorialmente un borrador concreto.
- Cuando una revisión quedó en «solicita cambios» y el post corregido necesita una ronda nueva.

## Cuándo no usar

- Cuando la tarea no tiene post escrito o el post no lleva `draft: true` (sin `## Encuadre` o sin brief aprobado, corresponde `planear-post`; sin borrador, `redactar-post`).
- Para tareas de otro tipo o sin tipo declarado: no pasan por el flujo de escritura.
- Para la mecánica de estilo (ortografía, tipografía, ritmo): esa ronda corre dentro de `redactar-post` con `revisar-redaccion` y `pulir-escritura`; aquí solo se repite sobre lo reescrito.
- Para capturar, promover o mover piezas del pipeline editorial: eso corresponde al gestor del planeador.

## Entrada

- El archivo de la tarea `contenido` con la sección `## Encuadre` (la señal de planeación completa).
- El brief aprobado en `docs/editorial/briefs/<slug>.md`: promesa, arco, metadatos decididos, material y checklist (el contrato contra el que se revisa).
- El borrador en `site/src/content/articulos/<slug>.md` con `draft: true` (la señal de listo para revisar).
- `EDITORIAL.md`: voz, anatomía, contrato de metadatos y taxonomía.
- El corpus publicado en `site/src/content/articulos/`: precedentes de voz y de la serie.
- Un subagente de contexto aislado con capacidad de ejecutar (`node` para los snippets del post).
- Las capacidades de artefactos: `consultar-artefactos` para las lecturas del formato.

## Salida

- El informe de revisión: cada verificación del contrato con su resultado, los hallazgos citando la regla incumplida (guía, brief o esquema) con severidad y corrección propuesta, y el veredicto (Aprueba | Solicita cambios).
- Sobre aprobación: el post sin la línea `draft` (el campo tiene default `false` en el esquema) y el informe devuelto al invocador.
- O la conclusión de que el post no puede revisarse (sin borrador, brief sin aprobar) o no puede aprobarse (corrección que cambia promesa, ángulo o alcance: territorio del brief, escalada al usuario), comunicada al invocador con el motivo.

## Principios rectores

1. **Contexto aislado:** el revisor ve el contrato y el post, no el razonamiento del redactor; la separación de contextos neutraliza el sesgo de autoaprobación.
2. **Rol adversarial:** el revisor busca problemas, no confirma el trabajo; pero «no hay hallazgos» es un veredicto válido (un revisor obligado a producir hallazgos acaba inventándolos).
3. **Contra el contrato, no contra el gusto:** cada hallazgo cita la regla incumplida (sección de `EDITORIAL.md`, campo del brief o restricción del esquema); una observación sin anclaje no es un hallazgo.
4. **El código se verifica ejecutándolo:** el revisor no puede aprobar sin haber corrido los snippets que el post contiene y confrontado su comportamiento con lo que la prosa afirma; leer el código no es verificarlo.
5. **Sustantiva, no mecánica:** este paso es la edición sustantiva (estructura, promesa, veracidad, adecuación a la audiencia); la mecánica ya corrió en la ronda de `redactar-post` y solo se repite sobre lo reescrito.
6. **La aprobación publica:** el `draft` se retira solo sobre veredicto Aprueba; antes de eso el post no sale del borrador por ningún motivo.
7. **Las puertas humanas se respetan:** una corrección que cambia promesa, ángulo o alcance es territorio del brief y se escala al usuario, no se escribe en la ronda.
8. **Acotado a una tarea:** no gestiona el estado de la tarea en el índice, ni mueve la pieza del planeador, ni el pull request; eso sigue siendo del ejecutor general.

## Procedimiento

### 1. Validar la entrada

1. **Leer el archivo de la tarea** y comprobar el tipo `contenido` y la sección `## Encuadre` delegando en `consultar-artefactos` la consulta «las secciones de la tarea»: si la tarea no es de tipo `contenido`, informar de que no pasa por el flujo de escritura y terminar; si falta `## Encuadre`, informar de que requiere `planear-post` primero y terminar.
2. **Leer el brief enlazado** y comprobar `estado: aprobado` (lectura directa del campo); sin la aprobación, informar al invocador y terminar.
3. **Comprobar el borrador:** existe `site/src/content/articulos/<slug>.md` y su frontmatter declara `draft: true`. Si no existe o ya no es borrador, informar al invocador (a `redactar-post` si falta; ya revisado si no lleva `draft`) y terminar.

### 2. Lanzar el revisor independiente

4. **Lanzar un subagente de contexto aislado y con capacidad de ejecutar comandos** que recibe únicamente las rutas (archivo de la tarea, brief, post, `EDITORIAL.md`, `site/src/content.config.ts`) sin el razonamiento del redactor. Su encargo:
   - **Leer el contrato:** el brief completo (encuadre, material, outline, checklist) y `EDITORIAL.md` (voz, anatomía, metadatos, taxonomía, niveles de edición).
   - **Ejecutar cada snippet del post** (o verificar que el que no corre tal cual va marcado explícitamente como extracto) y confrontar el comportamiento real del código con lo que la prosa afirma (salidas, efectos, límites); la ejecución admite el entorno mínimo que el snippet exija (un stub del DOM, un harness propio); todo desfase prosa/código es un hallazgo.
   - **Verificar la promesa:** el post cumple lo que el brief promete al lector; nada esencial queda fuera ni sobra respecto al alcance decidido.
   - **Verificar la anatomía y el arco:** gancho, previo como unidad autocontenida, `<!--more-->` tras él, promesa tras el corte, orden del argumento frente al arco, límites honestos con sección propia, cierre que abre una puerta.
   - **Verificar la voz:** el registro de la guía, sin palabras proscritas, con la audiencia decidida en el encuadre.
   - **Verificar los metadatos:** frontmatter contra lo decidido en el brief (`title`, `description` como promesa sin adjetivos, `categoria` en el enum del esquema, `nivel` solo si se decidió, `tags` sin solape con la categoría), `date` con hora real y `draft: true` presente.
   - **Confrontar el checklist del brief contra el post** con independencia de su marca: un ítem marcado que falla es hallazgo citando el ítem; un brief con `## Temas de investigación` abierto se reporta como inconsistencia.
   - **Cotejar contra el corpus publicado:** precedentes de voz, enlaces a piezas previas o de la serie que el brief contemple.
   - **Distinguir los niveles:** lo sustantivo pesa; un hallazgo puramente mecánico se anota pero la ronda de escritura ya corrió (solo lo reescrito pide pasada nueva).
   - **Cotejar contra las lecciones aprendidas** cuyos disparadores coincidan con el post (la consulta por disparadores la resuelve `consultar-artefactos`).
   - **Producir el informe:** verificaciones con resultado, hallazgos citando la regla incumplida con severidad y corrección propuesta, y veredicto (Aprueba | Solicita cambios). Si el post contiene código, no puede aprobar sin haberlo ejecutado.

### 3. Interpretar el informe

5. **Si el veredicto es solicita cambios:** corregir los hallazgos aplicables en el post. Las correcciones que cambian promesa, ángulo o alcance no se aplican (son territorio del brief): si lo que queda sin resolver es solo eso, se informa al invocador y el ciclo termina aquí (la revisión queda abierta hasta que el brief cambie o el usuario descarte el hallazgo; un subagente fresco volvería a encontrar el mismo hallazgo no aplicable). Sobre los párrafos reescritos corre una ronda de escritura nueva (`revisar-redaccion` y luego `pulir-escritura`, regla dura de `EDITORIAL.md`) y se ejecuta `npm run check` en `site/` (las correcciones pudieron tocar el frontmatter). La re-revisión desde el paso 4 con un subagente fresco corre solo cuando hubo correcciones aplicadas.
6. **Si el veredicto es aprueba:** retirar la línea `draft` del frontmatter (escritura directa; el campo tiene default `false` en el esquema) y devolver el informe al invocador. La publicación la consuma el merge del PR; el estado de la tarea y la pieza del planeador quedan del ejecutor general.

## Finalización

El skill ha terminado cuando:

- El subagente aprobó y el post quedó sin `draft`, con su informe devuelto al invocador, o
- Se informó de que el post no puede revisarse (sin borrador, brief sin aprobar) o no puede aprobarse (corrección escalada al usuario) con el motivo.

## Referencias

- `.agents/skills/revisar-implementacion/SKILL.md` — La revisión técnica del flujo de desarrollo, modelo en forma.
- `.agents/skills/redactar-post/SKILL.md` — La mitad de ejecución que produce el borrador que este skill revisa.
- `.agents/skills/planear-post/SKILL.md` — La mitad de planeación que produce el brief, contrato de la revisión.
- `EDITORIAL.md` — La guía contra la que se revisa; sus niveles de edición separan sustantiva de mecánica.
- `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — El previo que el revisor verifica.
- `docs/decisions/D003-brief-editorial-artefacto-propio.md` — El contrato de entrada.
- `docs/decisions/D004-el-post-nace-borrador-y-la-revision-lo-publica.md` — La aprobación editorial retira el `draft`.
- `docs/lessons/flujo-de-escritura.md` — La ronda sobre la versión final y sobre lo reescrito.
- `docs/research/2026-10-procesos-gestion-editorial.md` — La verificación de hechos como labor separada que el revisor ejecuta.
