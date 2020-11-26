// Index-page js

window.addEventListener('load', getPolls);

const data;


/* 
Get all polls from db and show on page
*/
function getPolls(){
    console.log('Haetaan data')
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPolls(data);
    }
    ajax.open("GET", "backend/getPolls.php");
    ajax.send();
}

function showPolls(data){
    
    const ul = document.getElementById("votesUl");

    data.forEach(poll => {
        const newLi = document.createElement('li');
        newLi.classList.add('list-group-item');

        const liText = document.createTextNode(poll.topic);
        newLi.appendChild(liText);

        ul.appendChild(newLi);

    });
}