const template = document.createElement("template");
template.innerHTML = `
  <style>
      div {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--color-1);
      }
      button {
          background-color: var(--color-3);
          color: black;
          padding: 20px;
          width: 100%;
          margin: 10px;
          font-weight: bold;
          font-size: 17px;
          border-radius: 10% / 50%;
          box-shadow: 2px 2px 2px var(--color-2);
          border: 1px solid black;
      }
  </style>
  <div>
  <button>+ Add new +</button>
  </div>
`;

export class AddHabbitButton extends HTMLElement {
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

window.customElements.define("app-add-habbit-button", AddHabbitButton);
