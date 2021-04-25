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
        deleteIdfromLocalStorage(quizId);
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
    isEditingQuizz = true;
    editingQuizId = quizId;
    changeScreen("quizz-creation");
    
}

function updateQuizzOnServer(){
    if (!document.querySelector(".levels-page").classList.contains("hidden")) {
        document.querySelector(".levels-page").classList.add("hidden");
    }
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${editingQuizId}`;

    const keyToUpdate = getQuizKey(editingQuizId);
    data = {
        headers: {
            "Secret-Key": keyToUpdate
        }
    };

    const updateQuizzPromise = axios.put(url,quizzToSend, data);

    changeScreen("loading-page");
    updateQuizzPromise.then((response) => {
        alert("Seu quiz foi modificado com sucesso!");
        deleteIdfromLocalStorage(editingQuizId);
        renderSuccessPage(response.data);
        saveIdLocalStorage(response.data.id);
        listIdsKeysLocalStorage(response.data);
    });
    updateQuizzPromise.catch(() => {
        alert("Infelizmente não foi possível Atualizar seu quiz! Tente novamente");
        changeScreen("quizzes-list");
    });
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

function deleteIdfromLocalStorage(idToDelete){
    if(!localStorage.getItem(listIdsAndKeys)){
        return;
    }
    else{
        const idsKeysSent = localStorage.getItem(listIdsAndKeys);
        let userIdsKeys = JSON.parse(idsKeysSent);
        userIdsKeys = userIdsKeys.filter((item) =>{
            return item[0] != idToDelete;
        })

        const userIdsKeysToSent = JSON.stringify(userIdsKeys);
        localStorage.setItem(listIdsAndKeys, userIdsKeysToSent);
    }

    if (!localStorage.getItem(allUserQuizzes)) {
        return;
    } 
    else {
        const userSentIds = localStorage.getItem(allUserQuizzes);
        let userIdsSent = JSON.parse(userSentIds);
        userIdSent = userIdsSent.filter((item)=>{
            return item !== idToDelete;
        });

        const userIdsToSent = JSON.stringify(userIdsSent);
        localStorage.setItem(allUserQuizzes, userIdsToSent);
    }
}