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

type CartProduct = { id: number; name: string; price: number };
type CartLine = CartProduct & { quantity: number };

export function mountCart(document: ScopedDocument): void {
  const products: CartProduct[] = [
    { id: 1, name: "Teclado", price: 45 },
    { id: 2, name: "Ratón", price: 25 },
    { id: 3, name: "Monitor", price: 180 },
  ];
  const cart: CartLine[] = [];
  let total = 0;
  let units = 0;

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.name} — $${p.price} <button>Añadir</button>`;
    li.querySelector("button")!.addEventListener("click", () => {
      cart.push({ ...p, quantity: 1 });
      const item = document.createElement("li");
      item.innerHTML = `${p.name} x1 — $${p.price} <button>Quitar</button>`;
      item.querySelector("button")!.addEventListener("click", () => {
        item.remove();
        total -= p.price;
        units -= 1;
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#counter")!.textContent = `${units}`;
        cart.splice(cart.indexOf(cart.find((c) => c.id === p.id)!), 1);
      });
      document.querySelector("#cart")!.appendChild(item);
      total += p.price;
      units += 1;
      document.querySelector("#total")!.textContent = `$${total}`;
      document.querySelector("#counter")!.textContent = `${units}`;
    });
    document.querySelector("#catalog")!.appendChild(li);
  });
}

// The variant from «La petición más normal del mundo»: the same program
// with the quantity <input> per line —verbatim, bug included. Editing a
// quantity rewrites the <li>'s innerHTML, so the new «Quitar» and the
// new input are born without handlers.
export function mountCartWithQuantity(document: ScopedDocument): void {
  const products: CartProduct[] = [
    { id: 1, name: "Teclado", price: 45 },
    { id: 2, name: "Ratón", price: 25 },
    { id: 3, name: "Monitor", price: 180 },
  ];
  const cart: CartLine[] = [];
  let total = 0;
  let units = 0;

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.name} — $${p.price} <button>Añadir</button>`;
    li.querySelector("button")!.addEventListener("click", () => {
      cart.push({ ...p, quantity: 1 });
      const item = document.createElement("li");
      item.innerHTML = `${p.name}
        x<input type="number" value="1" min="1" aria-label="Cantidad">
        — <span class="subtotal">$${p.price}</span>
        <button>Quitar</button>`;
      item.querySelector("input")!.addEventListener("change", (e) => {
        const quantity = Number((e.target as HTMLInputElement).value);
        cart.find((c) => c.id === p.id)!.quantity = quantity;
        total = cart.reduce((s, c) => s + c.price * c.quantity, 0);
        units = cart.reduce((s, c) => s + c.quantity, 0);
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#counter")!.textContent = `${units}`;
        item.innerHTML = `${p.name}
          x<input type="number" value="${quantity}" min="1" aria-label="Cantidad">
          — <span class="subtotal">$${p.price * quantity}</span>
          <button>Quitar</button>`;
      });
      item.querySelector("button")!.addEventListener("click", () => {
        item.remove();
        total -= p.price;
        units -= 1;
        document.querySelector("#total")!.textContent = `$${total}`;
        document.querySelector("#counter")!.textContent = `${units}`;
        cart.splice(cart.indexOf(cart.find((c) => c.id === p.id)!), 1);
      });
      document.querySelector("#cart")!.appendChild(item);
      total += p.price;
      units += 1;
      document.querySelector("#total")!.textContent = `$${total}`;
      document.querySelector("#counter")!.textContent = `${units}`;
    });
    document.querySelector("#catalog")!.appendChild(li);
  });
}
