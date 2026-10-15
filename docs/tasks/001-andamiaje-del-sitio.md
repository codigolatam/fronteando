# Andamiaje del sitio con Astro

## Estado

**[ ] Pendiente** | [~] En progreso | [r] En revisión | [x] Completada | [!] Bloqueada

## Tipo

desarrollo

## Objetivo

Dejar el esqueleto desplegable del blog: un proyecto Astro funcional dentro del repositorio que compila a HTML estático, listo para recibir identidad y contenido.

## Dependencias

- Ninguna

## Entrada

- El brief del proyecto (`brief.md`), que fija Astro como generador y el sitio estático como decisión de implementación.
- El directorio `site/` como hogar del código del blog, separado de los artefactos de gestión del proyecto que ocupan la raíz.

## Resultado esperado

- Proyecto Astro inicializado en `site/` con la estructura de un blog: páginas, layout base mínimo y directorio de contenido.
- Scripts funcionando: `npm run dev` sirve el sitio en local y `npm run build` produce el HTML estático.
- Una página de prueba que renderiza correctamente y servirá de banco para el tema.
- `.gitignore` y herramientas de calidad (lint y formato) configuradas según las convenciones de Astro.

## Criterios de calidad

- `npm run build` termina sin errores y produce el sitio estático.
- `npm run dev` sirve una página accesible en local.
- Los artefactos de gestión del proyecto —`TODO.md`, `docs/`, `.agents/`— quedan intactos en la raíz.

## Procedimiento sugerido

1. Inicializar el proyecto Astro en `site/` con la plantilla mínima.
2. Configurar `astro.config` con la URL del sitio y Markdown.
3. Crear el layout base mínimo y una página de prueba.
4. Configurar scripts, `.gitignore` y formato.
5. Verificar dev y build de punta a punta.

## Notas

- La ubicación `site/` es la decisión sugerida para no mezclar el código del blog con los artefactos de gestión; si en la ejecución se prefiere otra, ajustar.
- No añadir componentes de acompañamiento LLM ni demos: pertenecen a otras ideas del bloque inicial.

## Revisión

- Subagente: [fecha] — [Aprueba | Solicita cambios]
- Usuario (ejecución): [fecha] — [Aprueba | Solicita cambios]
- Usuario (cierre): [fecha] — [Aprueba | Solicita cambios]
