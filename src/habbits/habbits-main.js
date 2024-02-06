import { getAllHabbits } from "./data-access/index.js";
import { HabbitsList } from "./ui/habbits-list.js";

export class HabbitsMain extends HTMLElement {
  static get selector() {
    return "app-habbits-main";
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
            ${HabbitsMain.selector} h2 {
                text-align: center;
                margin-top: 150px;
            }
        </style>
        <h2>Checkout your habbits</h2>
        <app-habbits-list></app-habbits-list>
        <app-add-habbit-button></app-add-habbit-button>
    `;

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
