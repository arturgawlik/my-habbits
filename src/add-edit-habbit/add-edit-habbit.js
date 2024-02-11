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
  <app-top-header title="Add/Edit habbit"></app-top-header>
  
  <app-bottom-button text="Add/Update"></app-bottom-button>
`;

class AddEditHabbit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: "open",
    });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-add-edit-habbit", AddEditHabbit);
