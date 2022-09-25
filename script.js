const theme = document.getElementById("theme");
const form = document.getElementById("form");
const completed = document.getElementById("btn-completed");
const todoList = document.getElementById("todo-list");
// change theme
document.querySelector(".theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if(document.body.classList.contains('dark'))
  {
    theme.setAttribute('src',"images/icon-sun.svg");
  }
  else{
    theme.setAttribute('src',"images/icon-moon.svg");
  }
});

let todosArray = JSON.parse(localStorage.getItem("todoList")) || [];
function StoreTodo(e) {
  e.preventDefault();
  const text = this.querySelector("input").value;
  const item={text,completed:false};
  todosArray.push(item);
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  this.reset();
  populateList(todosArray);
  itemsLeft()
}
function populateList(arr) {
  const todoListItems = arr
    .map((item,index) => {
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
  todoList.innerHTML = todoListItems;
}
form.addEventListener("submit", StoreTodo);

function deleteItem(e) {
  if(e.target.matches('.del') || e.target.matches('.icon-cross')){
    const element = (e.target.closest('li'));
    const dataIndex=element.dataset.index;
    todosArray.splice(dataIndex,1);
    localStorage.setItem("todoList", JSON.stringify(todosArray));
    populateList(todosArray);
    itemsLeft();
  }
}
todoList.addEventListener("click",deleteItem);
function completedTask(e){
  if(!e.target.matches('input[type="checkbox"]')) return;
  const element = (e.target.closest('li'));
  const dataIndex=element.dataset.index;
  todosArray[dataIndex].completed = !todosArray[dataIndex].completed;
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  itemsLeft()
}
todoList.addEventListener("click",completedTask);

// adding active classes on states
const statesRow = document.querySelector('.states.row');
const statesRowItems = statesRow.querySelectorAll('button.list-state');
statesRowItems.forEach((btn) =>{
  btn.addEventListener("click",(e)=>{
    const currentActiveButton = statesRow.querySelector('button.list-state.active');
    // remove active state from previously active button
    currentActiveButton.classList.remove('active');
    // adding active class to clicked button
    e.target.classList.add('active');
  })
})

// clicking all-state button
document.getElementById('btn-all').addEventListener("click",()=>{
populateList(todosArray);
});
// function to display active tasks list
function displayActiveTask(){
  const activeTaskArray = todosArray.filter((task)=>
    (!task.completed))
  populateList(activeTaskArray);
  console.log(activeTaskArray.length," itemsLeft");
}
// clicking active-state button
document.getElementById('btn-active').addEventListener("click",displayActiveTask);
// function to display completed task
function displayCompletedTask(){
  const completedTaskArray = todosArray.filter((task)=>
    (task.completed))
  populateList(completedTaskArray);
}
// clicking completed button
completed.addEventListener("click",displayCompletedTask);

// function to clear completed tasks
function clearCompletedTask(){
  todosArray = [...todosArray.filter((task)=> !task.completed)]
 localStorage.setItem("todoList", JSON.stringify(todosArray));
  populateList(todosArray);
}
// clicking clear completed task button
document.querySelector('.clear-completed')
.addEventListener('click',clearCompletedTask);
// items left function
function itemsLeft(){
  let x=0;
  todosArray.forEach((item)=>{
    if(!item.completed) x+=1;
  })
  document.getElementById('items-left').innerHTML=x;
  console.log(x);
}
itemsLeft();

// calling list items on reload 
populateList(todosArray);
