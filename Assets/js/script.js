// List of Questions and Answers

var questions = [
  {
    prompt: "What is the extension of a JavaScript file?",
    options: [".Java", ".Js", ".Javascript", ".html"],
    answer: ".Js"
  },

  {
    prompt: "What is the name of the statement that is used to exit or end a loop?",
    options: ["Break statement", "Falter statement", "Conditional statement", "Close statement"],
    answer: "Conditional statement"
  },

  {
    prompt: "What is a JavaScript element that represents either TRUE or FALSE values?",
    options: ["Condition", "Boolean", "Event", "RegEx"],
    answer: "Boolean"
  },

  {
    prompt: "What is theoutput of this code var a=5; b=a++; console.log(b)?",
    options: ["b=6", "b=7", "b=8", "b=9"],
    answer: "b=6"
  },

  {
    prompt: "In JavaScript, what element is used to store multiple values in a single variable?",
    options: ["Variables", "Functions", "Items", "Arrays"],
    answer: "Arrays"
  },

  {
    prompt: "How does a for loop start?",
    options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", " for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
  },

  {
    prompt: "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
    options: ["Recorders", "Variables", "Arrays", "Strings"],
    answer: "Strings"
  },

  {
    prompt: "In JavaScript, what function is used to parse a String to Int?",
    options: ["ParseInt()", "IntParse()", "ParseInteger()", "None"],
    answer: "ParseInt()"
  },

  {
    prompt: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    options: ["Loop", "Repeater", "Debugger", "Clone"],
    answer: "Loop"

  }];

// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  var landingScreenEl = document.getElementById("start-screen");
  landingScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
  });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time <= 1) {
      time = 0;
      quizEnd();
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById("quiz-end");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("score-final");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time < 1) {
    quizEnd();
  }
}

// Save score in local storage along with users' name

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

// Save users' score after pressing enter

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;