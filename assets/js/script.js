var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var createTaskHandler = function() {
    // Prevent a page refresh, losing local data
    event.preventDefault();

    // Get the user input from the form
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // and give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //Add the entire list item to the list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);