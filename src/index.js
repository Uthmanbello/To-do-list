import _ from 'lodash';
import './style.css';

const taskArr = [{
  description: 'wash the dishes',
  completed: false,
  index: 0,
},
{
  description: 'take out the trash',
  completed: false,
  index: 1,
},
{
  description: 'complete To Do list project',
  completed: false,
  index: 2,
},
];

const container = document.querySelector('.task-container');

let html = '';

taskArr.forEach((task) => {
  html += `
        <div class="list-item">
            <input type="checkbox" id="${task.index}" class="check">
            <p class="task black">${task.description}</p>
            <i class="fa-solid fa-ellipsis-vertical ash fa-2x icon"></i>
        </div>`;
});

container.innerHTML = html;
