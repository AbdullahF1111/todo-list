import "./style.css";
import { Todos } from "./todos.js";
import { Project } from "./project.js";
import { Task } from "./task.js";
import { renderProjects, renderTasks } from "./dom.js";

const todos = new Todos();
let currentProjectId = null;           // الحالة: المشروع المفتوح الآن

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
work.addTask(new Task("A", "", "2026-10-21", "low"));
work.addTask(new Task("B", "x", "2026-10-22", "high"));
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

// 4. عند فتح الصفحة: يفتح الافتراضي
currentProjectId = todos.projects[0].id;
render();