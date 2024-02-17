const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
    a {
        text-decoration: none;
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
        margin-bottom: 0;
    }
    .description {
        margin-top: 0;
        font-size: 14px;
        font-weight: 100;
    }
</style>
<a>
  <div class="card">
      <div>
          <p class="name"></p>
          <p class="description"></p>
      </div>
  </div>
</a>
`;

class HabbitsListItem extends HTMLElement {
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
    this.#setName(this.#habbit.name);
    this.#setDescription(this.#habbit.description);
    this.#setHref(`/habbits/${this.#habbit.id}`);
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #setName(name) {
    this.shadowRoot.querySelector(".name").innerText = name;
  }

  #setDescription(description) {
    this.shadowRoot.querySelector(".description").innerText = description;
  }

  #setHref(href) {
    this.shadowRoot.querySelector("a").href = href;
  }
}

window.customElements.define("app-habbits-list-item", HabbitsListItem);
