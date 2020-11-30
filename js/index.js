// Index-page js

window.addEventListener('load', getPolls);

let data = null;


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

function showPolls(data, type = 'current'){
    
    const ul = document.getElementById("votesUl");
    ul.innerHTML = "";

    const now = new Date();
    console.log(`now: ${now.toDateString()}`);
    
    data.forEach(poll => {
        
        let start = false;
        let end = false;

        if (poll.start != '0000-00-00 00:00:00') {
            start = new Date(poll.start);
        }

        if (poll.end != '0000-00-00 00:00:00') {
            end = new Date(poll.end);       
        }
        
        // console.log(`start: ${start.toDateString()} end: ${end.toDateString()}`);
        
        if (type == 'old') {
            
            if (end < now && end != false) {
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
        
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
        
                ul.appendChild(newLi);
            }
        
        } else if (type == 'future') {

            if (start > now) {
                
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
        
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
        
                ul.appendChild(newLi);
            
            }

        } else {

            if ((start == false || start <= now) && (end == false || end >= now)) {
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
        
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
        
                ul.appendChild(newLi);
            }
        }


    });
}