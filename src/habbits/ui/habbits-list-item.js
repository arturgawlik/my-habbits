const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .card {
        padding: 10px;
        background-color: var(--color-3);
        color: black;
        border-radius: 10% / 50%;
        border: 1px solid black;
        text-align: center;
        font-weight: 100;
    }
    .name {
        font-size: 17px;
        font-weight: bold;
    }
</style>
<div class="card">
    <div>
        <p class="name"></p>
    </div>
</div>
`;

export class HabbitsListItem extends HTMLElement {
  #habbit = null;

  set habbit(habbit) {
    this.#habbit = habbit;
  }

  get habbit() {
    return this.#habbit;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    shadowRoot.querySelector(".name").innerText = this.#habbit.name;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbits-list-item", HabbitsListItem);
