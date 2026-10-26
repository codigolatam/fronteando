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

      expect(events[0]).toMatchObject({ kind: "run-start", runner: "title" });
      expect(snapshots[0].activeEffect).toBe("title");
      expect(events).toContainEqual({
        kind: "subscribe",
        prop: "nombre",
        runner: "title",
      });
      expect(events).toContainEqual({
        kind: "subscribe",
        prop: "nivel",
        runner: "title",
      });
      expect(events).toContainEqual({
        kind: "subscribe",
        prop: "nombre",
        runner: "greeting",
      });
      expect(events).not.toContainEqual({
        kind: "subscribe",
        prop: "nivel",
        runner: "greeting",
      });
      expect(program.getSnapshot()).toEqual({
        state: { nombre: "ana", nivel: 1 },
        activeEffect: null,
        subscribers: {
          nombre: ["title", "greeting"],
          nivel: ["title"],
        },
      });
    });
  });

  describe("when a property is written", () => {
    it("re-runs only the effects subscribed to it and reports the rest as skipped", () => {
      const { events, program, snapshots } = collect();
      events.length = 0;
      snapshots.length = 0;

      program.estado.nivel = 2;

      expect(events[0]).toEqual({
        kind: "notify",
        prop: "nivel",
        value: "2",
        count: 1,
      });
      expect(snapshots[0].subscribers).toEqual({
        nombre: ["title", "greeting"],
        nivel: ["title"],
      });
      const runs = events.filter((event) => event.kind === "run-start");
      expect(runs).toEqual([{ kind: "run-start", runner: "title" }]);
      expect(events.at(-1)).toEqual({
        kind: "skip",
        prop: "nivel",
        runner: "greeting",
      });
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
      expect(events[0]).toMatchObject({ value: '"lu"', count: 2 });
      expect(program.getSnapshot().state.nombre).toBe("lu");
    });

    it("does not skip anything when every effect reads the property", () => {
      const { events, program } = collect();
      events.length = 0;

      program.estado.nombre = "lu";

      expect(kinds(events)).not.toContain("skip");
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
