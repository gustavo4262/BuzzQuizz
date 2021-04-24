loadQuizzes();

function loadQuizzes() {
  let server =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes";
  let request = axios.get(server);
  console.log("loading");
  request.then(updateQuizzes);
  request.catch(errorConn);
}

function updateQuizzes(response) {
  console.log("loaded");
  response.data.forEach((quiz) => {
    let listUsed = isFromUser(quiz) ? "user" : "all";
    renderQuizz(quiz, listUsed);
  });
}

function selectQuizz(quizId) {
  let server = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizId}`;
  let request = axios.get(server);
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
}

function selectAnswer(selectedElement) {
  let question = selectedElement.parentNode;
  if (question.classList.contains("blocked")) {
    return;
  }

  Array.from(question.children)
    .filter((element) => element !== selectedElement)
    .forEach((element) => {
      element.style.opacity = 0.3;
    });

  question.classList.add("blocked");

  let isCorrectAnswer = Boolean(
    JSON.parse(selectedElement.querySelector("span").innerHTML)
  );
  let text = selectedElement.querySelector("h2");
  text.style.color = isCorrectAnswer ? "green" : "red";

  let allQuestions = Array.from(question.parentNode.children);
  allQuestions.forEach((element, index) => {
    if (element === question) {
      let nextQuestionIndex = index + 2;
      let nextQuestion = allQuestions[nextQuestionIndex];
      console.log(nextQuestion);
      let scrollOptions = {
        behavior: "smooth",
        block: "end",
        inline: "start",
      };
      setTimeout(() => nextQuestion.scrollIntoView(scrollOptions), 2000);
    }
  });
}

function errorConn() {
  console.log("Error");
  console.error();
}

function changeScreen(screenToReveal) {
  let screenToHide = Array.from(document.body.children).filter(
    (el) => !el.classList.contains("hidden")
  )[1];
  screenToHide.classList.add("hidden");
  console.log(screenToHide);
  if (screenToHide.classList.contains("quizz-page")) {
    screenToHide.innerHTML = `<div class="banner"></div>
      <div class="questions"></div>`;
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

  let questionHTML = `
            <div class="options">
                <div class="item" onclick="selectAnswer(this)">
                    <img src="${answers[0].image}">
                    <h2>${answers[0].text}</h2>
                    <span class="hidden">${answers[0].isCorrectAnswer}</span>
                </div>
                <div class="item" onclick="selectAnswer(this)">
                    <img src="${answers[1].image}">
                    <h2>${answers[1].text}</h2>
                    <span class="hidden">${answers[1].isCorrectAnswer}</span>
                </div>
                <div class="item" onclick="selectAnswer(this)">
                    <img src="${answers[2].image}">
                    <h2>${answers[2].text}</h2>
                    <span class="hidden">${answers[2].isCorrectAnswer}</span>
                </div>
                <div class="item" onclick="selectAnswer(this)">
                    <img src="${answers[3].image}">
                    <h2>${answers[3].text}</h2>
                    <span class="hidden">${answers[3].isCorrectAnswer}</span>
                </div>
            </div>`;
  let questionsElement = document.querySelector(".quizz-page .questions");
  questionsElement.appendChild(questionTitle);
  questionsElement.innerHTML += questionHTML;
}

function isFromUser(quiz) {
  return false;
}
