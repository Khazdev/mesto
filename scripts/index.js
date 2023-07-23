// Получить элементы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const elementsList = document.querySelector(".elements__list");

const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditProfileCloseButton =
  popupEditProfile.querySelector(".popup__close");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileName = popupEditProfileForm.querySelector(
  ".popup__input_text_name"
);
const popupEditProfileBio = popupEditProfileForm.querySelector(
  ".popup__input_text_bio"
);

const cardAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_add-card");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
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

const editProfilePopupToggle = () => {
  popupToggle(popupEditProfile);
};

const addCardPopupToggle = () => {
  popupToggle(popupAddCard);
};

const popupToggle = function (popup) {
  popup.classList.toggle("popup_opened");
};

const saveEditProfileInputPopup = function (event) {
  event.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileBio.textContent = popupEditProfileBio.value;
  editProfilePopupToggle();
};

const editProfile = function () {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileBio.value = profileBio.textContent;
  editProfilePopupToggle();
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
popupEditProfileCloseButton.addEventListener("click", editProfilePopupToggle);
// Навесить слушатель на submit формы
popupEditProfileForm.addEventListener("submit", saveEditProfileInputPopup);

cardAddButton.addEventListener("click", addCardPopupToggle);
// Навесить слушатель на клик по крестику в попапе добавления карточки
popupAddCardCloseButton.addEventListener("click", addCardPopupToggle);
