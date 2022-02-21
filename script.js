//Variables
var clearAll = document.getElementById("clear-all");
var btnAdd = document.getElementById("add-item");
var list = document.getElementById("list");
var checkbox = document.getElementById("chk");
var tasks = []
counter = 0;

//Event Listeners
btnAdd.addEventListener("click", addTask);
clearAll.addEventListener("click", clearAllTasks);
list.addEventListener("click", getButtonId);
list.addEventListener("click", markAsDone);
checkbox.addEventListener("click", changeTheme)

//This function will set the date on screen when page is loaded (Dayjs (library))
window.onload = () => {
    changeTheme()
    document.getElementById("month").innerHTML = dayjs().format('MMM')
    document.getElementById("day").innerHTML = dayjs().format('D')
    document.getElementById("year").innerHTML = dayjs().format('YYYY')
    document.getElementById("weekDay").innerHTML = dayjs().format('dddd')
}

function changeTheme() {
    var body = document.querySelector('body');

    if (checkbox.checked) {

        body.style.backgroundColor = "#FAFAF8"
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
    } else if (counter > 5) {
        confirm("Maximum of tasks reached")
    } else {
        counter++
        let object = { Content: taskContent, Id: counter, Done: false }
        tasks.push(object)

        attScreen()
        document.getElementById("taskName").value = ""
    }

}

function attScreen() {
    list.innerHTML = "";
    document.getElementById("taskName").value = "";

    for (var i = 0; i <= counter; i++) {

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
    counter--
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