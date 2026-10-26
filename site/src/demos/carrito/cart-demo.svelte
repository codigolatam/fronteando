<svelte:options customElement="demo-carrito" />

<script lang="ts">
  import { onMount } from "svelte";
  import { mountCart, mountCartWithQuantity } from "./cart";
  import type { ScopedDocument } from "./cart";

  // "cantidad" mounts the second listing —the one whose «Quitar» dies.
  let { modo = "" }: { modo?: string } = $props();
  let root: HTMLElement;

  onMount(() => {
    const scoped: ScopedDocument = {
      querySelector: (selector) => root.querySelector(selector),
      createElement: (tag) => document.createElement(tag),
    };
    if (modo === "cantidad") {
      mountCartWithQuantity(scoped);
    } else {
      mountCart(scoped);
    }
  });
</script>

<div class="piece" bind:this={root}>
  <div class="grid">
    <section class="zone" aria-labelledby="catalogo-heading">
      <h3 class="heading" id="catalogo-heading">Catálogo</h3>
      <ul id="catalogo" class="list" role="list"></ul>
    </section>
    <section class="zone" aria-labelledby="carrito-heading">
      <h3 class="heading" id="carrito-heading">Tu carrito</h3>
      <ul id="carrito" class="list" role="list"></ul>
      <p class="total" role="status">
        Productos: <span id="contador">0</span> · Total:
        <span id="total">$0</span>
      </p>
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

  .list {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .total {
    margin: var(--space-2) 0 0;
    font-weight: 500;
  }

  /* The cart program injects its own nodes via innerHTML —they carry
     no svelte scope attribute, so their styles go through :global
     under the zone wrapper (still inside this shadow). */
  .zone :global(li) {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-1) 0;
    border-bottom: var(--border-width) solid var(--color-border);
  }

  .zone :global(li:last-child) {
    border-bottom: 0;
  }

  .zone :global(button) {
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

  .zone :global(button:hover) {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  #carrito :global(button:hover) {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  .zone :global(button:focus-visible),
  .zone :global(input:focus-visible) {
    outline: var(--focus-width) solid var(--color-accent);
    outline-offset: var(--focus-offset);
  }

  .zone :global(input[type="number"]) {
    width: 5ch;
    min-width: var(--target-min);
    min-height: var(--target-min);
    padding: 0 var(--space-1);
    font: inherit;
    text-align: center;
    color: var(--color-text);
    background: var(--color-background);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
  }

  @media (prefers-reduced-motion: no-preference) {
    .zone :global(button) {
      transition:
        color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
