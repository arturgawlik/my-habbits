const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
    }
   app-habbit-form {
    margin-bottom: 100px;
    margin-top: 100px;
   } 
  </style>
  <app-top-header title="Add/Edit habbit"></app-top-header>
  <app-habbit-form></app-habbit-form>
  <app-bottom-item>
    <app-button text="Cancel" color="secondary"></app-button>
    <app-button text="Save" color="primary"></app-button>
  </app-bottom-item>
`;

class AddEditHabbit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: "open",
    });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#listenCancelClick();
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #listenCancelClick() {
    const cancelButton = this.shadowRoot.querySelector(
      "app-button[color=secondary]"
    );
    cancelButton.addEventListener("click", () => {
      navigation.navigate("/");
    });
  }
}

window.customElements.define("app-add-edit-habbit", AddEditHabbit);
