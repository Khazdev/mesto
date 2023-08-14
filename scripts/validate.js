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

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(inputList, saveButton, settings);
      checkInputValidity(form, input, settings);
    });
    // проверка на валидность на открытии попапа (если закрыли форму с невалидными полями)
    checkInputValidity(form, input, settings);
  });
}


function toggleButtonState(inputList, buttonElement, settings) {
  const isFormValid = inputList.every((inputElement) => inputElement.validity.valid);

  if (isFormValid) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
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

export { enableValidation };
