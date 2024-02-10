const template = document.createElement("template");
template.innerHTML = `
  <style>
      :host {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
      }
  </style>
`;

export class HabbitsList extends HTMLElement {
  #habbits = [];

  set habbits(habbits) {
    this.#habbits = habbits;
    this.shadowRoot
      .querySelectorAll("app-habbits-list-item")
      .forEach((item) => {
        item.remove();
      });

    if (!habbits || habbits.length === 0) {
    }

    for (const habbit of habbits) {
      const habbitListItem = document.createElement("app-habbits-list-item");
      habbitListItem.habbit = habbit;
      this.shadowRoot.appendChild(habbitListItem);
    }
  }

  get habbits() {
    return this.#habbits;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbits-list", HabbitsList);
