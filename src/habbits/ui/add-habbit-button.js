export class AddHabbitButton extends HTMLElement {
  static get selector() {
    return "app-add-habbit-button";
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
            ${AddHabbitButton.selector} div {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100vw;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            ${AddHabbitButton.selector} button {
              background-color: #FFEBD8;
              color: black;
              padding: 20px;
              width: 100%;
              margin: 10px;
              font-weight: bold;
              font-size: 17px;
            }
        </style>
        <div>
          <button>New habbit</button>
        </div>
    `;
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}
