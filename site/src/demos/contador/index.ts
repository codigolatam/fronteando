import type { DemoModule } from "../fronteando-demo";

// Reference piece for the mechanism: a counter that exercises the
// whole contract —mounting into the shadow root, interaction operable
// by keyboard (a plain button), the design tokens crossing the shadow
// boundary— without anticipating the real pieces of the articles.
export const mount: DemoModule["mount"] = (_host, container) => {
  const styles = document.createElement("style");
  styles.textContent = `
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
  `;

  const wrap = document.createElement("div");
  wrap.className = "piece";

  const readout = document.createElement("output");
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "+1";

  let count = 0;
  const render = () => {
    readout.textContent = `cuenta: ${count}`;
  };
  button.addEventListener("click", () => {
    count += 1;
    render();
  });
  render();

  wrap.append(readout, button);
  container.append(styles, wrap);
};
