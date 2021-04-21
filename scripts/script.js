loadQuizzes();

function loadQuizzes() {
  let server =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes";
  let request = axios.get(server);
  request.then(updateQuizzes);
  request.catch(errorConn);
}

function isFromUser(quiz) {
  return false;
}

function updateQuizzes(response) {
  response.data.forEach((quiz) => {
    let listUsed = isFromUser(quiz) ? "user" : "all";
    let query = `.quizzes-list .${listUsed} .quizzes`;
    let quizzesTag = document.querySelector(query);

    let quizHTML = `<div class="quizz" onclick="selectQuizz(this)">
        <img src="${quiz.image}" alt="">  
        <div class="quizz-title">  
            <h2>${quiz.title}</h2>
        </div>
        <span class="hidden">${quiz.id}</span>
        </div>`;
    quizzesTag.innerHTML += quizHTML;
  });
}

function selectQuizz(quizElement) {
  let quizId = quizElement.querySelector("span").innerHTML;
  let server = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizId}`;
  let request = axios.get(server);
  request.then(goQuizzPage);
  request.catch(errorConn);
}

function goQuizzPage(response) {
  console.log(response.data);
}

function errorConn() {
  console.log("Error");
  console.error();
}
