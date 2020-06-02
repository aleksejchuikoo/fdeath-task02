//-----------------POPUP-------------------------

let popupBtns = document.getElementsByClassName("btn-popup");
let allModals = document.getElementsByClassName("modal");
let closeBtns = document.getElementsByClassName("close");
let secondCloseBtns = document.getElementsByClassName("secondCloseBtn");

for (let i = 0; i < 2; i++) {
  popupBtns[i].onclick = () => {
    allModals[i].style.display = "flex";
  }
}

for (let i = 0; i < allModals.length; i++) {

  closeBtns[i].onclick = () => {
    allModals[i].style.display = "none";
    todoInputTitle.value = "";
    todoInputText.value = "";

    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  }

  secondCloseBtns[i].onclick = event => {
    event.preventDefault();
    allModals[i].style.display = "none";
    todoInputTitle.value = "";
    todoInputText.value = "";

    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  }
}

//-----------------POPUP-------------------------

//-----------------SWITCH COLOR---------------------

let darkMode = localStorage.getItem('darkMode');
const btnToggle = document.querySelector("#btn-toggle");

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', "enabled");
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
  enableDarkMode();
}

btnToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

//-----------------SWITCH COLOR---------------------

//-----------------Positioning Btn Settings---------------------

function positioningBtnSettings (btnSettingsArr) {
  for (let i = 0; i < btnSettingsArr.length; i++) {
    btnSettingsArr[i].onfocus = () => {
      if ( btnSettingsArr[i].nextElementSibling.style.display == "flex") {
        btnSettingsArr[i].nextElementSibling.style.display = "none";
      } else {
        btnSettingsArr[i].nextElementSibling.style.display = "flex";
      }
    }
    btnSettingsArr[i].onblur = () => {
      btnSettingsArr[i].nextElementSibling.style.display = "none";
    }
  }
}

//-----------------Positioning Btn Settings---------------------

//-----------------local Todos---------------------
// let localTodo, localCompletedTodo;

// function showLocalTodo() {
//   localTodo = todoList.innerHTML;
//   localStorage.setItem('localTodo', localTodo);
//   localCompletedTodo = completedList.innerHTML;
//   localStorage.setItem('localCompletedTodo', localCompletedTodo);
// }
//-----------------local Todos---------------------

const todoInputTitle = document.getElementById("inputTitle");
const todoInputText = document.getElementById("inputText");
const radios = document.getElementsByName("radios");
const todoAdd = document.getElementById("add");
const todoEdit = document.getElementById("edit");
const todoList = document.querySelector(".todo-box__list");
const completedList = document.querySelector(".completed-box__list");
const arrBgColors = ['#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0', '#42a5f5', '#29b6f6', '#26c6da', '#26a69a', '#66bb6a', '#9ccc65', '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043', '#8d6e63', '#bdbdbd', '#78909c'];
let todoAmount = document.getElementById("todo-amount");
let completedAmount = document.getElementById("completed-amount");
let radioChecked = false;


//-----------------ToDo List---------------------
todoAdd.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault();

// ------------LI-------------
  const todoItem = document.createElement('li');
  todoItem.classList.add("todo-box__item");
  const todoItemWrapper = document.createElement('div');
  todoItemWrapper.classList.add("todo-box__item-wrapper");
  todoItem.appendChild(todoItemWrapper);
  const todoItemHeader = document.createElement('div');
  todoItemHeader.classList.add("todo-box__item-header");
  todoItemWrapper.appendChild(todoItemHeader);
  const todoItemTitle = document.createElement('h5');
  todoItemHeader.appendChild(todoItemTitle);
  todoItemTitle.classList.add("todo-box__item-title");
  const todoItemInfo = document.createElement('div');
  todoItemInfo.classList.add("todo-box__item-info");
  todoItemHeader.appendChild(todoItemInfo);
  const todoPriority = document.createElement('span');
  todoPriority.classList.add("priority");
  todoItemInfo.appendChild(todoPriority);
  const todoTime = document.createElement('span');
  todoTime.classList.add("time");
  todoItemInfo.appendChild(todoTime);
  const todoItemText = document.createElement('p');
  todoItemText.classList.add("todo-box__item-text");
  todoItemWrapper.appendChild(todoItemText);
  const todoItemBtn = document.createElement('div');
  todoItemBtn.classList.add("todo-box__item-btn");
  todoItem.appendChild(todoItemBtn);
  const todoBtnSetting = document.createElement('button');
  todoBtnSetting.className = "btn btn-secondary btn-setting";
  todoBtnSetting.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
  todoItemBtn.appendChild(todoBtnSetting);
  const todoBtnActions = document.createElement('div');
  todoBtnActions.classList.add("btn-actions");
  todoItemBtn.appendChild(todoBtnActions);
  const todoBtnSuccess = document.createElement('button');
  todoBtnSuccess.className = "btn btn-success";
  todoBtnSuccess.innerHTML = "Complete";
  todoBtnActions.appendChild(todoBtnSuccess);
  const todoBtnInfo = document.createElement('button');
  todoBtnInfo.className = "btn btn-info";
  todoBtnInfo.innerHTML = "Edit";
  todoBtnActions.appendChild(todoBtnInfo);
  const todoBtnDanger = document.createElement('button');
  todoBtnDanger.className = "btn btn-danger";
  todoBtnDanger.innerHTML = "Delete";
  todoBtnActions.appendChild(todoBtnDanger);
// ------------LI-------------

// ------------Add ToDo-------------

  let btnSettings = document.getElementsByClassName("btn-setting");

  if (todoInputTitle.value !== "" && todoInputText.value !== "") {
    
    todoList.appendChild(todoItem);
    todoItem.style.backgroundColor = `${arrBgColors[Math.floor(Math.random() * arrBgColors.length) ]}`;
    todoItemTitle.innerHTML = todoInputTitle.value;
    todoItemText.innerHTML = todoInputText.value;
    todoAmount.innerHTML = ` (${todoList.children.length})`;

    positioningBtnSettings(btnSettings);

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radioChecked = radios[i];
        todoPriority.innerHTML = `${radios[i].value} priority`;
      } 
    }

    let time = new Date();
    let timeSort = time.getTime();
    let month = time.getMonth() + 1;

    todoTime.innerHTML = `
    ${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()} ${time.getDate() < 10 ? "0" + time.getDate() : time.getDate()}.${month < 10 ? "0" + month : month}.${time.getFullYear()}`

    todoItem.setAttribute("data-time", timeSort);

// ------------Add ToDo-------------

// ------------Clear ToDo Input value-------------

    todoInputTitle.value = "";
    todoInputText.value = "";

    if (radioChecked.checked == true) {
      radioChecked.checked = false;
    }

// ------------Clear ToDo Input value-------------

// ------------Btn Settings---------
    todoBtnDanger.addEventListener("mousedown", deleteItem);
    todoBtnInfo.addEventListener("mousedown", editItem);
    todoBtnSuccess.addEventListener("mousedown", completeItem);

    function deleteItem (e) {
      e.preventDefault();
      
      todoList.removeChild(todoItem);
      todoAmount.innerHTML = ` (${todoList.children.length})`;
      let btnSettings = document.getElementsByClassName("btn-setting");
      positioningBtnSettings(btnSettings);
    }

    function editItem (e) {
      e.preventDefault();

      let secondTodoInputTitle = document.getElementById("inputTitle2");
      let secondTodoInputText = document.getElementById("inputText2");

      allModals[2].style.display = "flex";
      secondTodoInputTitle.value = todoItemTitle.innerHTML ;
      secondTodoInputText.value = todoItemText.innerHTML;

      for (let i = 0; i < radios.length; i++) {
        let str = todoPriority.textContent.substr(0, radios[i].value.length);
        if (str === radios[i].value) {
          radios[i].checked = true;
        } 
      }

      todoEdit.onclick = e => {
        e.preventDefault();

        todoItemTitle.innerHTML = secondTodoInputTitle.value;
        todoItemText.innerHTML = secondTodoInputText.value;

        for (let i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            radioChecked = radios[i];
            todoPriority.innerHTML = `${radios[i].value} priority`;
          } 
        }
      }
    }

    function completeItem (e) {
      e.preventDefault();

      let completedItem = todoItem;
      todoList.removeChild(todoItem);
      completedList.appendChild(completedItem);
      todoAmount.innerHTML = ` (${todoList.children.length})`;
      completedAmount.innerHTML = ` (${completedList.children.length})`;
      positioningBtnSettings(btnSettings);
      completedItem.removeChild(todoItemBtn);
    }

// ------------Btn Settings---------


    todoInputText.style.boxShadow = "none";
    todoInputTitle.style.boxShadow = "none";
  } else if (todoInputTitle.value == "" && todoInputText.value !== "") {
    todoInputTitle.style.boxShadow = "0 0 0 0.1rem #dc3545";
    todoInputText.style.boxShadow = "none";
    todoInputTitle.focus()
  } else if (todoInputText.value == "" && todoInputTitle.value !== "") {
    todoInputText.focus()
    todoInputText.style.boxShadow = "0 0 0 0.1rem #dc3545";
    todoInputTitle.style.boxShadow = "none";
  } else {
    todoInputTitle.style.boxShadow = "0 0 0 0.1rem #dc3545";
    todoInputText.style.boxShadow = "0 0 0 0.1rem #dc3545";
  }

  localStorage.setItem('local', JSON.stringify([...todoList.children]));
}

//-----------------ToDo List---------------------

//-----------------Sort---------------------

const desc = document.getElementById("desc");
const asc = document.getElementById("asc");
let arrSort = [];

//----------------DESC----------------

desc.onclick = e => {
  e.preventDefault();

  let todoSorted = [...todoList.children].sort((a,b) => {
    return b.getAttribute("data-time") - a.getAttribute("data-time");
  })
  todoList.innerHTML = '';
  for (let li of todoSorted) {
    todoList.appendChild(li);
  }

  let completedSorted = [...completedList.children].sort((a,b) => {
    return b.getAttribute("data-time") - a.getAttribute("data-time");
  })
  completedList.innerHTML = '';
  for (let li of completedSorted) {
    completedList.appendChild(li);
  }

  let btnSettings = document.getElementsByClassName("btn-setting");
  positioningBtnSettings(btnSettings);
};

//----------------ASC----------------

asc.onclick = e => {
  e.preventDefault();

  let todoSorted = [...todoList.children].sort((a,b) => {
    return a.getAttribute("data-time") - b.getAttribute("data-time");
  })
  todoList.innerHTML = '';
  for (let li of todoSorted) {
    todoList.appendChild(li);
  }

  let completedSorted = [...completedList.children].sort((a,b) => {
    return a.getAttribute("data-time") - b.getAttribute("data-time");
  })
  completedList.innerHTML = '';
  for (let li of completedSorted) {
    completedList.appendChild(li);
  }

  let btnSettings = document.getElementsByClassName("btn-setting");
  positioningBtnSettings(btnSettings);
};

//-----------------Sort---------------------

//-----------------Clear list---------------------

let clearList = document.getElementById('btn-clear');

clearList.addEventListener('click', (e) => {
  e.preventDefault();

  todoList.innerHTML = '';
  completedList.innerHTML = '';
  todoAmount.innerHTML = ` (${todoList.children.length})`;
  completedAmount.innerHTML = ` (${completedList.children.length})`;
})

//-----------------Clear list---------------------

// if (localStorage.getItem('localTodo')) {
//   todoList.innerHTML = localStorage.getItem('localTodo');
//   let btnSettings = document.getElementsByClassName("btn-setting");
//   positioningBtnSettings(btnSettings);
// }

// if (localStorage.getItem('localCompletedTodo')) {
//   completedList.innerHTML = localStorage.getItem('localCompletedTodo');
//   let btnSettings = document.getElementsByClassName("btn-setting");
// }