const form = document.getElementById("form");
const completed = document.getElementById("btn-completed");
const todoList = document.getElementById("todo-list");
const statesRow = document.querySelector(".states.row");
const statesRowItems = statesRow.querySelectorAll("button.list-state");
let todosArray = JSON.parse(localStorage.getItem("todoList")) || [];
let dragStartId;
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
  drangNdrop();
}
form.addEventListener("submit", StoreTodo);

function drangNdrop() {
  const draggables = document.querySelectorAll(".draggable");
  const todoLi = document.querySelectorAll(".todo-list__item");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  todoLi.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
  });
}
function dragStart() {
  dragStartId = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop(e) {
  // e.preventDefault();
  dragEndId = +this.closest("li").getAttribute("data-index");
  swapItems(dragStartId, dragEndId);
}
// swap drag and drop items
function swapItems(dragStartId, dragEndId) {
  const todoLi = document.querySelectorAll(".todo-list__item");
  const itemOne = todoLi[dragStartId].querySelector(".draggable");
  const itemTwo = todoLi[dragEndId].querySelector(".draggable");
  todoLi[dragStartId].appendChild(itemTwo);
  todoLi[dragEndId].appendChild(itemOne);
  console.log(todosArray);
  // swap item position in todosArray
  let x = todosArray[dragStartId];
  todosArray[dragStartId] = todosArray[dragEndId];
  todosArray[dragEndId] = x;
  // update localStorage
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  console.log(todosArray);
}
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
  btn.addEventListener("click", (e) => {
    statesRowItems.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // on clicking active button
    if (e.target.textContent === "All") {
      populateList(todosArray);
    }
    // on clicking active state
    if (e.target.textContent === "Active") {
      // create array containing items which are active
      const activeTodosArray = todosArray.filter((item) => !item.completed);
      populateList(activeTodosArray);
    }
    if (e.target.textContent === "Completed") {
      const activeTodosArray = todosArray.filter((item) => item.completed);
      populateList(activeTodosArray);
    }
  });
});

// calling list items on reload
populateList(todosArray);
