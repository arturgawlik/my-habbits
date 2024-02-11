const tempalte = document.createElement("template");
tempalte.innerHTML = `
  <style>
      :host {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
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
  <button></button>
`;

class Button extends HTMLElement {
  #text = "";
  #color = "primary";

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

  set color(color) {
    this.#color = color;
    if (this.shadowRoot) {
      this.#setColor(color);
    }
    if (this.getAttribute("color") !== color) {
      this.setAttribute("color", color);
    }
  }

  get color() {
    return this.#color;
  }

  static observedAttributes = ["text", "color"];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tempalte.content.cloneNode(true));
    if (this.#text) {
      this.#setText(this.#text);
    }
    if (this.#color) {
      this.#setColor(this.#color);
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
    if (name === "color") {
      if (newValue !== this.#color) {
        this.#color = newValue;
      }
    }
  }

  #setText(text) {
    const button = this.shadowRoot.querySelector("button");
    button.textContent = text;
  }
  #setColor(color) {
    const button = this.shadowRoot.querySelector("button");
    if (color === "primary") {
      button.style.backgroundColor = `var(--color-3)`;
    } else if (color === "secondary") {
      button.style.backgroundColor = `var(--color-4)`;
    } else {
      button.style.backgroundColor = color;
    }
  }
}

window.customElements.define("app-button", Button);
