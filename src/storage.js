import { Project } from "./project.js";

const KEY = "todo-list:projects";

export function saveProjects(todos) {
    localStorage.setItem(KEY, JSON.stringify(todos.projects));
}

export function loadProjects() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];                       // أول تشغيل: لا شيء محفوظ

    try {
        return JSON.parse(raw).map((p) => Project.fromJSON(p));
    } catch (error) {
        console.error("Failed to load projects", error);
        return [];                             // بيانات تالفة: ابدأ من جديد
    }
}