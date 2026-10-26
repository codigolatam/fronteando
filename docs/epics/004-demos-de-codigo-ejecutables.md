# Demos de código ejecutables

## Estado

[x] Planificada | [ ] Completada

## Objetivo

Los artículos hospedan piezas interactivas que el lector ve
funcionar y toca en su lugar de lectura —incluida la vista del
funcionamiento interno que el código impreso no puede dar— y las
dos piezas que más lo reclaman, el store reactivo y el carrito a lo
bruto, lo adoptan.

## Alcance

- **Dentro:** el mecanismo para declarar y hospedar piezas
  interactivas desde el fuente markdown, su comportamiento sin
  JavaScript, su forma en el `.md`, el convenio de autoría y dos
  demos reales —el store y el carrito—.
- **Fuera:** editores completos en la página, ejecución en servidor,
  sandboxing para código de terceros, las demos de los capítulos
  futuros de MVC y la newsletter.

## Piezas

- [ ] docs/tasks/028-mecanismo-de-piezas-interactivas.md — el
      mecanismo de piezas interactivas en el artículo
- [ ] docs/tasks/029-demo-del-store-reactivo.md — demo viva del
      store reactivo
- [ ] docs/tasks/030-demo-del-carrito.md — demo viva del carrito a
      lo bruto

## Plan técnico

- **Orden:** 028 → 029 → 030, estrictamente secuencial.
- **Dependencias:** 029 y 030 consumen el mecanismo y el convenio
  que 028 define; 030 hereda además lo que 029 depure del convenio
  con la primera pieza real.
- **Decisiones transversales:**
  - La pieza es un artefacto propio del sitio —markup, lógica y
    estilo en un lugar convencionado—, no incrustada a mano en el
    texto del artículo.
  - La declaración vive en el fuente del artículo: insertar una
    pieza no exige editar la plantilla de la página.
  - El vehículo —directiva `:::`, HTML en línea, elemento
    personalizado— lo decide el plan de 028, con prueba de
    concepto si la necesita.
  - Sin JavaScript la página no se rompe: lo que la pieza deja en
    su lugar es decisión del mecanismo.
  - El `.md` describe la pieza con un texto honesto —el agente no
    encuentra markup ilegible ni silencio—; se evalúa como prompt
    (docs/lessons/texto-para-agentes.md).
  - La superficie de cada pieza sigue `DESIGN.md`; los ajustes de
    texto respetan la voz editorial y el `agente` declarado con sus
    pausas en posición.
  - El comportamiento esperado del conjunto vive en
    `docs/prd/004-demos-de-codigo-ejecutables.md`.

## Criterio de cierre

Los dos artículos técnicos muestran su demo funcionando en su lugar
de lectura —el lector toca el estado y ve el efecto—, insertadas por
el mecanismo sin tocar la plantilla de la página; sin JavaScript las
páginas no se rompen; los `.md` siguen legibles para un agente; y el
convenio de autoría queda documentado en `EDITORIAL.md`.

## Revisión

- Usuario: 2026-10-26 — Aprueba
