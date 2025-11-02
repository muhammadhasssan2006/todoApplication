// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDiNW7M9v6n68MaF1xz8jl_7JBHO1XWllw",
  authDomain: "todoapplication-4816e.firebaseapp.com",
  projectId: "todoapplication-4816e",
  storageBucket: "todoapplication-4816e.firebasestorage.app",
  messagingSenderId: "278752416465",
  appId: "1:278752416465:web:c83c8b24f186a1f99e6bf0",
  measurementId: "G-3ZZKRBFMGF"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();
console.log(app);

var userInput = document.getElementById("todoInput");

// Add Todo
function addTodo() {
  if (userInput.value === "") {
    alert("Add something to write!");
  } else {
    var todoList = document.getElementById("list");
    var liElement = document.createElement("li");
    liElement.style.cssText = `
      list-style-type: none; 
      margin: 10px; 
      background-color: #4A4D57; 
      color: #f6f7ffff; 
      padding: 15px; 
      font-size: 18px; 
      border: 2px solid #4A4D57; 
      border-radius: 30px; 
      display: flex; 
      align-items: center;
      justify-content: space-between;
    `;

    var textSpan = document.createElement("span");
    textSpan.style.flex = "1";
    textSpan.style.wordBreak = "break-word"; 
    textSpan.appendChild(document.createTextNode(userInput.value));
    liElement.appendChild(textSpan);

    var obj = { todo: userInput.value };
    firebase.database().ref("todos").push(obj).then(function (response) {
      var todoId = response.key;
      liElement.setAttribute("id", todoId);
    });

    // Buttons 
    var btnWrapper = document.createElement("div");
    btnWrapper.style.display = "flex";
    btnWrapper.style.gap = "10px";

    // Delete Button
    var delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.cssText = `
      padding: 10px;
      border: none; 
      border-radius: 20px; 
      background-color: #ff4757; 
      box-shadow: 0 0 10px #ff4757;
      cursor: pointer;
    `;
    delBtn.setAttribute("onclick", "deleteSingleItem(this)");

    // Edit Button
    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.style.cssText = `
      padding: 10px; 
      border: none; 
      border-radius: 20px; 
      background-color: #00FFC4; 
      box-shadow: 0 0 10px #00FFC4; 
      cursor: pointer;
    `;
    editBtn.setAttribute("onclick", "editSingleItem(this)");

    btnWrapper.appendChild(editBtn);
    btnWrapper.appendChild(delBtn);
    liElement.appendChild(btnWrapper);

    todoList.appendChild(liElement);
    userInput.value = "";
  }
}

// get data from firebase
function getDataFromDatabase() {
  firebase
    .database()
    .ref("todos")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        var todoId = childSnapshot.key;

        var todoList = document.getElementById("list");
        var liElement = document.createElement("li");
        liElement.setAttribute("id", todoId);
        liElement.style.cssText = `
          list-style-type: none; 
          margin: 10px; 
          background-color: #4A4D57; 
          color: #f6f7ffff; 
          padding: 15px; 
          font-size: 18px; 
          border: 2px solid #4A4D57; 
          border-radius: 30px; 
          display: flex; 
          align-items: center;
          justify-content: space-between;
        `;

        var textSpan = document.createElement("span");
        textSpan.style.flex = "1";
        textSpan.style.wordBreak = "break-word";
        textSpan.appendChild(document.createTextNode(data.todo));
        liElement.appendChild(textSpan);

        var btnWrapper = document.createElement("div");
        btnWrapper.style.display = "flex";
        btnWrapper.style.gap = "10px";

        var delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.style.cssText = `
          padding: 10px; 
          border: none; 
          border-radius: 20px; 
          background-color: #ff4757; 
          box-shadow: 0 0 10px #ff4757;
          cursor: pointer;
        `;
        delBtn.setAttribute("onclick", "deleteSingleItem(this)");

        var editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.style.cssText = `
          padding: 10px; 
          border: none; 
          border-radius: 20px; 
          background-color: #00FFC4; 
          box-shadow: 0 0 10px #00FFC4; 
          cursor: pointer;
        `;
        editBtn.setAttribute("onclick", "editSingleItem(this)");

        btnWrapper.appendChild(editBtn);
        btnWrapper.appendChild(delBtn);
        liElement.appendChild(btnWrapper);

        todoList.appendChild(liElement);
      });
    });
}
getDataFromDatabase();

// Delete Todo
function deleteSingleItem(btn) {
  var li = btn.parentNode.parentNode;
  var todoId = li.getAttribute("id");

  firebase.database().ref("todos/" + todoId).remove().then(function () {
    li.remove();
  });
}

// Edit Todo
function editSingleItem(btn) {
  var li = btn.parentNode.parentNode;
  var todoId = li.getAttribute("id");
  var updatedValue = prompt("Enter updated value", li.childNodes[0].innerText);

  if (updatedValue) {
    firebase.database().ref("todos/" + todoId).update({ todo: updatedValue });
    li.childNodes[0].innerText = updatedValue;
  }
}
