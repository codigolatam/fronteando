# Lectura acompañada por LLM

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Cada artículo puede declarar su lectura acompañada y el sitio la
presenta al lector: el flujo «copiar el protocolo, leer con pausas,
contrastar con el asistente» existe y funciona en los artículos
técnicos publicados.

## Alcance

- **Dentro:** la declaración por artículo —contexto, pausas y opt-out
  explícito—, el protocolo común escrito una sola vez, la composición
  del material en build, la experiencia en página —tarjeta, marcas de
  pausa y enlaces precargados— y la adaptación del corpus publicado.
- **Fuera:** las salidas legibles por máquinas (idea 003), las demos
  ejecutables (idea 004), cualquier asistente embebido o integración
  obligatoria con proveedores, y la telemetría de uso.

## Piezas

- [x] docs/tasks/022-declaracion-y-protocolo-comun.md — declaración de
      acompañamiento y protocolo común
- [x] docs/tasks/023-composicion-del-material.md — composición del
      material de acompañamiento
- [ ] docs/tasks/024-experiencia-en-pagina.md — experiencia de lectura
      acompañada en página
- [ ] docs/tasks/025-adaptar-el-corpus.md — adaptar el corpus a la
      lectura acompañada

## Plan técnico

- **Orden:** 022 → 023 → 024 → 025, estrictamente secuencial.
- **Dependencias:** 023 necesita el esquema de declaración y el
  protocolo común de 022; 024 consume el material compuesto de 023; 025
  se verifica sobre la experiencia ya renderizada de 024.
- **Decisiones transversales:**
  - El acompañamiento se declara, no se escribe en prosa: lo común vive
    una sola vez en el sitio, lo propio con los metadatos del artículo
    y las pausas marcadas dentro del texto, donde viajan con el
    contenido.
  - La composición produce texto plano portable: la misma pieza
    alimenta la página del artículo y las futuras salidas de la idea 003.
  - Copiar el protocolo es el camino garantizado; los enlaces
    precargados son una comodidad que degrada a copiar — no
    documentados, con límite de ~6k/10k caracteres y sin auto-envío
    garantizado (docs/research/2026-10-enlaces-precargados-a-asistentes.md).
  - El opt-out explícito distingue «no se acompaña por decisión» de
    «aún sin declarar».
  - La pieza visual sigue `DESIGN.md`: tokens antes que literales y
    evidencia renderizada en ambos temas.
  - El comportamiento esperado del conjunto vive en
    `docs/prd/002-lectura-acompanada-por-llm.md`; los planes de cada
    pieza bajan sus casos de uso.

## Criterio de cierre

Los dos artículos técnicos publicados muestran tarjeta y marcas con el
protocolo copiable y los enlaces funcionales; «Hola, Fronteando»
declara su opt-out; la convención de declaración queda documentada
para los posts futuros.

## Revisión

- Usuario: 2026-10-23 — Aprueba
