import {
  getHabbit,
  addHabbit,
  updateHabbit,
} from "../shared/data-access/habbits.js";

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

  async connectedCallback() {
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
    } else if (url.pathname.startsWith("/habbits")) {
      const id = url.pathname.split("/")[2];
      const habbit = await getHabbit(Number(id));
      this.shadowRoot.querySelector("app-habbit-form").habbit = habbit;
      this.shadowRoot
        .querySelector("app-top-header")
        .setAttribute("title", `Edit ${getTruncatedText(habbit.name)} habbit`);
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
      // transform form data to object (but handle case where there is multiple notificationTime inputs)
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const notificationTimes = Array.from(
        formData.getAll("notificationTimes")
      ).filter((time) => time);
      data.notificationTimes = notificationTimes;
      if (data.id) {
        data.id = Number(data.id);
        updateHabbit(data).then(() => {
          navigation.navigate("/");
        });
      } else {
        delete data.id;
        addHabbit(data).then(() => {
          navigation.navigate("/");
        });
      }
    });
  }

  #listenFormInput() {
    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("input", (event) => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      let name = getTruncatedText(data.name);
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

function getTruncatedText(text) {
  return text.length > 9 ? text.substring(0, 8) + "..." : text;
}

window.customElements.define("app-add-edit-habbit", AddEditHabbit);
