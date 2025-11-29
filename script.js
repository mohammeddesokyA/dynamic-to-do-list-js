document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const emptyState = document.getElementById("empty-state");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const clearBtn = document.getElementById("clear-btn");
    const themeToggle = document.getElementById("theme-toggle");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all"; 

    if (localStorage.getItem("theme") === "dark") {
        document.body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        document.body.setAttribute("data-theme", isDark ? "light" : "dark");
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", isDark ? "light" : "dark");
    });

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = "";
        
        let filteredTasks = tasks.filter(task => {
            if (currentFilter === "active") return !task.completed;
            if (currentFilter === "completed") return task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            emptyState.classList.remove("hidden");
            emptyState.querySelector("p").textContent = 
                currentFilter === "all" ? "No tasks yet! ☕" : "No tasks in this list!";
        } else {
            emptyState.classList.add("hidden");
        }

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.setAttribute("draggable", "true");
            li.setAttribute("data-id", task.id);
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <div class="task-info">
                    <span class="task-text">${task.text}</span>
                    <span class="task-date"><i class="far fa-clock"></i> ${task.createdAt}</span>
                </div>
                <div class="actions">
                    <button class="icon-btn check-btn" onclick="toggleTask(${task.id})"><i class="fas fa-check"></i></button>
                    <button class="icon-btn edit-btn" onclick="editTask(${task.id})"><i class="fas fa-pen"></i></button>
                    <button class="icon-btn delete-btn" onclick="deleteTask(${task.id})"><i class="fas fa-trash"></i></button>
                </div>
            `;

            addDragEvents(li);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return alert("Please write a task!");

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString('en-US', { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            })
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = "";
    }

    window.toggleTask = function(id) {
    tasks = tasks.map(t => {
        if (t.id === id) {
            const newStatus = !t.completed;
            if (newStatus) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            return { ...t, completed: newStatus };
        }
        return t;
    });
    saveTasks();
};

    window.deleteTask = function(id) {
        if(confirm("Delete this task?")) {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
        }
    };

    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        const newText = prompt("Update task:", task.text);
        if (newText && newText.trim()) {
            task.text = newText.trim();
            saveTasks();
        }
    };

    clearBtn.addEventListener("click", () => {
        if(confirm("Clear all completed tasks?")) {
            tasks = tasks.filter(t => !t.completed);
            saveTasks();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            renderTasks();
        });
    });

    let dragStartIndex;

    function addDragEvents(li) {
        li.addEventListener('dragstart', () => {
            dragStartIndex = +li.closest('li').getAttribute('data-id');
            li.classList.add('dragging');
        });

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });

        li.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        li.addEventListener('drop', (e) => {
            const dragEndIndex = +li.closest('li').getAttribute('data-id');
            swapItems(dragStartIndex, dragEndIndex);
        });
    }

    function swapItems(fromId, toId) {
        const fromIndex = tasks.findIndex(t => t.id === fromId);
        const toIndex = tasks.findIndex(t => t.id === toId);

        const itemOne = tasks[fromIndex];
        const itemTwo = tasks[toIndex];
        tasks[fromIndex] = itemTwo;
        tasks[toIndex] = itemOne;
        
        saveTasks();
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });

    renderTasks();
});