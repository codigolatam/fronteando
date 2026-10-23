# Enlaces que precargan un prompt en el asistente del lector

**Fecha:** 2026-10

## Propósito

Verificar si los asistentes principales admiten abrir una conversación
nueva con un texto precargado desde un enlace —la comodidad «abrir en
ChatGPT/Claude» de la línea de lectura acompañada— y con qué límites.

## Hallazgos

- **ChatGPT:** `https://chatgpt.com/?q={prompt}` — abre un chat nuevo con
  el prompt en el compositor, sin enviarlo: el lector pulsa enviar.
  Límite aproximado de 6.000 caracteres. `?prompt=` es equivalente;
  `&model=` puede ignorarse silenciosamente.
- **Claude:** `https://claude.ai/new?q={prompt}` — mismo comportamiento:
  precarga el texto y espera el envío (los reportes divergen sobre el
  auto-envío; lo seguro es asumir que espera). Límite aproximado de
  10.000 caracteres.
- **Otros proveedores:** Grok (`grok.com/?q=`, auto-envía al cargar),
  Perplexity (`perplexity.ai/search/new?q=`).

## Limitaciones

- Ninguno de estos parámetros es una API documentada estable: existen
  desde ~2024 y pueden dejar de funcionar sin aviso.
- Sin sesión iniciada, el asistente pide login y la precarga se pierde
  en la redirección.
- La URL transporta el texto completo: cuanto más largo el protocolo,
  más frágil el enlace. El camino principal sigue siendo copiarlo.

## Conclusión

Viable como comodidad sobre el camino principal —copiar el protocolo—:
los enlaces se ofrecen cuando el protocolo cabe en el límite del
proveedor y se degradan a copiar cuando no. Diseñar el protocolo
compacto (por debajo de ~6k caracteres con la declaración incluida) lo
mantiene compatible con ChatGPT y Claude a la vez.
