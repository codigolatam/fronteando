# D004: El post nace como borrador y la revisión editorial lo publica

## Estado

Aceptada

## Contexto

El flujo de escritura separa redacción (`redactar-post`), revisión
editorial (`revisar-post`) y publicación (merge a master). El esquema
de la colección `articulos` tiene el campo `draft` y el pipeline de
salida filtra los borradores de portada, página del artículo, imágenes
OG y RSS. Había que decidir en qué momento un post deja de ser
borrador: al escribirse, al aprobarse la revisión editorial o al
fusionarse el PR.

## Decisión

El post nace con `draft: true` —la plantilla `assets/post.md` del
skill `redactar-post` lo fija— y lo conserva hasta que `revisar-post`
aprueba la revisión editorial y lo retira. La aprobación editorial
equivale a «listo para publicar»; el merge a master publica.

## Justificación

Marcar el borrador desde la creación hace imposible que un post a
medio escribir o sin revisar se publique por accidente: el filtro de
drafts lo excluye de toda salida. Que la retirada pertenezca a la
revisión y no a la redacción mantiene la separación de contextos del
flujo —quien escribe no se autopublica— y deja un único punto donde
«aprobado» se materializa. El merge como acto de publicación conserva
la trazabilidad de Git: la fecha real de publicación es la del commit
o merge.

Consecuencias: `date` se fija con la hora real al cerrar la redacción
y se ajusta en el PR si el merge queda lejos; un post aprobado sin
merge sigue fuera del sitio; ningún otro paso del flujo toca el campo
`draft`.

## Referencias

- `.agents/skills/redactar-post/SKILL.md` y `assets/post.md`
- `docs/tasks/014-skill-redactar-post.md`
- `site/src/content.config.ts` — el campo `draft` del esquema
- `docs/lessons/fechas-de-publicacion.md` — la hora real y el ajuste
  en el PR
