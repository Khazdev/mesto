export class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._element = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.cloneNode(true);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.elements__like-button');
    const deleteButton = this._element.querySelector('.elements__del-button');

    likeButton.addEventListener('click', this._toggleLike);
    deleteButton.addEventListener('click', this._deleteCard);
  }

  _toggleLike = (event) => {
    event.target.classList.toggle("elements__like-button_active");
  };

  _deleteCard(event) {
    event.target.closest(".elements__list-item").remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.elements__list-item-photo');
    const cardTitle = this._element.querySelector('.elements__list-item-header');

    cardImage.src = this._data.link;
    cardImage.alt =  `Фотография ${this._data.title}`;
    cardTitle.textContent = this._data.title;

    return this._element;
  }
}
