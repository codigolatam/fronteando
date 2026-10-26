<svelte:options customElement="demo-store-reactivo" />

<script>
  import { createProgram } from "./runtime";

  const stageLabels = {
    effect: "effect",
    store: "store",
    program: "programa",
  };
  const targetLabels = {
    title: "document.title",
    console: "salida de correr2",
  };
  const traceLimit = 12;

  let current = $state({
    state: { nombre: "ana", nivel: 1 },
    activeEffect: null,
    subscribers: {},
  });
  let title = $state("ana · nivel 1");
  let consoleLine = $state("ana");
  let runs = $state({});
  let trace = $state([]);
  let lastOperation = $state("sin escrituras todavía");
  let lastRunner = $state("ninguno");
  let sequence = 0;

  const program = createProgram(({ event, snapshot }) => {
    current = snapshot;
    if (event.kind === "run-start") {
      runs = { ...runs, [event.runner]: (runs[event.runner] ?? 0) + 1 };
      lastRunner = event.runner;
    }
    if (event.kind === "write") {
      if (event.prop === "title") title = event.value;
      else consoleLine = event.value;
    }
    if (event.kind === "notify") {
      trace = [];
      lastOperation = describeEvent(event);
    }
    trace = [{ id: ++sequence, event }, ...trace].slice(0, traceLimit);
  });
  const estado = program.estado;

  const subscriberEntries = $derived(Object.entries(current.subscribers));
  const nextName = $derived(current.state.nombre === "ana" ? "lu" : "ana");

  function setName(event) {
    estado.nombre = event.currentTarget.value;
  }

  function setLevel(event) {
    const next = event.currentTarget.valueAsNumber;
    if (Number.isFinite(next)) estado.nivel = next;
  }

  function bumpLevel() {
    estado.nivel = current.state.nivel + 1;
  }

  function switchName() {
    estado.nombre = nextName;
  }

  function stateText() {
    return `{ nombre: "${current.state.nombre}", nivel: ${current.state.nivel} }`;
  }

  function runCount(runner) {
    const count = runs[runner] ?? 0;
    return `${count} ${count === 1 ? "ejecución" : "ejecuciones"}`;
  }

  function describeEvent(event) {
    if (event.kind === "run-start") {
      return `${event.runner} es efectoActivo`;
    }
    if (event.kind === "run-end") {
      return `${event.runner} limpia efectoActivo`;
    }
    if (event.kind === "subscribe") {
      return `get ${event.prop} → ${event.runner}`;
    }
    if (event.kind === "notify") {
      const noun = event.count === 1 ? "suscriptor" : "suscriptores";
      return `set ${event.prop} = ${event.value} → ${event.count} ${noun}`;
    }
    return `${targetLabels[event.prop]} ← "${event.value}"`;
  }
</script>

<div class="piece">
  <section class="section" aria-label="Programa del store">
    <p class="section-label">&gt; el programa</p>
    <div class="document-title">
      <span>document.title</span>
      <output>{title}</output>
    </div>
    <p class="console-line">
      <code>correr2</code> solo lee <code>nombre</code> y escribe «{consoleLine}».
    </p>
    <div class="controls">
      <label>
        <span>estado.nombre</span>
        <input
          type="text"
          value={current.state.nombre}
          oninput={setName}
        />
      </label>
      <label>
        <span>estado.nivel</span>
        <input
          type="number"
          value={current.state.nivel}
          oninput={setLevel}
        />
      </label>
      <button type="button" onclick={bumpLevel}>
        estado.nivel = {current.state.nivel + 1}
      </button>
      <button type="button" onclick={switchName}>
        estado.nombre = "{nextName}"
      </button>
    </div>
  </section>

  <section class="section internals" aria-label="Estado interno del store">
    <p class="section-label">&gt; por dentro</p>
    <div class="snapshot">
      <p>
        <span>efectoActivo</span>
        <code>{current.activeEffect ?? "null"}</code>
        <small>último: {lastRunner}</small>
      </p>
      <p>
        <span>estado</span>
        <code>{stateText()}</code>
      </p>
    </div>
    <div class="internals-grid">
      <ul class="effects">
        <li>
          <code>correr1</code> lee <code>nombre</code> y <code>nivel</code> ·
          {runCount("correr1")}
        </li>
        <li>
          <code>correr2</code> lee solo <code>nombre</code> ·
          {runCount("correr2")}
        </li>
      </ul>
      <div>
        <p class="subsection-label">suscriptoresPorProp</p>
        <dl class="subscribers">
          {#each subscriberEntries as [prop, runners]}
            <div>
              <dt><code>{prop}</code></dt>
              <dd>{runners.join(", ") || "sin suscriptores"}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
    <div>
      <p class="subsection-label">traza (reciente arriba)</p>
      <p class="trace-status" role="status" aria-live="polite">{lastOperation}</p>
      <ol class="trace" aria-label="Traza del store">
        {#each trace as entry (entry.id)}
          <li>
            <span class="stage">{stageLabels[entry.event.stage]}</span>
            <code>{describeEvent(entry.event)}</code>
          </li>
        {/each}
      </ol>
    </div>
  </section>
</div>

<style>
  .piece {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc(var(--target-min) * 6), 1fr)
    );
    align-items: start;
    gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-size-meta);
    line-height: var(--line-height-meta);
    color: var(--color-text);
  }

  .section {
    display: grid;
    gap: var(--space-2);
  }

  .section-label,
  .subsection-label {
    margin: 0;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .internals {
    min-width: 0;
  }

  .document-title,
  .snapshot {
    background: var(--color-background);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space-2);
  }

  .document-title {
    display: grid;
    gap: var(--space-1);
  }

  .document-title span,
  .snapshot span {
    color: var(--color-text-muted);
  }

  .document-title output,
  .snapshot code {
    font-weight: 500;
  }

  .console-line {
    margin: 0;
    color: var(--color-text-muted);
  }

  .controls,
  .internals-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc(var(--target-min) * 3), 1fr)
    );
    align-items: start;
    gap: var(--space-2);
  }

  .snapshot {
    display: grid;
    gap: var(--space-1);
  }

  .snapshot p {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-1);
    margin: 0;
  }

  label {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
    color: var(--color-text-muted);
  }

  input,
  button {
    min-height: var(--target-min);
    font: inherit;
    color: var(--color-text);
    background: var(--color-background);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius);
  }

  input {
    width: 100%;
    min-width: 0;
    padding-inline: var(--space-1);
  }

  button {
    align-self: end;
    padding-inline: var(--space-2);
    border-radius: var(--radius-pill);
    cursor: pointer;
  }

  button:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  input:focus-visible,
  button:focus-visible {
    outline: var(--focus-width) solid var(--color-accent);
    outline-offset: var(--focus-offset);
  }

  .snapshot small {
    font: inherit;
    color: var(--color-text-muted);
  }

  .effects {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .subscribers {
    display: grid;
    gap: var(--space-1);
    margin: 0;
  }

  .subscribers > div {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    border-top: var(--border-width) solid var(--color-border);
    padding-top: var(--space-1);
  }

  .subscribers dt,
  .subscribers dd {
    margin: 0;
  }

  .subscribers dd {
    color: var(--color-text-muted);
    text-align: right;
  }

  .trace-status {
    margin: 0;
    color: var(--color-text-muted);
  }

  .trace {
    display: grid;
    gap: var(--space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .trace li {
    display: flex;
    gap: var(--space-2);
  }

  .trace li + li {
    border-top: var(--border-width) solid var(--color-border);
    padding-top: var(--space-1);
  }

  .stage {
    flex: 0 0 auto;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .trace code {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  @media (prefers-reduced-motion: no-preference) {
    button {
      transition:
        color var(--duration-fast),
        border-color var(--duration-fast);
    }
  }
</style>
