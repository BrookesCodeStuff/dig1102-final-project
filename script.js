const todoField = document.querySelector('#todoField');
const todoListDisplay = document.querySelector('#todoList');
let todoList = [];

document.querySelector('#todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  todoList.push(todoField.value);

  let template = todoList.map(item => `
  <li>${item}</li>
  `)

  todoListDisplay.innerHTML = template.join('');
  todoField.value = '';
  todoField.focus();
});