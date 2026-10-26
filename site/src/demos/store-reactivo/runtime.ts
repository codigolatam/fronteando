// The reactive program from the article, instrumented —not
// reimplemented—. The same mechanics the text builds (an effect
// runner, efectoActivo, a Proxy with per-property subscriber sets)
// emits a typed event and a real snapshot at each observable step so
// the piece can show the mechanism without diverging from it.

export type Stage = "effect" | "store" | "program";

export type DemoEvent =
  | { stage: "effect"; kind: "run-start" | "run-end"; runner: string }
  | { stage: "store"; kind: "subscribe"; prop: string; runner: string }
  | {
      stage: "store";
      kind: "notify";
      prop: string;
      value: string;
      count: number;
    }
  | {
      stage: "program";
      kind: "write";
      prop: "title" | "console";
      value: string;
    };

export interface ProgramSnapshot {
  state: { nombre: string; nivel: number };
  activeEffect: string | null;
  subscribers: Record<string, string[]>;
}

export interface ProgramObservation {
  event: DemoEvent;
  snapshot: ProgramSnapshot;
}

export function createProgram(
  observe: (observation: ProgramObservation) => void,
) {
  const target = { nombre: "ana", nivel: 1 };
  const subscribersPerProp = new Map<string, Set<() => void>>();
  const runnerLabels = new WeakMap<() => void, string>();
  let activeEffect: (() => void) | null = null;

  const snapshot = (): ProgramSnapshot => ({
    state: { ...target },
    activeEffect: activeEffect ? (runnerLabels.get(activeEffect) ?? "?") : null,
    subscribers: Object.fromEntries(
      [...subscribersPerProp.entries()].map(([prop, subscribers]) => [
        prop,
        [...subscribers].map((runner) => runnerLabels.get(runner) ?? "?"),
      ]),
    ),
  });
  const emit = (event: DemoEvent) => {
    observe({ event, snapshot: snapshot() });
  };

  const subsOf = (prop: string) => {
    let subscribers = subscribersPerProp.get(prop);
    if (!subscribers) subscribersPerProp.set(prop, (subscribers = new Set()));
    return subscribers;
  };

  // The article's `effect`: correr declares itself the active effect,
  // runs fn and cleans up —each run re-registers what it reads.
  function effect(fn: () => void, label: string) {
    const correr = () => {
      runnerLabels.set(correr, label);
      activeEffect = correr;
      emit({ stage: "effect", kind: "run-start", runner: label });
      fn();
      activeEffect = null;
      emit({ stage: "effect", kind: "run-end", runner: label });
    };
    correr();
  }

  // The article's `store`: read registers the active effect on the
  // property, write notifies that property's subscribers.
  const estado = new Proxy(target, {
    get(obj, prop) {
      if (typeof prop !== "string") return Reflect.get(obj, prop);
      const value = obj[prop as keyof typeof obj];
      if (activeEffect) {
        const runner = activeEffect;
        subsOf(prop).add(runner);
        emit({
          stage: "store",
          kind: "subscribe",
          prop,
          runner: runnerLabels.get(runner) ?? "?",
        });
      }
      return value;
    },
    set(obj, prop, next) {
      if (typeof prop !== "string") return Reflect.set(obj, prop, next);
      (obj as Record<string, unknown>)[prop] = next;
      const subscribers = subsOf(prop);
      emit({
        stage: "store",
        kind: "notify",
        prop,
        value: String(next),
        count: subscribers.size,
      });
      subscribers.forEach((runner) => runner());
      return true;
    },
  });

  // Two effects so the fine graph is provable: correr2 reads only
  // `nombre`, so writes to `nivel` never re-run it.
  effect(() => {
    emit({
      stage: "program",
      kind: "write",
      prop: "title",
      value: `${estado.nombre} · nivel ${estado.nivel}`,
    });
  }, "correr1");

  effect(() => {
    emit({
      stage: "program",
      kind: "write",
      prop: "console",
      value: `${estado.nombre}`,
    });
  }, "correr2");

  return { estado, getSnapshot: snapshot };
}
