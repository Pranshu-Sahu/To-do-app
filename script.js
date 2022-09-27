const form = document.getElementById("form");
const completed = document.getElementById("btn-completed");
const todoList = document.getElementById("todo-list");
const statesRow = document.querySelector(".states.row");
const statesRowItems = statesRow.querySelectorAll("button.list-state");
const completedBtn = statesRowItems[2];
let todosArray = JSON.parse(localStorage.getItem("todoList")) || [];
function StoreTodo(e) {
  e.preventDefault();
  const text = this.querySelector("input").value;
  const item = { text, completed: false };
  todosArray.push(item);
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  this.reset();
  populateList(todosArray);
  itemsLeft();
}

function populateList(arr) {
  todoList.innerHTML = arr
    .map((item, index) => {
      return `<li class="todo-list__item" data-index=${index}>
      <div class='draggable' draggable="true">
        <label class="todo-list__label">
        <input type="checkbox" ${item.completed ? "checked" : ""}>
        <span class="checkmark">
        <img class="icon-check" src="images/icon-check.svg">
        </span>
        <span class="todo">${item.text}</span></label>
        <button class="del">
          <img class="icon-cross" src="images/icon-cross.svg" alt="cross icon"/>
        </button>
        </div>
        </li>`;
    })
    .join("");
}
form.addEventListener("submit", StoreTodo);

// toggle done task
function completedTask(e) {
  if (!e.target.matches('input[type="checkbox"]')) return;
  const element = e.target.closest("li");
  const dataIndex = element.dataset.index;
  todosArray[dataIndex].completed = !todosArray[dataIndex].completed;
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  itemsLeft();
}
todoList.addEventListener("click", completedTask);
// delete item from list
function deleteItem(e) {
  if (e.target.matches(".del") || e.target.matches(".icon-cross")) {
    const element = e.target.closest("li");
    const dataIndex = element.dataset.index;
    todosArray.splice(dataIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todosArray));
    populateList(todosArray);
    itemsLeft();
  }
}
todoList.addEventListener("click", deleteItem);

// items left function
function itemsLeft() {
  let x = 0;
  todosArray.forEach((item) => {
    if (!item.completed) x += 1;
  });
  document.getElementById("items-left").innerHTML = x;
}
itemsLeft();

/* working on footer state button */
statesRowItems.forEach((btn) => {
  btn.addEventListener("click",(e) => {
    statesRowItems.forEach((btn) => {
      btn.classList.remove('active')
    })
    e.target.classList.add("active")
  })
})

// calling list items on reload
populateList(todosArray);
