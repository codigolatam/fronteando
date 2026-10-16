# Guía editorial

La `DESIGN.md` de la escritura: el contrato de voz, estructura y
metadatos que todo artículo de Fronteando cumple. Los skills de
contenido —`planear-post`, `redactar-post` y `revisar-post`, que las
tareas 013–015 crean— la consultan; los skills genéricos de escritura (`revisar-redaccion`,
`pulir-escritura`) son su mecánica de apoyo y la referencia para la
documentación del proyecto, que no se rige por esta guía.

## Voz y registro

Fronteando escribe **contenido de fondo, no recetas**: piezas para
entender por qué, no instrucciones para copiar.

- **Primera persona del plural** para el proyecto («vamos a
  construir», «nuestro efecto»); **segunda persona** para el lector
  («tu pantalla», «ya sabes qué acaba de ocurrir»). Nunca tercera
  persona
  impersonal cuando cabe una de las dos.
- **Denso, sin relleno.** Cada párrafo desarrolla una idea y cada
  frase trabaja; si una frase puede irse sin que el lector pierda
  nada, se va.
- **Conversacional de trabajo.** La prueba: ¿hablaría así con un
  colega técnico? —y la de voz alta: intro y cierre se leen en voz
  alta; lo forzado se reescribe—. Metáforas y preguntas retóricas
  sí; solemnidad y burocracia no.
- **Honesto antes que entusiasta.** Los límites se nombran, los
  trade-offs se declaran. La confianza la da admitir lo que falta, no
  fingir que no falta nada.
- **Sin _gatekeeping_.** Proscritos «simplemente», «obviamente»,
  «fácil», «solo hay que»: nada es obvio para quien lo está
  aprendiendo.
- **Español con anglicismos técnicos aceptados.** `store`, `signal`,
  `batching`, `render`, `diffing`, `cleanup` van así, sin cursiva ni
  comillas; el español no tiene equivalente instalado. Los calcos
  síntácticos no valen: «Con eso dicho» por _with that said_ queda
  fuera. La lista es orientativa, no cerrada —el criterio es el
  equivalente instalado: trade-offs, snippet entran por la misma
  puerta—. Los extranjerismos no asimilados llevan cursiva
  —_gatekeeping_—.
- **Ortotipografía de la casa:** comillas latinas «» para citas y
  usos metalingüísticos, raya larga pegada —sin espacios interiores—
  para incisos.

## Anatomía del post

Un post es una promesa cumplida: si no cabe en «después de leer esto,
el lector podrá ___», el post no está listo. La anatomía describe el
post técnico —el género de la casa—; las piezas meta (presentaciones,
notas) adaptan los pasos donde aplican.

1. **El gancho.** Una o dos frases —o un párrafo breve de preparación
   con su resolución— que plantan una tensión y la resuelven dentro
   del previo; la negación («Parece magia. No lo es») es el patrón
   distintivo de la casa, no el único camino.
2. **El previo.** Todo lo anterior a `<!--more-->`: breve (un
   párrafo, unas sesenta palabras como mucho), autocontenido, con el
   gancho resuelto adentro. Se diseña como unidad, no como sobrante
   del primer párrafo.
3. **La promesa.** El párrafo tras el corte declara qué se construye o
   qué se aprende y qué se lleva el lector —sin calentamiento.
4. **El resultado primero.** Mostrar el programa funcionando antes de
   explicarlo: el final gana la atención que la explicación sostiene.
5. **Las secciones.** Encabezados descriptivos que permiten aprender
   hojeando; cada sección aporta algo que el arco necesita. Las
   tangentes se cortan.
6. **Los límites honestos.** Sección propia que nombra lo que quedó
   fuera y por qué importa —cada omisión es una pregunta legítima.
7. **El cierre.** La conclusión —el último párrafo— en dos o tres
   frases, la última una puerta abierta: lo que sigue, la pregunta
   que queda.

**El código.** Todo fragmento corre tal cual está escrito —verificado
ejecutándolo antes de publicar— o se marca explícitamente como
extracto. Snippets cortos que muestran la salida que el lector verá y
explican el porqué, no solo el qué.

## Contrato de metadatos

- **Frontmatter completo:** `title`, `description`, `date`, `tags`
  —los exige la casa; el esquema además da default a `draft` y
  `tags`—. `draft` ausente equivale a `false`: publicado; un borrador
  en revisión interna lleva `draft: true`.
- **Fecha con hora real** del commit/merge —dos artículos el mismo
  día empatan en el orden por fecha (ver
  `docs/lessons/fechas-de-publicacion.md`).
- **`<!--more-->` inmediatamente tras el gancho** —el previo sale
  del cuerpo (decisión D002), no del `description`. Todo post nuevo
  lleva el marcador; sin él el sistema cae al primer párrafo
  —respaldo, no diseño, y `hola-fronteando` es el único precedente
  heredado.
- **`description`:** el previo en prosa para metadatos y OG —una
  frase que enuncia la promesa sin adjetivos valorativos.

## Niveles de edición

El flujo de escritura separa dos niveles, los de la taxonomía
editorial estándar:

- **Sustantiva** —estructura, promesa, veracidad, adecuación a la
  audiencia: la hace `revisar-post` con contexto aislado, verificando
  contra esta guía y ejecutando el código contra la prosa.
- **Mecánica** —estilo, ortografía, ortotipografía: la hace la ronda
  de escritura (`revisar-redaccion` y luego `pulir-escritura`) dentro
  de `redactar-post`.

**Regla dura:** la mecánica corre sobre la versión final. Cualquier
párrafo reescrito tras la ronda —por revisión técnica o editorial—
necesita una pasada nueva sobre lo cambiado.

## Manuales de referencia

Jerarquía, como en las guías canónicas:

1. **Esta guía** —manda en todo lo que declara.
2. **Los skills genéricos** —`revisar-redaccion` (consistencia,
   anglicismos, ritmo) y `pulir-escritura` (RAE, Fundéu,
   ortotipografía) para lo que esta guía no cubre.
3. **Los posts publicados** —precedente cuando la regla no está
   escrita; la excepción consistente se anota y se vuelve regla.

## Palabras problemáticas

| Proscrito                                                      | Usar                                       |
| -------------------------------------------------------------- | ------------------------------------------ |
| «corrida»                                                      | «ejecución»                                |
| «corre X» transitivo («corre `fn`»)                            | «ejecuta X» —«corre» intransitivo admitido |
| «Con eso dicho»                                                | «Y sin embargo», «Dicho esto»              |
| «simplemente», «obviamente», «fácil», «solo hay que»           | — (suprimir)                               |
| nominalizaciones que esconden el verbo («la suscripción de X») | el verbo («suscribirse a X»)               |

La tabla crece con cada corrección del usuario —toda palabra
prohibida entra con su sustituto.

## Ejemplos de la casa

Los dos posts publicados son el precedente:

- Gancho con negación: «Parece magia. No lo es.»
- Resultado primero: «Antes de desmontar la magia conviene verla
  funcionar.»
- Límite honesto: «Nuestro efecto reescribe `document.title` entero;
  escalar eso al DOM es justamente lo que los frameworks resuelven.»
- Cierre con puerta: «De esa pregunta va la siguiente serie.»

## Fuera de alcance

- **Documentación del proyecto** —task files, investigaciones,
  decisiones: se rigen por los skills genéricos, no por esta guía.
- **Mantenimiento de publicados** —corregir o actualizar artículos
  que envejecen: tensión conocida, declarada en
  `docs/research/2026-10-procesos-gestion-editorial.md`, sin proceso
  aún.
