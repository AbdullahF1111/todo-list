import "./style.css";
import { Todos } from "./todos.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
import { renderProjects, renderTasks } from "./dom.js";
import { saveProjects, loadProjects } from "./storage.js";

// ===== State =====
const todos = new Todos();
let currentProjectId = null;          // view state: the project that is open now
let editingTaskId = null;             // null means the form is in "add" mode
const expandedTaskIds = new Set();    // view state: tasks that are expanded

// ===== Elements =====
const addTaskBtn = document.getElementById("add-task-btn");
const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
const taskError = document.getElementById("task-error");
const cancelTaskBtn = document.getElementById("cancel-task-btn");

// ===== Helpers =====
function start(todos) {
    if (todos.projects.length === 0) {
        todos.addProject(new Project("Default"));
    }
}

// One place to redraw, so the two parts of the page never get out of sync
function render() {
    const project = todos.getProjectById(currentProjectId);
    renderProjects(todos, currentProjectId);
    renderTasks(project, expandedTaskIds);
}

// ===== Projects: open / delete =====
document.getElementById("projects").addEventListener("click", (event) => {
    const projectElement = event.target.closest(".project");
    if (!projectElement) return;                       // click on empty space

    const id = projectElement.dataset.projectId;
    const project = todos.getProjectById(id);
    if (!project) return;

    if (event.target.matches(".delete-project")) {
        if (!confirm(`Delete the project "${project.title}" and its tasks?`)) return;

        todos.deleteProject(id);
        if (id === currentProjectId) {
            currentProjectId = todos.projects[0].id;   // the default project always exists
        }
        saveProjects(todos);
        render();
        return;                                        // do not continue to "open project"
    }

    currentProjectId = id;
    render();
});

// ===== Projects: add =====
document.getElementById("add-project-btn").addEventListener("click", () => {
    const name = prompt("Enter project name:");
    if (name === null) return;                         // user pressed Cancel

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

// ===== Tasks: mark as completed (checkbox only) =====
document.getElementById("tasks").addEventListener("change", (event) => {
    if (!event.target.matches('input[type="checkbox"]')) return;

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

// ===== Tasks: delete / edit / expand =====
document.getElementById("tasks").addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const project = todos.getProjectById(currentProjectId);
    if (!project) return;
    const taskId = taskElement.dataset.taskId;

    if (event.target.matches(".delete-task")) {
        project.deleteTask(taskId);
        expandedTaskIds.delete(taskId);                // clean up the view state
        saveProjects(todos);
        render();
        return;
    }

    if (event.target.matches(".edit-task")) {
        const task = project.getTaskById(taskId);
        if (!task) return;

        editingTaskId = taskId;                        // the form is now in "edit" mode
        taskError.hidden = true;

        taskForm.elements.title.value = task.title;
        taskForm.elements.desc.value = task.desc;
        taskForm.elements.duedate.value = task.duedate;
        taskForm.elements.priority.value = task.priority;
        taskDialog.showModal();
        return;
    }

    // A click on the summary (but not on the checkbox or its label) expands / collapses
    if (event.target.closest(".task-summary") && !event.target.closest("input, label")) {
        if (expandedTaskIds.has(taskId)) {
            expandedTaskIds.delete(taskId);
        } else {
            expandedTaskIds.add(taskId);
        }
        render();
    }
});

// ===== Task dialog =====
addTaskBtn.addEventListener("click", () => {
    taskForm.reset();                                  // clear old values on open
    taskError.hidden = true;                           // clear old error on open
    editingTaskId = null;                              // "add" mode
    taskDialog.showModal();
});

cancelTaskBtn.addEventListener("click", () => taskDialog.close());

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();                            // always the first line

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
            task.edit(title, desc, duedate, priority); // same task, no delete or add
        } else {
            project.addTask(new Task(title, desc, duedate, priority));
        }
    } catch (error) {
        taskError.textContent = error.message;
        taskError.hidden = false;
        return;                                        // stay open, nothing was changed
    }

    taskDialog.close();                                // only after success
    saveProjects(todos);
    render();
});

// ===== Initial load: load, then ensure the default project, then draw =====
loadProjects().forEach((project) => todos.addProject(project));
start(todos);
currentProjectId = todos.projects[0].id;
render();