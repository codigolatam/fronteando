# El componente empaquetado: el MVC en una clase

- estado: publicado
- serie: mvc-en-vanilla-js
- **Pregunta del lector:** tengo el MVC funcionando en tres piezas sueltas — ¿cómo lo convierto en un componente que instancio como una sola cosa?
- **Ángulo:** la serie separó las piezas para enseñarlas; ahora las juntamos para usar el componente. La frontera que importa es de responsabilidades, no de objetos: cada método conserva su rol y la clase es solo la envoltura — instanciable, con estado privado y ciclo de vida (montar y desmontar).
- **Soporte:** la clase envolvente del carrito MVC completo; la prueba de fuego es `new Carrito(host)` dos veces en la misma página — dos carritos independientes que no se contaminan (la demo puede llevar las dos instancias lado a lado).
- **Próximo paso:** escribir el capítulo — la tarea enlaza la pieza al entrar en redacción.
- **Notas sueltas:** coda de la serie: el arco narrativo (del espagueti al MVC y sus límites) quedó contado en cinco capítulos y esta pieza lo extiende; el límite honesto casi se escribe solo — así nacen los componentes reales: custom elements con shadow DOM y callbacks de ciclo de vida, y los componentes de framework. La trampa editorial a evitar: no presentarlo como «más simple» — las partes siguen ahí; lo que compra el empaquetado es instanciación, encapsulamiento y ciclo de vida.
