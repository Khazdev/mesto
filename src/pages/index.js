import { Card } from "../scripts/components/Card.js";
import {
  avatarElement,
  cardAddButton,
  cardElementsList,
  logoElement,
  profileEditButton,
  settings,
} from "../scripts/utils/constants.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import "./index.css";
import { api } from "../scripts/components/Api";

const avatar = new URL("../images/avatar.jpg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);

avatarElement.src = avatar.href;
logoElement.src = logo.href;

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

function renderUserInfo() {
  api.getUserInfo().then(({ name, about: bio }) => {
    userInfo.setUserInfo({ name, bio });
  });
}

renderUserInfo();
const createCard = (cardData) => {
  return new Card(cardData, ".template-element", () =>
    openCardViewPopup(cardData),
  ).generateCard();
};
const initialCards = api.getInitialCards().then((result) => {
  return result.map(({ name, link, likes }) => {
    return { name, link, likes };
  });
});

const cardSection = new Section(
  {
    items: await initialCards,
    renderer: (cardData) => {
      const card = createCard({
        title: cardData.name,
        link: cardData.link,
        likes: cardData.likes,
      });
      cardSection.addItem(card);
    },
  },
  cardElementsList,
);

const handleEditProfileFormSubmit = async (formData) => {
  const profileName = formData["profile-name"];
  const profileBio = formData["profile-bio"];
  await api.updateProfile(profileName, profileBio);
  userInfo.setUserInfo({
    name: profileName,
    bio: profileBio,
  });
  popupEditProfile.close();
};

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

const handleAddCardFormSubmit = async (formData) => {
  const name = formData["card-place-name"];
  const link = formData["card-image-link"];
  await api.addCard(name, link);
  const card = createCard({
    title: name,
    link: link,
  });
  cardSection.prependItem(card);
  popupAddCard.close();
};

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit,
);
popupAddCard.setEventListeners();

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

const formValidators = {};

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
