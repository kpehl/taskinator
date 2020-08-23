
// Variables declared for the task-form and tasks-to-do classes
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Variable declared for the page-content id on the main section in the html page to enable modifying tasks
var pageContentEl = document.querySelector("#page-content");

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

    // If the form is being used to edit a task, a data task id will have been assigned to the form in editTask() below
    var isEdit = formEl.hasAttribute("data-task-id");

    // If an edit is being done, the task will be updated with a function
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // If there is no data attribute, a new task is being created.
    else {
        // Package the data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        // Send the data as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
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

// Listener for creating a new task
formEl.addEventListener("submit", taskFormHandler);

// Function for modifying the tasks
var taskButtonHandler = function(event) {
    console.log(event.target);

    // Get the target element from the event, i.e. the button click
    var targetEl = event.target;

    // If the edit button is clicked
    if (targetEl.matches(".edit-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        // run the edit task function
        editTask(taskId);
    }

    // If the delete button is clicked
    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        // run the delele task function
        deleteTask(taskId);
    }
};

// Function for deleting a task
var deleteTask = function(taskId) {
    // get the task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // remove the element
    taskSelected.remove();
}

// Function for editing a task in the form
var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get the task name and type from the list element
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // put the current values into the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // change the button to Save Task instead of Add Task
    document.querySelector("#save-task").textContent = "Save Task";

    // Set the task id on the form
    formEl.setAttribute("data-task-id", taskId);
}

// Function for saving the edited task information to the correct task id
var completeEditTask = function(taskName, taskType, taskId) {
    // Find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Set the new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // Alert box for the user
    alert("Task Updated!");

    // Reset the form by removing the task id and changing the button text back to Add Task
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

// Listener for modifying the tasks
pageContentEl.addEventListener("click", taskButtonHandler);