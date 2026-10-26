import { describe, expect, it } from "vitest";
import { createProgram, type ProgramObservation } from "./runtime";
import { lineOf, sourceLines, WRITE_LINE, type SourceLine } from "./source";

const text = (line: SourceLine) => line.map(([part]) => part).join("");

type Estado = ReturnType<typeof createProgram>["estado"];

function observe(write?: (estado: Estado) => void) {
  const observations: ProgramObservation[] = [];
  const program = createProgram((observation) =>
    observations.push(observation),
  );
  write?.(program.estado);
  return observations;
}

describe("sourceLines", () => {
  describe("when the reader has not written anything", () => {
    it("invites the first write on the last line", () => {
      expect(text(sourceLines(null)[WRITE_LINE])).toBe(
        "// tu escritura aparecerá aquí",
      );
    });
  });

  describe("when the reader writes a property", () => {
    it("shows that assignment on the last line", () => {
      expect(text(sourceLines({ prop: "nivel", value: "2" })[WRITE_LINE])).toBe(
        "estado.nivel = 2;",
      );
      expect(
        text(sourceLines({ prop: "nombre", value: '"lu"' })[WRITE_LINE]),
      ).toBe('estado.nombre = "lu";');
      expect(
        text(
          sourceLines({
            prop: "nivel",
            value: "2",
            statement: "estado.nivel += 1",
          })[WRITE_LINE],
        ),
      ).toBe("estado.nivel += 1");
    });
  });
});

describe("lineOf", () => {
  it("points every event the program emits at a line of the source", () => {
    const lines = sourceLines(null);

    for (const { event } of observe((estado) => {
      estado.nivel = 2;
      estado.nombre = "lu";
    })) {
      expect(lineOf(event)).toBeGreaterThanOrEqual(0);
      expect(lineOf(event)).toBeLessThan(lines.length);
    }
  });

  it("marks the reader's assignment line for a write", () => {
    const notify = observe((estado) => {
      estado.nivel = 2;
    }).find(({ event }) => event.kind === "notify");

    expect(notify && lineOf(notify.event)).toBe(WRITE_LINE);
  });

  it("shows the same reads the program performs", () => {
    const lines = sourceLines(null);
    const performed = new Map<string, { props: Set<string>; line: number }>();

    for (const { event } of observe()) {
      if (event.kind !== "subscribe") continue;
      const entry = performed.get(event.runner) ?? {
        props: new Set<string>(),
        line: lineOf(event),
      };
      entry.props.add(event.prop);
      performed.set(event.runner, entry);
    }

    expect(performed.size).toBe(2);
    for (const { props, line } of performed.values()) {
      const shown = new Set(
        [...text(lines[line]).matchAll(/estado\.(\w+)/g)].map(
          (match) => match[1],
        ),
      );
      expect(shown).toEqual(props);
    }
  });
});
