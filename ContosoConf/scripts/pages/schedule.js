let schedule = [];

const list = document.getElementById('schedule');
const track1Checkbox = document.getElementById('show-track-1');
const track2Checkbox = document.getElementById('show-track-2');

async function downloadSchedule() {
    let response = await fetch('/schedule/list');

    if (response.ok) {
        let data = await response.json();
        schedule = data.schedule;
        displaySchedule();
    }
    else
        alert('Schedule list not available.')

    //const request = new XMLHttpRequest();
    //request.open("GET", "/schedule/list", true);
    //// onreadystatechange é chamado sempre que o atributo readyState é modificado.
    //request.onreadystatechange = function () {
    //    if (request.readyState === 4) {
    //        try {
    //            const response = JSON.parse(request.responseText);
    //            if (request.status === 200) {
    //                schedule = response.schedule;
    //                displaySchedule();
    //            } else {
    //                alert(response.message);
    //            }
    //        } catch (exception) {
    //            alert("Schedule list not available.");
    //        }
    //    }
    //};
    //request.send();
};

const createSessionElement = (session) => {
    const li = document.createElement('li');
    li.sessionId = session.id;

    const star = document.createElement('a');
    star.setAttribute('href', '#');
    star.setAttribute('class', 'star');
    star.addEventListener('click', handleListClick, false);
    li.appendChild(star);

    const title = document.createElement('span');
    title.textContent = session.title;
    li.appendChild(title);

    return li;
}

const displaySchedule = () => {
    clearList();
    for (let i = 0; i < schedule.length; i++) {
        const tracks = schedule[i].tracks;
        const isCurrentTrack = (track1Checkbox.checked && tracks.indexOf(1) >= 0 || track2Checkbox.checked && tracks.indexOf(2) >= 0)

        if (isCurrentTrack) {
            const li = createSessionElement(schedule[i]);
            list.appendChild(li);
        }
    }
}

const clearList = () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

const saveStar = async (sessionId, isStarred) => {
    /* Formas aceitas 
        Todos os parâmetros no body => body: `starred=${isStarred}&id=${sessionId}`
        Body vazio e parâmetros passados na url => fetch(`/schedule/star?starred=${isStarred}&id=${sessionId}`, options)
        parâmetros no body e url => body: `id=${sessionId}`, fetch(`/schedule/star?starred=${isStarred}`, options)
        parâmetros passados na url no formato de "/" só é aceito o parâmetro que esta definido na rota /schedule/star/idsd
            idsd é o nome do parâmetro que esta definito na rota padrão e que esta no objeto do método no backend
     */
    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = {
        method: 'POST',
        headers,
        body: `starred=${isStarred}`
    };

    let response = await fetch(`/schedule/star/${sessionId}`, options);

    if (isStarred) {
        if (response.ok) {
            const data = await response.json();
            if (data.starCount > 50)
                alert('This session is very popular! Be sure to arrive early to get a seat.');
        }
    }

    //const request = new XMLHttpRequest();
    //request.open('POST', `/schedule/star/${sessionId}`, true);
    //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //if (isStarred) {
    //    // request.onload é chamado quando a operação esta completa (sucesso ou erro) readyState == 4
    //    request.onload = function () {
    //        if (request.status === 200) {
    //            const response = JSON.parse(request.responseText);
    //            if (response.starCount > 50) {
    //                alert("This session is very popular! Be sure to arrive early to get a seat.");
    //            }
    //        };
    //    }
    //    request.send(`starred=${isStarred}`);
    //}
}

const saveStar2 = (sessionId, isStarred) => {
    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = {
        method: 'POST',
        headers,
        body: `starred=${isStarred}&id=${sessionId}`
    };

    fetch('/schedule/star/', options).then((response) => {
        if (response.ok)
            return response.json();
    }).then((resp) => {
        if (resp.starCount > 50)
            alert('This session is very popular! Be sure to arrive early to get a seat.');
    }).catch((error) => {
        console.log(error);
    });
};

const handleListClick = (event) => {
    const isStarElement = event.srcElement.classList.contains("star");
    if (isStarElement) {
        event.preventDefault();

        const li = event.srcElement.parentNode;
        if (li.classList.contains("starred")) {
            li.classList.remove("starred");
            saveStar(li.sessionId, false);
        } else {
            li.classList.add("starred");
            saveStar(li.sessionId, true);
        }
    }
};

track1Checkbox.addEventListener('click', displaySchedule, false);
track2Checkbox.addEventListener('click', displaySchedule, false);
document.addEventListener('DOMContentLoaded', function () {
    downloadSchedule();
});