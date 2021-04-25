function deleteQuizz(quizId){
    const deleteForSure = confirm("Você tem certeza que deseja deletar esse quiz?");
    if(!deleteForSure){
        return;
    }
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizId}`;
    const keyToDelete = getQuizKey(quizId);
    if(!keyToDelete){
        return;
    }
    data = {
        headers: {
            "Secret-Key": keyToDelete
        }
    };

    const deletePromise = axios.delete(url, data);
    deletePromise.then(()=>{
        alert("Quiz Apagado com sucesso!");
        changeScreen("quizzes-list");
        loadQuizzes();
    });
    deletePromise.catch(()=>{
        alert("Opss... Tivemos um problema em apagar seu quizz");
        changeScreen("quizzes-list");
        loadQuizzes();
    });
    changeScreen("loading-page");
}

function updateQuizz(quizId){
    const updateForSure = confirm("Você tem certeza que deseja modificar esse quiz?");
    if(!updateForSure){
        return;
    }
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${quizId}`;
    const keyToDelete = getQuizKey(quizId);

    if(!keyToDelete){
        return;
    }
    data = {
        
    }
}

function getQuizKey(quizId){
    const idsToKeys = localStorage.getItem(listIdsAndKeys);
    if(!idsToKeys){
        return false;
    }
    const arrayIdsKeys = JSON.parse(idsToKeys);
    for(let item of arrayIdsKeys){
        if(item[0] === quizId){
            return item[1];
        }
    }
    return false;
}

function clickToEdit(){
    clickToEditQuiz = true;
}