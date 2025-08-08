document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function addTask() {
        const taskText = taskInput.value.trim();

        // الشرط الأول: التحقق من أن المهمة ليست فارغة وإظهار تنبيه
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // 1. إنشاء عنصر <li> جديد
        const li = document.createElement("li");
        // 2. تعيين محتواه النصي
        li.textContent = taskText;

        // 3. إنشاء زر الإزالة
        const removeButton = document.createElement("button");
        // 4. تعيين محتواه النصي إلى "Remove"
        removeButton.textContent = "Remove";
        // 5. إعطاؤه اسم الفئة 'remove-btn' (باستخدام className لتجنب classList.add)
        removeButton.className = "remove-btn";

        // 6. تعيين حدث النقر onclick
        removeButton.onclick = function () {
            // إزالة عنصر li من قائمة المهام
            taskList.removeChild(li);
        };

        // 7. إضافة زر الإزالة إلى عنصر li
        li.appendChild(removeButton);
        // 8. إضافة عنصر li إلى قائمة المهام
        taskList.appendChild(li);

        // 9. مسح حقل الإدخال
        taskInput.value = "";
    }

    // ربط زر الإضافة بدالة addTask
    addButton.addEventListener("click", addTask);

    // ربط حقل الإدخال بالضغط على مفتاح "Enter"
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
