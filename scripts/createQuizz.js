let quizzToSend = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};
let numberQuestions = 3;
let numberLevels = 3;

/* Development */
// document.querySelector(".quizzes-list").classList.add("hidden");
// document.querySelector(".quizz-page").classList.add("hidden");
// document.querySelector(".quizz-creation").classList.remove("hidden");
// document.querySelector(".begin-page").classList.add("hidden");
// initLevels();
/*End development */

function initQuizz() {
  let isTitle = checkTitle();
  let isUrl = checkUrl();
  let isNumberQuestions = checkNumberQuestions();
  let isNumberQuizzes = checkNumberQuizzes();
  let checks = isTitle && isUrl && isNumberQuestions && isNumberQuizzes;
  if (!checks) {
    return;
  }
  resetBeginPage();
  initQuestions();
}

function initQuestions() {
  document.querySelector(".begin-page").classList.add("hidden");
  let questionsPage = document.querySelector(".questions-page");
  questionsPage.classList.remove("hidden");
  questionsPage.innerHTML = `<p class="call-to-creation">Crie suas perguntas</p>`;
  for (let i = 1; i <= numberQuestions; i++) {
    questionsPage.innerHTML += `<div class="question-keeper question${i}" onClick="showFormQuestion(this)">
            <p class="call-to-creation">Pergunta ${i}</p>
            <ion-icon name="create-sharp" class="icon-edit"></ion-icon>
        </div>
        <div class="question-config question${i} hidden">
            <p class="call-to-creation form-question">Pergunta ${i}</p>
            <input type="text" placeholder="Texto da pergunta" class="creation-input question-text">
            <p class="error-message question-text"></p>
            <input type="text" placeholder="Cor de fundo da pergunta" class="creation-input question-color">
            <p class="error-message question-color"></p>

            <p class="call-to-creation form-question">Resposta Correta</p>
            <input type="text" placeholder="Resposta correta" class="creation-input right-answer">
            <p class="error-message right-answer"></p>
            <input type="text" placeholder="URL da imagem" class="creation-input answer-url">
            <p class="error-message answer-url"></p>

            <p class="call-to-creation form-question">Respostas Incorretas</p>
            <div class="incorrect-answer ia1">
                <input type="text" placeholder="Resposta incorreta 1" class="creation-input ia1">
                <p class="error-message ia1"></p>
                <input type="text" placeholder="URL da imagem 1" class="creation-input i-url1">
                <p class="error-message i-url1"></p>
            </div>
            <div class="incorrect-answer ia2">
                <input type="text" placeholder="Resposta incorreta 2" class="creation-input ia2">
                <p class="error-message ia2"></p>
                <input type="text" placeholder="URL da imagem 2" class="creation-input i-url2">
                <p class="error-message i-url2"></p>
            </div><div class="incorrect-answer ia3">
                <input type="text" placeholder="Resposta incorreta 3" class="creation-input ia3">
                <p class="error-message ia3"></p>
                <input type="text" placeholder="URL da imagem 3" class="creation-input i-url3">
                <p class="error-message i-url3"></p>
            </div>
        </div>`;
  }
  questionsPage.innerHTML += `<p class="error-message show-errors-questions-page"></p>
        <button class="proceed-to-next" onClick="checkQuestionsPage()">Prosseguir pra criar níveis</button>`;
}

function checkQuestionsPage() {
  let allQuestionsConfig = document.querySelectorAll(".question-config");
  quizzToSend.questions = [];
  let boolAllRight = true;
  for (let i = 1; i <= allQuestionsConfig.length; i++) {
    let textQuestion = checkTextQuestion(i);
    let colorQuestion = checkColorQuestion(i);
    let answersQuestion = checkAnswersQuestion(i);
    checks = textQuestion[0] && colorQuestion[0] && answersQuestion[0];
    if (!checks) {
      boolAllRight = false;
      continue;
    }
    let oneQuestion = {
      title: textQuestion[1],
      color: colorQuestion[1],
      answers: answersQuestion[1],
    };
    quizzToSend.questions.push(oneQuestion);
  }
  if (!boolAllRight) {
    return;
  }
  resetQuestionsPage();
  initLevels();
}

function initLevels() {
  document.querySelector(".questions-page").classList.add("hidden");
  let levelsPage = document.querySelector(".levels-page");
  levelsPage.classList.remove("hidden");
  levelsPage.innerHTML = `<p class="call-to-creation">Agora, decida os níveis</p>`;
  for (let i = 1; i <= numberLevels; i++) {
    levelsPage.innerHTML += `<div class="level-keeper level${i}" onClick="showFormLevel(this)">
            <p class="call-to-creation">Nível ${i}</p>
            <ion-icon name="create-sharp" class="icon-edit"></ion-icon>
        </div>
        <div class="level-config level${i} hidden">
            <p class="call-to-creation form-question">Nível ${i}</p>
            <input type="text" placeholder="Título do nível" class="creation-input level-title">
            <p class="error-message level-title"></p>
            <input type="text" placeholder="% de acerto mínima" class="creation-input percent">
            <p class="error-message percent"></p>
            <input type="text" placeholder="URL da imagem do nível" class="creation-input level-url">
            <p class="error-message level-url"></p>
            <textarea type="text" placeholder="Descrição do nível" class="creation-input level-description"></textarea>
            <p class="error-message level-description"></p>
        </div>`;
  }
  levelsPage.innerHTML += `<p class="error-message show-errors-levels-page"></p>
        <button class="proceed-to-next" onClick="checkLevelssPage()">Prosseguir pra criar níveis</button>`;
}

function checkLevelsPage() {}

function checkAnswersQuestion(idxQuestion) {
  let rightAnswer = checkRightAnswerQuestion(idxQuestion);
  let wrongAnswers = checkWrongAnswersQuestion(idxQuestion);

  let check = rightAnswer[0] && wrongAnswers[0];
  if (!check) {
    return [false, false];
  }
  let allAnswers = rightAnswer[1].concat(wrongAnswers[1]);
  return [true, allAnswers];
}

function checkWrongAnswersQuestion(idxQuestion) {
  let questionObj = document.querySelector(
    ".question-config.question" + idxQuestion
  );
  let isAllRight = true;
  let wrongAnswers = [];
  for (let i = 1; i <= 3; i++) {
    let incorrectAnswer = questionObj.querySelector(".ia" + i);
    let inputAnswer = incorrectAnswer.querySelector(".creation-input.ia" + i)
      .value;
    let inputUrl = incorrectAnswer.querySelector(".creation-input.i-url" + i)
      .value;
    inputAnswer = inputAnswer.trim();
    inputUrl = inputUrl.trim();

    if (inputAnswer === "" && inputUrl === "") {
      continue;
    }
    let isAnswerAccepted = inputAnswer !== "";
    let errorMessageAnswer = incorrectAnswer.querySelector(
      ".error-message.ia" + i
    );
    if (!isAnswerAccepted) {
      errorMessageAnswer.innerHTML =
        "O texto da resposta não pode estar vazio.";
      document.querySelector(
        ".error-message.show-errors-questions-page"
      ).innerHTML = "Corrija os campos com erros";
    } else {
      errorMessageAnswer.innerHTML = "";
    }

    let isUrlAccepted =
      inputUrl.slice(0, 8) === "https://" || inputUrl.slice(0, 7) === "http://";
    isUrlAccepted = isUrlAccepted && !inputUrl.includes(" ");
    let errorMessageUrl = incorrectAnswer.querySelector(
      ".error-message.i-url" + i
    );
    if (!isUrlAccepted) {
      errorMessageUrl.innerHTML = "A entrada deve ter o formato de URL";
      document.querySelector(
        ".error-message.show-errors-questions-page"
      ).innerHTML = "Corrija os campos com erros";
    } else {
      errorMessageUrl.innerHTML = "";
    }
    let isAccepted = isAnswerAccepted && isUrlAccepted;
    if (!isAccepted) {
      isAllRight = false;
      continue;
    }
    let objWrongAnswer = {
      text: inputAnswer,
      image: inputUrl,
      isCorrectAnswer: false,
    };
    wrongAnswers.push(objWrongAnswer);
  }
  if (!isAllRight) {
    return [false, false];
  }
  if (wrongAnswers.length <= 0) {
    let incorrectAnswer = questionObj.querySelector(".ia1");
    let errorMessageAnswer = incorrectAnswer.querySelector(
      ".error-message.ia1"
    );
    let errorMessageUrl = incorrectAnswer.querySelector(
      ".error-message.i-url1"
    );
    errorMessageAnswer.innerHTML =
      "Preencha pelo menos uma resposta incorreta.";
    errorMessageUrl.innerHTML = "Preencha pelo menos uma resposta incorreta.";
    document.querySelector(
      ".error-message.show-errors-questions-page"
    ).innerHTML = "Corrija os campos com erros";
    return [false, false];
  }
  return [true, wrongAnswers];
}

function checkRightAnswerQuestion(idxQuestion) {
  let questionObj = document.querySelector(
    ".question-config.question" + idxQuestion
  );
  let inputAnswer = questionObj.querySelector(".creation-input.right-answer")
    .value;
  inputAnswer = inputAnswer.trim();
  let isAnswerAccepted = inputAnswer !== "";
  let errorMessageAnswer = questionObj.querySelector(
    ".error-message.right-answer"
  );
  if (!isAnswerAccepted) {
    errorMessageAnswer.innerHTML = "O texto da resposta não pode estar vazio.";
    document.querySelector(
      ".error-message.show-errors-questions-page"
    ).innerHTML = "Corrija os campos com erros";
  } else {
    errorMessageAnswer.innerHTML = "";
  }

  let inputUrl = questionObj.querySelector(".creation-input.answer-url").value;
  inputUrl = inputUrl.trim();
  let isUrlAccepted =
    inputUrl.slice(0, 8) === "https://" || inputUrl.slice(0, 7) === "http://";
  isUrlAccepted = isUrlAccepted && !inputUrl.includes(" ");
  let errorMessageUrl = questionObj.querySelector(".error-message.answer-url");
  if (!isUrlAccepted) {
    errorMessageUrl.innerHTML = "A entrada deve ter o formato de URL";
    document.querySelector(
      ".error-message.show-errors-questions-page"
    ).innerHTML = "Corrija os campos com erros";
  } else {
    errorMessageUrl.innerHTML = "";
  }
  let isAccepted = isAnswerAccepted && isUrlAccepted;
  if (!isAccepted) {
    return [false, false];
  }
  let objRightAnswer = {
    text: inputAnswer,
    image: inputUrl,
    isCorrectAnswer: true,
  };
  return [true, [objRightAnswer]];
}

function checkTextQuestion(idxQuestion) {
  let questionObj = document.querySelector(
    ".question-config.question" + idxQuestion
  );
  let inputText = questionObj.querySelector(".creation-input.question-text")
    .value;
  inputText = inputText.trim();
  let isAccepted = inputText.length >= 20;
  let errorMessage = questionObj.querySelector(".error-message.question-text");
  if (!isAccepted) {
    errorMessage.innerHTML =
      "O Texto da pergunta deve ter no mínimo 20 caracteres";
    document.querySelector(
      ".error-message.show-errors-questions-page"
    ).innerHTML = "Corrija os campos com erros";
    return [false, false];
  }
  errorMessage.innerHTML = "";
  return [true, inputText];
}

function checkColorQuestion(idxQuestion) {
  let questionObj = document.querySelector(
    ".question-config.question" + idxQuestion
  );
  let inputColor = questionObj.querySelector(".creation-input.question-color")
    .value;
  inputColor = inputColor.trim();
  let isAccepted = inputColor.length === 7 && inputColor[0] === "#";
  isAccepted = isAccepted && checkStrColorChar(inputColor.slice(1, 7));
  let errorMessage = questionObj.querySelector(".error-message.question-color");
  if (!isAccepted) {
    errorMessage.innerHTML =
      "Deve ser uma cor em Hexadecimal no formato '#ABCDEF'";
    document.querySelector(
      ".error-message.show-errors-questions-page"
    ).innerHTML = "Corrija os campos com erros";
    return [false, false];
  }
  errorMessage.innerHTML = "";
  return [true, inputColor];
}

function checkStrColorChar(inputColor) {
  const allowedChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  for (let i = 0; i < inputColor.length; i++) {
    if (!allowedChars.includes(inputColor[i])) {
      return false;
    }
  }
  return true;
}

function checkTitle() {
  let inputTitle = document.querySelector(".creation-input.title").value;
  inputTitle = inputTitle.trim();
  let isAccepted = inputTitle.length >= 20 && inputTitle.length <= 65;
  let errorMessage = document.querySelector(".error-message.title");
  if (!isAccepted) {
    errorMessage.innerHTML =
      "O Título do quizz deve ter entre 20 e 65 caracteres";
    document.querySelector(".error-message.show-errors-begin-page").innerHTML =
      "Corrija os campos com erros";
    return false;
  }
  errorMessage.innerHTML = "";
  quizzToSend.title = inputTitle;
  return true;
}

function checkUrl() {
  let inputUrl = document.querySelector(".creation-input.url").value;
  inputUrl = inputUrl.trim();
  let isAccepted =
    inputUrl.slice(0, 8) === "https://" || inputUrl.slice(0, 7) === "http://";
  isAccepted = isAccepted && !inputUrl.includes(" ");
  let errorMessage = document.querySelector(".error-message.url");
  if (!isAccepted) {
    errorMessage.innerHTML = "A entrada deve ter o formato de URL";
    document.querySelector(".error-message.show-errors-begin-page").innerHTML =
      "Corrija os campos com erros";
    return false;
  }
  errorMessage.innerHTML = "";
  quizzToSend.image = inputUrl;
  return true;
}

function checkNumberQuestions() {
  let inputNumber = document.querySelector(".creation-input.questions").value;
  inputNumber = inputNumber.trim();
  inputNumber = parseInt(inputNumber);
  let isAccepted = typeof inputNumber === "number" && inputNumber >= 3;
  let errorMessage = document.querySelector(".error-message.questions");
  if (!isAccepted) {
    errorMessage.innerHTML = "A quantidade de perguntas deve ser pelo menos 3";
    document.querySelector(".error-message.show-errors-begin-page").innerHTML =
      "Corrija os campos com erros";
    return false;
  }
  errorMessage.innerHTML = "";
  numberQuestions = inputNumber;
  return true;
}

function checkNumberQuizzes() {
  let inputNumber = document.querySelector(".creation-input.levels").value;
  inputNumber = inputNumber.trim();
  inputNumber = parseInt(inputNumber);
  let isAccepted = typeof inputNumber === "number" && inputNumber >= 2;
  let errorMessage = document.querySelector(".error-message.levels");
  if (!isAccepted) {
    errorMessage.innerHTML = "A quantidade de níveis deve ser pelo menos 2";
    document.querySelector(".error-message.show-errors-begin-page").innerHTML =
      "Corrija os campos com erros";
    return false;
  }
  errorMessage.innerHTML = "";
  numberLevels = inputNumber;
  return true;
}

function resetBeginPage() {
  document.querySelector(".error-message.show-errors-begin-page").innerHTML =
    "";

  document.querySelector(".error-message.title").innerHTML = "";
  document.querySelector(".error-message.url").innerHTML = "";
  document.querySelector(".error-message.questions").innerHTML = "";
  document.querySelector(".error-message.levels").innerHTML = "";

  document.querySelector(".creation-input.title").value = "";
  document.querySelector(".creation-input.url").value = "";
  document.querySelector(".creation-input.questions").value = "";
  document.querySelector(".creation-input.levels").value = "";
}

function resetQuestionsPage() {
  document.querySelector(
    ".error-message.show-errors-questions-page"
  ).innerHTML = "";
  for (let i = 1; i <= numberQuestions; i++) {
    let questionObj = document.querySelector(".question-config.question" + i);
    questionObj.querySelector(".creation-input.question-text").value = "";
    questionObj.querySelector(".error-message.question-text").innerHTML = "";

    questionObj.querySelector(".creation-input.question-color").value = "";
    questionObj.querySelector(".error-message.question-color").innerHTML = "";

    questionObj.querySelector(".creation-input.right-answer").value = "";
    questionObj.querySelector(".error-message.right-answer").innerHTML = "";

    questionObj.querySelector(".creation-input.answer-url").value = "";
    questionObj.querySelector(".error-message.answer-url").innerHTML = "";

    for (let j = 1; j <= 3; j++) {
      let incorrectAnswer = questionObj.querySelector(".ia" + i);
      incorrectAnswer.querySelector(".error-message.ia" + j).innerHTML = "";
      incorrectAnswer.querySelector(".error-message.i-url" + j).value = "";
    }
  }
}

function showFormQuestion(obj) {
  let allQuestionsKeeper = document.querySelectorAll(".question-keeper");
  for (let questionK of allQuestionsKeeper) {
    if (questionK.classList.contains("hidden")) {
      questionK.classList.remove("hidden");
    }
  }
  let allQuestionsConfig = document.querySelectorAll(".question-config");
  for (let questionC of allQuestionsConfig) {
    if (!questionC.classList.contains("hidden")) {
      questionC.classList.add("hidden");
    }
  }
  let classObj = obj.classList[1];
  let numberThisQuestion;
  if (classObj.slice(0, 8) === "question") {
    numberThisQuestion = classObj.slice(8, classObj.length);
  }
  obj.classList.add("hidden");
  document
    .querySelector(".question-config.question" + numberThisQuestion)
    .classList.remove("hidden");
}

function showFormLevel(obj) {
  let allLevelsKeeper = document.querySelectorAll(".level-keeper");
  for (let levelK of allLevelsKeeper) {
    if (levelK.classList.contains("hidden")) {
      levelK.classList.remove("hidden");
    }
  }
  let allLevelsConfig = document.querySelectorAll(".level-config");
  for (let levelC of allLevelsConfig) {
    if (!levelC.classList.contains("hidden")) {
      levelC.classList.add("hidden");
    }
  }
  let classObj = obj.classList[1];
  let numberThislevel;
  if (classObj.slice(0, 5) === "level") {
    numberThislevel = classObj.slice(5, classObj.length);
  }
  obj.classList.add("hidden");
  document
    .querySelector(".level-config.level" + numberThislevel)
    .classList.remove("hidden");
}
