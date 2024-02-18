const template = document.createElement("template");
template.innerHTML = `
    <style>
        h1 {
          text-align: center;
          padding-top: 25px;
          padding-bottom: 25px;
          margin-top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          background-color: var(--color-1);
      }
    </style>
    <h1></h1>
`;

class TopHeader extends HTMLElement {
  #title = "";

  set title(title) {
    this.#title = title;
    if (this.shadowRoot) {
      this.#setTitle(title);
    }
    if (this.getAttribute("title") !== title) {
      this.setAttribute("title", title);
    }
  }
  get title() {
    return this.#title;
  }

  static observedAttributes = ["title"];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    if (this.#title) {
      this.#setTitle(this.#title);
    }
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      if (newValue !== this.#title) {
        this.title = newValue;
      }
    }
  }

  #setTitle(title) {
    this.shadowRoot.querySelector("h1").innerText = title;
  }
}

window.customElements.define("app-top-header", TopHeader);
