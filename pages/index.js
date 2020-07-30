import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Question from "../components/Question.js";
import Api from "../components/Api.js";
import ScoreCalculator from "../components/ScoreCalculator.js";
import { selectors } from "../utils/utils.js";

let dataApi = [];

const api = new Api(
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple"
);

const scoreCalculator = new ScoreCalculator();

const question = new Question(
  selectors.templateQuestion,
  () => {
    if (question.counter === dataApi.length) {
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
  }
);

const card = new Card(
  () => {
    card.loadingMessage();
    api
      .getData()
      .then((res) => {
        dataApi = [...res.results];
        card.removeGreeting();
        section.renderItem(question.generateQuestion());
        question.setContext(dataApi);
        question.setTimer();
        scoreCalculator.startTimer();
      })
      .catch((err) => console.log(err));
  },
  () => {
    card.removeConclusion();
    section.renderItem(card.generateGreeting());
  },
  () => {
    card.removeConclusion();
    section.renderItem(question.generateQuestion());
    question.setContext(dataApi);
    question.setTimer();
    scoreCalculator.startTimer();
  }
);

const section = new Section(selectors.quizContainer);
section.renderItem(card.generateGreeting());
