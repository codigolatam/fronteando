# El Controlador: cerrar el ciclo

- estado: lista
- serie: mvc-en-vanilla-js
- **Pregunta del lector:** ¿dónde pongo los manejadores de eventos para que dejen de tocarlo todo?
- **Ángulo:** los eventos se traducen a acciones sobre el modelo — nada de tocar estado y DOM a discreción — y el ciclo se cierra: evento → acción → modelo → notificación → vista.
- **Soporte:** el carrito completo con las tres piezas separadas: handlers que solo invocan acciones y un componente que ya se puede mantener y extender.
- **Próximo paso:** espera al capítulo anterior publicado.
- **Notas sueltas:** capítulo 4 del arco; cierra con la pregunta abierta — ¿esto escala?
