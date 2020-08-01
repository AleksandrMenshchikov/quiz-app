export const selectors = {
  templateCard: ".template-card",
  card: ".card",
  cardButton: ".card__button",
  templateConclusion: ".template-conclusion",
  conclusion: ".conclusion",
  conclusionButtonFinish: ".conclusion__button-finish",
  conclusionButtonTryAgain: ".conclusion__button-try-again",
  conclusionTitle: ".conclusion__title",
  conclusionTotalTime: ".conclusion__total-time",
  conclusionTotalPercent: ".conclusion__total-percent",
  quiz: ".quiz",
  quizCounterQuestions: ".quiz__counter-questions",
  quizCounterTimeSeconds: ".quiz__counter-time-seconds",
  quizAnswer: ".quiz__answer",
  quizQuestion: ".quiz__question",
  quizButton: ".quiz__button",
  test: ".test",
  quizMarks: ".quiz__marks",
  quizContainer: ".quiz-container",
  templateQuestion: ".template-question",
  quizButtonRestart: ".quiz__button-restart",
};

export const classes = {
  conclusionTitleFailed: "conclusion__title_failed",
  quizAnswer: "quiz__answer",
  quizAnswerSuccessed: "quiz__answer_successed",
  quizMarkSuccessed: "quiz__mark-successed",
  quizAnswerFailed: "quiz__answer_failed",
  quizMarkFailed: "quiz__mark-failed",
  quizAnswerDisabled: "quiz__answer_disabled",
  quizButtonDisabled: "quiz__button_disabled",
  mainShow: "main_show",
};

export const mainElement = document.querySelector(".main");

export const handleTransitionMainElement = () => {
  new Promise((res, rej) => {
    mainElement.classList.remove(classes.mainShow);
    if (!mainElement.classList.contains(classes.mainShow)) {
      res();
    } else {
      rej("Error processing function handleTransitionMainElement");
    }
  })
    .then(() => mainElement.classList.add(classes.mainShow))
    .catch((err) => console.log(err));
};
