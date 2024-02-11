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
  <app-top-header></app-top-header>
  <app-habbit-form></app-habbit-form>
  <app-bottom-item>
    <button color="secondary" is="app-button">Cancel</button>
    <button color="primary" is="app-button" form="add-edit-habbit-form" type="submit">Save</button>
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
    this.#listenFormSubmit();
    this.#listenFormInput();
    const url = new URL(window.location.href);
    if (url.pathname.startsWith("/add-new-habbit")) {
      this.shadowRoot
        .querySelector("app-top-header")
        .setAttribute("title", "Add habbit");
    } else {
      this.shadowRoot
        .querySelector("app-top-header")
        .setAttribute("title", "Edit habbit");
    }
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #listenCancelClick() {
    const cancelButton = this.shadowRoot.querySelector(
      "button[color=secondary]"
    );
    cancelButton.addEventListener("click", () => {
      navigation.navigate("/");
    });
  }

  #listenFormSubmit() {
    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      // todo: save data
    });
  }

  #listenFormInput() {
    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("input", (event) => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      let name = data.name;
      if (name.length > 9) {
        name = name.substring(0, 8) + "...";
      }
      const url = new URL(window.location.href);
      if (url.pathname.startsWith("/add-new-habbit")) {
        this.shadowRoot
          .querySelector("app-top-header")
          .setAttribute("title", `Add ${name} habbit`);
      } else {
        this.shadowRoot
          .querySelector("app-top-header")
          .setAttribute("title", `Edit ${name} habbit`);
      }
    });
  }
}

window.customElements.define("app-add-edit-habbit", AddEditHabbit);
