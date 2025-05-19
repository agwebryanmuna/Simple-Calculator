const QUIZ_DATA = [
  {
    id: 1,
    question: "1. What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "2. Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "3. What is the largest ocean on Earth?",
    choices: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    id: 4,
    question: "4. Who wrote 'To Kill a Mockingbird'?",
    choices: [
      "Harper Lee",
      "J.K. Rowling",
      "George Orwell",
      "F. Scott Fitzgerald",
    ],
    answer: "Harper Lee",
  },
  {
    id: 5,
    question: "5. Which element has the chemical symbol 'O'?",
    choices: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    answer: "Oxygen",
  },
  {
    id: 6,
    question: "6. What is the smallest prime number?",
    choices: ["1", "2", "3", "5"],
    answer: "2",
  },
  {
    id: 7,
    question: "7. What year did the Titanic sink?",
    choices: ["1912", "1920", "1898", "1935"],
    answer: "1912",
  },
  {
    id: 8,
    question: "8. Which country is known as the Land of the Rising Sun?",
    choices: ["China", "South Korea", "Japan", "Thailand"],
    answer: "Japan",
  },
  {
    id: 9,
    question: "9. What is the longest river in the world?",
    choices: [
      "Amazon River",
      "Nile River",
      "Yangtze River",
      "Mississippi River",
    ],
    answer: "Nile River",
  },
  {
    id: 10,
    question: "10. Who painted the Mona Lisa?",
    choices: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
];

// Get elements
const button = document.querySelector(".next");
const currentQuestion = document.querySelector(".current-question");
const totalQuestions = document.querySelector(".total-questions");
const timeLeft = document.querySelector(".seconds");
const mainContent = document.querySelector(".main-content");
const progressBar = document.querySelector(".progress-bar");

let questionIndex = 0;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
totalQuestions.textContent = QUIZ_DATA.length;
let nextButtonHandler = null;

// show questions
const loadQuestion = (qIndex) => {
  const question = QUIZ_DATA[qIndex];
  const lis = question.choices.map((choice) => `<li>${choice}</li>`).join("");

  return [
    `
   <h2 class="question">${question.question}</h2>
    <ul class="choices">
      ${lis}
    </ul>`,
    question.answer,
  ];
};

const startQuestion = (qIndex, qAnswer) => {
  let countDown = 10;
  const clock = window.setInterval(() => {
    countDown -= 1;
    timeLeft.innerHTML = countDown + "s";
  }, 1000);

  // get users answer
  let userAnswer = "";
  const lis = document.querySelectorAll("li");
  lis.forEach((li) => {
    li.addEventListener("click", (e) => {
      lis.forEach((li) => li.classList.remove("user-choice"));

      e.target.classList.add("user-choice");
      userAnswer = e.target.textContent;
    });
  });

  // stop question and move to next question
  const stopClock = window.setTimeout(() => {
    clearInterval(clock);
    stopQuestion(qIndex, qAnswer, userAnswer);
  }, 10000);

  if (nextButtonHandler) {
    button.removeEventListener("click", nextButtonHandler);
  }

  nextButtonHandler = () => {
    clearInterval(clock);
    clearTimeout(stopClock);
    stopQuestion(qIndex, qAnswer, userAnswer);
  };
  button.addEventListener("click", nextButtonHandler);
};

const stopQuestion = (qIndex, qAnswer, userAnswer) => {
  if (qAnswer === userAnswer) {
    correctAnswerCount += 1;
  }
  if (qAnswer !== userAnswer) {
    wrongAnswerCount += 1;
  }
  updateDOM(qIndex + 1);
};

const updateDOM = (qIndex) => {
  if (qIndex === 10) {
    console.log("Congratulations! You have come to the end of the quiz");
    console.log("correct answers: ", correctAnswerCount);
    console.log("wrong answers: ", wrongAnswerCount);
    console.log("score: ", `${correctAnswerCount}/10`);
    return;
  }

  const [mappedQuestion, questionAnswer] = loadQuestion(qIndex);

  mainContent.innerHTML = mappedQuestion;
  currentQuestion.textContent = qIndex + 1;
  progressBar.style.width = `${((qIndex + 1) / QUIZ_DATA.length) * 100}%`;

  startQuestion(qIndex, questionAnswer);
};

updateDOM(questionIndex);

/** TODOS:
 * function to show questions ✅
 * function to start question and timer ✅
 * when timer is up  record user answer and show next question ✅
 * when next button clicked  record user answer and show next question ✅
 * update progress bar (index/10)*100
 * if user doesn't select a question the answer is false
 */
