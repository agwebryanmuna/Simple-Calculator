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
const footer = document.querySelector("footer");

let questionIndex = 0;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
totalQuestions.textContent = QUIZ_DATA.length;
let nextButtonHandler = null;

// get 1 question questions
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

  // the button never changes, unlike the lis, event listener accumulates and causes
  // stopQuestion() to execute multiple times
  // (This is not an AI prompt but for future references)
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

const displayCongratsPage = (correctAnswerCount, wrongAnswerCount) => {
  const score = (correctAnswerCount / QUIZ_DATA.length) * 100;
  mainContent.innerHTML = `
  <h2 class="congrats">CONGRATULATIONS 🎉🎉🎉</h2>
        <div class="score-container">
          <div class="score">${score}</div>
          <div>Score</div>
          <div class="correct-answers">Correct answers: ${correctAnswerCount}</div>
          <div class="wrong-answers">Wrong answers: ${wrongAnswerCount}</div>
        </div>
  `;
};

const updateDOM = (qIndex) => {
  if (qIndex === 10) {
    timeLeft.previousElementSibling.textContent = "Time";
    timeLeft.textContent = "0s";
    footer.classList.add("hidden");
    displayCongratsPage(correctAnswerCount, wrongAnswerCount);
    return;
  }

  const [mappedQuestion, questionAnswer] = loadQuestion(qIndex);

  mainContent.innerHTML = mappedQuestion;
  currentQuestion.textContent = qIndex + 1;
  progressBar.style.width = `${((qIndex + 1) / QUIZ_DATA.length) * 100}%`; // loved making this 😍

  startQuestion(qIndex, questionAnswer);
};

updateDOM(questionIndex);

/** TODOS:
 * function to show questions ✅
 * function to start question and timer ✅
 * when timer is up  record user answer and show next question ✅
 * when next button clicked  record user answer and show next question ✅
 * update progress bar (index/10)*100 ✅
 * if user doesn't select a question the answer is false ✅
 * Display congratulations page ✅
 * Miss anything 🤔?? Help me!
 */
