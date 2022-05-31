//Variables
var input = document.getElementById("taskName")
var btnAdd = document.getElementById("add-item");
var list = document.getElementById("list");
var checkbox = document.getElementById("chk");
var tasks = []


//Event Listeners
btnAdd.addEventListener("click", addTask);
list.addEventListener("click", getButtonId);
list.addEventListener("click", markAsDone);
checkbox.addEventListener("click", changeTheme)
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        addTask()
    }
})



//This function will set the date on screen when page is loaded (Dayjs (library))
window.onload = () => {
    changeTheme()
    document.getElementById("month").innerHTML = dayjs().format('MMM')
    document.getElementById("day").innerHTML = dayjs().format('D')
    document.getElementById("year").innerHTML = dayjs().format('YYYY')
    document.getElementById("weekDay").innerHTML = dayjs().format('dddd')
    setAsVisitor()
    attScreen()
}

function changeTheme() {
    var body = document.querySelector('body');

    if (checkbox.checked) {

        body.style.backgroundColor = "#FCFBF7"
        body.style.color = "#4E4D5B"

    } else {

        body.style.backgroundColor = "#403F4D"
        body.style.color = "#FAFAF8"
    }

}

function addTask() {
    let taskContent = document.getElementById("taskName").value

    if (taskContent == "") {
        confirm("Empty task")
    } else {
        localStorage.counter++
        let object = { Content: taskContent, Id: localStorage.counter, Done: false }
        tasks.push(object)
        SaveDataToLocalStorage('lol',object)
        attScreen()
        document.getElementById("taskName").value = ""

    }
}

function getButtonId(e) {

    if (e.target.classList.contains('btn-remove')) {
        let btnId = e.target.id

        removeTask(btnId)

    } else if (e.target.classList.contains('btn-done')) {

        let btnId = e.target.id

        markAsDone(btnId)

    }

}

function removeTask(btnId) {
    for (let i = 0; i <= tasks.length; i++) {
        if (tasks[i].Id == btnId) {
            tasks.splice(i, 1);
            SaveDataToLocalStorage('set', tasks)
            attScreen()
        }
    }
}

function markAsDone(btnId) {

    for (let i = 0; i <= tasks.length; i++) {
        if (tasks[i].Id == btnId) {
            if (tasks[i].Done == false) {
                tasks[i].Done = true
                SaveDataToLocalStorage('set', tasks)
                attScreen()
            } else {
                tasks[i].Done = false
                SaveDataToLocalStorage('set', tasks)
                attScreen()
            }
        }
    }
}

function attScreen() {
    tasks = JSON.parse(localStorage.getItem('localTasks'))
    list.innerHTML = "";
    document.getElementById("taskName").value = "";


    for (var i = 0; i <= tasks.length; i++) {

        if (tasks[i].Done == false) {
            list.innerHTML += `
            <div class="item">
            <label>
            ${tasks[i].Content}
            </label>
            <div class="btn">
            <button class="btn-done"><i id="${tasks[i].Id}" class=" btn-done fa-solid fa-check"></i></button><button class="remove"><i id="${tasks[i].Id}" class=" btn-remove fa fa-x"></i></button>
                </div>
                </div>
        `
        } else {

            list.innerHTML += `
        <div class="item item-done">
        <label>
        ${tasks[i].Content}
        </label>
        <div class="btn">
        <button class="btn-done"><i id="${tasks[i].Id}" class=" btn-done fa-solid fa-check"></i></button><button class="remove"><i id="${tasks[i].Id}" class=" btn-remove fa fa-x"></i></button>
        </div>
            </div>
        `

        }
    }
}

function setAsVisitor() {
    if (typeof Storage !== "undefined") {
        if (!localStorage.counter) {
            localStorage.counter = 0
        }
    }
}

function SaveDataToLocalStorage(type, data) {
    if (type === "set") {
        localStorage.setItem('localTasks', JSON.stringify(data))
    }
    else {
        var a = [];
        a = JSON.parse(localStorage.getItem('localTasks')) || [];
        a.push(data);
        localStorage.setItem('localTasks', JSON.stringify(a));
    }
}
