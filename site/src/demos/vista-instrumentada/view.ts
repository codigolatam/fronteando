// The cart view programs from the MVC series, verbatim: the chapter-3
// listing (render + connect, run with no modo) and the chapter-4 one
// (delegated controller, run with modo="controlador") —each against a
// document scoped to the piece instead of the global one. The only
// addition is the live register: subscribers that log the cycle they
// make visible, capped so the list stays readable.

// The slice of Document the programs touch: element lookups scoped to
// the piece's container plus createElement for the register entries.
export interface ScopedDocument {
  querySelector(selector: string): Element | null;
  createElement(tag: string): HTMLElement;
}

type CartProduct = { id: number; name: string; price: number };
type CartLine = CartProduct & { line: number; quantity: number };

const MAX_ENTRIES = 5;

class Cart {
  #lines: CartLine[] = [];
  #nextId = 1;
  #subscribers: ((c: Cart) => void)[] = [];

  subscribe(fn: (c: Cart) => void) {
    this.#subscribers.push(fn);
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
}

const products: CartProduct[] = [
  { id: 1, name: "Teclado", price: 45 },
  { id: 2, name: "Ratón", price: 25 },
  { id: 3, name: "Monitor", price: 180 },
];

function cap(log: Element) {
  while (log.children.length > MAX_ENTRIES) log.lastElementChild!.remove();
}

// Chapter 3: render + per-button re-wiring after each repaint, logging
// every notification → repaint pair.
function mountChapter3(document: ScopedDocument): void {
  const host = document.querySelector("#cart-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(model: Cart) {
    host.innerHTML = `
      <ul id="catalog">
        ${products
          .map(
            (p) =>
              `<li>${p.name} — $${p.price} <button data-add="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="counter">${model.units}</span>)</h3>
      <ul id="cart">
        ${model.lines
          .map(
            (l) =>
              `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-remove="${l.line}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${model.total}</span></p>`;
  }

  function connect(model: Cart) {
    for (const b of host.querySelectorAll<HTMLElement>("[data-add]"))
      b.addEventListener("click", () =>
        model.add(products.find((p) => p.id === Number(b.dataset.add))!),
      );
    for (const b of host.querySelectorAll<HTMLElement>("[data-remove]"))
      b.addEventListener("click", () => model.remove(Number(b.dataset.remove)));
  }

  const cart = new Cart();
  const update = () => {
    render(cart);
    connect(cart);
  };
  cart.subscribe(update);

  let notifications = 0;
  cart.subscribe((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = `notificación ${notifications} → repintado: ${c.units} u / $${c.total}`;
    log.prepend(li);
    cap(log);
  });

  update();
}

// Chapter 4: buttons declare intent, a delegated listener on the host
// translates clicks to actions —and the register logs the whole cycle.
function mountChapter4(document: ScopedDocument): void {
  const host = document.querySelector("#cart-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(model: Cart) {
    host.innerHTML = `
      <ul id="catalog">
        ${products
          .map(
            (p) =>
              `<li>${p.name} — $${p.price} <button data-action="add" data-id="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="counter">${model.units}</span>)</h3>
      <ul id="cart">
        ${model.lines
          .map(
            (l) =>
              `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-action="remove" data-line="${l.line}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${model.total}</span></p>`;
  }

  const cart = new Cart();
  cart.subscribe(() => render(cart));

  // Instrumentation listener, registered first: it only remembers which
  // action the click meant so the register can name it.
  let pendingAction: string | null = null;
  host.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-action]");
    if (b) pendingAction = (b as HTMLElement).dataset.action ?? null;
  });

  host.addEventListener("click", (e) => {
    const button = (e.target as Element).closest(
      "[data-action]",
    ) as HTMLElement;
    if (!button) return;
    const actions: Record<string, () => void> = {
      add: () =>
        cart.add(products.find((p) => p.id === Number(button.dataset.id))!),
      remove: () => cart.remove(Number(button.dataset.line)),
    };
    actions[button.dataset.action!]?.();
  });

  let notifications = 0;
  cart.subscribe((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = `clic → acción ${pendingAction} → notificación ${notifications} → repintado: ${c.units} u / $${c.total}`;
    pendingAction = null;
    log.prepend(li);
    cap(log);
  });

  render(cart);
}

// Chapter 5: the same delegated program with a business rule as one
// more subscriber —when the total reaches $200 it mutates the model
// inside the notification, and the register marks the nested repaint.
function mountChapter5(document: ScopedDocument): void {
  const host = document.querySelector("#cart-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(model: Cart) {
    host.innerHTML = `
      <ul id="catalog">
        ${products
          .map(
            (p) =>
              `<li>${p.name} — $${p.price} <button data-action="add" data-id="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="counter">${model.units}</span>)</h3>
      <ul id="cart">
        ${model.lines
          .map(
            (l) =>
              `<li>${l.name} x${l.quantity} — $${l.price * l.quantity} <button data-action="remove" data-line="${l.line}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${model.total}</span></p>`;
  }

  const cart = new Cart();
  cart.subscribe(() => render(cart));

  let pendingAction: string | null = null;
  host.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-action]");
    if (b) pendingAction = (b as HTMLElement).dataset.action ?? null;
  });

  host.addEventListener("click", (e) => {
    const button = (e.target as Element).closest(
      "[data-action]",
    ) as HTMLElement;
    if (!button) return;
    const actions: Record<string, () => void> = {
      add: () =>
        cart.add(products.find((p) => p.id === Number(button.dataset.id))!),
      remove: () => cart.remove(Number(button.dataset.line)),
    };
    actions[button.dataset.action!]?.();
  });

  // The register subscribes before the rule, so the outer notification
  // is logged first and the nested repaint arrives marked as nested.
  let notifications = 0;
  cart.subscribe((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = inRule
      ? `regla → acción gift → notificación ${notifications} (anidada) → repintado: ${c.units} u / $${c.total}`
      : `clic → acción ${pendingAction} → notificación ${notifications} → repintado: ${c.units} u / $${c.total}`;
    pendingAction = null;
    log.prepend(li);
    cap(log);
  });

  // The stress rule: gift when the total reaches $200 —a subscriber
  // that mutates the model inside the notification it is handling.
  let giftGiven = false;
  let inRule = false;
  cart.subscribe((c) => {
    if (!giftGiven && c.total >= 200) {
      giftGiven = true;
      inRule = true;
      c.add({ id: 99, name: "Regalo", price: 0 });
      inRule = false;
    }
  });

  render(cart);
}

export function mountView(document: ScopedDocument, modo = ""): void {
  if (modo === "limites") {
    mountChapter5(document);
  } else if (modo === "controlador") {
    mountChapter4(document);
  } else {
    mountChapter3(document);
  }
}
