import { describe, expect, it } from "vitest";
import { createProgram, type DemoEvent, type ProgramSnapshot } from "./runtime";

function collect() {
  const events: DemoEvent[] = [];
  const snapshots: ProgramSnapshot[] = [];
  const program = createProgram((observation) => {
    events.push(observation.event);
    snapshots.push(observation.snapshot);
  });
  return { events, program, snapshots };
}

const kinds = (events: DemoEvent[]) => events.map((event) => event.kind);

describe("createProgram", () => {
  describe("when the program boots", () => {
    it("runs each effect once and subscribes it to what it reads", () => {
      const { events, program, snapshots } = collect();

      expect(events[0]).toMatchObject({
        kind: "run-start",
        runner: "correr1",
      });
      expect(snapshots[0].activeEffect).toBe("correr1");
      expect(events).toContainEqual(
        expect.objectContaining({
          kind: "subscribe",
          prop: "nombre",
          runner: "correr1",
        }),
      );
      expect(events).toContainEqual(
        expect.objectContaining({
          kind: "subscribe",
          prop: "nivel",
          runner: "correr1",
        }),
      );
      expect(events).toContainEqual(
        expect.objectContaining({
          kind: "subscribe",
          prop: "nombre",
          runner: "correr2",
        }),
      );
      expect(events).not.toContainEqual(
        expect.objectContaining({
          kind: "subscribe",
          prop: "nivel",
          runner: "correr2",
        }),
      );
      expect(program.getSnapshot()).toEqual({
        state: { nombre: "ana", nivel: 1 },
        activeEffect: null,
        subscribers: {
          nombre: ["correr1", "correr2"],
          nivel: ["correr1"],
        },
      });
    });
  });

  describe("when a property is written", () => {
    it("notifies and re-runs only the effects subscribed to it", () => {
      const { events, program, snapshots } = collect();
      events.length = 0;
      snapshots.length = 0;

      program.estado.nivel = 2;

      expect(events[0]).toMatchObject({
        kind: "notify",
        prop: "nivel",
        count: 1,
      });
      expect(snapshots[0].subscribers).toEqual({
        nombre: ["correr1", "correr2"],
        nivel: ["correr1"],
      });
      const runs = events.filter((event) => event.kind === "run-start");
      expect(runs).toHaveLength(1);
      expect(runs[0]).toMatchObject({ runner: "correr1" });
      expect(events).toContainEqual(
        expect.objectContaining({ kind: "write", prop: "title" }),
      );
      expect(snapshots.at(-1)?.state).toEqual({ nombre: "ana", nivel: 2 });
    });

    it("keeps the trace honest: get subscribes, set notifies", () => {
      const { events, program } = collect();
      events.length = 0;

      program.estado.nombre = "lu";

      expect(kinds(events)).toEqual([
        "notify",
        "run-start",
        "subscribe",
        "subscribe",
        "write",
        "run-end",
        "run-start",
        "subscribe",
        "write",
        "run-end",
      ]);
      expect(program.getSnapshot().state.nombre).toBe("lu");
    });
  });

  describe("when a property is read outside an effect", () => {
    it("does not register any subscription", () => {
      const { events, program } = collect();
      const subscribers = program.getSnapshot().subscribers;
      events.length = 0;

      const value = program.estado.nombre;

      expect(value).toBe("ana");
      expect(events).toHaveLength(0);
      expect(program.getSnapshot().subscribers).toEqual(subscribers);
    });
  });
});
