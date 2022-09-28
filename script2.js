const theme = document.getElementById("theme");

// change theme
theme.addEventListener("click", toggleTheme);
theme.addEventListener("keydown", toggleTheme);
function toggleTheme() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    theme.setAttribute("src", "images/icon-sun.svg");
  } else {
    theme.setAttribute("src", "images/icon-moon.svg");
  }
};
// function to clear completed tasks
function clearCompletedTask() {
  todosArray = [...todosArray.filter((task) => !task.completed)];
  localStorage.setItem("todoList", JSON.stringify(todosArray));
  populateList(todosArray);
}
// clicking clear completed task button
document.querySelector(".clear-completed").addEventListener("click", clearCompletedTask);
