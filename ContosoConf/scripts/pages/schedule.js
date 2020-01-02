let schedule = [];

const list = document.getElementById('schedule');
const track1Checkbox = document.getElementById('show-track-1');
const track2Checkbox = document.getElementById('show-track-2');

function downloadSchedule() {
    const request = new XMLHttpRequest();
    request.open("GET", "/schedule/list", true);
    // onreadystatechange é chamado sempre que o atributo readyState é modificado.
    // request.onload é chamdo quando a operação esta completa (sucesso ou erro) readyState == 4
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.responseText);
                if (request.status === 200) {
                    schedule = response.schedule;
                    displaySchedule();
                } else {
                    alert(response.message);
                }
            } catch (exception) {
                alert("Schedule list not available.");
            }
        }
    };
    request.send();
};

function createSessionElement(session) {
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

function displaySchedule() {
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

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function saveStar(sessionId, isStarred) {
    const request = new XMLHttpRequest();
    request.open('POST', `/schedule/star/${sessionId}`, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (isStarred) {
        request.onload = function () {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                if (response.starCount > 50) {
                    alert("This session is very popular! Be sure to arrive early to get a seat.");
                }
            };
        }
        request.send(`starred=${isStarred}`);
    }
}

function handleListClick(event) {
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
downloadSchedule();