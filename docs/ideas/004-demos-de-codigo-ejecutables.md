# Demos de código ejecutables: ejemplos que el lector puede tocar

> **Tipo:** idea de funcionalidad — conjunto (complejidad media)
> **Fecha:** 2026-10
> **Orden sugerido:** 4 de 5 (bloque inicial) — enriquece los artículos pero es ortogonal al resto; puede esperar a que el sitio y su editorial existan.
> **Procesada en:** docs/proposals/005-demos-de-codigo-ejecutables/

## Problema

Un blog de frontend vive de sus ejemplos de código, pero el código impreso en la página es estático: el lector puede leerlo y copiarlo, no verlo funcionar ni modificarlo. Para comprobar qué hace un fragmento tiene que salir del artículo, montar un entorno y probar por su cuenta — fricción suficiente para que la mayoría no lo haga, y para que «entender de verdad» se quede a medias.

## Qué desbloquea

- **El ejemplo vivo:** demostraciones que se ejecutan dentro del propio artículo, allí donde el texto las explica.
- **La experimentación inmediata:** modificar un valor, un selector o una línea y ver el resultado sin abandonar la lectura.
- **El componente reutilizable:** las demos como piezas propias del sitio, no como apaños insertados a mano en cada post.

## Flujos de trabajo que se hacen viables

- El lector ve un ejemplo de CSS o JavaScript, lo modifica en el momento — un valor, una propiedad — y comprueba el efecto sin salir del artículo.
- El autor inserta una demo interactiva justo donde la explicación la necesita, como una pieza más del texto.
- El lector acompañado por LLM puede llevar al asistente lo que observó en la demo y contrastar su comprensión.

## Ventajas como producto

- **La misión hecha carne:** un blog que quiere enseñar de verdad gana más con un ejemplo que se toca que con diez que solo se leen.
- **Calidad pedagógica reconocible:** las demos ejecutables son el rasgo que distingue un tutorial olvidable de una explicación memorable.
- **Material para el acompañamiento:** lo que el lector observa al tocar la demo es exactamente lo que puede discutir con su asistente en los checkpoints.

## Tensión que introduce en el roadmap

Ortogonal a las hermanas de infraestructura y salidas: necesita `sitio-base-del-blog` porque las demos viven como componentes del sitio, y convive con `lectura-acompanada-por-llm` como el otro enriquecimiento del artículo — compiten por el mismo esfuerzo de «qué es un post de Fronteando». Puede ejecutarse en paralelo a `blog-legible-para-maquinas` y `newsletter` sin pisarlas.
