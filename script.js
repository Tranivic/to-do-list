//Variables
var clearAll = document.getElementById("clear-all");
var btnAdd = document.getElementById("add-item");
var list = document.getElementById("list");
var tasks = [];

//Counter to identifier the tasks
var counter = 0;


//Event Listeners
btnAdd.addEventListener("click", addTask);


//Function to print the task on the list and save into a array
function addTask() {
    if (counter < 5) {
        counter++;
        var taskContent = document.getElementById("taskName").value;
        var task = {
            Id: counter,
            Content: taskContent,
        };

        tasks.push(task);

        list.innerHTML +=
            `
        <div class="item">
                <label for="">
                    ${taskContent}
                </label>
                <div class="btn">
                    <button class="btn-done"><i class="fa-solid fa-check"></i></button><button class="btn-remove"><i class="fa fa-x" aria-hidden="true"></i></button>
                </div>
            </div>
         `
    }

}