export class HabbitsList extends HTMLElement {
  static get selector() {
    return "app-habbits-list";
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
            ${HabbitsList.selector} p {
                text-align: center;
                font-style: italic;
                color: #ffe5e59e;
            }
        </style>
    `;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #createNoHabbitsFoundElement() {
    const noHabbitsFound = document.createElement("p");
    noHabbitsFound.textContent = "-- no habbits found --";
    return noHabbitsFound;
  }

  #createLoadingElement() {
    const loading = document.createElement("p");
    loading.textContent = "Loading...";
    return loading;
  }
}
