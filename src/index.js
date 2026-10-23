import "./style.css";
import { Todos } from "./todos.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
import { renderProjects, renderTasks } from "./dom.js";
import { saveProjects, loadProjects } from "./storage.js";

const todos = new Todos();
let currentProjectId = null;
let editingTaskId = null;   // null يعني: نموذج إضافة 
const addTaskBtn = document.getElementById("add-task-btn");
const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
const taskError = document.getElementById("task-error");
const cancelTaskBtn = document.getElementById("cancel-task-btn");

loadProjects().forEach((project) => todos.addProject(project));
start(todos);
currentProjectId = todos.projects[0].id;
render();

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


// 3. مستمع واحد على الحاوية الثابتة
document.getElementById("projects").addEventListener("click", (event) => {
    const projectElement = event.target.closest(".project");
    if (!projectElement) return;                       // نقرة على فراغ

    const id = projectElement.dataset.projectId;
    const project = todos.getProjectById(id);
    if (!project) return;

    if (event.target.matches(".delete-project")) {
        if (!confirm(`Delete the project "${project.title}" and its tasks?`)) return;

        todos.deleteProject(id);
        if (id === currentProjectId) {
            currentProjectId = todos.projects[0].id;
        }
        saveProjects(todos);
        render();
        return;                                        // لا تكمل إلى الاختيار
    }

    currentProjectId = id;
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
    saveProjects(todos);
    render();
});

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

    taskDialog.close();
    saveProjects(todos);
    // بعد النجاح فقط
    render();
});

document.getElementById("tasks").addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const project = todos.getProjectById(currentProjectId);
    if (!project) return;
    const taskId = taskElement.dataset.taskId;

    if (event.target.matches(".delete-task")) {
        project.deleteTask(taskId);
        saveProjects(todos);     // 1. غيّر البيانات
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

document.getElementById("add-project-btn").addEventListener("click", () => {
    const name = prompt("Enter project name:");
    if (name === null) return;                 // ضغط Cancel
    try {
        const newProject = new Project(name);
        todos.addProject(newProject);
        currentProjectId = newProject.id;
    } catch (error) {
        alert(error.message);
        return;
    }
    saveProjects(todos);
    render();
});


