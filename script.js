document.addEventListener("DOMContentLoaded", function () {
    // 1. اختيار زر "Add Task" وتخزينه في ثابت (constant) باسم addButton
    const addButton = document.getElementById("add-task-btn");
    
    // 2. اختيار حقل الإدخال وتخزينه في ثابت باسم taskInput
    const taskInput = document.getElementById("task-input");
    
    // 3. اختيار قائمة المهام وتخزينها في ثابت باسم taskList
    const taskList = document.getElementById("task-list");

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = "";
    }

    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
