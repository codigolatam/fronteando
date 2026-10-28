// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { mountView } from "./view";

// The scaffold is the piece's markup contract —an empty host for the
// render plus the register list— with a document scoped to it, as the
// piece provides inside its shadow.
function scaffold() {
  const root = document.createElement("div");
  root.innerHTML = `
    <div id="carrito-app"></div>
    <ol id="log"></ol>
  `;
  mountView({
    querySelector: (selector) => root.querySelector(selector),
    createElement: (tag) => document.createElement(tag),
  });
  return root;
}

function addButton(root: HTMLElement, nombre: string) {
  const li = [...root.querySelectorAll("#catalogo li")].find((el) =>
    el.textContent?.includes(nombre),
  );
  return li?.querySelector<HTMLButtonElement>("[data-agregar]") ?? null;
}

describe("mountView", () => {
  describe("when it mounts", () => {
    it("paints the whole view from the empty model", () => {
      const root = scaffold();
      expect(root.querySelectorAll("#catalogo li")).toHaveLength(3);
      expect(root.querySelector("#contador")?.textContent).toBe("0");
      expect(root.querySelector("#total")?.textContent).toBe("$0");
      expect(root.querySelectorAll("#carrito li")).toHaveLength(0);
    });

    it("leaves the register empty until the first notification", () => {
      const root = scaffold();
      expect(root.querySelectorAll("#log li")).toHaveLength(0);
    });
  });

  describe("when products are added", () => {
    it("repaints the counter, the total and the lines", () => {
      const root = scaffold();
      addButton(root, "Teclado")!.click();
      addButton(root, "Ratón")!.click();
      addButton(root, "Monitor")!.click();
      expect(root.querySelectorAll("#carrito li")).toHaveLength(3);
      expect(root.querySelector("#contador")?.textContent).toBe("3");
      expect(root.querySelector("#total")?.textContent).toBe("$250");
    });

    it("logs one register entry per notification, newest first", () => {
      const root = scaffold();
      addButton(root, "Teclado")!.click();
      addButton(root, "Ratón")!.click();
      addButton(root, "Monitor")!.click();
      const entries = [...root.querySelectorAll("#log li")].map(
        (li) => li.textContent,
      );
      expect(entries).toEqual([
        "notificación 3 → repintado: 3 u / $250",
        "notificación 2 → repintado: 2 u / $70",
        "notificación 1 → repintado: 1 u / $45",
      ]);
    });

    it("keeps every repainted Añadir button working", () => {
      const root = scaffold();
      addButton(root, "Teclado")!.click();
      addButton(root, "Teclado")!.click();
      expect(root.querySelector("#contador")?.textContent).toBe("2");
      expect(root.querySelectorAll("#carrito li")).toHaveLength(2);
    });
  });

  describe("when an item is removed", () => {
    it("repaints the cart without the line and logs the notification", () => {
      const root = scaffold();
      addButton(root, "Teclado")!.click();
      addButton(root, "Ratón")!.click();
      addButton(root, "Monitor")!.click();
      root.querySelector<HTMLElement>("[data-quitar]")!.click();
      expect(root.querySelectorAll("#carrito li")).toHaveLength(2);
      expect(root.querySelector("#total")?.textContent).toBe("$205");
      expect(root.querySelector("#log li")?.textContent).toBe(
        "notificación 4 → repintado: 2 u / $205",
      );
    });
  });

  describe("when the register grows past its cap", () => {
    it("keeps only the newest entries", () => {
      const root = scaffold();
      for (let i = 0; i < 9; i++) addButton(root, "Teclado")!.click();
      const entries = root.querySelectorAll("#log li");
      expect(entries).toHaveLength(5);
      expect(entries[0].textContent).toContain("notificación 9");
      expect(entries[4].textContent).toContain("notificación 5");
    });
  });

  describe("when two instances run side by side", () => {
    it("keeps each cart's state and register inside its own scope", () => {
      const first = scaffold();
      const second = scaffold();
      addButton(first, "Teclado")!.click();
      expect(first.querySelector("#total")?.textContent).toBe("$45");
      expect(first.querySelectorAll("#log li")).toHaveLength(1);
      expect(second.querySelector("#total")?.textContent).toBe("$0");
      expect(second.querySelectorAll("#log li")).toHaveLength(0);
    });
  });
});
