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
      button {
          background-color: var(--color-3);
          color: black;
          padding: 20px;
          width: 100%;
          margin: 20px 10px;
          font-weight: bold;
          font-size: 17px;
          border-radius: 10% / 50%;
          box-shadow: 2px 2px 2px var(--color-2);
          border: 1px solid black;
      }
  </style>
  <div>
  <button></button>
  </div>
`;

export class BottomButton extends HTMLElement {
  #text = "";

  set text(text) {
    this.#text = text;
    if (this.shadowRoot) {
      this.#setText(text);
    }
    if (this.getAttribute("text") !== text) {
      this.setAttribute("text", text);
    }
  }

  get text() {
    return this.#text;
  }

  static observedAttributes = ["text"];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tempalte.content.cloneNode(true));
    if (this.#text) {
      this.#setText(this.#text);
    }
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      if (newValue !== this.#text) {
        this.#text = newValue;
      }
    }
  }

  #setText(text) {
    const button = this.shadowRoot.querySelector("button");
    button.textContent = text;
  }
}

window.customElements.define("app-bottom-button", BottomButton);
