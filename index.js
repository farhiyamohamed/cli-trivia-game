
const readline = require("readline");

// Create CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array of trivia questions (meets array requirement)
const questions = [
  {
    question: "What does CLI stand for?",
    choices: ["Command Line Interface", "Computer Language Input", "Code Logic Index"],
    answer: 0
  },
  {
    question: "Which keyword creates a variable in JavaScript?",
    choices: ["var", "define", "make"],
    answer: 0
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    choices: ["JSON.parse()", "JSON.stringify()", "JSON.convert()"],
    answer: 0
  },
  {
    question: "Which array method iterates over each element?",
    choices: ["forEach", "map", "filter"],
    answer: 0
  }
];

// Game state variables
let score = 0;
let currentQuestion = 0;
let timeLeft = 30; // Total time for the quiz in seconds
let timer;

// Function: Start the timer (ASYNC feature)
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      console.log("\n⏰ Time is up!");
      endGame();
    }
  }, 1000);
}

// Function: Start the game
function startGame() {
  console.log("🎮 Welcome to the CLI Trivia Game!");
  console.log(`⏱ You have ${timeLeft} seconds to answer all questions.\n`);

  startTimer();
  askQuestion();
}

// Function: Ask a question
function askQuestion() {
  if (currentQuestion >= questions.length) {
    return endGame();
  }

  const q = questions[currentQuestion];
  console.log(`\n${q.question}`);

  // Array iteration for displaying choices
  q.choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });

  rl.question("\nChoose a number: ", (input) => {
    checkAnswer(input);
  });
}

// Function: Check user's answer
function checkAnswer(input) {
  const answer = parseInt(input) - 1;

  if (answer === questions[currentQuestion].answer) {
    console.log("✅ Correct!");
    score++;
  } else {
    console.log(`❌ Incorrect! The correct answer was: ${questions[currentQuestion].choices[questions[currentQuestion].answer]}`);
  }

  currentQuestion++;
  askQuestion();
}

// Function: End the game
function endGame() {
  clearInterval(timer);
  console.log("\n🏁 Game Over!");
  console.log(`Your final score: ${score} / ${questions.length}`);
  rl.close();
}

// Start the game
startGame();
