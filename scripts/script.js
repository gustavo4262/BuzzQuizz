loadQuizzes();
let answerScore = 0;
let levels = [];

function loadQuizzes() {
  let server =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes";
  let request = axios.get(server);
  changeScreen("loading-page");
  request.then(updateQuizzes);
  request.catch(errorConn);
}

function updateQuizzes(response) {
  changeScreen("quizzes-list");
  response.data.forEach((quiz) => {
    let listUsed = isFromUser(quiz.id) ? "user" : "all";
    if (listUsed == "user") {
      document.querySelector(".user").classList.remove("empty");
      document.querySelector(".filled-list").classList.remove("hidden");
      document.querySelector(".empty-list").classList.add("hidden");
    }
    renderQuizz(quiz, listUsed);
  });
}

function selectQuizz(quizId) {
  let server = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizId}`;
  let request = axios.get(server);
  changeScreen("loading-page");
  request.then(renderQuizzPage);
  request.catch(errorConn);
}

function renderQuizzPage(response) {
  changeScreen("quizz-page");
  let quiz = response.data;
  renderBanner(quiz);

  let questions = response.data.questions;
  questions.forEach((question) => {
    renderQuestion(question);
  });
  levels = response.data.levels;
  console.log(levels);
  renderAnswer();
}

function selectAnswer(selectedElement) {
  let answers = selectedElement.parentNode;

  let question = answers.parentNode;
  if (question.classList.contains("blocked")) {
    return;
  }
  question.classList.add("blocked");

  Array.from(answers.children)
    .filter((element) => element !== selectedElement)
    .forEach((element) => {
      element.style.opacity = 0.3;
    });

  let isCorrectAnswer = Boolean(JSON.parse(selectedElement.classList[1]));
  let text = selectedElement.querySelector("h2");
  text.style.color = isCorrectAnswer ? "green" : "red";

  answerScore += isCorrectAnswer;
  renderAnswer();

  let allQuestions = Array.from(question.parentNode.children);
  allQuestions.forEach((element, index) => {
    if (element === question) {
      let nextTagIndex = index + 1;
      let nextTag = allQuestions[nextTagIndex];
      if (!nextTag) {
        nextTag = document.querySelector(".answer");
      }
      let scrollOptions = {
        behavior: "smooth",
        block: "end",
        inline: "start",
      };
      setTimeout(() => nextTag.scrollIntoView(scrollOptions), 2000);
    }
  });
}

function renderAnswer() {
  let score = Math.round((answerScore * 100) / levels.length);
  for (let i = 0; i < levels.length; i++) {
    let level = levels[i];
    console.log(level.minValue, level.title, score);
    if (score <= level.minValue || i === levels.length - 1) {
      console.log("ok", level.title, level.text);
      let answerHTML = `
              <div class="question-title ">
              <h1>${level.title}</h1>
              </div>
              <div class="description">
              <img src="${level.image}">
              <h2>${level.text}</h2>
              </div>
              `;
      let answerElement = document.querySelector(".answer");
      answerElement.innerHTML = answerHTML;
      return;
    }
  }
}

function restartQuizz() {
  document.querySelectorAll(".options").forEach((option) => {
    Array.from(option.children).forEach((item) => {
      console.log(item);
      item.style.opacity = 1;
      let text = item.querySelector("h2");
      if (text.style.color !== "#000000") text.style.color = "#000000";
    });
  });
  document.querySelectorAll(".blocked").forEach((question) => {
    question.classList.remove("blocked");
  });
  window.scrollTo(0, 0);
  answerScore = 0;
}

function changeScreen(screenToReveal) {
  let screenToHide = Array.from(document.body.children).filter(
    (el) => !el.classList.contains("hidden")
  )[1];
  screenToHide.classList.add("hidden");
  if (screenToHide.classList.contains("quizz-page")) {
    screenToHide.innerHTML = `<div class="banner"></div>
      <div class="questions"></div>
      <div class="answer"></div>
      <button onclick="restartQuizz()" class="restart">Reiniciar Quizz</button>
      <button onclick="changeScreen('quizzes-list')">Voltar pra home</button>`;
    answerScore = 0;
    levels = [];
  }
  screenToReveal = document.querySelector(`.${screenToReveal}`);
  screenToReveal.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function renderQuizz(quiz, listUsed) {
  let query = `.quizzes-list .${listUsed} .quizzes`;
  let quizzesTag = document.querySelector(query);

  let quizHTML = `<div class="quizz" onclick="selectQuizz(${quiz.id})">
            <img src="${quiz.image}" alt="">  
            <div class="quizz-title">  
                <h2>${quiz.title}</h2>
            </div>
            </div>`;
  quizzesTag.innerHTML += quizHTML;
}

function renderBanner(quizz) {
  let bannerHTML = `
        <div class="obscure"></div>
        <img src="${quizz.image}">
        <div class="quizz-title">
            <h1>${quizz.title}</h1>
        </div>`;
  let quizzPage = document.querySelector(".quizz-page .banner");
  quizzPage.innerHTML += bannerHTML;
}

function renderQuestion(question) {
  let answers = question.answers.sort(() => {
    Math.random() - 0.5;
  });

  let questionTitle = document.createElement("div");
  questionTitle.setAttribute("class", "question-title");
  questionTitle.style.backgroundColor = question.color;
  let title = document.createElement("h1");
  title.textContent = question.title;
  questionTitle.appendChild(title);

  let optionsElement = document.createElement("div");
  optionsElement.setAttribute("class", "options");

  answers.forEach((answer) => {
    let answerHTML = `
    <div class="item ${answer.isCorrectAnswer}" onclick="selectAnswer(this)">
        <img src="${answer.image}">
        <h2>${answer.text}</h2>
    </div>
    `;
    optionsElement.innerHTML += answerHTML;
  });

  let allQuestions = document.querySelector(".quizz-page .questions");
  let questionElement = document.createElement("div");
  questionElement.setAttribute("class", "question");
  questionElement.appendChild(questionTitle);
  questionElement.appendChild(optionsElement);
  allQuestions.appendChild(questionElement);
}

function isFromUser(quizId) {
  const allUserQuizzes = "myBuzzQuizzesIds";
  if (!localStorage.getItem(allUserQuizzes)) {
    return false;
  }
  const userIds = localStorage.getItem(allUserQuizzes);
  const arrayUserIds = JSON.parse(userIds);
  if (arrayUserIds.includes(quizId)) {
    return true;
  }
  return false;
}

function errorConn() {
  console.log("Error");
  console.error();
}
