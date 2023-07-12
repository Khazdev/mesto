// Получить элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
// ПопАп и все что в нем
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const popupProfileName = popupForm.querySelector('.popup__input_text_name');
const popupProfileBio = popupForm.querySelector('.popup__input_text_bio');


const popupToggle = function () {
  popup.classList.toggle('popup_opened');
};

const saveInputPopup = function (event) {
  // console.log(popupForm);
  event.preventDefault();
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
// Навесить слушатель на submit формы
popupForm.addEventListener('submit', saveInputPopup);

// На будущее кнопка лайка
// const likeToggle = function (event) {
//   if (event.srcElement.classList.contains('elements__like-button')) {
//     event.srcElement.classList.toggle('elements__like-button_active');
//   }
// };
// elements.addEventListener('click', likeToggle);



