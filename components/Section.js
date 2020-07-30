export default class Section {
  constructor(selectorContainer) {
    this._container = document.querySelector(selectorContainer);
  }

  renderItem(item) {
    this._container.append(item);
  }
}
