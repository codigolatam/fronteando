# Validar el flujo de escritura con el primer post de la serie MVC

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

contenido

## Objetivo

Escribir y publicar el primer capítulo de la serie MVC en vanilla JS usando el flujo de escritura completo —planeador → encuadre → redacción → revisión editorial→ publicación— como dogfooding que valida el flujo y produce contenido real.

## Dependencias

- docs/tasks/017-enrutado-tipo-contenido.md

## Entrada

- El flujo de escritura completo enrutado (tareas 012–017): `EDITORIAL.md`, `planear-post`, `redactar-post`, `revisar-post`, planeador editorial y el tipo `contenido`.
- La pieza de la serie MVC en `docs/editorial/` — migrada por la tarea 016.
- El post inaugural publicado como precedente de voz y de cierre: «la serie de patrones» que el mini-store prometió.

## Resultado esperado

- Un nuevo artículo publicado — el capítulo 1 de la serie MVC (el problema: un componente construido a lo bruto y el dolor concreto de mantenerlo) — que encabeza la portada.
- El flujo ejercitado de punta a punta: la pieza recorrió el pipeline del planeador, el encuadre se aprobó antes de redactar, el código se ejecutó, la ronda corrió sobre la versión final y el revisor editorial emitió veredicto.
- Un registro de fricciones del flujo — qué apretó, qué sobró, qué faltó — para ajustar los skills tras el primer uso real.

## Criterios de calidad

- Cada paso del flujo se usó de verdad: si un paso se salta o se improvisa, queda registrado como hallazgo del flujo, no como éxito silencioso.
- El artículo cumple `EDITORIAL.md` — verificado por la revisión editorial, no por la buena voluntad del redactor.
- Todo el código del post corre tal cual; `check`, `lint`, `format:check` y `build` en verde.
- El artículo aparece en portada con su previo, en el feed y con su OG.

## Procedimiento sugerido

1. Mover la pieza de la serie MVC por el planeador hasta `en redacción`.
2. Correr el flujo: encuadre aprobado → redacción → revisión editorial → publicación por el ciclo general.
3. Al cerrar, registrar las fricciones del flujo en el archivo de la tarea y evaluar si merecen ajuste de skills.

## Notas

- Es el primer ejemplar del tipo `contenido`: su archivo es el molde real donde el brief y la sección `## Encuadre` se estrenan.
- El registro de fricciones es tan importante como el post — el dogfooding sirve para ajustar el flujo, no solo para publicar.
- El capítulo elegido es el primero del arco de la idea 007: el componente sin patrón, para que la serie cierre en el mini-store ya publicado.

## Contexto

- `Archivos similares:` `site/src/content/articulos/un-store-reactivo-en-vanilla-js.md` — precedente de voz; `docs/ideas/007-serie-mvc-en-vanilla-js.md` — la pieza de origen.
- `Patrones:` el post enlaza de vuelta al mini-store — la serie cierra donde aquel empieza.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md`, `docs/lessons/previos-de-articulos.md`, `docs/lessons/fechas-de-publicacion.md` — las prácticas que el flujo ya codifica.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el previo sale del cuerpo.
