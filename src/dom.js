import { Todos } from "./todos";

export function renderProjects(todos) {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = "";

    todos.projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.textContent = project.title;
        projectElement.dataset.projectId = project.id;

        if (todos.isDefaultProject(project)) {
            projectElement.classList.add("default-project");
        }

        projectsContainer.appendChild(projectElement);
    });
}