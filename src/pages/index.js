import {Card} from "../scripts/components/Card.js";
import {
  avatarContainer,
  cardAddButton,
  cardElementsList,
  logoElement,
  profileEditButton,
  settings,
} from "../scripts/utils/constants.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import "./index.css";
import {api} from "../scripts/components/Api";
import {PopupConfirm} from "../scripts/components/PopupConfirm.js";

const logo = new URL("../images/logo.svg", import.meta.url);

logoElement.src = logo.href;

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".template-element",
    () => openCardViewPopup(cardData),
    () => openConfirmPopup(card),
    () => likeCard(card),
    () => unlikeCard(card),
  );
  console.log(card)
  return card.generateCard();
};


function createCardElement(cardData) {
  const {name, link, likes, owner, _id: id} = cardData;
  return  createCard({
    title: name,
    link,
    likes,
    ownerId: owner._id,
    id,
    userId: userInfo.getUserInfo().id,
  });

}

const cardSection = new Section(
  { items: [],
    renderer: (cardData) => {
      const cardElement = createCardElement(cardData);
      cardSection.addItem(cardElement);
    },
  },
  cardElementsList,
);
cardSection.render();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    userInfo.setUserInfo(userData);
    // и тут отрисовка карточек
    cards.forEach((cardData) => {
      const cardElement = createCardElement(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {

  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleConfirmFormSubmit(card) {
    api.deleteCard(card.getId())
      .then(() => {
        card.delete();
        popupConfirmDelete.close();
      })
      .catch((error) => console.log(error));
}

const popupConfirmDelete = new PopupConfirm(
  ".popup_type_confirm",
  handleConfirmFormSubmit,
);
popupConfirmDelete.setEventListeners();

function openConfirmPopup(card) {
  popupConfirmDelete.open(card);
}

function likeCard(card) {
  return api
    .likeCard(card.getId())
    .then((res) => {
      return res.likes;
    })
    .catch((error) => console.log(error));
}

function unlikeCard(card) {
  return api
    .unlikeCard(card.getId())
    .then((res) => {
      return res.likes;
    })
    .catch((error) => console.log(error));
}

const handleEditProfileFormSubmit = (formData) => {
  const profileName = formData["profile-name"];
  const profileBio = formData["profile-bio"];
  popupEditProfile.renderLoading(true);

  function makeRequest() {
    return api.updateProfile(profileName, profileBio).then((res) => {
      userInfo.setUserInfo(res);
    });
  }

  handleSubmit(makeRequest, popupEditProfile);
};

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleEditProfileFormSubmit,
  "Сохранить",
);
popupEditProfile.setEventListeners();

const renderEditProfileInputs = () => {
  const {bio, name} = userInfo.getUserInfo();
  const formData = {
    "profile-name": name,
    "profile-bio": bio,
  };
  popupEditProfile.setInputValues(formData);
};

const handleAddCardFormSubmit = (formData) => {
  function makeRequest() {
    const name = formData["card-place-name"];
    const link = formData["card-image-link"];
    return api.addCard(name, link).then(res => {
      const cardElement = createCardElement(res);
      cardSection.prependItem(cardElement);
    });
  }

  handleSubmit(makeRequest, popupAddCard);
};

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit,
  "Создать",
);
popupAddCard.setEventListeners();

const popupCardView = new PopupWithImage(".popup_type_image");
popupCardView.setEventListeners();

const openCardViewPopup = (cardData) => {
  popupCardView.open(cardData.link, cardData.title);
};

const handleUpdateAvatarFormSubmit = (formData) => {
  function makeRequest() {
    const link = formData["avatar-link"];
    return api.updateAvatar(link).then((res) => {
      userInfo.setUserInfo(res)
    });
  }

  handleSubmit(makeRequest, popupUpdateAvatar)
};
const popupUpdateAvatar = new PopupWithForm(
  ".popup_type_update-avatar",
  handleUpdateAvatarFormSubmit,
  "Сохранить",
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
