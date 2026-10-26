<svelte:options customElement="demo-store-reactivo" />

<script lang="ts">
  import { tick } from "svelte";
  import { createProgram, type ProgramObservation } from "./runtime";
  import { sourceLines } from "./source";
  import {
    applyObservation,
    initialView,
    RUN_CAPTIONS,
    RUNNER_LABELS,
  } from "./view";

  const NAMES = ["ana", "lu", "mara"];
  const OUTPUTS = [
    { runner: "title", label: "document.title (simulado)" },
    { runner: "greeting", label: "saludo.textContent (simulado)" },
  ] as const;

  let captured: ProgramObservation[] = [];
  const program = createProgram((observation) => captured.push(observation));
  let view = $state.raw(captured.reduce(applyObservation, initialView()));
  let lastStatement = $state<string | null>(null);
  captured = [];

  let stepMode = $state(false);
  let pending = $state.raw<ProgramObservation[]>([]);
  let total = $state(0);
  let levelButton = $state<HTMLButtonElement>();

  const lines = $derived(
    sourceLines(view.write && { ...view.write, statement: lastStatement }),
  );
  // The arrow is a program counter: it only means something while the
  // reader is stepping through an operation.
  const activeLine = $derived(stepMode && total > 0 ? view.line : null);
  const nextName = $derived(
    NAMES[(NAMES.indexOf(view.snapshot.state.nombre) + 1) % NAMES.length],
  );
  const status = $derived(stepMode ? view.lastStep : view.operation);
  const stepLabel = $derived(
    total === 0
      ? "pulsa una escritura"
      : pending.length > 0
        ? `paso ${total - pending.length} de ${total}`
        : "operación completa",
  );

  function finish() {
    if (pending.length === 0) return;
    view = pending.reduce(applyObservation, view);
    pending = [];
  }

  // Every write runs synchronously through the program; the batch of
  // observations it produced is then shown at once or one step at a
  // time, so the stepped view replays what really happened.
  function perform(write: () => void, statement: string) {
    finish();
    lastStatement = statement;
    captured = [];
    write();
    const batch = captured;
    captured = [];
    if (!stepMode) {
      view = batch.reduce(applyObservation, view);
      return;
    }
    view = applyObservation(view, batch[0]);
    pending = batch.slice(1);
    total = batch.length;
  }

  async function restoreFocus() {
    await tick();
    levelButton?.focus();
  }

  function step() {
    const [first, ...rest] = pending;
    if (!first) return;
    view = applyObservation(view, first);
    pending = rest;
    if (rest.length === 0) void restoreFocus();
  }

  function complete() {
    finish();
    void restoreFocus();
  }

  function toggleSteps(event: Event & { currentTarget: HTMLInputElement }) {
    stepMode = event.currentTarget.checked;
    if (!stepMode) finish();
    total = 0;
  }
</script>

<div class="root">
  <div class="piece">
    <section class="result" aria-label="Resultado del programa">
      {#each OUTPUTS as { runner, label } (runner)}
        <div class="output" data-state={view.runStatus[runner]}>
          <span class="output-label">{label}</span>
          <span class="output-value">{view.outputs[runner]}</span>
          <span class="output-caption">
            {RUNNER_LABELS[runner]}: {RUN_CAPTIONS[view.runStatus[runner]]}
          </span>
        </div>
      {/each}
    </section>

    <section class="controls" aria-label="Escribir en el estado">
      <div class="actions">
        <button
          type="button"
          class:primary={pending.length === 0}
          bind:this={levelButton}
          onclick={() =>
            perform(() => (program.estado.nivel += 1), "estado.nivel += 1")}
        >
          estado.nivel += 1
        </button>
        <button
          type="button"
          onclick={() =>
            perform(
              () => (program.estado.nombre = nextName),
              `estado.nombre = "${nextName}"`,
            )}
        >
          estado.nombre = "{nextName}"
        </button>
        <label class="toggle">
          <input type="checkbox" checked={stepMode} onchange={toggleSteps} />
          <span>paso a paso</span>
        </label>
      </div>
      {#if stepMode}
        <div class="actions steps">
          <span class="step-label">{stepLabel}</span>
          <button
            type="button"
            class:primary={pending.length > 0}
            disabled={pending.length === 0}
            onclick={step}
          >
            siguiente paso
          </button>
          <button
            type="button"
            disabled={pending.length === 0}
            onclick={complete}
          >
            terminar
          </button>
        </div>
      {/if}
    </section>

    <section class="trace-section" aria-labelledby="trace-label">
      <p class="label" id="trace-label">&gt; traza</p>
      <p class="sr-only" role="status">{status}</p>
      <ol class="trace" role="list">
        {#each view.trace as entry, index (entry.id)}
          <li
            style:--depth={entry.depth}
            class:skipped={entry.kind === "skip"}
            class:current={stepMode && index === view.trace.length - 1}
          >
            <code>{entry.text}</code>
          </li>
        {/each}
      </ol>
    </section>

    <section class="code-section" aria-labelledby="code-label">
      <p class="label" id="code-label">&gt; programa</p>
      <!-- A scrollable code region must be reachable by keyboard. -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <pre
        class="code"
        tabindex="0"
        aria-label={stepMode
          ? "Programa que se ejecuta; la flecha marca la línea en curso"
          : "Programa que se ejecuta"}><code
          >{#each lines as line, index}<span
              class="line"
              class:active={index === activeLine}
              ><span class="marker" aria-hidden="true"
                >{index === activeLine ? "▸" : ""}</span
              >{#each line as [text, kind]}<span class={kind}>{text}</span
                >{/each}</span
            >{/each}</code
        ></pre>
    </section>

    <section class="internals" aria-labelledby="inside-label">
      <p class="label" id="inside-label">&gt; por dentro</p>
      <div class="field">
        <p class="field-line">
          <code>efectoActivo</code> =
          <code class:idle={view.snapshot.activeEffect === null}>
            {view.snapshot.activeEffect
              ? RUNNER_LABELS[view.snapshot.activeEffect]
              : "null"}
          </code>
        </p>
        <p class="gloss">
          el efecto que se ejecuta ahora (en reposo vale null)
        </p>
      </div>
      <div class="field">
        <p class="field-line"><code>suscriptoresPorProp</code></p>
        <p class="gloss">quién escucha a cada propiedad</p>
        <ul class="subscribers" role="list">
          {#each Object.entries(view.snapshot.subscribers) as [prop, runners] (prop)}
            <li>
              <code>{prop}</code> →
              {runners.map((runner) => RUNNER_LABELS[runner]).join(", ")}
            </li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</div>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  code {
    font: inherit;
  }

  .root {
    container-type: inline-size;
  }

  .piece {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "result"
      "controls"
      "trace"
      "code"
      "internals";
    gap: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--demo-font-size);
    line-height: var(--line-height-meta);
    color: var(--color-text);
  }

  @container (min-width: 560px) {
    .piece {
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      grid-template-areas:
        "result result"
        "controls controls"
        "code code"
        "internals trace";
    }
  }

  .result {
    grid-area: result;
    display: grid;
    gap: var(--space-2);
  }

  .controls {
    grid-area: controls;
  }

  .trace-section {
    grid-area: trace;
    position: relative;
    min-width: 0;
  }

  .code-section {
    grid-area: code;
    min-width: 0;
  }

  .internals {
    grid-area: internals;
    min-width: 0;
  }

  @container (min-width: 560px) {
    .result {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .label {
    margin: 0 0 var(--space-1);
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .sr-only {
    position: absolute;
    inline-size: var(--border-width);
    block-size: var(--border-width);
    margin: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .output {
    display: grid;
    min-width: 0;
    padding: var(--space-1) var(--space-2);
    background: var(--color-background);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
  }

  .output[data-state="ran"] {
    border-color: var(--color-text);
  }

  .output-label,
  .output-caption {
    color: var(--color-text-muted);
  }

  .output[data-state="ran"] .output-caption {
    font-weight: 500;
    color: var(--color-text);
  }

  .output-value {
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
    overflow-wrap: anywhere;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
  }

  .steps {
    margin-top: var(--space-1);
  }

  @container (max-width: 559px) {
    .actions > button {
      flex: 1 1 100%;
    }

    .steps .step-label {
      flex-basis: 100%;
    }

    .steps > button {
      flex: 1 1 0;
    }
  }

  .step-label {
    color: var(--color-text-muted);
  }

  button {
    min-height: var(--target-min);
    padding-inline: var(--space-2);
    font: inherit;
    color: var(--color-text);
    white-space: nowrap;
    background: none;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  button.primary {
    color: var(--color-background);
    background: var(--color-accent);
    border-color: var(--color-accent);
  }

  button.primary:hover:not(:disabled) {
    color: var(--color-background);
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--target-min);
    cursor: pointer;
  }

  .toggle input {
    inline-size: var(--space-3);
    block-size: var(--space-3);
    margin: 0;
    accent-color: var(--color-accent);
  }

  :focus-visible {
    outline: var(--focus-width) solid var(--color-accent);
    outline-offset: var(--focus-offset);
  }

  .trace {
    min-block-size: calc(10 * var(--demo-font-size) * var(--line-height-meta));
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .trace li {
    padding-inline-start: calc(var(--depth) * var(--space-2));
  }

  .trace li.skipped {
    color: var(--color-text-muted);
  }

  .trace li.current {
    font-weight: 500;
  }

  .trace code {
    overflow-wrap: anywhere;
  }

  .code {
    margin: 0;
    padding: var(--space-1) 0;
    overflow-x: auto;
    font-size: var(--demo-font-size);
    line-height: var(--line-height-code);
    background: var(--color-surface);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
  }

  .code code {
    display: block;
    inline-size: max-content;
    min-inline-size: 100%;
  }

  .line {
    display: block;
    min-block-size: calc(var(--demo-font-size) * var(--line-height-code));
    padding-inline: var(--space-1) var(--space-2);
    white-space: pre;
  }

  .line.active {
    font-weight: 500;
    background: var(--color-background);
  }

  .marker {
    display: inline-block;
    inline-size: 2ch;
  }

  .keyword {
    color: var(--color-syntax-keyword);
  }

  .string {
    color: var(--color-syntax-string);
  }

  .function {
    color: var(--color-syntax-function);
  }

  .constant {
    color: var(--color-syntax-constant);
  }

  .comment {
    color: var(--color-text-muted);
  }

  .field {
    margin-block-end: var(--space-2);
  }

  .field-line,
  .gloss {
    margin: 0;
  }

  .gloss,
  .idle {
    color: var(--color-text-muted);
  }

  .subscribers {
    margin: var(--space-1) 0 0;
    padding: 0;
    list-style: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    button,
    .output {
      transition:
        color var(--duration-fast),
        background-color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
