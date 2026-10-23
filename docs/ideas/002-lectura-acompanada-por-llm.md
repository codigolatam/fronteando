# Lectura acompañada por LLM: el puente entre el artículo y el asistente del lector

> **Tipo:** idea de funcionalidad — épica (complejidad media-alta)
> **Fecha:** 2026-10
> **Orden sugerido:** 2 de 5 (bloque inicial) — es el diferenciador editorial y define el esquema de contenido que `blog-legible-para-maquinas` consume.
> **Procesada en:** docs/proposals/003-lectura-acompanada-por-llm

## Problema

Muchos lectores de Fronteando ya aprenden con un LLM al lado, pero el artículo y el asistente viven desconectados: quien quiera profundizar tiene que improvisar cada vez — copiar trozos, explicar de qué va el texto, pedir que le hagan preguntas — sin que el artículo le dé estructura para hacerlo. El resultado es un acompañamiento pobre y a la medida de cada quien, cuando la misión del blog es que el lector entienda de verdad, no solo que vea cómo se hace algo.

Al autor le pasa lo simétrico: si quisiera dar ese acompañamiento hoy, tendría que reinventar las instrucciones en cada artículo, repitiendo lo que es igual para todos.

## Qué desbloquea

- **El acompañamiento como protocolo:** una forma declarada — no improvisada — de leer el artículo con un LLM, con rol, reglas y pausas.
- **La declaración por artículo:** cada texto aporta solo lo suyo — sus checkpoints y su contexto — sobre instrucciones comunes definidas una sola vez.
- **La experiencia dentro de la página:** una card al inicio con el protocolo listo para usar y marcadores de pausa junto al contenido que les corresponde.

## Flujos de trabajo que se hacen viables

- El lector copia el protocolo de inicio una vez en su asistente preferido y lee el artículo pausando en los checkpoints — pedir un quiz, otro ejemplo, una verificación de que entendió.
- El lector abre la conversación directamente en ChatGPT o Claude con el contexto ya precargado, sin copiar nada a mano.
- El autor declara en su artículo los checkpoints y el contexto propio — tema, nivel del lector, prerequisitos — y el sitio produce el material de acompañamiento por él.

## Ventajas como producto

- **Diferenciación editorial:** es la línea que hace a Fronteando reconocible; nadie más lee con ese contrato entre artículo y asistente.
- **Profundidad como hábito:** los checkpoints convierten la lectura en una práctica de comprensión, no en un consumo pasivo.
- **Honestidad con la realidad:** en lugar de fingir que los lectores no usan LLMs, el blog lo asume y lo convierte en ventaja pedagógica.

## Tensión que introduce en el roadmap

Depende de `sitio-base-del-blog`: el protocolo se materializa en componentes y en el esquema de contenido del sitio. Es la hermana mayor de `blog-legible-para-maquinas`: ambas nacen de la misma fuente única, y la definición del esquema — qué declara cada artículo — las condiciona a las dos, así que conviene ejecutarlas en este orden. Con `demos-de-codigo-ejecutables` compite por ser el enriquecimiento del artículo que se construye primero; la editorial manda.
