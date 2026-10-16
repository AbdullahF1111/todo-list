import "./style.css";
import { Project } from "./project.js";
import { Task } from "./task.js";
const project = new Project("Default");
project.addTask(new Task("Buy milk", "2 liters", "2026-10-20", "high"));
console.log(project);                  // كائن قابل للتوسيع في الـ Console
console.log("project:", project);      // فاصلة بدل +
console.log(JSON.stringify(project, null, 2));   // نص منسّق
console.table(project.tasks);          // جدول للمهام