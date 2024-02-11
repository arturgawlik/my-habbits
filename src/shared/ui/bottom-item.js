const tempalte = document.createElement("template");
tempalte.innerHTML = `
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
  </style>
  <div>
    <slot></slot>
  </div>
`;

class BottomItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tempalte.content.cloneNode(true));
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}
}

window.customElements.define("app-bottom-item", BottomItem);
