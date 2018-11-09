function onLoad(){
    document.getElementById("start-button").addEventListener('click', onStartButtonClicked);
}

function onStartButtonClicked(){
    console.log("button clicked");

}



document.addEventListener('DOMContentLoaded', function(){ onLoad();});

