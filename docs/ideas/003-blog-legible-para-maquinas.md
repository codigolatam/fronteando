# Blog legible para máquinas: el contenido consumible por LLMs y agentes

> **Tipo:** idea de funcionalidad — conjunto (complejidad media-baja)
> **Fecha:** 2026-10
> **Orden sugerido:** 3 de 5 (bloque inicial) — deriva de la fuente única que `lectura-acompanada-por-llm` define; ejecutarla después la hace casi mecánica.

## Problema

El artículo publicado está pensado para el ojo humano: quien quiera llevarlo completo a su LLM — para leerlo acompañado de principio a fin — se encuentra con una página hecha para verse, no para pegarse. Y el agente que llega al sitio por su cuenta no encuentra ni el contenido en forma consumible ni una declaración de qué es Fronteando y qué artículos hay: la web habla a personas, no a las máquinas que cada vez leen más por ellas.

## Qué desbloquea

- **El artículo entero, portable:** cada texto existe también en una forma pensada para llevarse completa a una conversación, con su acompañamiento en orden de lectura.
- **El sitio que se presenta:** una declaración legible por máquinas de qué es Fronteando y qué contiene, siguiendo la convención que ya usan sitios de documentación técnica.
- **El segundo camino del acompañamiento:** junto al lector que copia a su ritmo, el agente que llega directo y encuentra el protocolo completo.

## Flujos de trabajo que se hacen viables

- El lector se lleva el artículo completo a su asistente — bootstrap y checkpoints incluidos en su posición — y lo recorre acompañado sin tocar la página.
- Un agente descubre el sitio, sabe qué es y qué artículos existen, y lee cualquiera de ellos con su material de acompañamiento embebido.
- Otros sitios y herramientas referencian a Fronteando en su forma legible, como ya ocurre con la documentación que publica versiones `.md` y `llms.txt`.

## Ventajas como producto

- **Lectores de los dos tipos:** el blog atiende tanto a la persona que lee como al asistente que lee por ella — una audiencia que crece.
- **Posicionamiento en una convención emergente:** sumarse temprano a `llms.txt` y las versiones `.md` coloca a Fronteando donde la documentación seria ya está.
- **Coherencia con la misión:** si el blog enseña a leer con LLM, lo mínimo es que su propio contenido sea ejemplar en eso.

## Tensión que introduce en el roadmap

Es la hermana menor de `lectura-acompanada-por-llm`: ambas salen de la misma fuente única, así que el esquema que aquella define es la entrada de esta — ejecutarla antes la convertiría en trabajo doble. Depende también de `sitio-base-del-blog`, que produce las salidas en build time. No compite con `demos-de-codigo-ejecutables` ni con `newsletter` más que por el tiempo disponible.
