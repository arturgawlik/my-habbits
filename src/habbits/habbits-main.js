import { getAllHabbits } from "./data-access/habbits.js";

export class HabbitsMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    getAllHabbits().then((habbits) => {
      const habbitsList = this.shadowRoot.querySelector("app-habbits-list");
      habbitsList.habbits = habbits;
    });
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbits-main", HabbitsMain);
