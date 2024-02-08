export class HabbitsListItem extends HTMLElement {
  static get selector() {
    return "app-habbits-list-item";
  }

  static observedAttributes = ["habbit"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
             .card, .name, .description {
                background-color: #EEC759;
            }
            ${HabbitsListItem.selector} .card {
                padding: 20px;
                background-color: #EEC759;
            }
        </style>
        <div class="card">
            <div>
              <div class="name">
                Napić się wody
              </div>
              <div class="description">
                <p>Wypij 2 szklanki wody</p>
              </div>
            </div>
        </div>
    `;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {
    const habbit = JSON.parse(this.getAttribute("habbit"));
    this.innerHTML = `
      <p>${habbit.name}</p>
    `;
  }

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

window.customElements.define(HabbitsListItem.selector, HabbitsListItem);
