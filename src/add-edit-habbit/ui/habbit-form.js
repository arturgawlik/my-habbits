const template = document.createElement("template");
template.innerHTML = `
    <style>
      .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .form > * {
        width: 100%;
      }
      label {
        display: flex;
        flex-direction: column;
        /* gap: 0.5rem; */
      }
    </style>
    <form class="form">
        <label>
            Name
            <input type="text" name="name" />
        </label>
        <label>
            Description
            <input name="description" />
        </label>
        <label>
            Notification time
            <input type="time" name="notification-time" />
        </label>
    </form>
`;

class HabbitForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: "open",
    });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbit-form", HabbitForm);
