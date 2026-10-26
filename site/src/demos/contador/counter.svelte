<svelte:options customElement="demo-contador" />

<script>
  let count = $state(0);
</script>

<div class="piece">
  <output>cuenta: {count}</output>
  <button type="button" onclick={() => (count += 1)}>+1</button>
</div>

<style>
  .piece {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--font-size-meta);
    color: var(--color-text);
  }
  button {
    min-height: var(--target-min);
    min-width: var(--target-min);
    font: inherit;
    color: var(--color-text);
    background: none;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }
  button:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
  @media (prefers-reduced-motion: no-preference) {
    button {
      transition:
        color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
