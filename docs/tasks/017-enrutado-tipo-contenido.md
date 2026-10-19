# Enrutar el tipo contenido en ejecutar-tareas

## Estado

[ ] Pendiente | [~] En progreso | [r] En revisión | **[x] Completada** | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Registrar el tipo de tarea `contenido` en `ejecutar-tareas` con su sub-flujo propio —encuadre (`planear-post`) → redacción (`redactar-post`) → revisión editorial (`revisar-post`)— y adaptar la consulta de «planeación completa» a las secciones editoriales, de modo que un post siga el flujo de escritura y no el de desarrollo.

## Dependencias

- docs/tasks/013-skill-planear-post.md
- docs/tasks/014-skill-redactar-post.md
- docs/tasks/015-skill-revisar-post.md
- docs/tasks/016-planeador-editorial.md

## Entrada

- Los tres skills del flujo (013–015) con el contrato definido: brief aprobado en `docs/editorial/briefs/` y la sección `## Encuadre` de la tarea como señal.
- El planeador editorial (016) — origen de las piezas que entran al flujo.
- `ejecutar-tareas` en `.agents/skills/` — el orquestador donde el enrutado por tipo vive.
- La experiencia de la tarea 011: un post corrió por el sub-flujo de desarrollo y el molde apretó — el tipo `contenido` lo resuelve.

## Resultado esperado

- `ejecutar-tareas` enruta las tareas de tipo `contenido` al sub-flujo de escritura: brief aprobado como equivalente de la mitad de planeación, redacción con su checklist, revisión editorial en lugar de revisión técnica de implementación.
- La consulta de «planeación completa» reconoce la sección `## Encuadre` (puntero al brief aprobado) para el tipo `contenido` — sin tocar las del tipo `desarrollo`.
- Las puertas generales del ciclo —rama, PR, checks, veredictos, cierre— se conservan intactas para el nuevo tipo.

## Criterios de calidad

- Una tarea `contenido` no puede saltarse el encuadre ni la revisión editorial — las puertas del sub-flujo son tan firmes como las de desarrollo.
- La publicación sigue por el ciclo general: PR con los cuatro checks, aprobación y merge — el sub-flujo solo cambia la mitad interna.
- El enrutado no rompe el tipo `desarrollo` ni los existentes — verificado con una tarea de cada tipo.
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `ejecutar-tareas` y localizar dónde vive el enrutado por tipo y la consulta de planeación.
2. Añadir el tipo `contenido` con su sub-flujo y la consulta adaptada.
3. Recorrer el flujo en seco con una tarea de prueba o contra la 018.

## Notas

- El tipo `contenido` de la tarea 018 la convierte en el primer ejemplar real del flujo — esta tarea debe quedar antes.
- Si la consulta de planeación necesita una operación nueva en `consultar-artefactos`, se añade aquí como parte del alcance.

## Contexto

- `Archivos similares:` `.agents/skills/ejecutar-tareas/` — el orquestador; los skills 013–015 que este enrutado invoca.
- `Patrones:` enrutado por tipo con sub-flujos de dos mitades + revisión, y puertas del ciclo general intactas.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/checks-de-ci-independientes.md` — las puertas del ciclo general no se negocian.
- `Decisiones:` sin decisiones aplicables.

## Conectividad

Conectada. El trabajo toca `.agents/skills/ejecutar-tareas/SKILL.md` —el registro «Enrutado por tipo» (paso 5) y los puntos del ciclo que el tipo condiciona: la revisión (paso 9) y los informes de estado de la pieza (pasos 8 y 18)—. Todo lo asumido existe: la operación `secciones` de `consultar-artefactos` emite los encabezados `##` de la tarea y cubre la consulta de encuadre (`## Encuadre` como señal de planeación completa del tipo `contenido`, D003) sin operación nueva; los tres especialistas (`planear-post`, `redactar-post`, `revisar-post`) existen con sus contratos de entrada; `gestionar-piezas` ya declara que el ejecutor le informa los movimientos a `en revisión` y `publicado`; y el campo `## Tipo` es lectura directa del archivo. La tarea 018 ya declara `Tipo: contenido` y es el primer ejemplar real del enrutado.

## Plan técnico

`ejecutar-tareas` es un orquestador agnóstico de dominio: lee el `## Tipo` de la tarea y delega en el especialista registrado en «Enrutado por tipo». El sub-flujo de `desarrollo` tiene dos puntos de entrada según el estado de planeación (`planear-tarea`/`desarrollar-tarea`) y su propia revisión (`revisar-implementacion`). El tipo `contenido` necesita el mismo tratamiento con sus especialistas editoriales.

- [x] Registrar el tipo `contenido` en «Enrutado por tipo» con sus dos puntos de entrada: sin `## Encuadre` → `planear-post` (y si el encuadre termina con brief aprobado, la misma iteración continúa con `redactar-post`); con `## Encuadre` → `redactar-post` directamente
  - Aporta: el espejo exacto del enrutado de `desarrollo` —el orquestador elige el punto de entrada por el estado registrado, no por conocimiento del dominio—
  - Contexto: la consulta de planeación del tipo es «las secciones de la tarea» (`secciones`, ya existe —`## Encuadre` presente es la señal, D003); la validación real del `estado` del brief la hacen los especialistas, que derivan hacia atrás si está inconsistente. No hace falta operación nueva en `consultar-artefactos`
- [x] Adaptar el paso 9 para que la revisión de una tarea `contenido` invoque `revisar-post` en lugar del subagente genérico
  - Aporta: la puerta editorial sustituye a la técnica (verificación contra `EDITORIAL.md` y brief, código ejecutado); su «aprueba» retira el `draft` —equivalente de «listo para publicar» (D004)
- [x] Declarar en la entrada del registro el informe del estado de la pieza: si la tarea enlaza una pieza del planeador en su `## Entrada`, el ejecutor informa a `gestionar-piezas` —`en revisión` cuando la tarea pasa a revisión (paso 8) y `publicado` tras el merge (paso 18)
  - Aporta: el kanban editorial refleja el avance real; el ejecutor solo informa, el gestor materializa (su paso 10 ya lo espera)
  - Contexto: condicionado a la pieza enlazada —una tarea `contenido` sin pieza no informa nada—

## Suite de pruebas esperada

- Una tarea `contenido` sin `## Encuadre` es enrutada a `planear-post` —del objetivo: encuadre como mitad de planeación— (O)
- Una tarea `contenido` con `## Encuadre` es enrutada a `redactar-post` directamente —del objetivo— (O)
- El encuadre que termina aprobado continúa en redacción dentro de la misma iteración —del criterio «puertas firmes»; espejo del comportamiento de `desarrollo`— (B)
- La revisión de una tarea `contenido` la hace `revisar-post`, no el subagente genérico ni `revisar-implementacion` —del objetivo— (I)
- Una tarea `contenido` no dispara los sensores de dominio/producto del paso 14 (condicionados al sub-flujo de desarrollo); `mantener-changelog` sí corre —del criterio de puertas generales intactas— (B)
- La pieza enlazada pasa a `en revisión` con la tarea y a `publicado` tras el merge —del contrato con `gestionar-piezas`— (M)
- Una tarea `contenido` sin pieza enlazada en `## Entrada` no informa nada al gestor —(Z)
- Regresión: el enrutado de `desarrollo` y `mantenimiento (refactoring)` no cambia —del criterio de no romper tipos existentes—

Verificación: recorrido en seco sobre la 018 como ejemplar (sin `## Encuadre` → aterrizaría en `planear-post`), más `check`/`lint`/`format:check`/`build` en verde.

## Desviaciones del plan

- La revisión técnica movió la declaración del revisor al registro «Enrutado por tipo» (cada entrada nombra su especialista) y dejó el paso 9 genérico, en lugar de condicionar el paso por tipo como planeaba la acción 2. Motivo: el preámbulo del registro prometía que añadir un tipo solo exige registrarlo, y la revisión puntual demostró lo contrario. Decisión: adoptar la forma general —el registro es el único sitio que un tipo nuevo toca—.
- El informe `publicado` al gestor se ancló al paquete de cierre y no «tras la fusión» como decía el plan. Motivo: la escritura posterior al merge no tiene vehículo de commit (master protegido, una rama por tarea); con el paquete de cierre viaja en el commit del cierre y se hace efectiva con la fusión. Decisión: corregir la redacción del registro.

## Revisión

- Subagente: 2026-10-18 — Aprueba
- Usuario (ejecución): 2026-10-18 — Aprueba
- Usuario (cierre): 2026-10-19 — Aprueba
