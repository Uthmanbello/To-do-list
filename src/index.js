import './style.css';
import TodoList from './modules/todo.js';
import { updateCompleted, clearCompleted } from './modules/list.js';

let todolist = [];
if (JSON.parse(localStorage.getItem('todolist'))) {
  todolist = JSON.parse(localStorage.getItem('todolist')).todolist;
}
const newTodoList = new TodoList(todolist);
const todoItems = document.getElementsByClassName('todolist')[0];

const sortedTodoList = todolist.sort((a, b) => a.index - b.index);

sortedTodoList.forEach((todo) => {
  const task = document.createElement('li');
  task.classList.add('task');
  task.id = todo.index;
  task.innerHTML = `<input type="checkbox" name="${todo.index}" class="check">
  <label class = "${todo.index} task-desc black" for="${todo.index}">${todo.description}</label>
  <div class="remove-button">
    <i class='fa fa-trash ash'></i>
  <div>`;
  todoItems.appendChild(task);
});

const inputButton = document.getElementById('submit-new-item');
const enter = document.querySelector('.icon');

const addTask = (e) => {
  e.preventDefault();
  const newItem = document.getElementById('new-item');
  if (newItem.value) {
    const description = newItem.value.trim();
    const index = todolist.length + 1;
    newTodoList.addTask(description, index);
    localStorage.setItem('todolist', JSON.stringify(newTodoList));
    newItem.value = '';
  }
  window.location.reload();
};

inputButton.addEventListener('click', addTask);
enter.addEventListener('click', addTask);

const editTaskButton = document.querySelectorAll('.task');
editTaskButton.forEach((elm) => {
  const element = elm.children[1];
  element.addEventListener('click', () => {
    element.contentEditable = true;
    element.focus();
  });

  element.addEventListener('focusout', () => {
    if (element.innerHTML) {
      newTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      element.contentEditable = false;
    }
  });
  element.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && element.innerHTML) {
      newTodoList.editTask(element.innerHTML, element.className);
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      element.contentEditable = false;
    }
  });
});

const removeButton = document.querySelectorAll('.remove-button');

const removeTask = (e) => {
  const index = e.target.parentNode.parentNode.id;
  newTodoList.removeTask(index);
  localStorage.setItem('todolist', JSON.stringify(newTodoList));
  window.location.reload();
};

removeButton.forEach((element) => element.addEventListener('click', removeTask));

// const checkboxes = document.querySelectorAll('input[type=checkbox]');
// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener('change', (event) => {
//     updateCompleted(event.target.dataset.itemId, event.target.checked);
//   });
// });

// const clearCompletedButton = document.querySelector('#clear-completed');
// clearCompletedButton.addEventListener('click', clearCompleted);