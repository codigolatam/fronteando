# Serie MVC en JavaScript vanilla: estructura para componentes sin framework

> **Tipo:** idea de contenido — serie (complejidad media-alta)
> **Fecha:** 2026-10
> **Orden sugerido:** 2 de 2 (contenido técnico) — la serie es la línea editorial duradera; arranca cuando el post inaugural ya probó el formato.
> **Procesada en:** docs/editorial/piezas/serie-mvc-en-vanilla-js.md

## Problema

Quien escribe componentes sin framework acaba con el mismo código espagueti: estado, manejadores de eventos y manipulación del DOM enredados en el mismo sitio, imposible de mantener en cuanto el componente crece. El patrón MVC existe desde hace décadas como respuesta a eso, pero el lector de frontend lo conoce de nombre —lo asocia a backends o a frameworks— y nunca lo ha visto construido a mano en vanilla JS, donde cada decisión de separación se siente.

## Qué desbloquea

- **La disciplina hecha visible:** Modelo, Vista y Controlador construidos pieza a pieza sobre un componente real, con la justificación de cada separación.
- **La serie como formato editorial:** un arco de varios posts donde cada uno deja al lector con una pieza funcional y una pregunta abierta.
- **La comprensión de los frameworks por contraste:** entender qué problema resolvía MVC aclara qué problema resolvieron después la reactividad y los signals.

## Flujos de trabajo que se hacen viables

- El lector lleva un componente del espagueti al MVC completo —primero el problema sentido, luego Modelo con notificación, Vista como función del estado y Controlador cerrando el ciclo— y termina reconociendo los límites que motivaron a los frameworks.
- El lector aplica la misma separación a sus propios componentes vanilla —widgets, paneles, extensiones— donde un framework sería exceso.
- El blog gana su primera serie: lectura con continuidad, no posts sueltos.

## Ventajas como producto

- **Identidad editorial:** una serie de fundamentos aplicados a mano es exactamente la clase de contenido que distingue a Fronteando.
- **Profundidad para el acompañamiento:** cada post es conceptual —«¿por qué así?»—, el terreno donde los checkpoints de comprensión de la línea 002 rinden más.
- **Continuidad con el post inaugural:** el mini-store responde cómo se sincroniza el estado con la vista; la serie responde cómo se estructura todo lo demás.

## Tensión que introduce en el roadmap

Es hermana de `post-mini-store-reactivo`: el store va primero porque prueba la línea editorial con un post autónomo, y esta serie la sigue como línea de contenido duradera —su último post enlaza de vuelta a la reactividad que el store ya enseñó. Compite por tiempo de escritura con las líneas de funcionalidad del sitio: es contenido, no infraestructura, y convive con ellas en lugar de bloquearlas.
