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
      }
        input {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: var(--color-4);
        }
    </style>
    <form class="form">
        <input type="hidden" name="id" />
        <label>
            Name *
            <input type="text" name="name" required/>
        </label>
        <label>
            Description *
            <input name="description" required/>
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
