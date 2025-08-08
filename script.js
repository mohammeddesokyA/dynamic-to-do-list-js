document.addEventListener("DOMContentLoaded", function () {
    // Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Add Task Function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");

        // Append delete button to list item
        li.appendChild(deleteBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";

        // Delete functionality
        deleteBtn.addEventListener("click", function () {
            li.remove();
        });
    }

    // Add event listener to Add button
    addButton.addEventListener("click", addTask);

    // Allow Enter key to add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
