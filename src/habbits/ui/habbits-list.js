export class HabbitsList extends HTMLElement {
  static get selector() {
    return "app-habbits-list";
  }

  static observedAttributes = ["habbits"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
            ${HabbitsList.selector} {
                display: flex;
                flex-direction: column;
                overflow-y: auto;
            }
            ${HabbitsList.selector} p {
                text-align: center;
                font-style: italic;
                color: #ffe5e59e;
                margin: -3px;
            }
            ${HabbitsList.selector} div {
                text-align: center;
                font-style: italic;
                color: #ffe5e59e;
                margin-top: 40px;
            }
        </style>
        <div></div>
    `;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {
    const habbits = JSON.parse(this.getAttribute("habbits"));
    if (habbits.length === 0) {
      const elem = this.createNoHabbitsFoundElement();
      this.querySelector("div").appendChild(elem);
    } else {
      for (const habbit of habbits) {
        const habbitElement = document.createElement("app-habbits-list-item");
        habbitElement.setAttribute("habbit", JSON.stringify(habbit));
        this.appendChild(habbitElement);
      }
    }
  }

  createNoHabbitsFoundElement() {
    const noHabbitsFound = document.createElement("p");
    noHabbitsFound.innerHTML = `
      <p>No habbits were found.</p>
      <p>Click <span>New habbit </span> button to add first one.</p>
    `;
    return noHabbitsFound;
  }

  createLoadingElement() {
    const loading = document.createElement("p");
    loading.textContent = "Loading...";
    return loading;
  }
}

window.customElements.define(HabbitsList.selector, HabbitsList);
