# Alcance de la verificación

## Lecciones

- **Los tests automatizados cubren lógica, no diseño.** Por qué: la
  suite de la tarea 024 pedía pruebas de render —card, `<details>`,
  marcadores— y el agente propuso automatizarlas; el usuario indicó
  que los tests son para la funcionalidad lógica y que el diseño se
  verifica con evidencia renderizada en el navegador.
  Disparadores: suite de pruebas, tests, vitest, render, evidencia, verificación, navegador
  Origen: 20261025T171103

- **«El mismo resultado» en un criterio se interpreta como el mismo
  diseño, no el mismo HTML.** Por qué: la suite pedía HTML idéntico
  para los artículos sin declaración y el agente señaló un wrapper
  nuevo como incumplimiento; el usuario aclaró que el criterio es la
  equivalencia visual —posiciones, márgenes, fuentes—, medida en el
  navegador, no la estructura del DOM.
  Disparadores: criterio de calidad, HTML, DOM, diseño, equivalencia, suite de pruebas, CU-
  Origen: 20261025T171104
