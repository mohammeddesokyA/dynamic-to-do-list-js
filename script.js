// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert if empty
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // Add a class to the li for styling

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event listener to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the list item
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(li);
        // Clear the input field
        taskInput.value = "";
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask); // Add task on button click
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Add task on Enter key press
        }
    });
});
