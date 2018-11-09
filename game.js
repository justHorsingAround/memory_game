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

function addToErrorMessage(error, message){
    const pEl = document.createElement('p');
    pEl.classList.add('message');
    pEl.textContent = response.message;

    loginErrDivEl.appendChild(pEl);

}

function onStartResponse(){
    let responseStatus = this.status;
    if(responseStatus == 200){
        onGoodResponse(this.responseText);
    }
    else {
        let error = document.getElementById("error-msg");
        error.style.display = 'block';
        let response = JSON.parse(this.responseText);

        const pEl = document.createElement('p');
        pEl.classList.add('message');
        pEl.textContent = response.message;

        error.appendChild(pEl);
    }
}

function onGoodResponse(imageList){
    var img = imageList.split(',');
    for (let i = 0; i < img.length; i++) {
        if(img[i] !== ""){
            console.log(img[i]);
            const xhr = new XMLHttpRequest();
            const url = "http://localhost:9999/getcards?card=" + img[i];
            xhr.addEventListener('load', console.log("ok"));
            xhr.open('GET', url);
            xhr.send();
        }
    }
}



document.addEventListener('DOMContentLoaded', function(){ onLoad();});

