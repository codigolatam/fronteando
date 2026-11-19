<svelte:options customElement="demo-carrito-componente" />

<script lang="ts">
  import { onMount } from "svelte";
  import { CartComponent } from "./cart-component";

  // Two instances of the packaged cart, side by side: the chapter's
  // fire test live. onMount's cleanup exercises unmount for real.
  let hostA: HTMLElement;
  let hostB: HTMLElement;

  onMount(() => {
    const a = new CartComponent(hostA);
    const b = new CartComponent(hostB);
    return () => {
      a.unmount();
      b.unmount();
    };
  });
</script>

<div class="piece">
  <div class="grid">
    <section class="zone" aria-labelledby="label-a">
      <h4 class="heading" id="label-a">Carrito A</h4>
      <div bind:this={hostA}></div>
    </section>
    <section class="zone" aria-labelledby="label-b">
      <h4 class="heading" id="label-b">Carrito B</h4>
      <div bind:this={hostB}></div>
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
    padding-bottom: var(--space-1);
    border-bottom: var(--border-width) dashed var(--color-border);
    font-size: inherit;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  /* The component writes its own markup via innerHTML —those nodes
     carry no svelte scope attribute, so their styles go through
     :global under the piece (still inside this shadow). */
  .zone :global(ul) {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .zone :global(h3) {
    margin: var(--space-2) 0 var(--space-1);
    font-size: inherit;
    font-weight: 500;
  }

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

  .zone :global(p) {
    margin: var(--space-2) 0 0;
    font-weight: 500;
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

  .zone :global(button[data-action="remove"]:hover) {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  .zone :global(button:focus-visible) {
    outline: var(--focus-width) solid var(--color-accent);
    outline-offset: var(--focus-offset);
  }

  @media (prefers-reduced-motion: no-preference) {
    .zone :global(button) {
      transition:
        color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
