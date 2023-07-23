// Получить элементы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const elementsList = document.querySelector(".elements__list");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const popupForm = popup.querySelector(".popup__form");
const popupProfileName = popupForm.querySelector(".popup__input_text_name");
const popupProfileBio = popupForm.querySelector(".popup__input_text_bio");

// Создать карточку
const cardTemplate = document
  .querySelector("#template-element")
  .content.querySelector(".elements__list-item");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  const cardPhoto = card.querySelector(".elements__list-item-photo");
  const cardHeader = card.querySelector(".elements__list-item-header");
  const likeButton = card.querySelector(".elements__like-button");
  const deleteButton = card.querySelector(".elements__del-button");

  cardPhoto.src = link;
  cardPhoto.alt = `Фотография ${name}`;
  cardHeader.textContent = name;

  likeButton.addEventListener("click", likeToggle);
  deleteButton.addEventListener("click", deleteCard);

  return card;
}

function initCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData.name, cardData.link);
    elementsList.appendChild(card);
  });
}

initCards();

const popupToggle = function () {
  popup.classList.toggle("popup_opened");
};

const saveInputPopup = function (event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileBio.textContent = popupProfileBio.value;
  popupToggle();
};

const editProfile = function () {
  popupProfileName.value = profileName.textContent;
  popupProfileBio.value = profileBio.textContent;
  popupToggle();
};

function deleteCard(event) {
  event.srcElement.parentElement.remove();
}

function likeToggle(event) {
  event.srcElement.classList.toggle("elements__like-button_active");
}

// Навесить слушатель на клик по кнопке отредактировать
profileEditButton.addEventListener("click", editProfile);
// Навесить слушатель на клик по крестику
popupCloseButton.addEventListener("click", popupToggle);
// Навесить слушатель на submit формы
popupForm.addEventListener("submit", saveInputPopup);


