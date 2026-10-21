# Referencias publicadas sobre MVC en JavaScript sin frameworks

**Fecha:** 2026-10

## Propósito

Localizar las mejores referencias publicadas en blogs que presentan el patrón MVC implementado en JavaScript sin frameworks, y caracterizar su forma de escritura: tono, voz, estructura y convenciones de formato del género.

## Hallazgos

### Referencias localizadas

1. **Tania Rascia — «How to Build a Simple MVC App From Scratch in JavaScript»** (taniarascia.com, julio 2019). La referencia canónica del género: el tutorial que casi todas las demás fuentes citan, imitan o republican (skarif.dev reproduce el mismo texto). Construye una todo app CRUD con tres clases ES6 —`Model`, `View`, `Controller`— y añade persistencia en `localStorage` al final. Estructura: introducción personal, cajas de «Prerequisites» y «Goals», definiciones conceptuales y construcción incremental por componente.
2. **Dave Stearns — «The Model-View-Controller (MVC) Architecture»** (drstearns.github.io, editado 2021). Material docente universitario y el más riguroso conceptualmente: el modelo emite eventos de cambio (Observer), las vistas escuchan y se re-renderizan solas, y el controlador solo conecta y persiste. Nota explícita sobre la variante moderna en la que la vista captura los eventos de usuario. Código ES6 anotado con JSDoc, diagrama de relaciones y contexto histórico (Xerox, Smalltalk).
3. **SitePoint — «The MVC Design Pattern in Vanilla JavaScript»** (Camilo Reyes, 2017, actualizado 2024). Formato de revista técnica: caja «Key Takeaways» al inicio, revisión por pares y un ejemplo de pingüinos en lugar de la todo app habitual. La página devolvió 403 al recuperarla; la descripción procede del fragmento de búsqueda (ver Limitaciones).
4. **Patrick Ackerman — «Classic Front End MVC with Vanilla Javascript»** (Medium, 2017). Pre-ES6, con funciones constructoras. Su aporte distintivo es usar la interfaz `EventListener` del DOM (un objeto con `handleEvent` como listener) para el controlador. Ejemplo mínimo Hello→World, primera entrega de una serie sobre patrones (la parte II introduce Observer y flujo unidireccional). Cierre irónico: «Or you could just use a framework.»
5. **Marc Grabanski — «Writing a TodoMVC App with Modern Vanilla JavaScript»** (master.dev, ~2021). El posicionamiento argumental del género: TodoMVC completo en unas 170 líneas frente a las más de 900 de la implementación oficial. Estructura de refutación —«Top Four Arguments for Frameworks», con citas de críticos y respuesta— más una lista de «Eight Vanilla JavaScript Tips» (sanitización con `textContent`, delegación de eventos, `insertAdjacentHTML`). Primera entrega de una serie de tres.
6. **Andy Bulka — «TodoMVC implemented using traditional OO, Controllers and Events»** (abulka.github.io, 2020). Post breve que funciona como puntero a su artículo largo en Medium. Defiende el MVC clásico estilo Smalltalk, con controladores mediadores distintos como pieza clave; forma parte de una exploración multiarquitectura (también publicó una variante ECS).

Referencias primarias y de código (no son posts, pero son la base del género): la implementación oficial vanilla-es6 de TodoMVC (tastejs/todomvc), el capítulo 8 de *Learning JavaScript Design Patterns* de Addy Osmani (MVC/MVP/MVVM) y `xpmatteo/frameworkless-tdd-todomvc`, que implementa TodoMVC con TDD e inspiración directa en Smalltalk.

### Tono y voz

El género es declaradamente justificativo: casi todos los posts abren explicando por qué aprender MVC sin framework —Stearns para entender «what those frameworks are actually doing for you», Rascia para comprender el concepto en pequeño antes de escalar, Ackerman como reto personal—. La pregunta de fondo es siempre la misma: qué problema resuelve el patrón.

La voz dominante es la primera persona del singular en los blogs independientes («I wanted to write… so I did, and here it is») y el «we/let's» instructivo dentro de las explicaciones («let's look at each of the concepts», «we're going to create the view»). La segunda persona aparece para poner al lector a probar el código («you can test these out easily»). El registro es conversacional-técnico: frases cortas declarativas —la letanía de Rascia «The model never touches the view. The view never touches the model. The controller connects them» es la frase más imitada del género— y humor seco ocasional. Master.dev rompe el tono: combativo, cita a sus críticos y les responde, con emojis y promoción de cursos.

### Estructura y formato

La anatomía es casi fija: (1) motivación personal o justificación anti-framework, (2) definiciones conceptuales de modelo, vista y controlador, (3) esqueleto de las tres clases, (4) construcción incremental Model → View → Controller, (5) cableado de eventos, (6) persistencia o demo, (7) caveats y próximos pasos.

El ejemplo es convención: la todo app domina por la tradición TodoMVC; las excepciones son el Hello→World mínimo de Ackerman y los pingüinos de SitePoint. Los bloques de código crecen de forma incremental repitiendo la clase completa, con comentarios inline como apoyo. Tres recursos de formato se repiten: las cajas de front-matter pedagógico (Prerequisites/Goals en Rascia, Key Takeaways en SitePoint), los blockquotes para caveats y tangentes, y el diagrama de relaciones M-V-C. Demos y repos se enlazan pronto, antes de la explicación.

El caveat honesto es un tropo del género: casi todos admiten que MVC para una todo app es sobre-ingeniería («doing MVC for a simple todo app is actually a ton of boilerplate», «this could have been accomplished in one line of code»). Finalmente, el cliffhanger de serie («Next Steps», «Article Series») es frecuente: Ackerman, master.dev y Bulka encuadran el post dentro de una serie.

## Conclusión

Las referencias se reparten el territorio: Rascia es el modelo de tutorial incremental honesto; Stearns, el rigor conceptual (eventos en el modelo); SitePoint, el formato editorial profesional; Ackerman, el ejemplo mínimo serializado; master.dev, el posicionamiento argumental; y Bulka, el purismo clásico. Para escribir sobre MVC en vanilla JS, Rascia y Stearns son las dos lecturas imprescindibles.

El género tiene convenciones estables —justificación anti-framework, todo app, construcción incremental por clases, caveat de boilerplate— que un post propio puede aprovechar o romper a sabiendas. Como inferencia aplicada a la casa: esas convenciones ya coinciden con `EDITORIAL.md` en «el resultado primero» (demo enlazada pronto) y «límites honestos» (el caveat de boilerplate); la diferenciación estaría en el ejemplo —casi nadie sale de la todo app— y en mostrar el problema antes de nombrar el patrón.

## Limitaciones

- SitePoint no fue accesible (403) y el artículo completo de Bulka solo existe en Medium: sus descripciones editoriales son parciales. El análisis de tono se apoya íntegramente en cuatro fuentes (Rascia, Stearns, Ackerman, master.dev).
- La mayoría de las fuentes son de 2017–2021: el género «MVC en vanilla JS» tiene poca producción reciente de peso, y las búsquedas actuales devuelven sobre todo repos y republicaciones.

## Referencias

1. Tania Rascia — «How to Build a Simple MVC App From Scratch in JavaScript». https://www.taniarascia.com/javascript-mvc-todo-app/
2. Dave Stearns — «The Model-View-Controller (MVC) Architecture». https://drstearns.github.io/tutorials/mvc/
3. Camilo Reyes, SitePoint — «The MVC Design Pattern in Vanilla JavaScript». https://www.sitepoint.com/mvc-design-pattern-javascript/
4. Patrick Ackerman, Medium — «Classic Front End MVC with Vanilla Javascript». https://medium.com/@patrickackerman/classic-front-end-mvc-with-vanilla-javascript-7eee550bc702
5. Marc Grabanski, Master.dev — «Writing a TodoMVC App with Modern Vanilla JavaScript». https://master.dev/blog/vanilla-javascript-todomvc/
6. Andy Bulka — «TodoMVC implemented using traditional OO, Controllers and Events». https://abulka.github.io/blog/2020/05/18/todomvc-implemented-using-traditional-oo-controllers-and-events/
7. TodoMVC (implementación oficial vanilla-es6) — https://github.com/tastejs/todomvc
8. Addy Osmani — *Learning JavaScript Design Patterns*, capítulo 8. https://addyosmani.com/resources/essentialjsdesignpatterns/book/
9. xpmatteo — «frameworkless-tdd-todomvc». https://github.com/xpmatteo/frameworkless-tdd-todomvc
