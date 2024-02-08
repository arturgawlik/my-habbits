import { getAllHabbits } from "./data-access/habbits.js";
import { HabbitsList } from "./ui/habbits-list.js";

export class HabbitsMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    getAllHabbits().then((habbits) => {
      const habbitsListElement = this.#getHabbitsListElement();
      habbitsListElement.setAttribute("habbits", JSON.stringify(habbits));
    });
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #getHabbitsListElement() {
    return this.querySelector(HabbitsList.selector);
  }
}

window.customElements.define(HabbitsMain.selector, HabbitsMain);
