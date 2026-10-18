# Crear el skill revisar-post — revisión editorial

## Estado

[ ] Pendiente | [~] En progreso | **[r] En revisión** | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Crear el skill `revisar-post` —la revisión editorial del flujo de escritura— que somete el post a un revisor independiente por subagente: edición sustantiva contra `EDITORIAL.md` y el brief, más verificación técnica del código contra la prosa, con informe y veredicto.

## Dependencias

- docs/tasks/012-guia-de-tono-editorial.md

## Entrada

- `EDITORIAL.md` (tarea 012) — el contrato contra el que el revisor verifica.
- El patrón de `revisar-implementacion` en `.agents/skills/` — modelo de revisión por subagente con contexto aislado.
- La investigación `docs/research/2026-10-procesos-gestion-editorial.md`: la edición sustantiva verifica estructura, promesa y adecuación a la audiencia; la verificación de hechos —en nuestro caso el código— es labor separada que el revisor ejecuta.
- La experiencia de la tarea 011: el revisor ejecutó el código y atrapó un desfase prosa/código — el patrón funciona.

## Resultado esperado

- `.agents/skills/revisar-post/SKILL.md` que: lanza un subagente con contexto aislado y rol adversarial, le pasa el brief y `EDITORIAL.md` como contrato, exige verificar —¿cumple la promesa? ¿la prosa dice lo que el código hace, ejecutado? ¿arco presente? ¿voz y anatomía de la guía? ¿previo y metadatos?—, produce un informe con hallazgos por severidad y veredicto, y soporta rondas hasta aprobar o escalar.

## Criterios de calidad

- El revisor no puede aprobar sin haber ejecutado el código del post — la verificación técnica es parte del informe, no opcional.
- La distinción de niveles queda explícita: este paso es la edición sustantiva; la mecánica ya corrió en `redactar-post` y sus hallazgos de fondo gatillan nueva ronda de escritura sobre lo reescrito.
- El informe sigue el formato de veredictos del proyecto (Aprueba / Solicita cambios, con hallazgos anclados).
- `check`, `lint`, `format:check` y `build` en verde.

## Procedimiento sugerido

1. Leer `revisar-implementacion` y el patrón de subagente revisor; leer `EDITORIAL.md`.
2. Redactar el skill con el encargo del revisor, el formato de informe y el bucle de rondas.
3. Verificar la coherencia con `redactar-post` — revisa exactamente lo que aquel produce.

## Notas

- El subagente de revisión es independiente del contexto de redacción — esa separación es lo que atrapó el bug de la 011.
- El revisor verifica contra la guía y el brief, no contra su gusto: cada hallazgo cita la regla incumplida.

## Contexto

- `Archivos similares:` `.agents/skills/revisar-implementacion/SKILL.md` — el modelo directo de revisión por subagente (contexto aislado, rol adversarial, informe anclado, rondas); `.agents/skills/redactar-post/` — el skill que produce el borrador que este revisa, con su plantilla.
- `Patrones:` subagente revisor con contexto aislado y capacidad de ejecutar (`node` para los snippets); informe con hallazgos citados por severidad y veredicto Aprueba/Solicita cambios; la revisión sustantiva verifica contra el contrato (guía + brief), no contra el gusto.
- `Dominio:` `EDITORIAL.md` — los niveles de edición separan sustantiva (este skill) de mecánica (la ronda de `redactar-post`); la regla dura: toda reescritura tras la ronda pide pasada nueva sobre lo cambiado.
- `Producto:` `site/src/content/articulos/<slug>.md` — el borrador con `draft: true`; `site/src/content.config.ts` — el esquema; `node` local para ejecutar el código del post.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre sobre la versión final tras hallazgos de fondo; `docs/lessons/previos-de-articulos.md` y `docs/lessons/fechas-de-publicacion.md` — previo como unidad y hora real, que el revisor verifica; `docs/lessons/assets-de-skills.md` — la plantilla lleva solo el contrato universal.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el previo que el revisor verifica; `docs/decisions/D003-brief-editorial-artefacto-propio.md` — el contrato de entrada; `docs/decisions/D004-el-post-nace-borrador-y-la-revision-lo-publica.md` — este skill retira el `draft` al aprobar.

## Conectividad

Conectada. El trabajo toca `.agents/skills/revisar-post/` —directorio nuevo con `SKILL.md`—, lee el brief aprobado en `docs/editorial/briefs/` y el borrador en `site/src/content/articulos/<slug>.md`, y sobre aprobación retira la línea `draft` del frontmatter (escritura directa; `draft` tiene default `false` en el esquema). El contrato de entrada ya está fijado (D003): `## Encuadre` en la tarea + `estado: aprobado` en el brief; la señal de «listo para revisar» es el post existente con `draft: true`. El subagente revisor necesita perfil con ejecución (corre los snippets con `node` local); el estado de la tarea, las desviaciones y el PR quedan del ejecutor general. Frontera declarada, no implementada: mover la pieza del planeador a «en revisión»/«publicado» corresponde a su gestor.

## Plan técnico

El subsistema: el directorio `.agents/skills/revisar-post/` —`SKILL.md`, sin `assets/` (el informe es efímero y por ronda, como el de `revisar-implementacion`)— que somete el borrador de `site/src/content/articulos/<slug>.md` a un subagente revisor independiente y materializa la aprobación retirando el `draft`.

- [x] `SKILL.md` — frontmatter (name, description con cuándo usar y sinónimos) y cuerpo canónico: cuándo usar / cuándo no usar / entrada / salida / principios rectores / procedimiento / finalización / referencias
  - Aporta: la revisión editorial del flujo de escritura — análoga a `revisar-implementacion` en forma (subagente aislado, rol adversarial, informe anclado, rondas), editorial en sustancia (edición sustantiva contra la guía y el brief, no contra el gusto)
- [x] Entrada validada: tarea `contenido` con `## Encuadre` → brief `aprobado` → post existente con `draft: true` (la señal de «listo para revisar»); sin post o sin draft se deriva a `redactar-post`
  - Aporta: la puerta de entrada firme, simétrica a la de `redactar-post`
- [x] El encargo del revisor (subagente con contexto aislado y capacidad de ejecutar): recibe rutas —tarea, brief, post, `EDITORIAL.md`— sin el razonamiento del redactor; verifica contra el contrato: promesa cumplida, prosa contra código **ejecutado** (obligatorio), arco y anatomía, voz, previo como unidad y `<!--more-->`, frontmatter contra metadatos decididos (categoría/nivel/tags sin solape), límites honestos; hallazgos citados con la regla incumplida + severidad + corrección propuesta; veredicto Aprueba | Solicita cambios
  - Aporta: la verificación técnica del código dentro del informe — el fact-check que atrapó el desfase de la 011
- [x] Rondas: «solicita cambios» → correcciones → ronda de escritura nueva sobre los párrafos reescritos (regla dura de `EDITORIAL.md`) → re-revisión con subagente fresco; «aprueba» → retirar la línea `draft` (default `false` en el esquema) y devolver el informe al invocador
  - Aporta: D004 materializado — la aprobación editorial publica
- [x] Ronda de escritura sobre `SKILL.md`
  - Aporta: convenciones del proyecto

## Suite de pruebas esperada

- `check`, `lint`, `format:check`, `build` en verde —(B)
- El skill declara cuándo usar/no usar, entrada, salida, principios, procedimiento y finalización en el formato canónico —(O)
- La puerta de entrada es firme: sin borrador con `draft: true` no hay revisión —(O)
- El encargo del revisor prohíbe aprobar sin haber ejecutado el código del post —(O)
- La distinción sustantiva/mecánica queda explícita: los hallazgos de fondo gatillan ronda de escritura nueva sobre lo reescrito —(O)
- El veredicto sigue el formato del proyecto (Aprueba | Solicita cambios, hallazgos anclados) y el `draft` solo se retira al aprobar (D004) —(O)
- Las lecturas/escrituras mecánicas se delegan en las capacidades de artefactos donde aplica —(O)
- El texto no contiene rayas para incisos ni referencias al estado de construcción del sistema —(O)
- Revisión técnica por subagente aprueba

## Revisión

- Subagente: 2026-10-17 — Aprueba
- Usuario (ejecución): 2026-10-18 — Aprueba
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
