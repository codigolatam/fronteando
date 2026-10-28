import "./view-demo.svelte";
import type { DemoModule } from "../fronteando-demo";

// The instrumented view compiles to <demo-vista-instrumentada>; the
// adapter places it in the host fragment and forwards the directive's
// `modo` attribute —"controlador" mounts the chapter-4 program.
export const mount: DemoModule["mount"] = (host, container) => {
  const piece = document.createElement("demo-vista-instrumentada");
  const modo = host.getAttribute("modo");
  if (modo) piece.setAttribute("modo", modo);
  container.appendChild(piece);
};
