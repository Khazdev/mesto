// Получить элементы
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const elements__list = document.querySelector('.elements__list');

// ПопАп и все что в нем
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupForm = popup.querySelector('.popup__form');
const popupProfileName = popupForm.querySelector('.popup__input_text_name');
const popupProfileBio = popupForm.querySelector('.popup__input_text_bio');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initCards = () => {
  initialCards.forEach((element)=> {
    const template_element = document.querySelector('#template-element').content;
    const card = template_element.querySelector('.elements__list-item').cloneNode(true);
    const cardPhoto = card.querySelector('.elements__list-item-photo');
    cardPhoto.src = element.link;
    cardPhoto.alt = element.name;
    card.querySelector('.elements__list-item-header').textContent = element.name;
    elements__list.appendChild(card);
  });
}

initCards();

const popupToggle = function () {
  popup.classList.toggle('popup_opened');
};

const saveInputPopup = function (event) {
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



