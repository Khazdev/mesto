export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState(saveButton, inputList) {
    const isFormValid = inputList.every((inputElement) => inputElement.validity.valid);

    if (isFormValid) {
      saveButton.classList.remove(this._settings.inactiveButtonClass);
      saveButton.disabled = false;
    } else {
      this._disableButton(saveButton);
    }
  }

  _disableButton(button) {
    button.classList.add(this._settings.inactiveButtonClass);
    button.disabled = true;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const saveButton = this._formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState(saveButton, inputList);

    this._formElement.addEventListener('reset', () => {
      this._disableButton(saveButton)
    });
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleButtonState(saveButton, inputList);
        this._checkInputValidity(input);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
