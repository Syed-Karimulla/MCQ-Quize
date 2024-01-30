//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    correct: "Mandarin",
  },
  {
    id: "1",
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: "Europe",
  },
  {
    id: "2",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
  },
  {
    id: "3",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Rome", "Paris"],
    correct: "Paris",
  },
  {
    id: "4",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: "Mars",
  },
  {
    id: "5",
    question: "What is the largest mammal in the world?",
    options: ["Giraffe", "Elephant", "Blue Whale", "Hippopotamus"],
    correct: "Blue Whale",
  },
  {
    id: "6",
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    correct: "Carbon Dioxide",
  },
  {
    id: "7",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: "Au",
  },
];
// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
// Next Button
nextBtn.addEventListener("click", () => {
  // Increment questionCount
  questionCount += 1;
  // If last question
  if (questionCount === quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    // User score
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    // Display questionCount
    countOfQuestion.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " questions";
    // Display quiz
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});
// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      nextBtn.click(); // Automatically move to the next question
    }
  }, 1000);
};
// Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  // Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Display current question card
  quizCards[questionCount].classList.remove("hide");
};
// Quiz Creation
function quizCreator() {
  // Randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  // Generate quiz
  for (let i of quizArray) {
    // Randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    // Quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    // Question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " questions";
    // Question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    // Options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
// Checker Function to check if the option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  // If the user clicked answer == correct option stored in the object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    // For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  // Clear interval (stop the timer)
  clearInterval(countdown);
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}
// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
// When the user clicks on the start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});
// Hide the quiz and display the start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};