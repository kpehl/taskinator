
// Variables declared for the task-form, tasks-to-do, tasks-in-progress, and tasks-completed classes
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// Variable declared for the page-content id on the main section in the html page to enable modifying tasks
var pageContentEl = document.querySelector("#page-content");

// Variable declared and initialized to provide a unique id for each task item
var taskIdCounter = 0;

// Array variable declared to allow for local storage and data persistence
var tasks = [];

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
            type: taskTypeInput,
            status: "to do"
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

    //Make the task item draggable
    listItemEl.setAttribute("draggable", "true");

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

    // Add the unique task id to the taskDataObj for this task
    taskDataObj.id = taskIdCounter;
    //and add the taskDataObj to the tasks array - this will allow for data persistence
    tasks.push(taskDataObj);

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


// Function for modifying the tasks
var taskButtonHandler = function(event) {
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

    // Remove the task from the task array as well
    // create a new array for the updated lists
    var updatedTaskArr = [];
    // loop through the current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if the task id doesn't match the selected task, keep that item and push it into the new array. Otherwise, the item will not be kept.
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign the tasks array to be the updatedTaskArr
    tasks = updatedTaskArr;
}

// Function for editing a task in the form
var editTask = function(taskId) {
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

    // Update the values in the tasks array as well
    // Loop through the array
    for (var i = 0; i < tasks.length; i++) {
        // If the task id matches the id of the task being updated
        if (tasks[i].id === parseInt(taskId)) {
            // then update the array values
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    // Alert box for the user
    alert("Task Updated!");

    // Reset the form by removing the task id and changing the button text back to Add Task
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}


// Function for changing a task's status
var taskStatusChangeHandler = function() {
    // Get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
    // Get the currently selected option's value and convert to lower case
    var statusValue = event.target.value.toLowerCase();
    // Find the parent task item element base on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // Move the task as needed based on the selected status
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // Update the task object in the tasks array as well
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
}


// Function to handle the drag operation
var dragTaskHandler = function(event) {
    // Get the task id from the item
    var taskId = event.target.getAttribute("data-task-id");
    // Store the task id in the dataTransfer property of the dragstart event
    event.dataTransfer.setData("text/plain", taskId);
    // Verify that the id was stored and is retrievable
    var getId = event.dataTransfer.getData("text/plain");
}

// Function to restrict and highlight the available drop zones for a task
var dropZoneDragHandler = function(event) {
    // Identify if the element under the task list as it is being dragged is a task list using the closest() method
    var taskListEl = event.target.closest(".task-list");
    // If the element is a task list, i.e. the desired drop zone
    if (taskListEl) {
        // Allow one element to be dropped on another
        event.preventDefault();
        // Highlight the task list element with style changes
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
}

// Function to handle the drop operation
var dropTaskHandler = function(event) {
    // Get the id stored in the dataTransfer property when the drag event started
    var id = event.dataTransfer.getData("text/plain");
    // Define the element based on that id
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    // Get the desired task status drop zone based on the closest element to where the task was dropped
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    // Initialize a statusSelect variable 
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    // Use the statusType and statusSelect variables to update the task's selected, i.e. displayed, status in the drop down menu 
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    // Remove the highlighted style from the task list element
    dropZoneEl.removeAttribute("style");
    // Append the element (task) to the new parent element (task list)
    dropZoneEl.appendChild(draggableElement);

    // Update the task in the tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
}

// A function to remove the highlighted style added by the dropZoneDragHandler when the task is no longer over a given drop zone
var dragLeaveHandler = function(event) {
    // Identify if the element under the task list as it is being dragged is a task list using the closest() method
    var taskListEl = event.target.closest(".task-list");
    // If the element is a task list
    if (taskListEl) {
        // Then remove the styling, so the highlight remains only on the active task list
        taskListEl.removeAttribute("style");
    }
}

// Listener for creating a new task
formEl.addEventListener("submit", taskFormHandler);

// Listener for modifying the task's name or type or deleting the task
pageContentEl.addEventListener("click", taskButtonHandler);

// Listener for changing a task's status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Listener for starting a drag and drop operation on a task
pageContentEl.addEventListener("dragstart", dragTaskHandler);

// Listener for the drop zone for a drag and drop operation
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// Listener for ending a drag and drop operation on a task
pageContentEl.addEventListener("drop", dropTaskHandler);

// Listener for the task element leaving a drop zone area
pageContentEl.addEventListener("dragleave", dragLeaveHandler);