import './style.css';
import {TodoList} from './modules/todo.js';

let todolist = [];
if (JSON.parse(localStorage.getItem('todolist'))) {
  todolist = JSON.parse(localStorage.getItem('todolist')).todolist;
}
const latestTodoList = new TodoList(todolist);
const todos = document.getElementsByClassName('todolist')[0];

const sortedTodoList = todolist.sort((a, b) => a.index - b.index);

sortedTodoList.forEach((todo) => {
  const task = document.createElement('li');
  task.classList.add('task');
  task.id = todo.index;
  task.innerHTML = `<input type="checkbox" name="${todo.index}" class="check"><label class = "${todo.index} task-desc black" for="${todo.index}">${todo.description}</label><div class="remove-button"><i class='fa fa-trash ash'></i><div>`;
  todos.appendChild(task);
});

const enterButton = document.getElementById('submit-new-item');

const addTask = (e) => {
  e.preventDefault();
  const inputForm = document.getElementById('new-item');
  if (inputForm.value) {
    const description = inputForm.value.trim();
    const index = todolist.length + 1;
    latestTodoList.addTask(description, index);
    localStorage.setItem('todolist', JSON.stringify(latestTodoList));
    inputForm.value = '';
  }
  window.location.reload();
};

enterButton.addEventListener('click', addTask);

const editButton = document.querySelectorAll('.task');
editButton.forEach((elm) => {
  const element = elm.children[1];
  element.addEventListener('click', () => {
    element.contentEditable = true;
    element.focus();
  });

  element.addEventListener('focusout', () => {
    if (element.innerHTML) {
      latestTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(latestTodoList));
      element.contentEditable = false;
    }
  });
  element.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && element.innerHTML) {
      latestTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(latestTodoList));
      element.contentEditable = false;
    }
  });
});

const removeButton = document.querySelectorAll('.remove-button');

const removeTask = (e) => {
  const index = e.target.parentNode.parentNode.id;
  latestTodoList.removeTask(index);
  localStorage.setItem('todolist', JSON.stringify(latestTodoList));
  window.location.reload();
};

removeButton.forEach((element) => element.addEventListener('click', removeTask));