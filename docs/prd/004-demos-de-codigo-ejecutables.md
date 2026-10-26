# PRD — Demos de código ejecutables

El código impreso en la página es estático: este conjunto convierte
los ejemplos en piezas interactivas que corren donde el texto las
explica —el lector las toca y, cuando la pieza lo amerita, ve el
funcionamiento interno que el listado no puede dar—.

## Usuarios

- **El lector:** ve y toca el ejemplo donde el texto lo explica, sin
  salir de la lectura.
- **El lector acompañado:** discute con su asistente lo que observó
  al tocar la demo.
- **El autor:** inserta piezas interactivas como una pieza más del
  texto, con un convenio propio.

## Casos de uso

- **CU-1 — El lector ve funcionar el ejemplo:** donde el texto lo
  presenta, la pieza corre en su lugar; el lector la toca —un valor,
  una acción— y ve el efecto sin salir del artículo.
- **CU-2 — El lector ve el funcionamiento interno:** una pieza
  instrumentada muestra paso a paso lo que ocurre por dentro —el
  estado que cambia, el efecto que se propaga—, lo que el código
  impreso no puede dar.
- **CU-3 — El autor inserta una pieza:** declara la demo en el
  fuente del artículo con el convenio del mecanismo; no edita la
  plantilla ni incrusta markup a mano.
- **CU-4 — La lectura sin JavaScript no se rompe:** cuando la pieza
  no puede ejecutarse, la página sigue contando lo esencial en su
  lugar.
- **CU-5 — El agente lee el artículo en texto plano:** el `.md`
  describe honestamente qué pieza hay donde la demo vive, sin markup
  ilegible ni silencio.

## Comportamiento esperado

- **Hospedaje:** la pieza se inserta desde el fuente del artículo y
  corre en su lugar de lectura; es un artefacto propio del sitio,
  reutilizable por convenio.
- **Superficie:** la apariencia de cada pieza sale de los tokens de
  la guía de estilo.
- **Degradación:** sin JavaScript la página conserva lo esencial.
- **Texto plano:** la versión `.md` describe la pieza con un texto
  honesto para el agente.
- **Autoría:** el convenio de declaración y construcción de piezas
  está documentado.

## Criterios de éxito

- El lector toca el ejemplo del store y el carrito sin salir del
  artículo —y en el store ve además el estado interno paso a paso—.
- Una demo nueva es una pieza del sitio con un convenio claro, no un
  apaño por post.
- Los capítulos futuros de MVC pueden nacer con demos disponibles.

## Fuera de alcance

- Editores completos en la página, ejecución en servidor y
  sandboxing para código de terceros.
- Las demos de los capítulos futuros de la serie MVC.
- La newsletter.
