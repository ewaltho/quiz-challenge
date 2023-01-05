var startButton = document.querySelector(".start");
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer-btn");
var answerButtonsEl = document.querySelector(".answer-buttons");
var questionContainer = document.querySelector(".container");
var instructionTitle = document.querySelector(".header-box");
var scoreKeeper = document.getElementById("score");
var score = 0;
var highScore = document.querySelector(".highscore");
var recentScore = document.querySelector(".recentscore");
var statsEl = document.querySelector(".stats-container");

var shuffledQuestions, currentQuestionIndex;
console.log(scoreKeeper)
var questions = [
  {
    question: "Which is not a coat color?",
    answers: [
      { text: "Grullo", correct: false },
      { text: "Palomino", correct: false },
      { text: "Bay", correct: false },
      { text: "Taupe", correct: true },
    ],
  },
  {
    question: "How many breeds of horses are there?",
    answers: [
      { text: "100,00", correct: false },
      { text: "200", correct: true },
      { text: "600", correct: false },
      { text: "50", correct: false },
    ],
  },
  {
    question: "Which is a timed jumping competition?",
    answers: [
      { text: "Show Jumping", correct: true },
      { text: "Equitation", correct: false },
      { text: "Steeplechase", correct: false },
      { text: "Vaulting", correct: false },
    ],
  },
  {
    question: "What is a baby horse called?",
    answers: [
      { text: "Joey", correct: false },
      { text: "Fawn", correct: false },
      { text: "Foal", correct: true },
      { text: "Calf", correct: false },
    ],
  },
  {
    question: "Where is a horses frog located?",
    answers: [
      { text: "The brain", correct: false },
      { text: "The neck", correct: false },
      { text: "The stomach", correct: false },
      { text: "The hoof", correct: true },
    ],
  },
  {
    question: "Which is not a horse breed?",
    answers: [
      { text: "Mawari", correct: false },
      { text: "Azawakh", correct: true },
      { text: "Percheron", correct: false },
      { text: "Trakehner", correct: false },
    ],
  },
  {
    question: "What is an adult female horse called?",
    answers: [
      { text: "Mare", correct: true },
      { text: "Gelding", correct: false },
      { text: "Filly", correct: false },
      { text: "Colt", correct: false },
    ],
  },
];

var questionsText = questions.sort(() => Math.random() - 0.5);

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);

function startTimer() {
  var timeLeft = 30;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      timerEl.textContent = "Time's up!";
      questionContainer.classList.add("hide");
      //scoreKeeper.classList.add("final-score");
      scoreKeeper.classList.add("final-score")
      clearInterval(timeInterval);
    }
  }, 1000);
}

function startQuiz() {
  statsEl.classList.remove("hide");
  instructionTitle.classList.add("hide");
  questionEl.textContent = questionsText;
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  scoreKeeper.textContent = score;
  setQuestion();
}

function setQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  
  answerButtonsEl.textContent = ""

  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

// function resetQuiz() {
//   clearStatus(document.body);
//   while (answerButtonsEl.firstChild) {
//     answerButtonsEl.removeChild(answerButtonsEl.firstChild);
//   }
// }

function setStatus(element, correct) {
  clearStatus(element);
  if (correct) {
    element.classList.add("correct");
    score++;
    console.log(score)
    scoreKeeper.textContent = score
  } else {
    element.classList.add("wrong");
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  //setStatus(document.body, correct);
  Array.from(answerButtonsEl.children).forEach((button) => {
    setStatus(button, button.dataset.correct);
  });
  setTimeout(function(){
      currentQuestionIndex++;
      setQuestion();
  },1000)

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    startButton.classList.remove("hide");
  }
//   resetQuiz();
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
