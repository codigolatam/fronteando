import type {
  DemoEvent,
  ProgramObservation,
  ProgramSnapshot,
  RunnerId,
} from "./runtime";
import { lineOf, type Write } from "./source";

export type RunStatus = "boot" | "pending" | "running" | "ran" | "skipped";

export const RUNNER_LABELS: Record<RunnerId, string> = {
  title: "título",
  greeting: "saludo",
};

export const RUN_CAPTIONS: Record<RunStatus, string> = {
  boot: "ejecutado al inicio",
  pending: "pendiente",
  running: "ejecutándose",
  ran: "se reejecutó",
  skipped: "no se ejecutó",
};

const OUTPUT_TARGETS: Record<RunnerId, string> = {
  title: "document.title",
  greeting: "saludo.textContent",
};

export interface TraceEntry {
  id: number;
  depth: number;
  kind: DemoEvent["kind"];
  text: string;
}

export interface DemoView {
  outputs: Record<RunnerId, string>;
  runStatus: Record<RunnerId, RunStatus>;
  snapshot: ProgramSnapshot;
  line: number | null;
  write: Write | null;
  trace: TraceEntry[];
  operation: string;
  lastStep: string;
  nextId: number;
}

const audience = (count: number) =>
  count === 0
    ? "nadie lo lee"
    : `avisa a ${count} ${count === 1 ? "efecto" : "efectos"}`;

export function describeEvent(event: DemoEvent): string {
  switch (event.kind) {
    case "notify":
      return `set ${event.prop} = ${event.value} → ${audience(event.count)}`;
    case "run-start":
      return `efectoActivo = ${RUNNER_LABELS[event.runner]}`;
    case "run-end":
      return "efectoActivo = null";
    case "subscribe":
      return `get ${event.prop} → suscribe ${RUNNER_LABELS[event.runner]}`;
    case "write":
      return `${OUTPUT_TARGETS[event.runner]} ← ${JSON.stringify(event.value)}`;
    case "skip":
      return `${RUNNER_LABELS[event.runner]} no leyó ${event.prop} → no se ejecuta`;
  }
}

// Writes nest under their operation and reads under their effect, so
// the trace reads as the call tree it is. Before the first write
// (the boot) there is no operation to nest under.
export function depthOf(event: DemoEvent, inOperation: boolean): number {
  const base = inOperation ? 1 : 0;
  switch (event.kind) {
    case "notify":
      return 0;
    case "run-start":
    case "run-end":
    case "skip":
      return base;
    case "subscribe":
    case "write":
      return base + 1;
  }
}

export function initialView(): DemoView {
  return {
    outputs: { title: "", greeting: "" },
    runStatus: { title: "boot", greeting: "boot" },
    snapshot: {
      state: { nombre: "ana", nivel: 1 },
      activeEffect: null,
      subscribers: {},
    },
    line: null,
    write: null,
    trace: [],
    operation: "arranque del programa",
    lastStep: "arranque del programa",
    nextId: 0,
  };
}

export function applyObservation(
  view: DemoView,
  { event, snapshot }: ProgramObservation,
): DemoView {
  const starts = event.kind === "notify";
  const inOperation = starts || view.write !== null;
  const text = describeEvent(event);
  const runStatus = { ...view.runStatus };
  const outputs = { ...view.outputs };

  if (event.kind === "notify") {
    runStatus.title = "pending";
    runStatus.greeting = "pending";
  } else if (event.kind === "run-start") {
    runStatus[event.runner] = inOperation ? "running" : "boot";
  } else if (event.kind === "run-end") {
    if (inOperation) runStatus[event.runner] = "ran";
  } else if (event.kind === "skip") {
    runStatus[event.runner] = "skipped";
  } else if (event.kind === "write") {
    outputs[event.runner] = event.value;
  }

  return {
    outputs,
    runStatus,
    snapshot,
    line: lineOf(event),
    write:
      event.kind === "notify"
        ? { prop: event.prop, value: event.value }
        : view.write,
    trace: [
      ...(starts ? [] : view.trace),
      {
        id: view.nextId,
        depth: depthOf(event, inOperation),
        kind: event.kind,
        text,
      },
    ],
    operation: starts ? text : view.operation,
    lastStep: text,
    nextId: view.nextId + 1,
  };
}
