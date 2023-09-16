import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__image-label");
  }

  open(imageSrc, title) {
    this._image.src = imageSrc;
    this._image.alt = title;
    this._title.textContent = title;
    super.open();
  }
}
