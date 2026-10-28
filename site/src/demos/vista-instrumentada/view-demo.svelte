<svelte:options customElement="demo-vista-instrumentada" />

<script lang="ts">
  import { onMount } from "svelte";
  import { mountView } from "./view";
  import type { ScopedDocument } from "./view";

  let root: HTMLElement;

  onMount(() => {
    const scoped: ScopedDocument = {
      querySelector: (selector) => root.querySelector(selector),
      createElement: (tag) => document.createElement(tag),
    };
    mountView(scoped);
  });
</script>

<div class="piece" bind:this={root}>
  <div class="grid">
    <div class="zone" id="carrito-app"></div>
    <section class="zone" aria-labelledby="log-heading">
      <h3 class="heading" id="log-heading">Registro del modelo</h3>
      <p class="initial">pintado inicial: 0 u / $0 (sin notificación)</p>
      <ol class="entries" id="log" aria-live="polite"></ol>
    </section>
  </div>
</div>

<style>
  .piece {
    container-type: inline-size;
    font-family: var(--font-mono);
    font-size: var(--demo-font-size);
    line-height: var(--line-height-meta);
    color: var(--color-text);
  }

  .grid {
    display: grid;
    gap: var(--space-3);
  }

  @container (min-width: 560px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .heading {
    margin: 0 0 var(--space-2);
    font-size: inherit;
    font-weight: 500;
  }

  .initial {
    margin: 0 0 var(--space-2);
    padding-bottom: var(--space-1);
    border-bottom: var(--border-width) dashed var(--color-border);
    color: var(--color-text-muted);
  }

  .entries {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* The article program writes its own markup via innerHTML and the
     register entries arrive as bare <li> nodes —neither carries the
     svelte scope attribute, so their styles go through :global under
     the piece (still inside this shadow). */
  .piece :global(#carrito-app ul) {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .piece :global(#carrito-app h3) {
    margin: var(--space-2) 0 var(--space-1);
    font-size: inherit;
    font-weight: 500;
  }

  .piece :global(#carrito-app li),
  .piece :global(#log li) {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) 0;
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .piece :global(#log li) {
    color: var(--color-text-muted);
  }

  .piece :global(#carrito-app li:last-child),
  .piece :global(#log li:last-child) {
    border-bottom: 0;
  }

  .piece :global(#carrito-app p) {
    margin: var(--space-2) 0 0;
    font-weight: 500;
  }

  .piece :global(button) {
    flex-shrink: 0;
    margin-left: auto;
    min-height: var(--target-min);
    min-width: var(--target-min);
    padding: 0 var(--space-2);
    font: inherit;
    color: var(--color-text);
    background: none;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }

  .piece :global(button:hover) {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .piece :global(#carrito button:hover) {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  .piece :global(button:focus-visible) {
    outline: var(--focus-width) solid var(--color-accent);
    outline-offset: var(--focus-offset);
  }

  @media (prefers-reduced-motion: no-preference) {
    .piece :global(button) {
      transition:
        color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
