export class Card {
  constructor(
    data,
    templateSelector,
    openImagePopupCallback,
    openConfirmPopupCallback,
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = null;
    this._openPopupCallback = openImagePopupCallback;
    this._openConfirmPopupCallback = openConfirmPopupCallback;
    this._id = data.id;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__list-item");
    return template.cloneNode(true);
  }

  _setEventListeners() {
    const likeCounter = this._element.querySelector(".elements__like-counter");
    likeCounter.textContent = this._data.likes;
    const likeButton = this._element.querySelector(".elements__like-button");
    likeButton.addEventListener("click", this._toggleLike);

    const deleteButton = this._element.querySelector(".elements__del-button");

    if (!this._data.isOwner) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener("click", this._openConfirmPopupCallback);
    }
    const cardPhotoContainer = this._element.querySelector(
      ".elements__photo-container",
    );
    cardPhotoContainer.addEventListener("click", () =>
      this._openPopupCallback(this._data),
    );
  }

  _toggleLike = (event) => {
    event.target.classList.toggle("elements__like-button_active");
  };

  // _deleteCard(event) {
  //   event.target.closest(".elements__list-item").remove();
  // }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".elements__list-item-photo");
    const cardTitle = this._element.querySelector(
      ".elements__list-item-header",
    );

    cardImage.src = this._data.link;
    cardImage.alt = `Фотография ${this._data.title}`;
    cardTitle.textContent = this._data.title;

    return this._element;
  }

  delete() {
    this._element.remove();
  }

  getId() {
    return this._id;
  }
}
