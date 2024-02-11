import { getAllHabbits } from "./data-access/habbits.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
      :host {
          display: flex;
          flex-direction: column;
          box-shadow: 2px 2px 2px var(--color-1);
          border-bottom: 1px solid black;
      }

  </style>
  <app-top-header title="My habbits"></app-top-header>
  <app-habbits-list></app-habbits-list>
  <app-bottom-button text="+ Add new +"></app-bottom-button>
`;

export class HabbitsMain extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    const habbits = await getAllHabbits();
    const habbitsList = this.shadowRoot.querySelector("app-habbits-list");
    habbitsList.habbits = habbits;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbits-main", HabbitsMain);
