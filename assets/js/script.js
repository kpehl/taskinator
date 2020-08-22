
// Variables declared for the task-form and tasks-to-do classes
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Function to get user input and call a function to create a task item
var taskFormHandler = function() {
    // Prevent a page refresh, losing local data
    event.preventDefault();

    // Get the user input from the form
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Package the data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // Send the data as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

// Function to create a task item using user input and appending that task item to the list
var createTaskEl = function(taskDataObj) {
    // Create the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // and give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //Add the entire list item to the list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);