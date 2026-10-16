---
title: "Hola, Fronteando"
description: "Qué es Fronteando, por qué existe y cómo se lee."
date: 2026-10-16
tags: ["meta"]
---

Fronteando es un blog técnico de desarrollo web frontend: CSS, JavaScript,
frameworks, accesibilidad y rendimiento. Está pensado como **un lugar donde
aprender frontend, con o sin asistente de por medio**.

## Por qué existe

La documentación dice qué hace una API; los tutoriales dicen qué pasos seguir.
Lo que suele faltar es el espacio intermedio: entender por qué una decisión se
toma así, qué alternativas existían y qué se rompe si se ignora. Ese es el tipo
de texto que va a vivir aquí.

## Cómo se lee

Cada artículo está escrito para leerse de corrido, pero también para trabajarse
con un LLM de acompañamiento: el código es real, copiable en un gesto, y los
ejemplos se pueden pegar tal cual en una conversación.

```js
// Esto es un bloque de código de verdad.
const tema = matchMedia("(prefers-color-scheme: dark)").matches
  ? "oscuro"
  : "claro";
```

La interfaz respeta tu sistema: si tu preferencia es `prefers-color-scheme:
dark`, el sitio llega oscuro; el conmutador de la cabecera te deja elegir.

### Lo que encontrarás en cada artículo

- Prosa que se lee de corrido, sin prerrequisitos artificiales.
- Código real, resaltado y copiable en un gesto.
- Enlaces a las fuentes —como la
  [documentación de Astro](https://docs.astro.build)— cuando el tema lo pide.

## Cómo se publica

Cada artículo es un archivo Markdown en el repositorio, con sus metadatos en el
frontmatter. Fusionar a la rama principal compila y publica el sitio —no hay
paso manual entre el texto y la página que estás leyendo. Este artículo es,
precisamente, la primera prueba de esa tubería.

Bienvenido.
