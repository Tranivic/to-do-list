//Variables

var clearAll = document.getElementById("clear-all");
var btnAdd = document.getElementById("add-item");
var list = document.getElementById("list");
var tasks = []
counter = 0;

btnAdd.addEventListener("click", addTask);
clearAll.addEventListener("click", clearAllTasks);
list.addEventListener("click", getButtonId);
list.addEventListener("click", markAsDone);


function addTask() {
    var taskContent = document.getElementById("taskName").value

    if (taskContent == "") {
        confirm("Empty task")
    } else {
        counter++
        var object = { Content: taskContent, Id: counter, Done: false }
        tasks.push(object)

        attScreen()
        document.getElementById("taskName").value = ""
    }

}

function attScreen() {
    list.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].Done == false) {
            list.innerHTML += `
            <div class="item">
            <label>
            ${tasks[i].Content}
            </label>
            <div class="btn">
            <button class="btn-done"><i id="${tasks[i].Id}" class=" btn-done fa-solid fa-check"></i></button><button class="btn-remove remove"><i id="${tasks[i].Id}" class=" btn-remove fa fa-x"></i></button>
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
        <button class="btn-done"><i id="${tasks[i].Id}" class=" btn-done fa-solid fa-check"></i></button><button class="btn-remove remove"><i id="${tasks[i].Id}" class=" btn-remove fa fa-x"></i></button>
        </div>
            </div>
        `

        }
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

    for (let i = 0; i <= counter; i++) {
        if (tasks[i].Id == btnId) {
            tasks.splice(i, 1);

            attScreen()
        }
    }
}

function markAsDone(btnId) {

    for (let i = 0; i <= counter; i++) {
        if (tasks[i].Id == btnId) {
            if (tasks[i].Done == false) {
                tasks[i].Done = true
                attScreen()
            } else {
                tasks[i].Done = false
                attScreen()
            }
        }
    }
}

function clearAllTasks() {
    list.innerHTML = ""
    tasks = []
    counter = 0
    document.getElementById("taskName").value = ""
}

function showDateOnScreen() {

    document.getElementById("month").innerHTML = dayjs().format('MMM')
    document.getElementById("day").innerHTML = dayjs().format('D')
    document.getElementById("year").innerHTML = dayjs().format('YYYY')
    document.getElementById("weekDay").innerHTML = dayjs().format('dddd')

}

showDateOnScreen()