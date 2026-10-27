# El Modelo: el estado que notifica

- estado: en revisión
- serie: mvc-en-vanilla-js
- **Pregunta del lector:** ¿cómo saco el estado del DOM sin framework?
- **Ángulo:** la primera separación del espagueti hecha visible — el modelo como objeto que guarda el estado y anuncia sus cambios a suscriptores, sin saber nada del DOM.
- **Soporte:** refactor del carrito del capítulo anterior: items y total dejan de vivir en `<li>`s y pasan al modelo con notificación; el estado se lee y se prueba sin tocar el DOM.
- **Próximo paso:** espera al capítulo anterior publicado; el post arranca del carrito a lo bruto.
- **Notas sueltas:** capítulo 2 del arco; cierra con la pregunta abierta — el DOM ya no es la verdad, pero sigue sin actualizarse solo.

**Tarea:** docs/tasks/031-capitulo-2-serie-mvc.md
