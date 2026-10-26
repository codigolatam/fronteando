# Degradación sin JavaScript y representación legible por máquinas de las piezas

> **Fecha:** 2026-10

## Propósito

Especificar qué debe contener la pieza interactiva cuando el JavaScript no corre —el lector humano sin JS— y cuando el artículo se lee como texto —el agente que consume el `.md`—, para que la tarea 028 fije el contrato de contenido de la pieza y no solo su vehículo.

## Contexto

La épica 004 exige dos consumidores degradados: CU-4 (la lectura sin JavaScript no se rompe y conserva lo esencial) y CU-5 (el `.md` describe honestamente la pieza, sin markup ilegible ni silencio). El vehículo —custom elements— ya se investigó [R0][R1]; lo que falta es el contrato de *contenido*: qué texto vive dentro del elemento y cómo lo lee cada consumidor. La lección `texto-para-agentes` exige evaluar ese contenido como prompt, no como prosa [R2].

## Hallazgos

### Los tres estados posibles

El sistema de diseño de CFPB formaliza los estados que una pieza basada en web components puede enfrentar [1]:

1. **JS desactivado** — el elemento nunca se registra; el navegador lo trata como un elemento desconocido.
2. **JS activo sin soporte de web components** — navegadores antiguos; irrelevante para Fronteando (audiencia técnica, navegadores modernos).
3. **JS activo con soporte** — el elemento se mejora (*upgrade*).

Para Fronteando solo importan el primero y el tercero, más un cuarto estado propio del proyecto: **el lector-agente**, que no ejecuta nada y solo lee el `.md`.

### Qué ve cada consumidor

- **Navegador sin JS:** un elemento desconocido se comporta como un `span` —sus hijos renderizan normalmente—. Es el modelo de *upgrade* de la spec: el marcado existe antes de la definición y se mejora al registrarse [2]. El contenido interno del elemento es por tanto visible íntegro sin ejecutar nada.
- **Navegador con JS:** el contenido interno sigue siendo accesible —con shadow DOM puede proyectarse por slots como estado inicial que la pieza reemplaza al mejorar, o quedar oculto tras la mejora si solo es descriptivo—.
- **Agente leyendo el `.md`:** el endpoint sirve la fuente markdown cruda; el markup del elemento viaja literal —`<store-demo>` + su contenido interno—. CommonMark pasa el HTML en línea sin tocarlo, así que cualquier renderizado del `.md` también conserva el texto interno [3]. El agente lee dos cosas: el **nombre del elemento** (autodescriptivo: `store-demo`, `carrito-demo`) y el **texto interno**.

Conclusión de diseño: el contenido interno tiene una sola fuente y tres lectores —debe ser una descripción honesta y accionable de qué es la pieza y qué haría el lector en ella, no un «esto requiere JavaScript».

### Qué debe contener el contenido interno

Síntesis de las convenciones encontradas:

- **Descripción con la forma de una figura:** «Demo interactiva: un store con un contador; al pulsar `+` el signal notifica y el DOM se actualiza.» — el humano sin JS entiende qué se pierde; el agente recibe contexto accionable para discutir la pieza en el acompañamiento.
- **Estado inicial estático opcional:** para piezas ilustrativas puede valer una representación fija (un bloque de salida, una tabla del estado inicial) —es lo que redblob hace con sus SVG, que nacen visibles y luego se animan— [4].
- **`<noscript>` solo si aporta algo distinto:** CFPB recomienda decidirlo por componente; si el contenido interno ya describe la pieza, un noscript que repita «necesitas JS» añade ruido —útil solo cuando el fallback es una vista estática y hay que advertir que la versión viva existe— [1].
- **No silencio:** Lighthouse audita que la página tenga contenido sin JS; más importante aquí, un elemento vacío (el patrón samwho) deja el `.md` con markup sin sentido —incumple CU-5— [5].

### Evaluado como prompt

El texto interno es material que el asistente recibirá en la lectura acompañada: debe decirle qué pieza hay, qué hace y qué observó potencialmente el lector —«el lector puede pulsar `+` y ver el estado interno paso a paso»— para que el asistente pueda discutirla sin verla [R2]. Un fallback que solo dice «demo no disponible» le roba al agente la capacidad de conversar sobre la pieza.

### Accesibilidad de la versión mejorada

- La interactividad debe ser operable por teclado —los controles de la pieza son elementos nativos (`button`, `input[type=range]`) o llevan `tabindex`/roles—. El grupo comunitario de la W3C sobre custom elements lo formula como «imitar el comportamiento de un elemento HTML clásico» [6].
- `prefers-reduced-motion` debe desactivar animaciones no esenciales de la pieza —especialmente las vistas instrumentadas paso a paso—.
- ARIA dentro del shadow DOM para nombrar región y controles [6].

## Conclusión

El contrato de contenido de la pieza: **el contenido interno es la descripción honesta de la pieza** —qué es, qué hace, qué puede tocar el lector— escrita para tres lectores a la vez (humano sin JS, humano que acaba de cargar, agente en el `.md`). Opcionalmente incluye una representación estática del estado inicial. No requiere `<noscript>` salvo que el fallback sea una vista estática que convenga marcar como degradada. La versión mejorada es operable por teclado y respeta `prefers-reduced-motion`. Este contrato es requisito del convenio de autoría que la tarea 028 documente en `EDITORIAL.md`.

## Limitaciones

- No existe una convención de mercado fuerte sobre *qué texto* describe una demo interactiva a un agente —los referentes o no sirven `.md` (todos) o dejan el elemento vacío (samwho)—; el patrón propuesto es síntesis propia a partir de la lección de texto-para-agentes y la mecánica de upgrade.
- La accesibilidad se especifica por principios (W3C community group, práctica estándar) sin auditoría sobre piezas reales del género.
- El comportamiento exacto del `.md` de Fronteando con markup de elemento —qué texto extrae un agente concreto— se verificará en la implementación de 028.

## Referencias

- [1] CFPB Design System — «Fallback strategies» (estados de soporte, slotted content, noscript) — https://cfpb.github.io/design-system/components/fallback-strategies
- [2] WHATWG — HTML Standard §4.13.1.6 «Upgrading elements after their creation» (elemento no definido ≈ span; upgrade al registrar) — https://html.spec.whatwg.org/multipage/custom-elements.html
- [3] CommonMark Spec — HTML blocks pasan sin procesar — https://spec.commonmark.org/0.31.2/#html-blocks
- [4] redblobgames.com — «Hexagonal Grids» (figuras SVG que nacen visibles y luego se animan) — https://www.redblobgames.com/grids/hexagons/
- [5] Chrome for Developers — Lighthouse «does not provide fallback content when JavaScript is not available» — https://developer.chrome.com/docs/lighthouse/pwa/without-javascript
- [6] W3C Community Group — «Custom Elements and unobtrusive Javascript» (imitar elementos clásicos, ARIA en shadow DOM) — https://www.w3.org/community/html-dynamic-extensions/2023/07/20/custom-elements-and-unobstrusive-javascript/
- [R0] `docs/research/2026-10-vehiculos-para-piezas-interactivas.md`
- [R1] `docs/research/2026-10-mecanica-de-elementos-personalizados.md`
- [R2] `docs/lessons/texto-para-agentes.md`
