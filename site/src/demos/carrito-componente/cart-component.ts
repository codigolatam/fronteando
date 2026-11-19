// The packaged cart from the MVC series coda, verbatim: model, view
// and controller absorbed as methods of one class —each keeping its
// role— with per-instance state and a mount/unmount lifecycle.

type CartProduct = { id: number; name: string; price: number };
type CartLine = CartProduct & { line: number; quantity: number };

const products: CartProduct[] = [
  { id: 1, name: "Teclado", price: 45 },
  { id: 2, name: "Ratón", price: 25 },
  { id: 3, name: "Monitor", price: 180 },
];

export class CartComponent {
  #lines: CartLine[] = [];
  #nextId = 1;
  #subscribers: ((c: CartComponent) => void)[] = [];
  #host: HTMLElement;
  #unsubscribeRender: () => void;

  constructor(host: HTMLElement) {
    this.#host = host;
    this.#host.addEventListener("click", this.#onClick);
    this.#unsubscribeRender = this.subscribe(() => this.#render());
    this.#render();
  }

  // the model
  subscribe(fn: (c: CartComponent) => void) {
    this.#subscribers.push(fn);
    return () => {
      this.#subscribers = this.#subscribers.filter((s) => s !== fn);
    };
  }

  #notify() {
    for (const fn of this.#subscribers) fn(this);
  }

  get lines() {
    return this.#lines.map((l) => ({ ...l }));
  }

  get units() {
    return this.#lines.reduce((sum, l) => sum + l.quantity, 0);
  }

  get total() {
    return this.#lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  }

  add(product: CartProduct) {
    this.#lines.push({ line: this.#nextId++, ...product, quantity: 1 });
    this.#notify();
  }

  remove(line: number) {
    this.#lines = this.#lines.filter((l) => l.line !== line);
    this.#notify();
  }

  // the view
  #render() {
    this.#host.innerHTML = `
      <ul>
        ${products
          .map(
            (p) =>
              `<li>${p.name} — $${p.price} <button data-action="add" data-id="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (${this.units})</h3>
      <ul>
        ${this.#lines
          .map(
            (l) =>
              `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-action="remove" data-line="${l.line}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: $${this.total}</p>`;
  }

  // the controller
  #onClick = (e: Event) => {
    const button = (e.target as Element).closest(
      "[data-action]",
    ) as HTMLElement;
    if (!button) return;
    const actions: Record<string, () => void> = {
      add: () =>
        this.add(products.find((p) => p.id === Number(button.dataset.id))!),
      remove: () => this.remove(Number(button.dataset.line)),
    };
    actions[button.dataset.action!]?.();
  };

  unmount() {
    this.#host.removeEventListener("click", this.#onClick);
    this.#unsubscribeRender();
    this.#host.innerHTML = "";
  }
}
