const firebaseConfig = {
  apiKey: "AIzaSyDUF4V2HxLmm6OW5YZcEu3LkzAb6aRLE4g",
  authDomain: "todo-applicatioin.firebaseapp.com",
  databaseURL: "https://todo-applicatioin-default-rtdb.firebaseio.com",
  projectId: "todo-applicatioin",
  storageBucket: "todo-applicatioin.firebasestorage.app",
  messagingSenderId: "871188996213",
  appId: "1:871188996213:web:02a38c1cd788b5bff2183c",
  measurementId: "G-N1WMSL6TGY"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var db = firebase.database();



var userInput = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");

var todos = JSON.parse(localStorage.getItem("todos")) || [];
showTodos();

function addTodo() {
  var text = userInput.value.trim();

  if (text === "") {
    alert("Please write something!");
    return;
  }

  var todoObj = { text: text, done: false };
  todos.push(todoObj);
  saveTodos();
  showTodos();
    firebase.database().ref("todos").push(todoObj);
  userInput.value = "";
}

function showTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    var li = document.createElement("li");
    li.className = "todo";

    li.innerHTML = `
      <input type="checkbox" id="todo-${index}" ${todo.done ? "checked" : ""}>
      <label class="costum-checkbox" for="todo-${index}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
      </label>
      <label for="todo-${index}" class="todo-text">${todo.text}</label>
      <button class="delete-button">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 
          56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 
          0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
      </button>
    `;

    var checkbox = li.querySelector("input");
    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      showTodos();
    });

    var delBtn = li.querySelector(".delete-button");
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      showTodos();
    });

    todoList.appendChild(li);
  });
}

//  localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
