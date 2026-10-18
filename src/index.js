import { Todos } from "./todos.js";
import { Project } from "./project.js";

const todos = new Todos();
function start(todos) {
    if (todos.projects.length === 0) {
        todos.addProject(new Project("Default"));
    }
}

start(todos);
start(todos);
console.log(todos.projects.length);   // خمّن: كم؟
