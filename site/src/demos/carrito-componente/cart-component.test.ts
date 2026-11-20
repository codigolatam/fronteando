// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { CartComponent } from "./cart-component";

// The chapter's fire test: two instances on the same page share
// nothing, and unmount tears the whole component down.
function hostInDocument() {
  const host = document.createElement("div");
  document.body.appendChild(host);
  return host;
}

function addButton(host: HTMLElement, name: string) {
  const li = [...host.querySelectorAll("li")].find((el) =>
    el.textContent?.includes(name),
  );
  return li?.querySelector<HTMLButtonElement>('[data-action="add"]') ?? null;
}

describe("CartComponent", () => {
  describe("when it mounts", () => {
    it("paints the empty cart on construct", () => {
      const host = hostInDocument();
      new CartComponent(host);
      expect(host.textContent).toContain("Tu carrito (0)");
      expect(host.textContent).toContain("Total: $0");
      expect(host.querySelectorAll('[data-action="add"]')).toHaveLength(3);
    });
  });

  describe("when two instances run side by side", () => {
    it("keeps each cart's state inside its own host", () => {
      const hostA = hostInDocument();
      const hostB = hostInDocument();
      new CartComponent(hostA);
      new CartComponent(hostB);
      addButton(hostA, "Teclado")!.click();
      addButton(hostA, "Monitor")!.click();
      expect(hostA.textContent).toContain("Tu carrito (2)");
      expect(hostA.textContent).toContain("Total: $225");
      expect(hostA.querySelectorAll('[data-action="remove"]')).toHaveLength(2);
      expect(hostB.textContent).toContain("Tu carrito (0)");
      expect(hostB.textContent).toContain("Total: $0");
      expect(hostB.querySelectorAll('[data-action="remove"]')).toHaveLength(0);
    });

    it("routes each click only to the instance that owns the host", () => {
      const hostA = hostInDocument();
      const hostB = hostInDocument();
      new CartComponent(hostA);
      new CartComponent(hostB);
      addButton(hostB, "Ratón")!.click();
      expect(hostB.textContent).toContain("Total: $25");
      expect(hostA.textContent).toContain("Total: $0");
    });
  });

  describe("when a product is removed", () => {
    it("repaints without the line", () => {
      const host = hostInDocument();
      new CartComponent(host);
      addButton(host, "Teclado")!.click();
      addButton(host, "Ratón")!.click();
      addButton(host, "Monitor")!.click();
      host.querySelector<HTMLElement>('[data-action="remove"]')!.click();
      expect(host.querySelectorAll('[data-action="remove"]')).toHaveLength(2);
      expect(host.textContent).toContain("Total: $205");
    });
  });

  describe("when it unmounts", () => {
    it("clears the host and stops repainting", () => {
      const host = hostInDocument();
      const app = new CartComponent(host);
      app.unmount();
      expect(host.innerHTML).toBe("");
      app.add({ id: 1, name: "Teclado", price: 45 });
      expect(host.innerHTML).toBe("");
    });

    it("still notifies subscribers after unmount", () => {
      const host = hostInDocument();
      const app = new CartComponent(host);
      app.unmount();
      const seen: number[] = [];
      app.subscribe((c) => seen.push(c.total));
      app.add({ id: 1, name: "Teclado", price: 45 });
      expect(seen).toEqual([45]);
    });

    it("lets subscribers unsubscribe through the returned function", () => {
      const host = hostInDocument();
      const app = new CartComponent(host);
      const seen: number[] = [];
      const off = app.subscribe((c) => seen.push(c.total));
      off();
      app.add({ id: 1, name: "Teclado", price: 45 });
      expect(seen).toEqual([]);
    });
  });
});
