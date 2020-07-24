const todoListDisplay = document.querySelector('#todoList');
let todoList = [];

// Submit button functionality
document.querySelector('#todoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // push todo item object to the array
  const todoField = document.querySelector('#todoField');
  todoList.push({text: todoField.value, complete: false});

  // update the todo list with the new item
  renderList();

  // clear the text input field and put the cursor back in (make focus)
  event.target.reset();
  todoField.focus();
});

// adds the event listener to the ul element
todoListDisplay.addEventListener('click', handleClick)

// function to update the list of todo items
function renderList() {
    let template = todoList.map((item, index) => `
  <li  data-key='${index}' class='todo-item ${item.complete ? 'completed' : ''}'>
    <input data-key='${index}' id='btn-${index}' type='checkbox' title='Mark as complete' ${item.complete ? 'checked' : ''} class='complete'>
    ${item.text}
    <button data-key='${index}' class='delete' title='Delete todo item'>🗑️</button>
  </li>
  `)
  
  todoListDisplay.innerHTML = template.join('');
}

// determine if the complete or delete button was pressed and process item 
// accordingly
function handleClick(event) {
  let el = event.srcElement
  let key = el.dataset.key;
  let item = todoList[key];
  if (el.classList.contains('delete')) {
    handleDelete(el, key, item);
  } else {
    handleComplete(el, key, item);
  }
}

// toggle completed status of the list item
function handleComplete(el, key, item) {
  item.complete = !item.complete;
  if (el.localName === 'li') {
    el.classList.toggle('completed');
    console.log(el.firstElementChild)
    el.firstElementChild.checked = !el.firstElementChild.checked;
  } else {
    el.parentElement.classList.toggle('completed');
  }
  
}

// delete the item from the todo list and re-render the list
function handleDelete(el, key, item) {
  todoList.splice(key, 1);
  renderList();
}