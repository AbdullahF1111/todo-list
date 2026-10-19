import { Todos } from "./todos.js";
import { Project } from "./project.js";
import { renderProjects } from "./dom.js";
const todos = new Todos();
const d=new Project("Default")
function start(todos) {
    if (todos.projects.length === 0) {
        todos.addProject(d);
    }
}
start(todos);
todos.addProject(new Project("Work"));
renderProjects(todos);
renderProjects(todos);   // مرتين عمداً
