import "./counter.svelte";
import type { DemoModule } from "../fronteando-demo";

// Reference piece for the mechanism: a counter exercising the whole
// contract. The Svelte component compiles to the <demo-contador>
// custom element —its own shadow holds the scoped styles while the
// design tokens inherit through both shadow boundaries— so mount is
// just an append and the element manages its own lifecycle.
export const mount: DemoModule["mount"] = (_host, container) => {
  container.appendChild(document.createElement("demo-contador"));
};
