import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitCallback = submitCallback;
    this._currentCard = null;
  }

  open(card) {
    this._currentCard = card;
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._currentCard);
    });
    super.open();
  }
}
