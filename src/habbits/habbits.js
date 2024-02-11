import { getAllHabbits } from "./data-access/habbits.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
      :host {
          display: flex;
          flex-direction: column;
      }

  </style>
  <app-top-header title="My habbits"></app-top-header>
  <app-habbits-list></app-habbits-list>
  <app-bottom-item>
    <app-button text="+ Add new +" color="secondary"></app-button>
  </app-bottom-item>
`;

class HabbitsMain extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    const habbits = await getAllHabbits();
    const habbitsList = this.shadowRoot.querySelector("app-habbits-list");
    habbitsList.habbits = habbits;

    this.#addAddNewHabbitButtonListener();
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #addAddNewHabbitButtonListener() {
    const addNewHabbitButton = this.shadowRoot.querySelector("app-button");
    addNewHabbitButton.addEventListener("click", () => {
      navigation.navigate("add-new-habbit");
    });
  }
}

window.customElements.define("app-habbits-main", HabbitsMain);
