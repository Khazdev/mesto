import {enableValidation} from "./validate.js";
import {Card} from "./card.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Получить элементы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const elementsList = document.querySelector(".elements__list");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileName = popupEditProfileForm.querySelector(
  ".popup__input_type_name"
);
const popupEditProfileBio = popupEditProfileForm.querySelector(
  ".popup__input_type_bio"
);

const cardAddButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddCardForm = popupAddCard.querySelector(".popup__form");
const popupAddCardName = popupAddCard.querySelector(
  ".popup__input_type_place-name"
);
const popupAddCardLink = popupAddCard.querySelector(
  ".popup__input_type_place-image-link"
);

const popupCardView = document.querySelector(".popup_type_image");
const image = popupCardView.querySelector(".popup__image");
const imageLabel = popupCardView.querySelector(".popup__image-label");

const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

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

const getImageFromCard = (cardData) => {
  image.src = cardData.link;
  image.alt = cardData.title;
  imageLabel.textContent = cardData.title
  openPopup(popupCardView);
};

const createCard = (cardData) => {
  const card = new Card(cardData, ".template-element").generateCard();
  const cardPhotoContainer = card.querySelector(".elements__photo-container");
  cardPhotoContainer.addEventListener("click", () => getImageFromCard(cardData));
  return card;
};

const initCards = () => {
  initialCards.forEach((cardData) => {
    const card = createCard({title: cardData.name, link: cardData.link});
    elementsList.appendChild(card);
  });
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupByClickingOnOverlay);
  document.addEventListener("keydown", closePopupByClickingOnEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByClickingOnOverlay);
  document.removeEventListener("keydown", closePopupByClickingOnEsc);
};

const saveEditProfileInputPopup = (event) => {
  event.preventDefault();
  profileName.textContent = popupEditProfileName.value;
  profileBio.textContent = popupEditProfileBio.value;
  closePopup(popupEditProfile);
};

const saveAddCardInputPopup = (event) => {
  event.preventDefault();
  const card = createCard({title: popupAddCardName.value, link: popupAddCardLink.value});
  elementsList.prepend(card);
  event.target.reset();
  closePopup(popupAddCard);
};

const editProfile = () => {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileBio.value = profileBio.textContent;
  openPopup(popupEditProfile);
};

const closePopupByClickingOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
};

const closePopupByClickingOnEsc = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

profileEditButton.addEventListener("click", editProfile);
popupEditProfileForm.addEventListener("submit", saveEditProfileInputPopup);

cardAddButton.addEventListener("click", () => openPopup(popupAddCard));
popupAddCardForm.addEventListener("submit", saveAddCardInputPopup);

// Initialize cards
initCards();

enableValidation(settings);
