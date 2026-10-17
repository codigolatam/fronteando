# Brief — [título del post]

[Documento de preparación de un post de Fronteando. Lo produce
`planear-post` a partir de una pieza `lista` del planeador o de una
tarea `contenido`, y lo consume `redactar-post` como única entrada de
escritura. Ningún campo queda vacío: lo que no aplica se declara («sin
ejemplo conductor») con la razón. El brief referencia `EDITORIAL.md`,
no la repite.]

## Estado

- estado: borrador
- aprobado: [aaaa-mm-dd (se rellena al aprobar)]

[Campos, no línea de opciones: el brief no es tarea ni propuesta. El
documento nace con `estado: borrador`; la puerta humana lo aprueba y
solo `estado: aprobado` habilita la redacción. La mutación es
escritura directa del skill: el brief es artefacto nuevo sin
operaciones del catálogo.]

**Pieza:** [ruta de la pieza del planeador de la que nace, si la hay]
**Tarea:** [ruta del archivo de la tarea `contenido` asociada]

## Encuadre

- **Audiencia:** [quién lee y qué sabe ya; sale de la pregunta del
  lector de la pieza]
- **Promesa:** «después de leer esto, el lector podrá ___» [una sola y
  verificable contra el texto; si el encuadre necesita dos, son dos
  posts]
- **Arco:** [las secciones del post en orden, con una línea por
  sección diciendo qué aporta al cumplimiento de la promesa; la
  anatomía de `EDITORIAL.md` es el molde]
- **Ejemplo conductor:** [el programa, demo o hilo que atraviesa el
  post; sale del soporte de la pieza]
- **Alcance:** [qué queda fuera y por qué; los límites honestos
  decididos por adelantado]
- **Metadatos:** `slug` [nombre del archivo del post y de este brief] ·
  `categoria` [pilar del esquema] · `nivel` [grado, solo si la pieza
  enseña por grados; se omite si no] · `tags` [reutilizando los
  existentes; ninguno coincide con la categoría]

## Temas de investigación

- [ ] [pregunta técnica a resolver antes de escribir; se marca al
      resolverla y su respuesta aterriza en `## Material`]

[Toda la investigación se resuelve dentro de la planeación: ejecución
para verificaciones de código, `investigar` para dudas documentales.
Un tema irresoluble se eleva al usuario; no se presenta a la puerta un
brief con investigación abierta.]

## Material

[Las respuestas a los temas de investigación y todo lo que la
escritura necesita ya recopilado: snippets verificados por ejecución
con su salida, enlaces y citas con fuente, notas de comportamiento,
decisiones técnicas tomadas al preparar.]

## Borrador del outline

[El arco bajado a beats: orden de secciones, qué pasa en cada una,
dónde entra cada snippet del material, las transiciones. Boceto de
trabajo: `redactar-post` lo sigue como guía, no como corsé.]

## Checklist de publicación

- [ ] El gancho planta una tensión y la resuelve dentro del previo
- [ ] `<!--more-->` inmediatamente tras el gancho (el previo sale del
      cuerpo, decisión D002)
- [ ] El previo es una unidad: un párrafo breve y autocontenido,
      diseñado como tal
- [ ] `description` enuncia la promesa en una frase, sin adjetivos
      valorativos
- [ ] Frontmatter completo: `title`, `description`, `date`,
      `categoria`, `tags` (`nivel` solo si el encuadre lo decidió)
- [ ] `date` con la hora real del commit o del merge
- [ ] `categoria` es el pilar decidido en el encuadre; ningún tag
      coincide con una categoría
- [ ] Cada snippet corre tal cual aparece (ejecutado antes de
      incluirse) o se marca explícitamente como extracto
- [ ] Los límites honestos tienen sección propia; el cierre abre una
      puerta
- [ ] Ronda de escritura completa (`revisar-redaccion` y luego
      `pulir-escritura`) sobre la versión final

[Los ítems son universales y se insertan tal cual; los específicos del
post se añaden al final de la sección.]
