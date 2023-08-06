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

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const imageLabel = popupImage.querySelector(".popup__image-label");

// Создать карточку
const cardTemplate = document
  .querySelector(".template-element")
  .content.querySelector(".elements__list-item");

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

const getImageFromCard = (event) => {
  const card = event.srcElement.closest(".elements__list-item");
  const cardImage = card.querySelector(".elements__list-item-photo");
  image.src = cardImage.src;
  image.alt = cardImage.alt;
  imageLabel.textContent = card.querySelector(
    ".elements__list-item-header"
  ).textContent;
  openPopup(popupImage);
};

const createCard = (name, link) => {
  const card = cardTemplate.cloneNode(true);
  const cardPhotoContainer = card.querySelector(".elements__photo-container");
  const cardPhoto = card.querySelector(".elements__list-item-photo");
  const cardHeader = card.querySelector(".elements__list-item-header");
  const likeButton = card.querySelector(".elements__like-button");
  const deleteButton = card.querySelector(".elements__del-button");

  cardPhoto.src = link;
  cardPhoto.alt = `Фотография ${name}`;
  cardHeader.textContent = name;

  cardPhotoContainer.addEventListener("click", getImageFromCard);
  likeButton.addEventListener("click", likeToggle);
  deleteButton.addEventListener("click", deleteCard);

  return card;
};

const initCards = () => {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData.name, cardData.link);
    elementsList.appendChild(card);
  });
};

const editProfilePopupToggle = () => {
  togglePopup(popupEditProfile);
};

const addCardPopupToggle = () => {
  togglePopup(popupAddCard);
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
  const card = createCard(popupAddCardName.value, popupAddCardLink.value);
  elementsList.prepend(card);
  event.target.reset();
  closePopup(popupAddCard);
};

const editProfile = () => {
  popupEditProfileName.value = profileName.textContent;
  popupEditProfileBio.value = profileBio.textContent;
  openPopup(popupEditProfile);
};

const deleteCard = (event) => {
  event.srcElement.closest(".elements__list-item").remove();
};

const likeToggle = (event) => {
  event.srcElement.classList.toggle("elements__like-button_active");
};

const closePopupByClickingOnOverlay = (event) => {
  if (event.target == event.currentTarget) {
    const popup = event.srcElement.closest(".popup_opened");
    closePopup(popup);
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
