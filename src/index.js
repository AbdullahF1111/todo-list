import "./style.css";
import { Project } from "./project.js";
import { Task } from "./task.js";
const project = new Project("Default");
const a=new Task("A", "", "2026-10-21", "low")
project.addTask(a);
project.addTask(new Task("B", "", "2026-10-22", "urgent"));
console.log(project);                  // كائن قابل للتوسيع في الـ Console
console.log("project:", project);      // فاصلة بدل +
console.log(JSON.stringify(project, null, 2));   // نص منسّق
console.table(project.tasks);          // جدول للمهام


project.deleteTask(a.id);
console.log(project.tasks.length);
console.log(project);                  // كائن قابل للتوسيع في الـ Console
console.log("project:", project);      // فاصلة بدل +
console.log(JSON.stringify(project, null, 2));   // نص منسّق
console.table(project.tasks);    // خمّن: كم؟ وأي مهمة اختفت؟