export class Section {
  constructor(renderer , cardElementsList) {
    this._renderer = renderer;
    this._container = cardElementsList;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
