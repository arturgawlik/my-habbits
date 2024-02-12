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
      app-habbit-form .notyfication-times {
        display: flex;
        gap: 1rem;
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
        <label class="notyfication-times">
            Notification time's
            <input type="time" name="notificationTimes" />
        </label>
    </form>
`;

const notificationTimeInput = template.content.querySelector(
  'input[name="notificationTimes"]'
);

class HabbitForm extends HTMLElement {
  #habbit = null;
  set habbit(habbit) {
    this.#habbit = habbit;
    this.#fillFormWithHabbitData();
  }
  get habbit() {
    return this.#habbit;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.#manageNotificationTimes();
  }

  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback() {}

  #fillFormWithHabbitData() {
    if (this.#habbit) {
      this.querySelector("input[name=id]").value = this.#habbit.id;
      this.querySelector("input[name=name]").value = this.#habbit.name;
      this.querySelector("input[name=description]").value =
        this.#habbit.description;
      this.#habbit.notificationTimes.forEach((time, i) => {
        let newInput = null;
        if (i === 0) {
          newInput = this.querySelector('input[name="notificationTimes"]');
        } else {
          newInput = this.#addNewNotificationTimeInput();
        }
        newInput.value = time;
      });
      this.#addNewNotificationTimeInput();
    }
  }

  #manageNotificationTimes() {
    this.querySelector(".notyfication-times").addEventListener("input", (e) => {
      if (this.#allNotificationTimesHasValue()) {
        this.#addNewNotificationTimeInput();
      }
      this.#removeEmptyNotificationTimeInputsButLeaveOneEmpty();
    });
  }

  #allNotificationTimesHasValue() {
    const notificationTimes = this.querySelectorAll(
      'input[name="notificationTimes"]'
    );
    return Array.from(notificationTimes).every((input) => input.value);
  }

  #addNewNotificationTimeInput() {
    const newInput = notificationTimeInput.cloneNode(true);
    this.querySelector(".notyfication-times").appendChild(newInput);
    return newInput;
  }

  #removeEmptyNotificationTimeInputsButLeaveOneEmpty() {
    const notificationTimes = this.querySelectorAll(
      'input[name="notificationTimes"]'
    );
    const emptyInputs = Array.from(notificationTimes).filter(
      (input) => !input.value
    );
    if (emptyInputs.length > 1) {
      emptyInputs.slice(0, -1).forEach((input) => input.remove());
    }
  }
}

window.customElements.define("app-habbit-form", HabbitForm);
