import { getAllHabbits } from "./data-access/habbits.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
      :host {
          display: flex;
          flex-direction: column;
      }
      h1 {
          text-align: center;
          margin-top: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  </style>
  <h1>Checkout your habbits</h1>
  <app-habbits-list></app-habbits-list>
  <app-add-habbit-button></app-add-habbit-button>
`;

export class HabbitsMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
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
