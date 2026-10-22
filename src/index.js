import "./style.css";
import { Todos } from "./todos.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
import { renderProjects, renderTasks } from "./dom.js";

const todos = new Todos();
let currentProjectId = null;
let editingTaskId = null;   // null يعني: نموذج إضافة 
const addTaskBtn = document.getElementById("add-task-btn");
const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
const taskError = document.getElementById("task-error");
const cancelTaskBtn = document.getElementById("cancel-task-btn");         // الحالة: المشروع المفتوح الآن

function start(todos) {
    if (todos.projects.length === 0) {
        todos.addProject(new Project("Default"));
    }
}

// نقطة واحدة لإعادة الرسم، فلا تنسى إحدى الدالتين
function render() {
    const project = todos.getProjectById(currentProjectId);
    renderProjects(todos, currentProjectId);
    renderTasks(project);
}

// 1. الافتراضي أولاً، قبل أي مشروع آخر
start(todos);

// 2. بيانات اختبار مؤقتة (احذفها لاحقاً)
const work = new Project("Work");
todos.addProject(work);

// 3. مستمع واحد على الحاوية الثابتة
document.getElementById("projects").addEventListener("click", (event) => {
    const projectElement = event.target.closest(".project");
    if (!projectElement) return;                         // نقرة على فراغ

    const project = todos.getProjectById(projectElement.dataset.projectId);
    if (!project) return;                                // id لا يطابق شيئاً

    currentProjectId = project.id;
    render();
});

document.getElementById("tasks").addEventListener("change", (event) => {
    if (!event.target.matches('input[type="checkbox"]')) return;   // المربع فقط

    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const project = todos.getProjectById(currentProjectId);
    if (!project) return;

    const task = project.getTaskById(taskElement.dataset.taskId);
    if (!task) return;

    task.toggleCompleted();
    render();
});

// 4. عند فتح الصفحة: يفتح الافتراضي
currentProjectId = todos.projects[0].id;
render();

addTaskBtn.addEventListener("click", () => {
    taskForm.reset();            // clear old values on open
    taskError.hidden = true;     // clear old error on open
    editingTaskId = null
    taskDialog.showModal();
});

cancelTaskBtn.addEventListener("click", () => taskDialog.close());

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();                       // أول سطر دائماً

    const project = todos.getProjectById(currentProjectId);
    if (!project) return;

    const data = new FormData(taskForm);
    const title = data.get("title");
    const desc = data.get("desc");
    const duedate = data.get("duedate");
    const priority = data.get("priority");

    try {
        if (editingTaskId) {
            const task = project.getTaskById(editingTaskId);
            if (!task) return;
            task.edit(title, desc, duedate, priority);       // نفس المهمة، دون حذف أو إضافة
        } else {
            project.addTask(new Task(title, desc, duedate, priority));
        }
    } catch (error) {
        taskError.textContent = error.message;
        taskError.hidden = false;
        return;                                   // يبقى مفتوحاً، ولم يتغير شيء
    }

    taskDialog.close();                           // بعد النجاح فقط
    render();
});

document.getElementById("tasks").addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const project = todos.getProjectById(currentProjectId);
    if (!project) return;
    const taskId = taskElement.dataset.taskId;

    if (event.target.matches(".delete-task")) {
        project.deleteTask(taskId);       // 1. غيّر البيانات
        render();                         // 2. أعد الرسم
    }

    if (event.target.matches(".edit-task")) {
        const task = project.getTaskById(taskId);
        if (!task) return;

        editingTaskId = taskId;                 // ← الإضافة: نحن في وضع تعديل
        taskError.hidden = true;                // ← امسح خطأً قديماً

        taskForm.title.value = task.title;
        taskForm.desc.value = task.desc;
        taskForm.duedate.value = task.duedate;
        taskForm.priority.value = task.priority;
        taskDialog.showModal();
    }
});


