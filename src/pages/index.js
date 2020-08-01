import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Question from "../components/Question.js";
import Api from "../components/Api.js";
import ScoreCalculator from "../components/ScoreCalculator.js";
import { selectors, mainElement } from "../utils/utils.js";

let dataApi = [];

const api = new Api(
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple"
);

const handleTransitionMainElement = () => {
  new Promise((res, rej) => {
    mainElement.classList.remove("main_show");
    if (!mainElement.classList.contains("main_show")) {
      res();
    } else {
      rej("Error processing function handleTransitionMainElement");
    }
  })
    .then(() => mainElement.classList.add("main_show"))
    .catch((err) => console.log(err));
};

const scoreCalculator = new ScoreCalculator();

const question = new Question(
  selectors.templateQuestion,
  () => {
    if (question.counter === dataApi.length) {
      handleTransitionMainElement();
      scoreCalculator.stopTimer();
      section.renderItem(card.generateConclusion());
      card.setContext(
        scoreCalculator.minutes,
        scoreCalculator.seconds,
        scoreCalculator.getMarksPercent()
      );
      question.removeQuestion();
    } else {
      question.markCounter = 0;
      question.counter++;
      question.setContext(dataApi);
      question.setInitialColorsAnswer();
      question.setButtonDisabled();
      question.setTimer();
    }
  },
  (e) => {
    question.setColorsAnswers(e, dataApi);
    question.setButtonAble();
  },
  () => {
    handleTransitionMainElement();
    question.removeQuestion();
    section.renderItem(card.generateGreeting());
  }
);

const card = new Card(
  () => {
    card.loadingMessage();
    api
      .getData()
      .then((res) => {
        dataApi = [...res.results];
        handleTransitionMainElement();
        card.removeGreeting();
        section.renderItem(question.generateQuestion());
        question.setContext(dataApi);
        question.setTimer();
        scoreCalculator.startTimer();
      })
      .catch((err) => console.log(err));
  },
  () => {
    handleTransitionMainElement();
    card.removeConclusion();
    section.renderItem(card.generateGreeting());
  },
  () => {
    handleTransitionMainElement();
    card.removeConclusion();
    section.renderItem(question.generateQuestion());
    question.setContext(dataApi);
    question.setTimer();
    scoreCalculator.startTimer();
  }
);

const section = new Section(selectors.quizContainer);
section.renderItem(card.generateGreeting());
mainElement.classList.add("main_show");
