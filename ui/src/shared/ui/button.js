const template = document.createElement("template");
template.innerHTML = `
  <style>
      button[is="app-button"]  {
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
`;

class Button extends HTMLButtonElement {
  #color = "primary";

  set color(color) {
    this.#color = color;
    if (this.querySelector("button")) {
      this.#setColor(color);
    }
    if (this.getAttribute("color") !== color) {
      this.setAttribute("color", color);
    }
  }

  get color() {
    return this.#color;
  }

  static observedAttributes = ["color"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    if (this.#color) {
      this.#setColor(this.#color);
    }
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "color") {
      if (newValue !== this.#color) {
        this.#color = newValue;
      }
    }
  }

  #setColor(color) {
    if (color === "primary") {
      this.style.backgroundColor = `var(--color-3)`;
    } else if (color === "secondary") {
      this.style.backgroundColor = `var(--color-4)`;
    } else {
      this.style.backgroundColor = color;
    }
  }
}

window.customElements.define("app-button", Button, { extends: "button" });
