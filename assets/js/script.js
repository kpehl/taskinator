
// Variables declared for the task-form and tasks-to-do classes
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Variable declared to provide a unique id for each task item
var taskIdCounter = 0;

// Function to get user input and call a function to create a task item
var taskFormHandler = function() {
    // Prevent a page refresh, losing local data
    event.preventDefault();

    // Get the user input from the form
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Validate that an input was provided
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }

    // Reset the form, ready for the user to input another task
    formEl.reset();

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

    // Add a unique task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create a div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // and give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // Add the task actions to the div
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // Add the entire list item to the list
    tasksToDoEl.appendChild(listItemEl);

    // Increase the task counter for the next unique id
    taskIdCounter++;
}

// Function for task actions - Edit, Delete, and Status
var createTaskActions = function(taskId) {
    // Create a new div element to hold the task action functions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // Create an Edit button and add it to the div
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn"
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // Create a Delete button and add it to the div
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // Create a dropdown menu to change the task status and add it to the div
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // Use an array and a for loop to create the options, making it easy to add to or change the options 
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create the option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append the option to the select menu
        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);

    // Return the container
    return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);