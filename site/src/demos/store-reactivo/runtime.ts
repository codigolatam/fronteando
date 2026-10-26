// The reactive program from the article, instrumented —not
// reimplemented—. The same mechanics the text builds (an effect
// runner, efectoActivo, a Proxy with per-property subscriber sets)
// emits a typed event and a real snapshot at each observable step so
// the piece can show the mechanism without diverging from it.

export type RunnerId = "title" | "greeting";

export const RUNNERS: readonly RunnerId[] = ["title", "greeting"];

export type DemoEvent =
  | { kind: "run-start" | "run-end"; runner: RunnerId }
  | { kind: "subscribe"; prop: string; runner: RunnerId }
  // value is the source literal of the assignment ("lu", 2).
  | { kind: "notify"; prop: string; value: string; count: number }
  // Instrumentation only: an effect that did not read `prop`, so the
  // write left it alone. The article's mechanics emit nothing here.
  | { kind: "skip"; prop: string; runner: RunnerId }
  | { kind: "write"; runner: RunnerId; value: string };

export interface ProgramSnapshot {
  state: { nombre: string; nivel: number };
  activeEffect: RunnerId | null;
  subscribers: Record<string, RunnerId[]>;
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
  const runnerIds = new Map<() => void, RunnerId>();
  let activeEffect: (() => void) | null = null;

  const idOf = (runner: () => void) => {
    const id = runnerIds.get(runner);
    if (!id) throw new Error("subscriber is not a registered effect");
    return id;
  };

  const snapshot = (): ProgramSnapshot => ({
    state: { ...target },
    activeEffect: activeEffect ? idOf(activeEffect) : null,
    subscribers: Object.fromEntries(
      [...subscribersPerProp].map(([prop, subscribers]) => [
        prop,
        [...subscribers].map(idOf),
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
  function effect(fn: () => void, id: RunnerId) {
    const correr = () => {
      activeEffect = correr;
      emit({ kind: "run-start", runner: id });
      fn();
      activeEffect = null;
      emit({ kind: "run-end", runner: id });
    };
    runnerIds.set(correr, id);
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
          kind: "subscribe",
          prop,
          runner: idOf(runner),
        });
      }
      return value;
    },
    set(obj, prop, next) {
      if (typeof prop !== "string") return Reflect.set(obj, prop, next);
      (obj as Record<string, unknown>)[prop] = next;
      const subscribers = subsOf(prop);
      const listening = new Set([...subscribers].map(idOf));
      const skipped = RUNNERS.filter((id) => !listening.has(id));
      emit({
        kind: "notify",
        prop,
        value: typeof next === "string" ? JSON.stringify(next) : String(next),
        count: subscribers.size,
      });
      subscribers.forEach((runner) => runner());
      skipped.forEach((runner) => emit({ kind: "skip", prop, runner }));
      return true;
    },
  });

  // Two effects with a job each, so the fine graph is provable: the
  // greeting reads only `nombre`, so writes to `nivel` never re-run it.
  effect(() => {
    emit({
      kind: "write",
      runner: "title",
      value: `${estado.nombre} · nivel ${estado.nivel}`,
    });
  }, "title");

  effect(() => {
    emit({
      kind: "write",
      runner: "greeting",
      value: `Hola, ${estado.nombre}`,
    });
  }, "greeting");

  return { estado, getSnapshot: snapshot };
}
