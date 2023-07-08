console.log('скрипт подключен');
const elements = document.querySelector('.elements');
// Получить элементы
const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save-button');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupProfileName = popup.querySelector('.popup__name');
const popupProfileBio = popup.querySelector('.popup__bio');

const likeToggle = function (event) {
  if (event.srcElement.classList.contains('elements__like-button')) {
    event.srcElement.classList.toggle('elements__like-button_active');
  }
};

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
  console.log('кликнули на кнопку');
};

const saveInputPopup = function () {
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
  popupToggle();
}

const editProfile = function () {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  popupToggle();
}

// Навесить слушатель на клик по кнопке отредактировать
profileEditButton.addEventListener('click', editProfile);
// Навесить слушатель на клик по крестику
popupCloseButton.addEventListener('click', popupToggle);
// Навесить слушатель на клик по кнопке сохранить
popupSaveButton.addEventListener('click', saveInputPopup);

elements.addEventListener('click', likeToggle);





