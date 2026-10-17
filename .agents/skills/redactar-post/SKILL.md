---
name: redactar-post
description: >
  Ejecuta la mitad de ejecución del flujo de escritura de un post:
  toma una tarea de tipo contenido con su brief aprobado y produce
  el borrador, sección a sección siguiendo el outline, con cada
  snippet ejecutado antes de incluirse, la ronda de escritura
  completa sobre la versión final y los metadatos cerrados con
  draft activo. Usar cuando la tarea de contenido ya tiene el
  brief aprobado y hay que escribir el artículo.
  Sinónimos: redactar post, escribir artículo, ejecutar la
  escritura, flujo de escritura, borrador del post.
---

# Redactar post

Instrucciones para que un agente ejecute la mitad de ejecución del flujo de escritura dentro de una tarea de tipo `contenido`: toma el brief aprobado que la sección `## Encuadre` de la tarea enlaza (la única entrada de escritura), produce el post en `site/src/content/articulos/<slug>.md` con `draft: true`, marca los ítems verificados del checklist del brief y registra en la tarea las desviaciones del brief. Se detiene ahí: la revisión editorial corresponde a `revisar-post`, que puede ocurrir en la misma iteración o en otra sesión.

## Cuándo usar

- Cuando una tarea de tipo `contenido` tiene el brief aprobado: en el ciclo, `ejecutar-tareas` la enruta aquí, o la invocación sigue a la de `planear-post` en la misma iteración.
- Cuando el usuario pida escribir el post de una tarea ya encuadrada.
- Cuando una redacción quedó interrumpida: el post parcial en `site/src/content/articulos/` revela el punto de corte, el checklist del brief lo ya verificado, y se retoma donde quedó.

## Cuándo no usar

- Cuando la tarea no tiene brief aprobado (sin `## Encuadre`, o el brief enlazado no declara `estado: aprobado`): corresponde primero `planear-post`.
- Para tareas de otro tipo o sin tipo declarado: no pasan por el flujo de escritura.
- Para encuadrar o planear el post: eso es `planear-post`.
- Para la revisión editorial del borrador (verificación técnica y de guía): eso es `revisar-post`, que además retira el `draft`.
- Para capturar, promover o mover piezas del pipeline editorial: eso corresponde al gestor del planeador.

## Entrada

- El archivo de la tarea `contenido`, marcada en progreso por el ejecutor general, con la sección `## Encuadre` (la señal de planeación completa: ruta del brief, fecha de aprobación y promesa en una línea).
- El brief aprobado en `docs/editorial/briefs/<slug>.md`, la única entrada de escritura, con `estado: aprobado` en su sección `## Estado`.
- `EDITORIAL.md`: la guía de voz, anatomía, contrato de metadatos y taxonomía que el borrador respeta.
- El corpus publicado en `site/src/content/articulos/`: precedentes de voz, series y formato real.
- `assets/post.md`: la plantilla del post en el formato de la colección.
- Las capacidades de artefactos: `consultar-artefactos` para las lecturas del formato; `actualizar-artefactos` para las mutaciones del brief y de la tarea.
- Los skills genéricos de escritura, `revisar-redaccion` y `pulir-escritura`, en ese orden.
- `node` local para ejecutar los snippets.

## Salida

- `site/src/content/articulos/<slug>.md`: el post escrito con `draft: true`, frontmatter según los metadatos decididos en el brief, `<!--more-->` tras el gancho y el cuerpo siguiendo el outline.
- El brief con los ítems verificados de su `## Checklist de publicación` marcados.
- El archivo de la tarea con `## Desviaciones del brief`, si las hubo.
- O la conclusión de que el post no puede redactarse (brief ausente o sin aprobar, contenido faltante no resoluble, desviación mayor no confirmada), comunicada al invocador con el motivo.

## Principios rectores

1. **El brief es el contrato:** es la única entrada de escritura; lo que falte es una falta del encuadre (se eleva, no se improvisa).
2. **La entrada se valida, no se presume:** sin `## Encuadre` enlazando un brief `aprobado` no se escribe; se deriva a `planear-post`.
3. **El código se ejecuta antes de incluirse:** cada snippet corre tal cual aparecerá y su salida se registra como la verá el lector (el fact-check del flujo).
4. **La ronda corre sobre la versión final:** `revisar-redaccion` y luego `pulir-escritura`; todo párrafo reescrito después vuelve a pasarla.
5. **El post nace en borrador:** `draft: true` desde la plantilla y así queda; `revisar-post` lo retira al aprobar.
6. **Las puertas humanas se respetan:** las desviaciones que cambian promesa, ángulo o alcance se confirman con el usuario antes de escribirlas.
7. **Acotado a una tarea:** no gestiona el estado de la tarea en el índice, ni la revisión editorial ni el pull request; eso sigue siendo del ejecutor general.

## Procedimiento

1. **Validar la entrada.** Leer el archivo de la tarea, comprobar el tipo `contenido` y consultar las secciones delegando en `consultar-artefactos` la consulta «las secciones de la tarea»: si falta `## Encuadre`, informar de que la tarea requiere `planear-post` primero y terminar. Si la sección existe, leer el brief enlazado y comprobar `estado: aprobado` (lectura directa del campo: el `## Estado` del brief es por campos, sin operación del catálogo que lo consulte) y que `## Temas de investigación` no conserva ítems `- [ ]` sin marcar (un brief inconsistente podría quedar aprobado por una mutación manual). Sin la aprobación, o con investigación abierta, informar al invocador y terminar.
2. **Leer el brief completo y `EDITORIAL.md`.** El brief es la única entrada de escritura: encuadre, material, outline y checklist. La guía rige voz, anatomía y metadatos.
3. **Crear o retomar el post.** Resolver el slug desde los metadatos del brief y comprobar si existe `site/src/content/articulos/<slug>.md`: si existe, la redacción quedó interrumpida (el post parcial revela el punto de corte y el checklist del brief lo ya verificado) y se continúa en el paso pendiente en lugar de regenerar el archivo; si no, crearlo desde `assets/post.md` con los metadatos decididos en el brief (título, description, categoría, nivel si se decidió, tags; `draft: true` queda y `date` se rellena al cerrar).
4. **Escribir por secciones siguiendo `## Borrador del outline`.** El outline es guía, no corsé: el orden o un beat puede mejorar al escribir, y la mejora se anota como desviación si cambia lo decidido. Todo lo que el texto afirma ya está en `## Material`; lo que falte se trata como falta del brief (se eleva al usuario o se registra como desviación confirmada), no se improvisa. El corpus publicado se consulta al escribir para mantener la voz y enlazar las piezas previas o de la serie que el brief contemple.
5. **Ejecutar cada snippet antes de incluirlo.** El código entra al post tal cual corre y su salida se registra como la verá el lector; un extracto deliberado se marca explícitamente como tal (lo exige el checklist del brief).
6. **Respetar la anatomía de la guía:** el gancho planta una tensión y la resuelve dentro del previo; `<!--more-->` va inmediatamente tras él; el previo es una unidad autocontenida; tras el corte va la promesa; el resultado primero, luego la explicación y los límites honestos con sección propia; el cierre abre una puerta. Este resumen es el checklist accionable; si difiere de la guía, manda la guía.
7. **Pasar la ronda de escritura completa sobre la versión final:** `revisar-redaccion` y luego `pulir-escritura`, bajo la autoridad de `EDITORIAL.md`. Si la ronda reescribe párrafos, la versión cambiada vuelve a pasar la revisión que corresponda.
8. **Cerrar los metadatos:** `date` con la hora real del momento de cierre (si el merge queda lejos, se ajusta en el PR); `categoria`, `nivel` y `tags` tal como los decidió el brief; `draft: true` se conserva (lo retira `revisar-post` al aprobar). Al cerrar, ejecutar `npm run check` en `site/`: un frontmatter inválido contra el esquema se detecta aquí, no en CI.
9. **Marcar los ítems verificados del checklist del brief** delegando en `actualizar-artefactos` «marcar completado el ítem `<texto>` de la sección `Checklist de publicación` del brief», pasando como `<texto>` el ítem completo o una subcadena única en la sección (`marcar-item` marca todos los que casan, no solo el primero): solo los comprobados contra el post real; los que no se cumplen se elevan.
10. **Registrar las desviaciones** en el archivo de la tarea delegando en `actualizar-artefactos` (insertar la sección `Desviaciones del brief` con el cuerpo, o añadir la línea si la sección ya existe; el título va literal entre comillas inversas: el concepto «desviaciones» del catálogo mapea a `Desviaciones del plan`, que no es esta sección): una línea por desviación con el motivo; las que cambian promesa, ángulo o alcance solo tras confirmación del usuario.
11. **Informar al invocador** del diff producido (el post y las marcas del brief) y de las desviaciones registradas; el estado de la tarea, la revisión editorial y el PR quedan del ejecutor general.

## Finalización

El skill ha terminado cuando:

- El post existe en `site/src/content/articulos/<slug>.md` con `draft: true`, su ronda pasada y los ítems verificados del checklist marcados, o
- Se informó de que el post no puede redactarse (brief ausente o sin aprobar, contenido faltante, desviación mayor no confirmada) con el motivo.

## Referencias

- `.agents/skills/planear-post/SKILL.md` — La mitad de planeación que produce el brief que este skill consume.
- `.agents/skills/desarrollar-tarea/SKILL.md` — La mitad de ejecución del flujo de desarrollo, modelo en forma.
- `EDITORIAL.md` — La guía que el borrador respeta: voz, anatomía, contrato de metadatos y taxonomía.
- `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — El `<!--more-->` tras el gancho y el previo como unidad.
- `docs/decisions/D003-brief-editorial-artefacto-propio.md` — El contrato de entrada: brief `aprobado` más `## Encuadre` en la tarea.
- `docs/lessons/fechas-de-publicacion.md` — La hora real en `date` y el ajuste en el PR si el merge queda lejos.
- `docs/research/2026-10-procesos-gestion-editorial.md` — La ejecución como etapa separada de la revisión editorial.
