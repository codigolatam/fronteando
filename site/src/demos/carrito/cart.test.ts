// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { mountCart, mountCartWithQuantity, type ScopedDocument } from "./cart";

// The scaffold is the article's html block verbatim —the contract the
// program queries against— plus a document scoped to it, as the piece
// provides inside its shadow.
function scaffold(mount: (document: ScopedDocument) => void) {
  const root = document.createElement("div");
  root.innerHTML = `
    <ul id="catalogo"></ul>
    <h3>Tu carrito (<span id="contador">0</span>)</h3>
    <ul id="carrito"></ul>
    <p>Total: <span id="total">$0</span></p>
  `;
  mount({
    querySelector: (selector) => root.querySelector(selector),
    createElement: (tag) => document.createElement(tag),
  });
  return root;
}

function addButton(root: HTMLElement, nombre: string) {
  const li = [...root.querySelectorAll("#catalogo li")].find((el) =>
    el.textContent?.includes(nombre),
  );
  return li?.querySelector<HTMLButtonElement>("button") ?? null;
}

describe("mountCart", () => {
  describe("when it mounts", () => {
    it("renders the three catalog products with an Añadir button each", () => {
      const root = scaffold(mountCart);
      const items = root.querySelectorAll("#catalogo li");
      expect(items).toHaveLength(3);
      expect([...items].map((li) => li.textContent)).toEqual([
        expect.stringContaining("Teclado — $45"),
        expect.stringContaining("Ratón — $25"),
        expect.stringContaining("Monitor — $180"),
      ]);
      items.forEach((li) =>
        expect(li.querySelector("button")?.textContent).toBe("Añadir"),
      );
    });

    it("starts with an empty cart, a zero counter and a $0 total", () => {
      const root = scaffold(mountCart);
      expect(root.querySelectorAll("#carrito li")).toHaveLength(0);
      expect(root.querySelector("#contador")?.textContent).toBe("0");
      expect(root.querySelector("#total")?.textContent).toBe("$0");
    });
  });

  describe("when a product is added", () => {
    it("adds a line to the cart and updates the counter and total", () => {
      const root = scaffold(mountCart);
      addButton(root, "Teclado")!.click();
      const items = root.querySelectorAll("#carrito li");
      expect(items).toHaveLength(1);
      expect(items[0].textContent).toContain("Teclado x1 — $45");
      expect(root.querySelector("#contador")?.textContent).toBe("1");
      expect(root.querySelector("#total")?.textContent).toBe("$45");
    });
  });

  describe("when all three products are added", () => {
    it("accumulates the lines, counter and total the article describes", () => {
      const root = scaffold(mountCart);
      addButton(root, "Teclado")!.click();
      addButton(root, "Ratón")!.click();
      addButton(root, "Monitor")!.click();
      expect(root.querySelectorAll("#carrito li")).toHaveLength(3);
      expect(root.querySelector("#contador")?.textContent).toBe("3");
      expect(root.querySelector("#total")?.textContent).toBe("$250");
    });
  });

  describe("when an item is removed", () => {
    it("returns to an empty cart with zero counter and total", () => {
      const root = scaffold(mountCart);
      addButton(root, "Teclado")!.click();
      root.querySelector<HTMLElement>("#carrito li button")!.click();
      expect(root.querySelectorAll("#carrito li")).toHaveLength(0);
      expect(root.querySelector("#contador")?.textContent).toBe("0");
      expect(root.querySelector("#total")?.textContent).toBe("$0");
    });

    it("only discounts the removed line among several", () => {
      const root = scaffold(mountCart);
      addButton(root, "Teclado")!.click();
      addButton(root, "Monitor")!.click();
      const items = [...root.querySelectorAll("#carrito li")];
      items[0].querySelector<HTMLElement>("button")!.click();
      const remaining = root.querySelectorAll("#carrito li");
      expect(remaining).toHaveLength(1);
      expect(remaining[0].textContent).toContain("Monitor");
      expect(root.querySelector("#contador")?.textContent).toBe("1");
      expect(root.querySelector("#total")?.textContent).toBe("$180");
    });
  });

  describe("when two instances run side by side", () => {
    it("keeps each cart's state and nodes inside its own scope", () => {
      const first = scaffold(mountCart);
      const second = scaffold(mountCart);
      addButton(first, "Teclado")!.click();
      expect(first.querySelectorAll("#carrito li")).toHaveLength(1);
      expect(first.querySelector("#total")?.textContent).toBe("$45");
      expect(second.querySelectorAll("#carrito li")).toHaveLength(0);
      expect(second.querySelector("#total")?.textContent).toBe("$0");
    });
  });
});

describe("mountCartWithQuantity", () => {
  describe("when a quantity is edited", () => {
    it("recalculates the subtotal, the total and the counter", () => {
      const root = scaffold(mountCartWithQuantity);
      addButton(root, "Teclado")!.click();
      const item = root.querySelector("#carrito li")!;
      const input = item.querySelector("input")!;
      input.value = "3";
      input.dispatchEvent(new Event("change"));
      expect(item.querySelector(".subtotal")?.textContent).toBe("$135");
      expect(root.querySelector("#total")?.textContent).toBe("$135");
      expect(root.querySelector("#contador")?.textContent).toBe("3");
    });

    it("leaves the line's new «Quitar» button dead, as the article warns", () => {
      const root = scaffold(mountCartWithQuantity);
      addButton(root, "Teclado")!.click();
      const item = root.querySelector("#carrito li")!;
      const input = item.querySelector("input")!;
      input.value = "3";
      input.dispatchEvent(new Event("change"));
      // The rewritten innerHTML replaced the wired button with a fresh
      // one: clicking it does nothing —the bug, alive in the demo.
      item.querySelector<HTMLElement>("button")!.click();
      expect(item.parentElement?.id).toBe("carrito");
      expect(root.querySelectorAll("#carrito li")).toHaveLength(1);
    });

    it("lets an untouched line keep its working «Quitar»", () => {
      const root = scaffold(mountCartWithQuantity);
      addButton(root, "Teclado")!.click();
      addButton(root, "Monitor")!.click();
      const items = [...root.querySelectorAll("#carrito li")];
      const input = items[0].querySelector("input")!;
      input.value = "3";
      input.dispatchEvent(new Event("change"));
      items[1].querySelector<HTMLElement>("button")!.click();
      expect(root.querySelectorAll("#carrito li")).toHaveLength(1);
      expect(root.querySelector("#carrito li")!.textContent).toContain(
        "Teclado",
      );
    });
  });
});
