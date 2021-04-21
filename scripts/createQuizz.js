let QuizzToSend = {
    title: "",
    image: "",
    questions: [],
    levels: []
};
let numberQuestions;
let numberLevels;

function initQuizz(){
    let isTitle = checkTitle();
    let isUrl = checkUrl();
    let isNumberQuestions = checkNumberQuestions();
    let isNumberQuizzes = checkNumberQuizzes();
    let checks = isTitle && isUrl && isNumberQuestions && isNumberQuizzes;
    if(!checks){
        return;
    }
    resetBeginPage();
}

function checkTitle(){
    let inputTitle = document.querySelector(".creation-input.title").value;
    inputTitle = inputTitle.trim();
    let isAcepted = (inputTitle.length >= 20) && (inputTitle.length <= 65);
    let errorMessage = document.querySelector(".error-message.title");
    if(!isAcepted){
        errorMessage.innerHTML = "O Título do quizz deve ter entre 20 e 65 caracteres";
        document.querySelector(".error-message.show-errors-begin-page").innerHTML = "Corrija os campos com erros";
        return false;
    }
    errorMessage.innerHTML = "";
    QuizzToSend.title = inputTitle;
    return true;
}

function checkUrl(){
    let inputUrl = document.querySelector(".creation-input.url").value;
    inputUrl = inputUrl.trim();
    let isAcepted = (inputUrl.slice(0,8) === "https://") || (inputUrl.slice(0,7) === "http://");
    isAcepted = isAcepted && !inputUrl.includes(" ");
    let errorMessage = document.querySelector(".error-message.url");
    if(!isAcepted){
        errorMessage.innerHTML = "A entrada deve ter o formato de URL";
        document.querySelector(".error-message.show-errors-begin-page").innerHTML = "Corrija os campos com erros";
        return false;
    }
    errorMessage.innerHTML = "";
    QuizzToSend.image = inputUrl;
    return true;
}

function checkNumberQuestions(){
    let inputNumber = document.querySelector(".creation-input.questions").value;
    inputNumber = inputNumber.trim();
    inputNumber = parseInt(inputNumber);
    let isAcepted = typeof(inputNumber) === "number" && inputNumber >= 3;
    let errorMessage = document.querySelector(".error-message.questions");
    if(!isAcepted){
        errorMessage.innerHTML = "A quantidade de perguntas deve ser pelo menos 3";
        document.querySelector(".error-message.show-errors-begin-page").innerHTML = "Corrija os campos com erros";
        return false;
    }
    errorMessage.innerHTML = "";
    numberQuestions = inputNumber;
    return true;
}

function checkNumberQuizzes(){
    let inputNumber = document.querySelector(".creation-input.levels").value;
    inputNumber = inputNumber.trim();
    inputNumber = parseInt(inputNumber);
    let isAcepted = typeof(inputNumber) === "number" && inputNumber >= 2;
    let errorMessage = document.querySelector(".error-message.levels");
    if(!isAcepted){
        errorMessage.innerHTML = "A quantidade de níveis deve ser pelo menos 2";
        document.querySelector(".error-message.show-errors-begin-page").innerHTML = "Corrija os campos com erros";
        return false;
    }
    errorMessage.innerHTML = "";
    numberLevels = inputNumber;
    return true;
}

function resetBeginPage(){
    document.querySelector(".error-message.show-errors-begin-page").innerHTML = "";
    
    document.querySelector(".error-message.title").innerHTML = "";
    document.querySelector(".error-message.url").innerHTML = "";
    document.querySelector(".error-message.questions").innerHTML = "";
    document.querySelector(".error-message.levels").innerHTML = "";

    document.querySelector(".creation-input.title").value = "";
    document.querySelector(".creation-input.url").value = "";
    document.querySelector(".creation-input.questions").value = "";
    document.querySelector(".creation-input.levels").value = "";
}