export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = null;
    this._saveButton = null;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
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

  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );

    if (isFormValid) {
      this._saveButton.classList.remove(this._settings.inactiveButtonClass);
      this._saveButton.disabled = false;
    } else {
      this._disableButton();
    }
  }

  _disableButton() {
    this._saveButton.classList.add(this._settings.inactiveButtonClass);
    this._saveButton.disabled = true;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._saveButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState();

    this._formElement.addEventListener("reset", () => {
      this._disableButton();
    });
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInputValidity(input);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
