// Get current date and time
var now = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
var datetime = now.toLocaleString();

// Insert date and time into HTML
document.getElementById("date").innerHTML = datetime;

// Get references to the button and task container
const addTaskBtn = document.getElementById('addTaskBtn');
const taskContainer = document.getElementById('taskContainer');

// Report section elements
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const pendingTasksElement = document.getElementById('pendingTasks');

// Confirmation dialog elements
const confirmationDialog = document.getElementById('confirmationDialog');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let taskToRemove = null; // Holds the task that is being removed

let totalTasks = 0;
let completedTasks = 0;
let pendingTasks = 0;

// Function to update the task report
function updateReport() {
    totalTasksElement.innerText = totalTasks;
    completedTasksElement.innerText = completedTasks;
    pendingTasksElement.innerText = totalTasks - completedTasks;
}

addTaskBtn.addEventListener('click', () => {
    // Create a new task container div
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')

    // Create a checkbox for the task
    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.classList.add('taskCheckbox');

    // Create input field for the task description
    const taskInput = document.createElement('input')
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('placeholder', 'Enter your task');
    taskInput.classList.add('taskText');

    // Create input field for the deadline (date)
    const deadlineInput = document.createElement('input')
    deadlineInput.setAttribute('type', 'time');
    deadlineInput.classList.add('taskTime');

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('removeBtn');

    // Add event listener to checkbox for strike-through and blur effect
    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            taskInput.style.textDecoration = 'line-through';
            // taskInput.style.filter = 'blur(2px)';
            deadlineInput.style.textDecoration = 'line-through';
            deadlineInput.style.filter = 'blur(2px)';
            removeBtn.style.textDecoration = 'line-through';
            removeBtn.style.filter = 'blur(2px)';
            completedTasks++;
        }
        else {
            // Remove strike-through and blur
            taskInput.style.textDecoration = 'none';
            // taskInput.style.filter = 'none';
            deadlineInput.style.textDecoration = 'none';
            deadlineInput.style.filter = 'none';
            removeBtn.style.textDecoration = 'none';
            removeBtn.style.filter = 'none';
            completedTasks--;
        }
        updateReport();
    })

    // Add event listener to remove button for confirmation
    removeBtn.addEventListener('click', () => {
        taskToRemove = taskDiv;
        confirmationDialog.style.display = 'block'; // Show the confirmation dialog
    });

    // Append the input fields to the task div
    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskInput);
    taskDiv.appendChild(deadlineInput)
    taskDiv.appendChild(removeBtn);

    // Append the task div to the task container
    taskContainer.appendChild(taskDiv);

    // Update the report when a new task is added
    totalTasks++;
    updateReport();

})
// Handle the 'Yes' button click for removing the task
yesBtn.addEventListener('click', () => {
    if (taskToRemove) {
        taskContainer.removeChild(taskToRemove); // Remove task from the container
        totalTasks--;
        const taskCheckbox = taskToRemove.querySelector('.taskCheckbox');
        if (taskCheckbox.checked) {
            completedTasks--;
        }
        updateReport();
        taskToRemove = null;
    }
    confirmationDialog.style.display = 'none'; // Hide the confirmation dialog
});

// Handle the 'No' button click to cancel task removal
noBtn.addEventListener('click', () => {
    confirmationDialog.style.display = 'none'; // Hide the confirmation dialog
});

