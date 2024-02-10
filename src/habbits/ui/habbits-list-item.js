export class HabbitsListItem extends HTMLElement {
  #habbit = null;

  set habbit(habbit) {
    this.#habbit = habbit;
    // this.shadowRoot.querySelector(".habbit-name").textContent = habbit.name;
  }

  get habbit() {
    return this.#habbit;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(
      document.getElementById("habbits-list-item-tmpl").content.cloneNode(true)
    );
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbits-list-item", HabbitsListItem);
