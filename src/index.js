import { Todos } from "./todos.js";
import { Project } from "./project.js";

const todos = new Todos();
const def = new Project("Default");
const work = new Project("Work");
todos.addProject(def);
todos.addProject(work);

// الحالة 1: حذف الافتراضي (يجب أن يفشل)
try {
  todos.deleteProject(def.id);
  console.log("BAD: the default was deleted");
} catch (error) {
  console.log("OK, rejected:", error.message);
}

// الحالة 2: حذف Work (يجب أن ينجح)
todos.deleteProject(work.id);

// الحالة 3: id غير موجود
todos.deleteProject("not-found");

// الحالة 4: قائمة فارغة
new Todos().deleteProject("x");

// النتيجة النهائية
console.log(todos.projects.map((p) => p.title));