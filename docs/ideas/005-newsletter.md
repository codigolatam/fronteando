# Newsletter: la relación continuada con quien quiere seguir el blog

> **Tipo:** idea de funcionalidad — tarea o conjunto (complejidad baja-media)
> **Fecha:** 2026-10
> **Orden sugerido:** 5 de 5 (bloque inicial) — independiente de las demás; podría adelantarse si interesa capturar suscriptores desde el primer día.

## Problema

Quien encuentre Fronteando y quiera seguirlo no tiene cómo: cada visita depende de que el lector recuerde volver por su cuenta. El blog publica, pero no avisa; la relación con su audiencia se corta en el momento en que la página se cierra, justo cuando un medio nuevo más necesita que sus primeros lectores regresen.

## Qué desbloquea

- **El aviso de contenido nuevo:** los suscriptores se enteran cuando hay un artículo nuevo sin tener que comprobarlo.
- **La audiencia propia:** una lista de lectores que eligieron seguir al blog, que no depende de algoritmos ni de plataformas ajenas.
- **La independencia del proveedor:** el servicio de correo es una pieza desacoplada — cambiar de uno a otro no toca el blog.

## Flujos de trabajo que se hacen viables

- El lector deja su correo en un formulario del sitio y recibe un aviso cuando se publica contenido nuevo.
- El autor publica un artículo y la newsletter sale disparada por la automatización sobre el RSS, sin paso manual.
- El equipo cambia de proveedor de correo — Buttondown, MailerLite, Listmonk u otro — sin tocar el sitio.

## Ventajas como producto

- **Hábito y retorno:** el aviso convierte una visita aislada en una relación; para un blog que nace sin audiencia, cada suscriptor es capital.
- **Canal sin intermediarios:** el correo del lector es el único canal que el blog posee por completo.
- **Señal de interés real:** la lista mide quién quiere volver — información valiosa para decidir qué escribir después.

## Tensión que introduce en el roadmap

Independiente de las hermanas por diseño: solo necesita que `sitio-base-del-blog` exista para alojar el formulario, y no comparte mecanismo con ninguna otra. Su posición es la negociable del conjunto: ejecutarla temprano captura suscriptores desde el primer artículo publicado; ejecutarla tarde la hace trivial pero regala los primeros meses de audiencia.
