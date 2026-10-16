# Checks de CI independientes

## Lecciones

- **En un workflow de CI, un job por check —o cualquier forma en que cada verificación informe por separado—, no pasos secuenciales en un solo job.** Por qué: los pasos de un job corren en serie y el primer fallo salta el resto, así que solo se ve el primer check roto y los demás quedan sin señal hasta re-empujar; con `strategy.matrix` y `fail-fast: false` el PR muestra un check independiente por verificación y todos corren aunque uno falle.
  Disparadores: github actions, workflow, ci.yml, CI, checks, matrix, .github/workflows, pull request
  Origen: 20261016T133602
