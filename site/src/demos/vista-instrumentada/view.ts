// The cart view programs from the MVC series, verbatim: the chapter-3
// listing (render + conectar, run with no modo) and the chapter-4 one
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

type CartProduct = { id: number; nombre: string; precio: number };
type CartLine = CartProduct & { linea: number; cantidad: number };

const MAX_ENTRIES = 5;

class Carrito {
  #lineas: CartLine[] = [];
  #siguienteId = 1;
  #suscriptores: ((c: Carrito) => void)[] = [];

  suscribir(fn: (c: Carrito) => void) {
    this.#suscriptores.push(fn);
  }

  #notificar() {
    for (const fn of this.#suscriptores) fn(this);
  }

  get lineas() {
    return this.#lineas.map((l) => ({ ...l }));
  }

  get unidades() {
    return this.#lineas.reduce((suma, l) => suma + l.cantidad, 0);
  }

  get total() {
    return this.#lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0);
  }

  agregar(producto: CartProduct) {
    this.#lineas.push({ linea: this.#siguienteId++, ...producto, cantidad: 1 });
    this.#notificar();
  }

  quitar(linea: number) {
    this.#lineas = this.#lineas.filter((l) => l.linea !== linea);
    this.#notificar();
  }
}

const productos: CartProduct[] = [
  { id: 1, nombre: "Teclado", precio: 45 },
  { id: 2, nombre: "Ratón", precio: 25 },
  { id: 3, nombre: "Monitor", precio: 180 },
];

function cap(log: Element) {
  while (log.children.length > MAX_ENTRIES) log.lastElementChild!.remove();
}

// Chapter 3: render + per-button re-wiring after each repaint, logging
// every notification → repaint pair.
function mountChapter3(document: ScopedDocument): void {
  const host = document.querySelector("#carrito-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(modelo: Carrito) {
    host.innerHTML = `
      <ul id="catalogo">
        ${productos
          .map(
            (p) =>
              `<li>${p.nombre} — $${p.precio} <button data-agregar="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="contador">${modelo.unidades}</span>)</h3>
      <ul id="carrito">
        ${modelo.lineas
          .map(
            (l) =>
              `<li>${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} <button data-quitar="${l.linea}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${modelo.total}</span></p>`;
  }

  function conectar(modelo: Carrito) {
    for (const b of host.querySelectorAll<HTMLElement>("[data-agregar]"))
      b.addEventListener("click", () =>
        modelo.agregar(
          productos.find((p) => p.id === Number(b.dataset.agregar))!,
        ),
      );
    for (const b of host.querySelectorAll<HTMLElement>("[data-quitar]"))
      b.addEventListener("click", () =>
        modelo.quitar(Number(b.dataset.quitar)),
      );
  }

  const carrito = new Carrito();
  const actualizar = () => {
    render(carrito);
    conectar(carrito);
  };
  carrito.suscribir(actualizar);

  let notifications = 0;
  carrito.suscribir((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = `notificación ${notifications} → repintado: ${c.unidades} u / $${c.total}`;
    log.prepend(li);
    cap(log);
  });

  actualizar();
}

// Chapter 4: buttons declare intent, a delegated listener on the host
// translates clicks to actions —and the register logs the whole cycle.
function mountChapter4(document: ScopedDocument): void {
  const host = document.querySelector("#carrito-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(modelo: Carrito) {
    host.innerHTML = `
      <ul id="catalogo">
        ${productos
          .map(
            (p) =>
              `<li>${p.nombre} — $${p.precio} <button data-accion="agregar" data-id="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="contador">${modelo.unidades}</span>)</h3>
      <ul id="carrito">
        ${modelo.lineas
          .map(
            (l) =>
              `<li>${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} <button data-accion="quitar" data-linea="${l.linea}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${modelo.total}</span></p>`;
  }

  const carrito = new Carrito();
  carrito.suscribir(() => render(carrito));

  // Instrumentation listener, registered first: it only remembers which
  // action the click meant so the register can name it.
  let pendingAction: string | null = null;
  host.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-accion]");
    if (b) pendingAction = (b as HTMLElement).dataset.accion ?? null;
  });

  host.addEventListener("click", (e) => {
    const boton = (e.target as Element).closest("[data-accion]") as HTMLElement;
    if (!boton) return;
    const acciones: Record<string, () => void> = {
      agregar: () =>
        carrito.agregar(
          productos.find((p) => p.id === Number(boton.dataset.id))!,
        ),
      quitar: () => carrito.quitar(Number(boton.dataset.linea)),
    };
    acciones[boton.dataset.accion!]?.();
  });

  let notifications = 0;
  carrito.suscribir((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = `clic → acción ${pendingAction} → notificación ${notifications} → repintado: ${c.unidades} u / $${c.total}`;
    pendingAction = null;
    log.prepend(li);
    cap(log);
  });

  render(carrito);
}

// Chapter 5: the same delegated program with a business rule as one
// more subscriber —when the total reaches $200 it mutates the model
// inside the notification, and the register marks the nested repaint.
function mountChapter5(document: ScopedDocument): void {
  const host = document.querySelector("#carrito-app") as HTMLElement;
  const log = document.querySelector("#log")!;

  function render(modelo: Carrito) {
    host.innerHTML = `
      <ul id="catalogo">
        ${productos
          .map(
            (p) =>
              `<li>${p.nombre} — $${p.precio} <button data-accion="agregar" data-id="${p.id}">Añadir</button></li>`,
          )
          .join("")}
      </ul>
      <h3>Tu carrito (<span id="contador">${modelo.unidades}</span>)</h3>
      <ul id="carrito">
        ${modelo.lineas
          .map(
            (l) =>
              `<li>${l.nombre} x${l.cantidad} — $${l.precio * l.cantidad} <button data-accion="quitar" data-linea="${l.linea}">Quitar</button></li>`,
          )
          .join("")}
      </ul>
      <p>Total: <span id="total">$${modelo.total}</span></p>`;
  }

  const carrito = new Carrito();
  carrito.suscribir(() => render(carrito));

  let pendingAction: string | null = null;
  host.addEventListener("click", (e) => {
    const b = (e.target as Element).closest("[data-accion]");
    if (b) pendingAction = (b as HTMLElement).dataset.accion ?? null;
  });

  host.addEventListener("click", (e) => {
    const boton = (e.target as Element).closest("[data-accion]") as HTMLElement;
    if (!boton) return;
    const acciones: Record<string, () => void> = {
      agregar: () =>
        carrito.agregar(
          productos.find((p) => p.id === Number(boton.dataset.id))!,
        ),
      quitar: () => carrito.quitar(Number(boton.dataset.linea)),
    };
    acciones[boton.dataset.accion!]?.();
  });

  // The register subscribes before the rule, so the outer notification
  // is logged first and the nested repaint arrives marked as nested.
  let notifications = 0;
  carrito.suscribir((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = enRegla
      ? `regla → acción regalo → notificación ${notifications} (anidada) → repintado: ${c.unidades} u / $${c.total}`
      : `clic → acción ${pendingAction} → notificación ${notifications} → repintado: ${c.unidades} u / $${c.total}`;
    pendingAction = null;
    log.prepend(li);
    cap(log);
  });

  // The stress rule: gift when the total reaches $200 —a subscriber
  // that mutates the model inside the notification it is handling.
  let regaloDado = false;
  let enRegla = false;
  carrito.suscribir((c) => {
    if (!regaloDado && c.total >= 200) {
      regaloDado = true;
      enRegla = true;
      c.agregar({ id: 99, nombre: "Regalo", precio: 0 });
      enRegla = false;
    }
  });

  render(carrito);
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
