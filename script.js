// Selecionando elementos do DOM
const buttonToAdd = document.getElementById('button-to-add-task');
const listOfTasks = document.getElementById('list-of-tasks');
let taskInput = document.getElementById('task-input');
let themeCheckBox = document.getElementById('chk');

// Inicializando array vazio de tarefas
let tasks = [];

// Event Listeners
buttonToAdd.addEventListener('click', addTask);
listOfTasks.addEventListener('click', getButtonId);
themeCheckBox.addEventListener('click', changeTheme);

// Adicionando evento de tecla pressionada no taskInput
taskInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addTask();
  }
});

// Função para carregar a data do dia no carregamento da página (utilizando a biblioteca Day.js para melhor formatação)
window.onload = () => {
  document.getElementById('month').innerHTML = dayjs().format('MMM');
  document.getElementById('day').innerHTML = dayjs().format('D');
  document.getElementById('year').innerHTML = dayjs().format('YYYY');
  document.getElementById('weekDay').innerHTML = dayjs().format('dddd');
  setAsVisitor();
};

// Função para alternar o tema entre escuro e claro.
function changeTheme() {
  const pageBody = document.querySelector('body');
  if (themeCheckBox.checked) {
    pageBody.style.backgroundColor = '#FCFBF7';
    pageBody.style.color = '#4E4D5B';
  } else {
    pageBody.style.backgroundColor = '#403F4D';
    pageBody.style.color = '#FAFAF8';
  }
}

// Função para adicionar a nova tarefa no array de tarefas
function addTask() {
  let taskContent = taskInput.value.trim('');

  if (taskContent == '') {
    confirm('Preencha o campo da nova tarefa');
    return;
  }

  const newTaskId = localStorage.counter++;

  const newTaskObject = {
    content: taskContent,
    id: newTaskId,
    done: false,
  };
  saveNewTaskToLocalStorage(newTaskObject);
  tasks.push(newTaskObject);
  attScreen();
}

// Função para pegar o id do botão clicado, para identificar a task especifica.
function getButtonId(e) {
  if (e.target.classList.contains('btn-remove')) {
    let btnId = e.target.id;
    removeTask(btnId);
  } else if (e.target.classList.contains('btn-done')) {
    let btnId = e.target.id;
    markAsDone(btnId);
  }
}

// Função que remove a task do array de tasks
function removeTask(btnId) {
  const clickedTaskIndex = tasks.findIndex((element) => element.id == btnId);
  tasks.splice(clickedTaskIndex, 1);
  localStorage.setItem('localTasks', JSON.stringify(tasks));
  attScreen();
}

// Função que adiciona a task no array de tasks
function markAsDone(btnId) {
  const clickedTask = tasks.find((element) => element.id == btnId);
  const taskIsDone = clickedTask.done;
  clickedTask.done = !taskIsDone;
  localStorage.setItem('localTasks', JSON.stringify(tasks));
  attScreen();
}

// Função para atualizar os dados na tela sempre que necessário
function attScreen() {
  tasks = JSON.parse(localStorage.getItem('localTasks'));
  listOfTasks.innerHTML = '';
  taskInput.value = '';

  tasks.forEach((element) => {
    if (element.done === false) {
      listOfTasks.innerHTML += `
            <div class="item">
            <label>
            ${element.content}
            </label>
            <div class="btn">
            <button class="btn-done"><i id="${element.id}" class=" btn-done fa-solid fa-check"></i></button><button class="remove"><i id="${element.id}" class=" btn-remove fa fa-x"></i></button>
                </div>
                </div>
        `;
    } else {
      listOfTasks.innerHTML += `
        <div class="item item-done">
        <label>
        ${element.content}
        </label>
        <div class="btn">
        <button class="btn-done"><i id="${element.id}" class=" btn-done fa-solid fa-check"></i></button><button class="remove"><i id="${element.id}" class=" btn-remove fa fa-x"></i></button>
        </div>
            </div>
        `;
    }
  });
}

// Função que seta a primeira vez em que o usuario acessa o site.
function setAsVisitor() {
  if (typeof Storage !== 'undefined') {
    if (!localStorage.counter || localStorage.counter != Number) {
      localStorage.counter = 0;
      localStorage.localTasks = null;
    } else {
      attScreen();
    }
  }
}

// Esta função salva o objeto da nova task no array do local storage
function saveNewTaskToLocalStorage(data) {
  let localSavedTasks = JSON.parse(localStorage.getItem('localTasks')) || [];
  localSavedTasks.push(data);
  localStorage.setItem('localTasks', JSON.stringify(localSavedTasks));
}
