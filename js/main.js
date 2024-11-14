var TO_DO = 'todo';
var COMPLETED = 'completed';
var ENTER_KEY_CODE = 13;

var data = localStorage.getItem('data')
  ? JSON.parse(localStorage.getItem('data'))
  : {
      todo: [],
      completed: []
    };

var removeSvg =
  '<svg class="remove-img" viewBox="0 0 32 32"><path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path><path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path></svg>';

var completeSvg =
  '<svg class="complete-img" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path></svg>';

document
  .getElementById('item')
  .addEventListener('keypress', handleKeyPressAddItem);
document.getElementById('add').addEventListener('click', handleClickAddItem);

function handleKeyPressAddItem(event) {
  if (event.keyCode === ENTER_KEY_CODE && this.value) {
    handleClickAddItem();
  }
}

function handleClickAddItem() {
  var value = document.getElementById('item').value;
  if (value) {
    data.todo.push(value);
    addItemToDOM(value, TO_DO);
    document.getElementById('item').value = '';

    dataUpdated();
  }
}

function addItemToDOM(text, list) {
  var list = document.getElementById(list);

  var element = document.createElement('li');
  element.classList.add('list-item');
  element.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('item-btn');

  var removeBtn = document.createElement('button');
  removeBtn.classList.add('btn-remove');
  removeBtn.innerHTML = removeSvg;
  removeBtn.addEventListener('click', removeTask);

  var completeBtn = document.createElement('button');
  completeBtn.classList.add('btn-complete');
  completeBtn.innerHTML = completeSvg;
  completeBtn.addEventListener('click', updateTask);

  buttons.appendChild(removeBtn);
  buttons.appendChild(completeBtn);

  element.appendChild(buttons);
  list.insertBefore(element, list.childNodes[0]);
}

function removeTask() {
  var listItem = this.parentNode.parentNode;
  var itemValue = listItem.innerText;
  var list = listItem.parentNode;
  var targetList = null;

  if (list.id === TO_DO) {
    targetList = data.todo;
  } else {
    targetList = data.completed;
  }

  targetList.splice(targetList.indexOf(itemValue), 1);
  list.removeChild(listItem);

  dataUpdated();
}

function updateTask() {
  var listItem = this.parentNode.parentNode;
  var itemValue = listItem.innerText;
  var list = listItem.parentNode;
  var targetListId = list.id === TO_DO ? COMPLETED : TO_DO;
  var targetList;

  if (list.id === TO_DO) {
    targetList = document.getElementById(COMPLETED);
    data.todo.splice(data.todo.indexOf(itemValue), 1);
    data.completed.push(itemValue);
  } else {
    targetList = document.getElementById(TO_DO);
    data.completed.splice(data.completed.indexOf(itemValue), 1);
    data.todo.push(itemValue);
  }

  list.removeChild(listItem);
  addItemToDOM(listItem.innerText, targetListId);

  dataUpdated();
}

function dataUpdated() {
  localStorage.setItem('data', JSON.stringify(data));
}

function renderData() {
  if (data.todo.length) {
    for (var i = 0; i < data.todo.length; i++) {
      addItemToDOM(data.todo[i], TO_DO);
    }
  }

  if (data.completed.length) {
    for (var j = 0; j < data.completed.length; j++) {
      addItemToDOM(data.completed[j], COMPLETED);
    }
  }
}

renderData();
