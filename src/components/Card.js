import { classes, selectors } from "../utils/utils.js";

export default class Card {
  constructor(
    handleEventButton,
    handleEventButtonFinish,
    handleEventButtonTryAgain
  ) {
    this._handleEventButton = handleEventButton;
    this._handleEventButtonFinish = handleEventButtonFinish;
    this._handleEventButtonTryAgain = handleEventButtonTryAgain;
  }

  generateGreeting() {
    this._greetingElement = document
      .querySelector(selectors.templateCard)
      .content.cloneNode(true)
      .querySelector(selectors.card);
    this._button = this._greetingElement.querySelector(selectors.cardButton);
    this._setEventListener();

    return this._greetingElement;
  }

  generateConclusion() {
    this._conclusionElement = document
      .querySelector(selectors.templateConclusion)
      .content.cloneNode(true)
      .querySelector(selectors.conclusion);
    this._buttonFinish = this._conclusionElement.querySelector(
      selectors.conclusionButtonFinish
    );
    this._buttonTryAgain = this._conclusionElement.querySelector(
      selectors.conclusionButtonTryAgain
    );
    this._conclusionTitle = this._conclusionElement.querySelector(
      selectors.conclusionTitle
    );
    this._conclusionTotalTime = this._conclusionElement.querySelector(
      selectors.conclusionTotalTime
    );
    this._conclusionTotalPercent = this._conclusionElement.querySelector(
      selectors.conclusionTotalPercent
    );
    this._setEventListenerForConclusion();

    return this._conclusionElement;
  }

  setContext(minutes, seconds, percent) {
    this._conclusionTotalTime.textContent = `00:${minutes}:${seconds}`;
    this._conclusionTotalPercent.textContent = `${percent}%`;
    if (percent < 90) {
      this._conclusionTitle.textContent = "Test failed";
      this._conclusionTitle.classList.add(classes.conclusionTitleFailed);
    }
  }

  removeGreeting() {
    this._greetingElement.remove();
    this._greetingElement = null;
    this._button.removeEventListener("click", this._handleEventButton);
  }

  removeConclusion() {
    this._conclusionElement.remove();
    this._conclusionElement = null;
    this._buttonFinish.removeEventListener(
      "click",
      this._handleEventButtonFinish
    );
    this._buttonTryAgain.removeEventListener(
      "click",
      this._handleEventButtonTryAgain
    );
  }

  loadingMessage() {
    this._button.textContent = "Loading data...";
  }

  _setEventListenerForConclusion() {
    this._buttonFinish.addEventListener("click", this._handleEventButtonFinish);
    this._buttonTryAgain.addEventListener(
      "click",
      this._handleEventButtonTryAgain
    );
  }

  _setEventListener() {
    this._button.addEventListener("click", this._handleEventButton);
  }
}
