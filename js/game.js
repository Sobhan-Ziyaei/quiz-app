import formatData from "./utils.js";

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const CORRECT_BONUS = 10;

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const score = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let scoreUser = 0;
let isAccepted = true;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatData(json.results);
  console.log(formattedData);

  setTimeout(() => {
    start();
  }, 1000);
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  questionNumber.innerText = questionIndex + 1;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = correctAnswer === index ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    scoreUser += CORRECT_BONUS;
    score.innerText = scoreUser;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextQuestion = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishGame();
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishGame = () => {
  localStorage.setItem("score", JSON.stringify(scoreUser));
  window.location.assign("./end.html");
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  //below code why use arrowFunction in EventListener ? -> به خاطر اینکه نمیخوایم در لحظه اجرا شود
  button.addEventListener("click", (event) => checkAnswer(event, index));
});

nextButton.addEventListener("click", nextQuestion);

finishButton.addEventListener("click", finishGame);
