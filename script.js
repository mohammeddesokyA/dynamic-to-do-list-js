document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            // هنا لم تطلب تنبيه، فقط العودة.
            return;
        }

        // 1. إنشاء عنصر <li> جديد
        const li = document.createElement("li");
        // 2. تعيين محتواه النصي إلى taskText
        li.textContent = taskText;

        // 3. إنشاء عنصر <button> جديد لإزالة المهمة
        const removeButton = document.createElement("button");
        // 4. تعيين محتواه النصي إلى "Remove"
        removeButton.textContent = "Remove";
        // 5. إعطاؤه اسم الفئة 'remove-btn'
        removeButton.className = "remove-btn";

        // 6. تعيين حدث onclick
        removeButton.onclick = function () {
            // إزالة عنصر <li> الأب من taskList
            taskList.removeChild(li);
        };

        // 7. إضافة زر الإزالة إلى عنصر <li>
        li.appendChild(removeButton);
        // 8. إضافة عنصر <li> إلى taskList
        taskList.appendChild(li);

        // 9. مسح حقل الإدخال
        taskInput.value = "";
    }

    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
