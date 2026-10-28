// The view refactor from «La vista como función del estado», verbatim:
// the model from «Sacar el estado del DOM», a `render` that regenerates
// all the markup and a `conectar` that re-wires the handlers after each
// repaint —run against a document scoped to the piece instead of the
// global one. The only addition is the live register: a second
// subscriber that logs every notification → repaint pair, capped so the
// list stays readable.

// The slice of Document the program touches: element lookups scoped to
// the piece's container plus createElement for the register entries.
export interface ScopedDocument {
  querySelector(selector: string): Element | null;
  createElement(tag: string): HTMLElement;
}

type CartProduct = { id: number; nombre: string; precio: number };
type CartLine = CartProduct & { linea: number; cantidad: number };

const MAX_ENTRIES = 8;

export function mountView(document: ScopedDocument): void {
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
      this.#lineas.push({
        linea: this.#siguienteId++,
        ...producto,
        cantidad: 1,
      });
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

  // Instrumentation, not part of the article listing: the model has no
  // idea this second subscriber exists, which is the point of suscribir.
  let notifications = 0;
  carrito.suscribir((c) => {
    notifications += 1;
    const li = document.createElement("li");
    li.textContent = `notificación ${notifications} → repintado: ${c.unidades} u / $${c.total}`;
    log.prepend(li);
    while (log.children.length > MAX_ENTRIES) log.lastElementChild!.remove();
  });

  actualizar();
}
