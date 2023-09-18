import { Card } from "../scripts/components/Card.js";
import {
  avatarElement,
  cardAddButton,
  cardElementsList,
  initialCards,
  logoElement,
  popupAddCardForm,
  popupEditProfileForm,
  profileEditButton,
  settings,
} from "../scripts/utils/constants.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import "./index.css";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

avatarElement.src = avatar.href;

logoElement.src = logo.href;

// Создание экземпляра UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

const createCard = (cardData) => {
  return new Card(cardData, ".template-element", () =>
    openCardViewPopup(cardData),
  ).generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard({
        title: cardData.name,
        link: cardData.link,
      });
      cardSection.addItem(card);
    },
  },
  cardElementsList,
);

// Обработчик отправки формы редактирования профиля
const handleEditProfileFormSubmit = (formData) => {
  userInfo.setUserInfo({
    name: formData["profile-name"],
    bio: formData["profile-bio"],
  });
  popupEditProfile.close();
};

// Создание экземпляра PopupWithForm для редактирования профиля
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleEditProfileFormSubmit,
);
popupEditProfile.setEventListeners();

const renderEditProfileInputs = () => {
  const { bio, name } = userInfo.getUserInfo();
  const formData = {
    "profile-name": name,
    "profile-bio": bio,
  };
  popupEditProfile.setInputValues(formData);
};

// Инициализация валидации формы редактирования профиля
const editProfileFormValidator = new FormValidator(
  settings,
  popupEditProfileForm,
);
editProfileFormValidator.enableValidation();

// Обработчик отправки формы добавления карточки
const handleAddCardFormSubmit = (formData) => {
  const card = createCard({
    title: formData["card-place-name"],
    link: formData["card-image-link"],
  });
  cardSection.prependItem(card);
  popupAddCard.close();
};

// Создание экземпляра PopupWithForm для добавления карточки
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit,
);
popupAddCard.setEventListeners();
// Инициализация валидации формы добавления карточки
const popupAddCardFormValidator = new FormValidator(settings, popupAddCardForm);
popupAddCardFormValidator.enableValidation();

const popupCardView = new PopupWithImage(".popup_type_image");
popupCardView.setEventListeners();
const openCardViewPopup = (cardData) => {
  popupCardView.open(cardData.link, cardData.title);
};

const handleEditProfileButtonClick = () => {
  renderEditProfileInputs();
  popupEditProfile.open();
};

const handleCardAddButtonClick = () => {
  popupAddCard.open();
};

profileEditButton.addEventListener("click", handleEditProfileButtonClick);
cardAddButton.addEventListener("click", handleCardAddButtonClick);

cardSection.render();
