// elements
const input = document.querySelector("#myInput");
const addBtn = document.querySelector(".addBtn");
const todosDOM = document.querySelector("#todos");

const TODO_STATUS = ["pendinig", "complete"];
let todos = [];

class Todo {
  constructor(id, title, status) {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  static addTodo() {
    const todoTitle = input.value;
    if (!todoTitle) return alert("Add a title for the todo.");
    const id = todos.length + 1;
    const todo = new Todo(id, todoTitle, TODO_STATUS[0]);
    todos.push(todo);
    UI.updateDOM(todos);
    LocalStorage.setTodos(todos);
    UI.resetUIElements();
  }

  static changeStatus(id) {
    const todoId = parseInt(id);
    const newTodos = [...todos];
    const todoToChange = newTodos.find((todo) => todo.id === parseInt(todoId));
    todoToChange.status =
      todoToChange.status === TODO_STATUS[0] ? TODO_STATUS[1] : TODO_STATUS[0];

    UI.updateDOM(newTodos);
    LocalStorage.setTodos(newTodos);
  }

  static deleteTodo(id) {
    const todoId = parseInt(id);
    todos = todos.filter((todo) => todo.id !== todoId);
    UI.updateDOM(todos);
    LocalStorage.setTodos(todos);
  }
}

class UI {
  // update DOM
  static updateDOM(todos) {
    if (todos.length === 0) {
      todosDOM.innerHTML = `<div class="no-todos">It's lonely here 🥺</div>`;
    } else {
      const formatTodos = todos
        .map((todo) => {
          const isChecked = todo.status === TODO_STATUS[0] ? "" : "checked";
          return `<li data-id=${todo.id} class='${isChecked}'>${todo.title} <span class="close">X</span></li>`;
        })
        .join("");
      todosDOM.innerHTML = formatTodos;
    }
  }

  static resetUIElements() {
    input.value = "";
  }
}

class LocalStorage {
  // get todos from local storage
  static getTodos() {
    const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
    return todosFromStorage ?? [];
  }

  // save todos to local storage
  static setTodos(todos) {
    const formatTodos = JSON.stringify(todos);
    localStorage.setItem("todos", formatTodos);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // get todos from local storage (this is not an AI prompt)
  todos = LocalStorage.getTodos();
  UI.updateDOM(todos);
});

todosDOM.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    Todo.changeStatus(e.target.dataset.id);
  }
  if (e.target.tagName === "SPAN") {
    const parentLI = e.target.parentElement;

    if (parentLI.tagName === "LI") Todo.deleteTodo(parentLI.dataset.id);
  }
});

addBtn.addEventListener("click", () => {
  Todo.addTodo();
});

/** TODO
 * What happens if user enters a very long title
 * problem: cannot add and clear without reloading browser
 */
