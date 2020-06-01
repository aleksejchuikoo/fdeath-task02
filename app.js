//-----------------POPUP-------------------------

let popupBtns = document.getElementsByClassName("btn-popup");
let allModals = document.getElementsByClassName("modal");
let closeBtns = document.getElementsByClassName("close");
let secondCloseBtns = document.getElementsByClassName("secondCloseBtn");


for (let i = 0; i < allModals.length; i++) {
  popupBtns[i].onclick = () => {
    allModals[i].style.display = "flex";
  }

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

const todoInputTitle = document.getElementById("inputTitle");
const todoInputText = document.getElementById("inputText");
const radios = document.getElementsByName("radios");
const todoAdd = document.getElementById("add");
const todoList = document.querySelector(".todo-box__list");
const completedList = document.querySelector(".completed-box__list");
let radioChecked = false;


todoAdd.addEventListener("click", addTodo);

//-----------------ToDo List---------------------

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
  let btnSettings = document.getElementsByClassName("btn-setting");

// ------------LI-------------

// ------------Add ToDo-------------

  if (todoInputTitle.value !== "" && todoInputText.value !== "") {
    
    todoList.appendChild(todoItem);
    todoItemTitle.innerHTML = todoInputTitle.value;
    todoItemText.innerHTML = todoInputText.value;

    for (let i = 0; i < btnSettings.length; i++) {
      btnSettings[i].onclick = () => {
        if ( btnSettings[i].nextElementSibling.style.display == "flex") {
          btnSettings[i].nextElementSibling.style.display = "none";
        } else {
          btnSettings[i].nextElementSibling.style.display = "flex";
        }
      }
    }

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

    todoBtnDanger.addEventListener("click", deleteItem);
    // todoBtnInfo.addEventListener("click", editItem);
    // todoBtnSuccess.addEventListener("click", completeItem);

// ------------Add ToDo-------------

// ------------Clear ToDo Input value-------------

    todoInputTitle.value = "";
    todoInputText.value = "";

    if (radioChecked.checked == true) {
      radioChecked.checked = false;
    }

// ------------Clear ToDo Input value-------------

// ------------Btn Settings---------
  

    function deleteItem (e) {
      e.preventDefault();
      
      todoList.removeChild(todoItem);
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

}

//-----------------ToDo List---------------------

//-----------------Sort---------------------

// const desc = document.getElementById("desc");
// const asc = document.getElementById("asc");
// let arrSort = [];

// desc.onclick = () => {
//   arrSort = Array.from(todoList.children).sort( (a, b) => b.getAttribute("data-time") - a.getAttribute("data-time"));
//   console.log(arrSort);
//   return arrSort;
// };

// asc.onclick = () => {
//   arrSort = Array.from(todoList.children).sort( (a, b) => a.getAttribute("data-time") - b.getAttribute("data-time"));
//   console.log(arrSort);
//   return arrSort;
// };

//-----------------Sort---------------------
