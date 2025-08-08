// Select DOM Elements
const addButton = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Array to hold tasks
let tasks = [];

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Load tasks from Local Storage and populate the DOM
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(taskText => addTask(taskText, false)); // false → don't resave to storage
}

// Save tasks array to Local Storage
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task to DOM and Local Storage
function addTask(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', () => {
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

// Hook add button to task addition
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});
