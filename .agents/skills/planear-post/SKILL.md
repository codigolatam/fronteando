---
name: planear-post
description: >
  Ejecuta la mitad de planeación del flujo de escritura de un post:
  lleva una pieza lista del planeador editorial o una tarea de tipo
  contenido hasta un brief de preparación aprobado, con el encuadre,
  la investigación resuelta en material, el borrador del outline y el
  checklist de publicación. Usar para encuadrar un post sin redactarlo
  o como entrada del pipeline cuando la tarea de contenido aún no
  tiene brief aprobado.
  Sinónimos: planear post, encuadre editorial, brief del post,
  preparar artículo, flujo de escritura.
---

# Planear post

Instrucciones para que un agente ejecute la mitad de planeación del flujo de escritura dentro de una tarea de tipo `contenido`: toma la pieza del planeador editorial que la tarea enlaza, produce el brief de preparación (encuadre, investigación resuelta en material, borrador del outline y checklist de publicación), lo somete a la puerta humana y lo materializa aprobado en `docs/editorial/briefs/`, dejando en el archivo de la tarea la sección `## Encuadre` como registro del avance. Se detiene ahí: la escritura corresponde a `redactar-post`, que puede ocurrir en la misma iteración o en otra sesión.

## Cuándo usar

- Cuando una tarea de tipo `contenido` no tiene el brief aprobado: en el ciclo, `ejecutar-tareas` la enruta aquí.
- Cuando el usuario pida encuadrar un post concreto sin escribirlo (planeación en paralelo o incremental).
- Cuando una planeación quedó interrumpida y hay que completar el brief: un brief en `borrador` es estado legítimo y se retoma donde quedó.

## Cuándo no usar

- Para tareas de otro tipo o sin tipo declarado: no pasan por el flujo de escritura.
- Cuando la tarea ya tiene el brief aprobado (la sección `## Encuadre` apunta a un brief con `estado: aprobado`): no se re-encuadra; corresponde `redactar-post`.
- Para redactar el post: eso es `redactar-post`.
- Para capturar, promover o mover piezas del pipeline editorial: eso corresponde al gestor del planeador.

## Entrada

- El archivo de la tarea `contenido`, marcada en progreso por el ejecutor general. Si la invocación llega con una pieza `lista` sin tarea asociada, primero se da de alta la tarea `contenido` que la enlaza (el alta corresponde a `crear-tareas` o al gestor del planeador).
- La pieza del planeador enlazada desde la tarea, con sus tres requisitos: pregunta del lector, ángulo y soporte.
- `EDITORIAL.md`: la guía que el encuadre consulta y contra la que se verifica.
- El corpus publicado en `site/src/content/articulos/`: precedentes, series y tags existentes.
- `assets/brief.md`: la plantilla del documento de preparación.
- Las capacidades de artefactos: `consultar-artefactos` para las lecturas del formato; `actualizar-artefactos` para las mutaciones de la tarea.

## Salida

- `docs/editorial/briefs/<slug>.md` con `estado: aprobado` en su sección `## Estado`: el documento de preparación completo y aprobado, única entrada de escritura de `redactar-post`. El `<slug>` es el que llevará el archivo del post.
- El archivo de la tarea con la sección `## Encuadre`: la ruta del brief, la fecha de aprobación y la promesa en una línea (la señal de planeación completa que consulta el enrutado del tipo `contenido`).
- O la conclusión de que el post no puede encuadrarse (ya encuadrado, pieza sin los tres requisitos, brief rechazado), comunicada al invocador con el motivo.

## Principios rectores

1. **La pieza informa, el encuadre decide:** la pregunta del lector se vuelve audiencia y promesa, el ángulo se vuelve arco y el soporte se vuelve ejemplo conductor y material; el encuadre los convierte, no los copia ni los reinventa.
2. **La preparación se agota aquí:** todo lo que la escritura necesita (verificaciones técnicas, referencias, snippets probados, orden del argumento) se resuelve en el brief; `redactar-post` no recopila contexto y lo que falte en el brief es una falta del encuadre, no un espacio para improvisar.
3. **El archivo de la tarea es la fuente de verdad del avance:** la sección `## Encuadre` registra la aprobación y apunta al brief sin duplicar su contenido.
4. **Las puertas humanas se respetan:** la aprobación del brief pertenece al usuario; es el punto más barato para cambiar el tema o el ángulo.
5. **Una promesa por post:** si el encuadre necesita dos promesas, son dos posts; se comunica y se divide antes de seguir.
6. **El brief es un documento de trabajo:** nace con `estado: borrador` y se escribe a disco en cuanto hay contenido (una sesión interrumpida se retoma del archivo, no de memoria); solo `aprobado` habilita la redacción.
7. **No re-encuadrar:** si la sección `## Encuadre` ya apunta a un brief aprobado, el skill no produce nada y termina.

## Procedimiento

1. **Validar la entrada.** Leer el archivo de la tarea y comprobar el encuadre delegando en `consultar-artefactos` la consulta «las secciones de la tarea»: si `## Encuadre` existe y el brief que enlaza declara `estado: aprobado` (lectura directa del campo: el brief es artefacto nuevo sin operaciones del catálogo), informar de que el post ya está encuadrado y terminar sin tocar nada. Si `## Encuadre` existe pero el brief enlazado no está aprobado, la planeación quedó interrumpida o inconsistente: se retoma el brief y la sección se actualiza al materializar, no se inserta de nuevo. Si la invocación trae una pieza sin tarea, derivar primero el alta de la tarea `contenido` que la enlaza y continuar sobre el archivo creado.
2. **Buscar el trabajo previo.** Resolver el slug del post (del título de la pieza o de la tarea) y comprobar si existe `docs/editorial/briefs/<slug>.md`: con `estado: borrador` se retoma donde quedó (las secciones ya llenas delatan el punto de corte) y se continúa en el paso pendiente en lugar de regenerarlo; con `estado: aprobado` pero sin `## Encuadre` en la tarea, hay una inconsistencia que se eleva al usuario.
3. **Verificar que la pieza está lista.** Leer la pieza enlazada desde la entrada de la tarea y comprobar sus tres requisitos: pregunta del lector, ángulo y soporte. Si falta alguno, la pieza no está lista para escribir: informar al invocador con lo que falta y terminar (la pieza vuelve al planeador). Cuando la tarea `contenido` nace sin pieza (encargada directamente), los tres datos se recaban del usuario en la conversación del encuadre.
4. **Consultar `EDITORIAL.md`.** La voz y el registro, la anatomía del post, el contrato de metadatos y la taxonomía rigen el encuadre; el brief referencia la guía, no la repite.
5. **Recorrer el corpus.** Revisar los posts publicados relacionados (continuidad de series, piezas a enlazar, ángulos ya cubiertos) y los tags existentes para reutilizarlos; verificar que la `categoria` propuesta es el pilar correcto con la prueba de ortogonalidad de la guía.
6. **Producir el encuadre** sobre la plantilla `assets/brief.md`: la audiencia desde la pregunta del lector; la promesa en una frase verificable («después de leer esto, el lector podrá ___»); el arco como las secciones en orden con lo que cada una aporta (la anatomía de la guía es el molde); el ejemplo conductor desde el soporte; el alcance con los límites decididos por adelantado; y los metadatos (el slug del post, la categoría, el nivel si la pieza enseña por grados, los tags).
7. **Identificar y resolver los temas de investigación.** Todo lo que la escritura no pueda afirmar sin verificar (comportamiento de APIs, afirmaciones sobre frameworks, números de rendimiento, mecanismos del navegador) entra en `## Temas de investigación` y se resuelve dentro de la planeación: ejecución para verificaciones de código, `investigar` cuando la duda es documental. Las respuestas y el material recopilado (snippets probados con su salida, enlaces, citas con fuente) aterrizan en `## Material`. Un tema irresoluble en la sesión se eleva al usuario: no se presenta a la puerta un brief con investigación abierta.
8. **Bosquejar `## Borrador del outline`:** el arco bajado a beats (qué pasa en cada sección, dónde entra cada snippet del material, las transiciones). Es boceto de trabajo: `redactar-post` lo sigue como guía, no como corsé.
9. **Escribir el brief a disco** en `docs/editorial/briefs/<slug-del-post>.md` con `estado: borrador` (o actualizarlo, si la retoma del paso 2 lo encontró): el documento de trabajo existe desde que hay contenido y un corte de sesión no lo pierde.
10. **Pasar la ronda de escritura** sobre el brief en modo preventivo (`revisar-redaccion` y luego `pulir-escritura`); la versión que llega a la puerta va ya pulida.
11. **Presentar el brief completo al usuario.** Si solicita cambios, ajustar el archivo y repetir la presentación. Si lo rechaza, el brief queda en `borrador` (trabajo retomable); informar al invocador y terminar.
12. **Materializar la aprobación:** actualizar el `## Estado` del brief (`estado: aprobado` y la fecha, escritura directa) e insertar la sección `## Encuadre` en el archivo de la tarea (delegada en `actualizar-artefactos` como «insertar la sección `Encuadre` en la tarea», antes de `## Revisión`; si la sección ya existía por una planeación interrumpida, su cuerpo se actualiza por escritura directa en lugar de insertarse) con el cuerpo:

    ```markdown
    - **Brief:** `docs/editorial/briefs/<slug>.md` — aprobado <aaaa-mm-dd>
    - **Promesa:** «<la promesa en una frase>»
    ```

13. **Informar al invocador** de que el post quedó encuadrado: brief aprobado en disco y sección registrada, listo para `redactar-post` en esta iteración o en otra sesión.

## Finalización

El skill ha terminado cuando:

- El brief aprobado existe en `docs/editorial/briefs/` y la tarea registra su `## Encuadre`, o
- Se informó de que el post no puede encuadrarse (ya encuadrado, pieza sin los tres requisitos, brief rechazado) con el motivo.

## Referencias

- `.agents/skills/planear-tarea/SKILL.md` — La mitad de planeación del flujo de desarrollo, modelo en forma.
- `EDITORIAL.md` — La guía contra la que se encuadra.
- `docs/research/2026-10-procesos-gestion-editorial.md` — El brief como salida definida de la etapa de preparación y la aprobación del brief antes de redactar.
- `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — El `<!--more-->` que el checklist exige.
