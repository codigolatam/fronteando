// The cart program from «El carrito a lo bruto», verbatim: each mount
// function's body is the article's listing —or its quantity variant—
// run against a `document` scoped to the piece instead of the global
// one, so the demo never reaches outside its own frame. The only
// additions are the casts strict TypeScript requires and an invisible
// aria-label on the quantity input.

// The slice of Document the program touches: element lookups scoped to
// the piece's container plus createElement for the nodes it builds.
export interface ScopedDocument {
  querySelector(selector: string): Element | null;
  createElement(tag: string): HTMLElement;
}

type CartProduct = { id: number; nombre: string; precio: number };
type CartLine = CartProduct & { cantidad: number };

export function mountCart(document: ScopedDocument): void {
  const productos: CartProduct[] = [
    { id: 1, nombre: "Teclado", precio: 45 },
    { id: 2, nombre: "Ratón", precio: 25 },
    { id: 3, nombre: "Monitor", precio: 180 },
  ];
  const carrito: CartLine[] = [];
  let total = 0;
  let unidades = 0;

  productos.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nombre} — $${p.precio} <button>Añadir</button>`;
    li.querySelector("button")!.addEventListener("click", () => {
      carrito.push({ ...p, cantidad: 1 });
      const item = document.createElement("li");
      item.innerHTML = `${p.nombre} x1 — $${p.precio} <button>Quitar</button>`;
      item.querySelector("button")!.addEventListener("click", () => {
        item.remove();
        total -= p.precio;
        unidades -= 1;
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#contador")!.textContent = `${unidades}`;
        carrito.splice(carrito.indexOf(carrito.find((c) => c.id === p.id)!), 1);
      });
      document.querySelector("#carrito")!.appendChild(item);
      total += p.precio;
      unidades += 1;
      document.querySelector("#total")!.textContent = `$${total}`;
      document.querySelector("#contador")!.textContent = `${unidades}`;
    });
    document.querySelector("#catalogo")!.appendChild(li);
  });
}

// The variant from «La petición más normal del mundo»: the same program
// with the quantity <input> per line —verbatim, bug included. Editing a
// quantity rewrites the <li>'s innerHTML, so the new «Quitar» and the
// new input are born without handlers.
export function mountCartWithQuantity(document: ScopedDocument): void {
  const productos: CartProduct[] = [
    { id: 1, nombre: "Teclado", precio: 45 },
    { id: 2, nombre: "Ratón", precio: 25 },
    { id: 3, nombre: "Monitor", precio: 180 },
  ];
  const carrito: CartLine[] = [];
  let total = 0;
  let unidades = 0;

  productos.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nombre} — $${p.precio} <button>Añadir</button>`;
    li.querySelector("button")!.addEventListener("click", () => {
      carrito.push({ ...p, cantidad: 1 });
      const item = document.createElement("li");
      item.innerHTML = `${p.nombre}
        x<input type="number" value="1" min="1" aria-label="Cantidad">
        — <span class="subtotal">$${p.precio}</span>
        <button>Quitar</button>`;
      item.querySelector("input")!.addEventListener("change", (e) => {
        const cantidad = Number((e.target as HTMLInputElement).value);
        carrito.find((c) => c.id === p.id)!.cantidad = cantidad;
        total = carrito.reduce((s, c) => s + c.precio * c.cantidad, 0);
        unidades = carrito.reduce((s, c) => s + c.cantidad, 0);
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#contador")!.textContent = `${unidades}`;
        item.innerHTML = `${p.nombre}
          x<input type="number" value="${cantidad}" min="1" aria-label="Cantidad">
          — <span class="subtotal">$${p.precio * cantidad}</span>
          <button>Quitar</button>`;
      });
      item.querySelector("button")!.addEventListener("click", () => {
        item.remove();
        total -= p.precio;
        unidades -= 1;
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#contador")!.textContent = `${unidades}`;
        carrito.splice(carrito.indexOf(carrito.find((c) => c.id === p.id)!), 1);
      });
      document.querySelector("#carrito")!.appendChild(item);
      total += p.precio;
      unidades += 1;
      document.querySelector("#total")!.textContent = `$${total}`;
      document.querySelector("#contador")!.textContent = `${unidades}`;
    });
    document.querySelector("#catalogo")!.appendChild(li);
  });
}
