import { classes, selectors } from "../utils/utils.js";

export default class Question {
  constructor(selectorTemplate, handleClickButton, handleClickAnswer) {
    this._selectorTemplate = selectorTemplate;
    this._handleClickButton = handleClickButton;
    this._handleClickAnswer = handleClickAnswer;
  }

  generateQuestion() {
    this.markCounter = 0;
    this.counter = 1;
    this._questionElement = document
      .querySelector(this._selectorTemplate)
      .content.cloneNode(true)
      .querySelector(selectors.quiz);
    this._counterQuestions = this._questionElement.querySelector(
      selectors.quizCounterQuestions
    );
    this._timer = this._questionElement.querySelector(
      selectors.quizCounterTimeSeconds
    );
    this._listAnswers = this._questionElement.querySelectorAll(
      selectors.quizAnswer
    );
    this._question = this._questionElement.querySelector(
      selectors.quizQuestion
    );
    this._button = this._questionElement.querySelector(selectors.quizButton);
    this._testElement = document.querySelector(selectors.test);
    this._markElement = this._questionElement.querySelector(
      selectors.quizMarks
    );
    this._setEventListener();

    return this._questionElement;
  }

  removeQuestion() {
    this._questionElement.remove();
    this._questionElement = null;
    this._button.removeEventListener("click", this._handleClickButton);
  }

  setContext(dataApi) {
    this._counterQuestions.textContent = `Questions: ${this.counter} out of ${dataApi.length}`;
    this._question.innerHTML = dataApi[this.counter - 1].question;
    let arrAnswers = [];
    dataApi[this.counter - 1].incorrect_answers.forEach((element) => {
      arrAnswers.push(element);
    });
    arrAnswers.push(dataApi[this.counter - 1].correct_answer);
    const randomArrAnswers = [];
    while (randomArrAnswers.length < 4) {
      const index = Math.floor(Math.random() * 4);
      const element = arrAnswers.splice(index, 1);
      if (element.length) {
        randomArrAnswers.push(...element);
      }
    }
    this._listAnswers.forEach((item, index) => {
      item.innerHTML = randomArrAnswers[index];
    });
  }

  setColorsAnswers(e, dataApi) {
    this._testElement.innerHTML = dataApi[this.counter - 1].correct_answer;
    if (e.target.classList.contains(classes.quizAnswer)) {
      if (e.target.textContent === this._testElement.textContent) {
        e.target.classList.add(classes.quizAnswerSuccessed);
        if (this.markCounter === 0) {
          const mark = document.createElement("div");
          mark.classList.add(classes.quizMarkSuccessed);
          this._markElement.append(mark);
          this.markCounter += 1;
          clearInterval(this._timerId);
        }
      } else if (e.target.textContent !== this._testElement.textContent) {
        e.target.classList.add(classes.quizAnswerFailed);
        if (this.markCounter === 0) {
          const mark = document.createElement("div");
          mark.classList.add(classes.quizMarkFailed);
          this._markElement.append(mark);
          this.markCounter += 1;
          clearInterval(this._timerId);
        }
      }
      this._listAnswers.forEach((item) => {
        if (item.classList.length < 2) {
          item.classList.add(classes.quizAnswerDisabled);
        }
      });
    }
  }

  setInitialColorsAnswer() {
    this._listAnswers.forEach((item) => {
      item.className = classes.quizAnswer;
    });
  }

  setButtonAble() {
    if (this.markCounter > 0) {
      this._button.classList.remove(classes.quizButtonDisabled);
      this._button.removeAttribute("disabled");
    }
  }

  setButtonDisabled() {
    this._button.classList.add(classes.quizButtonDisabled);
    this._button.setAttribute("disabled", true);
  }

  setTimer() {
    this._timer.textContent = 30;
    this._timerId = setInterval(() => {
      this._timer.textContent -= 1;
      if (this._timer.textContent < 10) {
        this._timer.textContent = "0" + this._timer.textContent;
      }
      if (this._timer.textContent == 0) {
        clearInterval(this._timerId);
        this.markCounter = 1;
        this.setButtonAble();
        this._button.click();
        const mark = document.createElement("div");
        mark.classList.add(classes.quizMarkFailed);
        this._markElement.append(mark);
      }
    }, 1000);
  }

  _setEventListener() {
    this._button.addEventListener("click", this._handleClickButton);
    this._questionElement.addEventListener("click", this._handleClickAnswer);
  }
}
