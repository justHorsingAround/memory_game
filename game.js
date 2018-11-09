function onLoad(){
    document.getElementById("start-button").addEventListener('click', onStartButtonClicked);
}

function onStartButtonClicked(){
    document.getElementById("intro-page").style.display = "none";
    const numberOfCards = document.getElementById("number-of-cards").value;
    requestCards(numberOfCards);
}

function requestCards(numberOfCards){
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:9999/start/" + numberOfCards;
    xhr.addEventListener('load', onStartResponse);
    xhr.open('GET', url);
    xhr.send();
}

function onStartResponse(){
    let responseStatus = this.status;
    if(responseStatus == 200){
        onGoodResponse(this.responseText);
    }
    else {
        addErrorMessage(this.responseText);
    }
}

function addErrorMessage(responseText){
    let error = document.getElementById("error-msg");
    while(error.firstChild){
        error.removeChild(error.firstChild);
    }

    error.style.display = 'block';
    let response = JSON.parse(responseText);

    const pEl = document.createElement('p');
    pEl.classList.add('message');
    pEl.textContent = response.message;

    error.appendChild(pEl);
}

function onGoodResponse(imageList){
    var img = imageList.split(',');
    for (let i = 0; i < img.length; i++) {
        if(img[i] !== ""){
            const xhr = new XMLHttpRequest();
            const url = "http://localhost:9999/getcards?card=" + img[i];
            xhr.addEventListener('load', processImageResult);
            xhr.open('GET', url);
            xhr.send();
        }
    }
}

function processImageResult(){
    if (this.status == 200){

    }
    else {
        addErrorMessage(this.responseText);
    }


    var outputImg = document.createElement('img');

}



document.addEventListener('DOMContentLoaded', function(){ onLoad();});

