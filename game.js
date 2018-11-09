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
    console.log(responseStatus);
}



document.addEventListener('DOMContentLoaded', function(){ onLoad();});

