const template = document.createElement("template");
template.innerHTML = `
    <style>
      app-habbit-form .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      app-habbit-form .form > * {
        width: 100%;
      }
      app-habbit-form label {
        display: flex;
        flex-direction: column;
      }
      app-habbit-form input {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: var(--color-4);
      }
    </style>
    <form class="form" id="add-edit-habbit-form">
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
            <input type="time" name="notificationTime" />
        </label>
    </form>
`;

class HabbitForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}
}

window.customElements.define("app-habbit-form", HabbitForm);
