export class Card {
  constructor(
    data,
    templateSelector,
    openImagePopupCallback,
    openConfirmPopupCallback,
    likeCardCallBack,
    unlikeCardCallBack,
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = null;
    this._openPopupCallback = openImagePopupCallback;
    this._openConfirmPopupCallback = openConfirmPopupCallback;
    this._id = data.id;
    this._likeCardCallBack = likeCardCallBack;
    this._unlikeCardCallBack = unlikeCardCallBack;
    this._isLikedByCurrentUser = data.isLikedByCurrentUser;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__list-item");
    return template.cloneNode(true);
  }

  _setEventListeners() {
    const likeCounter = this._element.querySelector(".elements__like-counter");
    likeCounter.textContent = this._data.likes.length;

    const likeButton = this._element.querySelector(".elements__like-button");
    if (this._isLikedByCurrentUser) {
      likeButton.classList.add("elements__like-button_active");
    }
    likeButton.addEventListener("click", async (event) => {
      let currentLikeCount;
      if (this._isLikedByCurrentUser) {
        currentLikeCount = await this._unlikeCardCallBack();
      } else {
        currentLikeCount = await this._likeCardCallBack();
      }
      this._isLikedByCurrentUser = !this._isLikedByCurrentUser;
      this._toggleLike(event);
      likeCounter.textContent = currentLikeCount.length;
    });

    const deleteButton = this._element.querySelector(".elements__del-button");
    if (this._data.ownerId !== this._data.userId) {
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
