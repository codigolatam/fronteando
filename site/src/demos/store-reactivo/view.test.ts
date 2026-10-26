import { describe, expect, it } from "vitest";
import { createProgram, type ProgramObservation } from "./runtime";
import {
  applyObservation,
  depthOf,
  describeEvent,
  initialView,
  type DemoView,
} from "./view";

function setup() {
  let captured: ProgramObservation[] = [];
  const program = createProgram((observation) => captured.push(observation));
  const booted = captured.reduce(applyObservation, initialView());
  captured = [];
  const write = (change: () => void, view: DemoView = booted) => {
    change();
    const batch = captured;
    captured = [];
    return { batch, view: batch.reduce(applyObservation, view) };
  };
  return { booted, program, write };
}

describe("applyObservation", () => {
  describe("when the program boots", () => {
    it("shows both outputs and marks the effects as run at start", () => {
      const { booted } = setup();

      expect(booted.outputs).toEqual({
        title: "ana · nivel 1",
        greeting: "Hola, ana",
      });
      expect(booted.runStatus).toEqual({ title: "boot", greeting: "boot" });
      expect(booted.write).toBeNull();
    });

    it("nests reads under their effect without an operation above them", () => {
      const { booted } = setup();

      expect(booted.trace.map((entry) => entry.depth)).toEqual([
        0, 1, 1, 1, 0, 0, 1, 1, 0,
      ]);
    });
  });

  describe("when a property only one effect reads is written", () => {
    it("re-runs that effect and leaves the other untouched", () => {
      const { program, write } = setup();

      const { view } = write(() => {
        program.estado.nivel = 2;
      });

      expect(view.outputs).toEqual({
        title: "ana · nivel 2",
        greeting: "Hola, ana",
      });
      expect(view.runStatus).toEqual({ title: "ran", greeting: "skipped" });
      expect(view.write).toEqual({ prop: "nivel", value: "2" });
      expect(view.trace[0]).toMatchObject({ kind: "notify", depth: 0 });
      expect(view.trace.at(-1)).toMatchObject({
        kind: "skip",
        depth: 1,
        text: "saludo no leyó nivel → no se ejecuta",
      });
    });
  });

  describe("when a property both effects read is written", () => {
    it("re-runs both and starts a fresh trace", () => {
      const { program, write } = setup();

      const { view } = write(() => {
        program.estado.nombre = "lu";
      });

      expect(view.outputs).toEqual({
        title: "lu · nivel 1",
        greeting: "Hola, lu",
      });
      expect(view.runStatus).toEqual({ title: "ran", greeting: "ran" });
      expect(view.trace[0].kind).toBe("notify");
      expect(view.trace).toHaveLength(10);
    });
  });

  describe("when only the first step of a write has been applied", () => {
    it("shows the write pending and keeps the previous outputs", () => {
      const { booted, program, write } = setup();
      const { batch, view: whole } = write(() => {
        program.estado.nivel = 2;
      });

      const first = applyObservation(booted, batch[0]);

      expect(first.runStatus).toEqual({
        title: "pending",
        greeting: "pending",
      });
      expect(first.outputs).toEqual(booted.outputs);
      expect(first.trace).toHaveLength(1);
      expect(first.snapshot.state.nivel).toBe(2);
      expect(whole.trace.length).toBeGreaterThan(first.trace.length);
    });
  });

  describe("when an effect has started but not finished", () => {
    it("marks it as running while the other stays pending", () => {
      const { booted, program, write } = setup();
      const { batch } = write(() => {
        program.estado.nivel = 2;
      });

      const view = batch.slice(0, 2).reduce(applyObservation, booted);

      expect(view.runStatus).toEqual({ title: "running", greeting: "pending" });
      expect(view.snapshot.activeEffect).toBe("title");
    });
  });

  it("gives every trace entry a distinct id", () => {
    const { program, write } = setup();

    const { view } = write(() => {
      program.estado.nombre = "lu";
    });

    const ids = view.trace.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("describeEvent", () => {
  it("writes each step the way the program reads", () => {
    expect(
      describeEvent({ kind: "notify", prop: "nivel", value: "2", count: 1 }),
    ).toBe("set nivel = 2 → avisa a 1 efecto");
    expect(
      describeEvent({
        kind: "notify",
        prop: "nombre",
        value: '"lu"',
        count: 2,
      }),
    ).toBe('set nombre = "lu" → avisa a 2 efectos');
    expect(describeEvent({ kind: "run-start", runner: "title" })).toBe(
      "efectoActivo = título",
    );
    expect(describeEvent({ kind: "run-end", runner: "title" })).toBe(
      "efectoActivo = null",
    );
    expect(
      describeEvent({ kind: "subscribe", prop: "nombre", runner: "greeting" }),
    ).toBe("get nombre → suscribe saludo");
    expect(
      describeEvent({ kind: "write", runner: "greeting", value: "Hola, ana" }),
    ).toBe('saludo.textContent ← "Hola, ana"');
  });
});

describe("depthOf", () => {
  it("nests under the operation only once there is one", () => {
    const start = { kind: "run-start", runner: "title" } as const;
    const read = {
      kind: "subscribe",
      prop: "nombre",
      runner: "title",
    } as const;

    expect(depthOf(start, false)).toBe(0);
    expect(depthOf(start, true)).toBe(1);
    expect(depthOf(read, false)).toBe(1);
    expect(depthOf(read, true)).toBe(2);
  });
});
