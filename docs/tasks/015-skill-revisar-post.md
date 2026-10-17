# Crear el skill revisar-post — revisión editorial

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

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

- `Archivos similares:` `.agents/skills/revisar-implementacion/` — modelo de revisión por subagente.
- `Patrones:` revisión con contexto aislado, informe anclado y veredicto registrado en el archivo de la tarea.
- `Dominio:` sin documentación de dominio aplicable.
- `Producto:` sin documentación de producto aplicable.
- `Lecciones:` `docs/lessons/flujo-de-escritura.md` — la ronda corre sobre la versión final tras hallazgos de fondo.
- `Decisiones:` `docs/decisions/D002-previo-de-articulos-desde-el-cuerpo.md` — el revisor verifica el previo.
