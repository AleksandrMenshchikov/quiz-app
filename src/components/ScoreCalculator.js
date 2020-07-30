import { classes, selectors } from "../utils/utils.js";

export default class ScoreCalculator {
  constructor() {}

  startTimer() {
    this._timeCounter = 0;
    this._timerId = setInterval(() => {
      this._timeCounter += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._timerId);
    this.minutes = Math.floor(this._timeCounter / 60);
    if (this.minutes < 10) {
      this.minutes = "0" + this.minutes;
    }
    this.seconds = this._timeCounter % 60;
    if (this.seconds < 10) {
      this.seconds = "0" + this.seconds;
    }
  }

  getMarksPercent() {
    const marksSuccessed = [];
    const marksFailed = [];
    Array.from(document.querySelector(selectors.quizMarks).children).forEach(
      (element) => {
        if (element.classList.contains(classes.quizMarkSuccessed)) {
          marksSuccessed.push(element);
        } else if (element.classList.contains(classes.quizMarkFailed)) {
          marksFailed.push(element);
        }
      }
    );
    const result = Math.round(
      (marksSuccessed.length / (marksSuccessed.length + marksFailed.length)) *
        100
    );
    return result;
  }
}
