const todolist = JSON.parse(localStorage.getItem('items')) || [];

export function updateCompleted(itemId, completed) {
  todolist.forEach((item) => {
    if (item.id === itemId) {
      item.completed = completed;
    }
  });
  localStorage.setItem('todolist', JSON.stringify(todolist));
}

export function clearCompleted() {
  todolist = todolist.filter((item) => !item.completed);
  localStorage.setItem('todolist', JSON.stringify(todolist));
}