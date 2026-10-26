// The element that hosts every interactive piece. The :::demo
// directive emits <fronteando-demo nombre="…"> with the fallback as
// children; on upgrade the element resolves the piece's module under
// src/demos/<nombre>/index.ts and mounts it in a shadow root —which
// removes the fallback from rendering, since the shadow has no slot—.
// In every degraded state (no nombre, unknown or failed piece,
// disconnected element) the shadow holds a bare <slot> instead, so
// the fallback renders again: an attached shadow can never go back
// to showing light children any other way.

export interface DemoModule {
  mount(host: FronteandoDemo, container: DocumentFragment): void | (() => void);
}

const modules = import.meta.glob<DemoModule>("./*/index.ts");

export class FronteandoDemo extends HTMLElement {
  static observedAttributes = ["nombre", "altura"];

  #mounted: string | null = null;
  #loading: string | null = null;
  #cleanup: (() => void) | undefined;

  connectedCallback() {
    this.#applyHeight();
    void this.#mount();
  }

  disconnectedCallback() {
    this.#teardown();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "altura") this.#applyHeight();
    if (name === "nombre" && oldValue !== newValue && this.isConnected) {
      void this.#mount();
    }
  }

  async #mount() {
    const pieceName = this.getAttribute("nombre");
    if (!pieceName) {
      this.#teardown();
      return;
    }
    if (pieceName === this.#mounted || pieceName === this.#loading) return;

    const load = modules[`./${pieceName}/index.ts`];
    if (!load) {
      console.error(`fronteando-demo: no piece registered as "${pieceName}"`);
      this.#teardown();
      return;
    }

    this.#loading = pieceName;
    try {
      const module = await load();
      // The attribute may have changed while the chunk loaded; only the
      // still-current name may mount.
      if (
        !this.isConnected ||
        this.getAttribute("nombre") !== pieceName ||
        this.#mounted === pieceName
      ) {
        return;
      }
      if (typeof module.mount !== "function") {
        console.error(
          `fronteando-demo: piece "${pieceName}" does not export mount`,
        );
        this.#teardown();
        return;
      }
      // The piece builds into a fragment first so a failing mount never
      // swaps in a broken state; only on success is the previous piece
      // released and the fragment landed in the shadow.
      const content = document.createDocumentFragment();
      const cleanup = module.mount(this, content);
      if (!content.hasChildNodes()) {
        console.error(`fronteando-demo: piece "${pieceName}" mounted nothing`);
        this.#teardown();
        return;
      }
      this.#teardown();
      const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      root.replaceChildren(content);
      this.#mounted = pieceName;
      this.#cleanup = typeof cleanup === "function" ? cleanup : undefined;
    } catch (error) {
      console.error(
        `fronteando-demo: piece "${pieceName}" failed to mount`,
        error,
      );
      this.#teardown();
    } finally {
      if (this.#loading === pieceName) this.#loading = null;
    }
  }

  // Releases the mounted piece and restores a bare <slot> so the
  // fallback renders again in every state without a live piece.
  #teardown() {
    try {
      this.#cleanup?.();
    } catch (error) {
      console.error("fronteando-demo: piece cleanup failed", error);
    }
    this.#cleanup = undefined;
    this.#mounted = null;
    this.shadowRoot?.replaceChildren(document.createElement("slot"));
  }

  #applyHeight() {
    this.style.minHeight = this.getAttribute("altura") ?? "";
  }
}

if (!customElements.get("fronteando-demo")) {
  customElements.define("fronteando-demo", FronteandoDemo);
}
