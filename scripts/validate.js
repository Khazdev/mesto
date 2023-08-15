function enableValidation(settings) {

  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const saveButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, saveButton, settings);

  form.addEventListener('reset', () => {
    disableButton(saveButton, settings)
  });
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(inputList, saveButton, settings);
      checkInputValidity(form, input, settings);
    });
  });
}

function disableButton(saveButton, settings) {
  saveButton.classList.add(settings.inactiveButtonClass);
  saveButton.disabled = true;
}

function toggleButtonState(inputList, buttonElement, settings) {
  const isFormValid = inputList.every((inputElement) => inputElement.validity.valid);

  if (isFormValid) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    disableButton(buttonElement, settings);
  }
}

function checkInputValidity(formElement, inputElement, settings) {

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (inputElement.validity.valid) {
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
    inputElement.classList.remove(settings.inputErrorClass);
  } else {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
  }
  return inputElement.validity.valid;
}

export {enableValidation};
