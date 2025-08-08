// Array to store tasks
let tasks = [];

// Get DOM elements
const addButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from Local Storage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

// Function to load tasks
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(taskText => addTask(taskText, false)); // don't save again while loading
}

// Function to save tasks to Local Storage
function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a task
function addTask(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        tasks = tasks.filter(task => task !== taskText);
        saveTasksToStorage();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
        tasks.push(taskText);
        saveTasksToStorage();
    }
}

// Add task when clicking the button
addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});
