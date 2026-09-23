import "./style.css";

const quizzes = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    questions: [
      {
        q: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Pune", "Chennai"],
        answer: 1
      },
      {
        q: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: 2
      },
      {
        q: "How many days are there in a week?",
        options: ["5", "6", "7", "8"],
        answer: 2
      }
    ]
  },
  {
    id: 2,
    title: "Computer Basics",
    questions: [
      {
        q: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Control Processing User"
        ],
        answer: 0
      },
      {
        q: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: 1
      }
    ]
  }
];

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let loggedIn = false;

const app = document.querySelector("#app");

function renderHome() {
  app.innerHTML = `
    <header>
      <div class="logo">🧠 QuizMaster</div>
      <nav>
        <button onclick="showHome()">Home</button>
        <button onclick="showQuizzes()">Take Quiz</button>
        <button onclick="showCreate()">Create Quiz</button>
        <button onclick="showLogin()">${loggedIn ? "Logout" : "Login"}</button>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div>
          <span class="badge">ONLINE QUIZ MAKER</span>
          <h1>Learn. Play. <span>Challenge Yourself.</span></h1>
          <p>Create your own quizzes or take quizzes created by others and get your score instantly.</p>
          <div class="hero-buttons">
            <button class="primary" onclick="showQuizzes()">Take a Quiz →</button>
            <button class="secondary" onclick="showCreate()">Create Quiz</button>
          </div>
        </div>
        <div class="hero-card">
          <div class="circle">🧠</div>
          <h2>Ready to test yourself?</h2>
          <p>Choose from available quizzes and start learning.</p>
        </div>
      </section>

      <section class="features">
        <div class="feature"><b>📝</b><h3>Create Quizzes</h3><p>Add questions and multiple-choice answers.</p></div>
        <div class="feature"><b>🎯</b><h3>Take Quizzes</h3><p>Answer questions one at a time.</p></div>
        <div class="feature"><b>🏆</b><h3>Instant Results</h3><p>See your score and correct answers.</p></div>
        <div class="feature"><b>📱</b><h3>Mobile Friendly</h3><p>Works smoothly on different devices.</p></div>
      </section>
    </main>
  `;
}

function showQuizzes() {
  app.innerHTML = `
    <header>
      <div class="logo">🧠 QuizMaster</div>
      <nav>
        <button onclick="showHome()">Home</button>
        <button onclick="showCreate()">Create Quiz</button>
        <button onclick="showLogin()">${loggedIn ? "Logout" : "Login"}</button>
      </nav>
    </header>

    <main class="page">
      <h1>Available Quizzes</h1>
      <p class="sub">Choose a quiz and test your knowledge.</p>

      <div class="quiz-grid">
        ${quizzes.map((quiz) => `
          <div class="quiz-card">
            <div class="quiz-icon">❓</div>
            <h2>${quiz.title}</h2>
            <p>${quiz.questions.length} Questions</p>
            <button class="primary full" onclick="startQuiz(${quiz.id})">Start Quiz →</button>
          </div>
        `).join("")}
      </div>
    </main>
  `;
}

function startQuiz(id) {
  currentQuiz = quizzes.find(q => q.id === id);
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  renderQuestion();
}

function renderQuestion() {
  const question = currentQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

  app.innerHTML = `
    <main class="quiz-page">
      <div class="quiz-top">
        <button onclick="showQuizzes()">← Back</button>
        <span>Question ${currentQuestion + 1} of ${currentQuiz.questions.length}</span>
      </div>

      <div class="progress"><div style="width:${progress}%"></div></div>

      <div class="question-box">
        <h1>${question.q}</h1>

        <div class="options">
          ${question.options.map((option, index) => `
            <button class="option ${selectedAnswer === index ? "selected" : ""}"
              onclick="selectAnswer(${index})">
              <span>${String.fromCharCode(65 + index)}</span>
              ${option}
            </button>
          `).join("")}
        </div>

        <button class="primary next" onclick="nextQuestion()">
          ${currentQuestion === currentQuiz.questions.length - 1 ? "Finish Quiz" : "Next Question →"}
        </button>
      </div>
    </main>
  `;
}

function selectAnswer(index) {
  selectedAnswer = index;
  renderQuestion();
}

function nextQuestion() {
  if (selectedAnswer === null) {
    alert("Please select an answer.");
    return;
  }

  if (selectedAnswer === currentQuiz.questions[currentQuestion].answer) {
    score++;
  }

  if (currentQuestion < currentQuiz.questions.length - 1) {
    currentQuestion++;
    selectedAnswer = null;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const total = currentQuiz.questions.length;
  const percentage = Math.round((score / total) * 100);

  app.innerHTML = `
    <main class="result-page">
      <div class="result-card">
        <div class="trophy">🏆</div>
        <h1>Quiz Completed!</h1>
        <p>Your final score is</p>
        <div class="score">${score}/${total}</div>
        <h2>${percentage}%</h2>

        <div class="answers">
          ${currentQuiz.questions.map((q, i) => `
            <div class="answer-row">
              <b>${i + 1}. ${q.q}</b>
              <p>Correct answer: ${q.options[q.answer]}</p>
            </div>
          `).join("")}
        </div>

        <button class="primary" onclick="showQuizzes()">Take Another Quiz</button>
        <button class="secondary" onclick="showHome()">Back Home</button>
      </div>
    </main>
  `;
}

function showCreate() {
  app.innerHTML = `
    <header>
      <div class="logo">🧠 QuizMaster</div>
      <nav>
        <button onclick="showHome()">Home</button>
        <button onclick="showQuizzes()">Take Quiz</button>
        <button onclick="showLogin()">${loggedIn ? "Logout" : "Login"}</button>
      </nav>
    </header>

    <main class="page">
      <div class="form-card">
        <h1>Create a New Quiz</h1>
        <p class="sub">Add your quiz questions and answers.</p>

        <label>Quiz Title</label>
        <input id="quizTitle" placeholder="Example: JavaScript Basics">

        <div id="questionContainer">
          ${questionForm(1)}
        </div>

        <button class="secondary" onclick="addQuestion()">+ Add Question</button>
        <button class="primary full" onclick="saveQuiz()">Publish Quiz</button>
      </div>
    </main>
  `;
}

let questionCount = 1;

function questionForm(number) {
  return `
    <div class="question-form">
      <h3>Question ${number}</h3>
      <input class="question" placeholder="Enter question">

      <input class="optionA" placeholder="Option A">
      <input class="optionB" placeholder="Option B">
      <input class="optionC" placeholder="Option C">
      <input class="optionD" placeholder="Option D">

      <label>Correct Answer</label>
      <select class="correct">
        <option value="0">Option A</option>
        <option value="1">Option B</option>
        <option value="2">Option C</option>
        <option value="3">Option D</option>
      </select>
    </div>
  `;
}

function addQuestion() {
  questionCount++;
  document.querySelector("#questionContainer").insertAdjacentHTML(
    "beforeend",
    questionForm(questionCount)
  );
}

function saveQuiz() {
  const title = document.querySelector("#quizTitle").value.trim();
  const forms = document.querySelectorAll(".question-form");

  if (!title) {
    alert("Please enter quiz title.");
    return;
  }

  const questions = [];

  for (const form of forms) {
    const q = form.querySelector(".question").value.trim();
    const options = [
      form.querySelector(".optionA").value.trim(),
      form.querySelector(".optionB").value.trim(),
      form.querySelector(".optionC").value.trim(),
      form.querySelector(".optionD").value.trim()
    ];
    const answer = Number(form.querySelector(".correct").value);

    if (!q || options.some(o => !o)) {
      alert("Please fill all question fields.");
      return;
    }

    questions.push({ q, options, answer });
  }

  quizzes.push({
    id: Date.now(),
    title,
    questions
  });

  alert("Quiz created successfully! 🎉");
  questionCount = 1;
  showQuizzes();
}

function showLogin() {
  if (loggedIn) {
    loggedIn = false;
    alert("Logged out successfully.");
    showHome();
    return;
  }

  app.innerHTML = `
    <main class="login-page">
      <div class="login-card">
        <div class="logo">🧠 QuizMaster</div>
        <h1>Welcome Back</h1>
        <p>Login to access your personalized quiz experience.</p>

        <input id="email" type="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">

        <button class="primary full" onclick="login()">Login</button>

        <p class="small">Demo authentication — enter any email and password.</p>
        <button class="secondary full" onclick="showHome()">Back Home</button>
      </div>
    </main>
  `;
}

function login() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  loggedIn = true;
  alert("Login successful! 🎉");
  showHome();
}

window.showHome = () => {
  questionCount = 1;
  renderHome();
};

window.showQuizzes = showQuizzes;
window.showCreate = showCreate;
window.showLogin = showLogin;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.addQuestion = addQuestion;
window.saveQuiz = saveQuiz;
window.login = login;

renderHome();