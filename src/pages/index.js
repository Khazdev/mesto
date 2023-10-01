import { Card } from "../scripts/components/Card.js";
import {
  avatarContainer,
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
import { PopupConfirm } from "../scripts/components/PopupConfirm.js";
import { PopupUpdateAvatar } from "../scripts/components/PopupUpdateAvatar";

const logo = new URL("../images/logo.svg", import.meta.url);

logoElement.src = logo.href;

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

async function renderUserInfo() {
  const { name, about: bio, _id: id, avatar } = await api.getUserInfo();

  userInfo.setUserInfo({ name, bio, id, avatar });
  avatarElement.src = avatar;
}

renderUserInfo().catch((error) => console.log(error));

const handleConfirmFormSubmit = async (card) => {
  await api.deleteCard(card.getId());
  card.delete();
  popupConfirmDelete.close();
};

const popupConfirmDelete = new PopupConfirm(
  ".popup_type_confirm",
  handleConfirmFormSubmit,
);
popupConfirmDelete.setEventListeners();

function openConfirmPopup(card) {
  popupConfirmDelete.open(card);
}

async function likeCard(card) {
  const res = await api.likeCard(card.getId());
  return res.likes;
}

async function unlikeCard(card) {
  const res = await api.unlikeCard(card.getId());
  return res.likes;
}

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".template-element",
    () => openCardViewPopup(cardData),
    () => openConfirmPopup(card),
    () => likeCard(card),
    () => unlikeCard(card),
  );
  return card.generateCard();
};

const initialCards = api.getInitialCards().then((result) => {
  return result.map(({ name, link, likes, owner, _id: id }) => {
    return { name, link, likes, owner, id };
  });
});

const cardSection = new Section(
  {
    items: await initialCards,
    renderer: (cardData) => {
      const { name, link, likes, owner, id } = cardData;
      const isLikedByCurrentUser = likes.some(
        (like) => like._id === userInfo.getUserInfo().id,
      );
      const card = createCard({
        title: name,
        link,
        likes,
        ownerId: owner._id,
        id,
        isLikedByCurrentUser,
        userId: userInfo.getUserInfo().id,
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
const handleUpdateAvatarFormSubmit = async (formData) => {
  const link = formData["avatar-link"];
  avatarElement.src = link;
  await api.updateAvatar(link);
  popupUpdateAvatar.close();
};
const popupUpdateAvatar = new PopupUpdateAvatar(
  ".popup_type_update-avatar",
  handleUpdateAvatarFormSubmit,
);
popupUpdateAvatar.setEventListeners();

avatarContainer.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

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

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
