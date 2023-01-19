import _ from 'lodash';
import './style.css';

// const taskArr = [{
//   description: 'wash the dishes',
//   completed: false,
//   index: 0,
// },
// {
//   description: 'take out the trash',
//   completed: false,
//   index: 1,
// },
// {
//   description: 'complete To Do list project',
//   completed: false,
//   index: 2,
// },
// ];
// const refreshButton = document.querySelector('#refresh-btn');
// const addButton = document.querySelector('#add-btn');
// const dragButton = document.querySelector('#drag-btn');
// const container = document.querySelector('.task-container');
// const add = document.querySelector('.add');
// refreshButton.addEventListener('click', myFunction)
// function myFunction() {
//     addButton.innerHTML = "YOU CLICKED ME!";
//   }
// const taskArr = [];
// addTask = () => {
//     task = {
//         description: add.value,
//         completed: false
//     }
//     taskArr.push(task)
//     add.value = '';
// }

// addButton.addEventListener('click', myFunction);

// const toDoTasks = JSON.parse(localStorage.getItem('tasks')) || [];
// task = {
//     description: 
// }
// function add(task) {
//     toDoTasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(toDoTasks));
// }

// function remove(task) {
//     let index = toDoTasks.indexOf(task);
//     if (index !== -1) {
//         toDoTasks.splice(index, 1);
//         localStorage.setItem('tasks', JSON.stringify(toDoTasks));
//     }
// }

// addButton.addEventListener("click", function() {
//     let inputField = document.getElementById("input-field");
//     add(inputField.value);
// });


// let html = '';

// taskArr.forEach((task) => {
//   html += `
        // <div class="list-item">
        //     <input type="checkbox" id="" class="check">
        //     <p class="task black">${task.description}</p>
        //     <i class="fa-solid fa-ellipsis-vertical ash fa-2x icon" id="drag-btn"></i>
        // </div>`;
// });

// container.innerHTML = html;

let tasks = {};
const displayTasks = document.querySelector('.task-container');
const newTask = document.querySelector('#input-field');
const addTask = document.querySelector('#add-btn');

let storeTasks = [];
const clearField = () => {
  newTask.value = '';
};
const displayAllTasks = () => {
    clearField();
    displayTasks.innerHTML = '';
    storeTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storeTasks.forEach((task, index) => {
      displayTasks.innerHTML += `
      <div class="list-item">
      <input type="checkbox" class="check">
      <p class="task black">${task.description}</p>
      <button class="remove" id="${index}" onclick="removeTasks(event)"><i class="fa-solid fa-trash-can ash icon"></i><i class="fa-solid fa-ellipsis-vertical ash fa-2x icon d-none" id="drag-btn"></i></button>
  </div>`;
    });
  };

  const saveTasks = () => {
    addTask.addEventListener('click', () => {
      if (newTask.value === '') return;
      tasks = {
        description: newTask.value,
        completed: false,
        index: storeTasks.length,
      };
      storeTasks.push(tasks);
      localStorage.setItem('tasks', JSON.stringify(storeTasks));
      displayAllTasks();
      clearField();
    });
  };

  const removeTasks = (event) => {
    const findId = Number(event.target.id);
    const deleteTask = storeTasks.filter((task, index) => {
      if (index !== findId) {
        return task;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(deleteTask));
    displayAllTasks();
  };

  displayAllTasks();
  saveTasks();
