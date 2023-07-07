console.log('скрипт подключен');

// Получить элементы
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save-button');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupProfileName = popup.querySelector('.popup__name');
const popupProfileBio = popup.querySelector('.popup__bio');


const popupToggle = function (event) {
  popup.classList.toggle('popup_opened');
  console.log('кликнули на кнопку');
};

const saveInputPopup = function (event) {
  console.log(profileName);
  console.log(profileBio);
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
  popupToggle(event);
}

const editProfile = function (event) {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  popupToggle(event);
}

// Навесить слушатель на клик по кнопке отредактировать
popupOpenButton.addEventListener('click', editProfile);
// Навесить слушатель на клик по крестику
popupCloseButton.addEventListener('click', popupToggle);
// Навесить слушатель на клик по кнопке сохранить
popupSaveButton.addEventListener('click', saveInputPopup);


