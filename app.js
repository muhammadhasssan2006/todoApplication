var todoInput = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");
var addButton = document.getElementById("addButton");

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

addButton.addEventListener("click", addTodo);

function addTodo() {
  var todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please write something!");
    return;
  }

  var li = document.createElement("li");
  li.className = "todo";
  var id = "todo-" + Date.now();

  li.innerHTML = `
    <input type="checkbox" id="${id}">
    <label for="${id}" class="costum-checkbox">
      <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px"
        viewBox="0 -960 960 960" width="24px">
        <path d="M382-240 154-468l57-57 171 171 367-367 
        57 57-424 424Z"/>
      </svg>
    </label>
    <label for="${id}" class="todo-text">${todoText}</label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200
        v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280
        v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
      </svg>
    </button>
  `;

  li.querySelector(".delete-button").addEventListener("click", function () {
    li.remove();
  });

  todoList.appendChild(li);
  todoInput.value = "";
}
