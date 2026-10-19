# Validar el flujo de escritura con el primer post de la serie MVC

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

contenido

## Objetivo

Escribir y publicar el primer capítulo de la serie MVC en vanilla JS usando el flujo de escritura completo —despliegue de la serie → encuadre → redacción → revisión editorial → publicación— como dogfooding que valida el flujo y produce contenido real.

## Dependencias

- docs/tasks/017-enrutado-tipo-contenido.md

## Entrada

- El flujo de escritura completo enrutado (tareas 012–017): `EDITORIAL.md`, `planear-post`, `redactar-post`, `revisar-post`, planeador editorial y el tipo `contenido`.
- La serie MVC en `docs/editorial/series/mvc-en-vanilla-js.md` — en `propuesta`, migrada por la tarea 016; su despliegue en piezas es el primer paso de esta tarea.
- El post inaugural publicado como precedente de voz y de cierre: «la serie de patrones» que el mini-store prometió.

## Resultado esperado

- La serie desplegada: el arco decidido (componente conductor y número de posts), las piezas hijas creadas en el planeador y la serie en `en curso`.
- Un nuevo artículo publicado — el capítulo 1 de la serie MVC (el problema: un componente construido a lo bruto y el dolor concreto de mantenerlo) — que encabeza la portada.
- El flujo ejercitado de punta a punta: la pieza recorrió el pipeline del planeador, el encuadre se aprobó antes de redactar, el código se ejecutó, la ronda corrió sobre la versión final y el revisor editorial emitió veredicto.
- Un registro de fricciones del flujo — qué apretó, qué sobró, qué faltó — para ajustar los skills tras el primer uso real.

## Criterios de calidad

- Cada paso del flujo se usó de verdad: si un paso se salta o se improvisa, queda registrado como hallazgo del flujo, no como éxito silencioso.
- El artículo cumple `EDITORIAL.md` — verificado por la revisión editorial, no por la buena voluntad del redactor.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo aparece en portada con su previo, en el feed y con su OG.

## Procedimiento sugerido

1. Desplegar la serie MVC con `gestionar-piezas`: decidir el componente conductor y el número de posts del arco; las piezas hijas nacen en el planeador y la serie pasa a `en curso`.
2. Llevar la pieza del primer post a `en redacción`, enlazando esta tarea en su `## Entrada`.
3. Correr el flujo: encuadre aprobado → redacción → revisión editorial → publicación por el ciclo general.
4. Al cerrar, registrar las fricciones del flujo en el archivo de la tarea y evaluar si merecen ajuste de skills.

## Notas

- Es el primer ejemplar del tipo `contenido`: su archivo es el molde real donde el brief y la sección `## Encuadre` se estrenan.
- Es también el primer despliegue real de una serie: el diálogo del arco y el nacimiento de las piezas hijas son parte de lo que el dogfooding observa — si el enrutado de `contenido` tropieza con la entrada no desplegada, queda como fricción registrada.
- El registro de fricciones es tan importante como el post — el dogfooding sirve para ajustar el flujo, no solo para publicar.
- El capítulo elegido es el primero del arco de la idea 007: el componente sin patrón, para que la serie cierre en el mini-store ya publicado.

## Contexto

- `Archivos similares:` `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` — precedente de voz; `docs/editorial/series/mvc-en-vanilla-js.md` — la serie que esta tarea despliega (idea 007 procesada).
- `Patrones:` el post enlaza de vuelta al mini-store — la serie cierra donde aquel empieza.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md`, `docs/lessons/previos-de-articulos.md`, `docs/lessons/fechas-de-publicacion.md` — las prácticas que el flujo ya codifica.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el previo sale del cuerpo.
