
export function renderProjects(todos, currentProjectId) {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.textContent = "";

    todos.projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.textContent = project.title;
        projectElement.dataset.projectId = project.id;

        if (todos.isDefaultProject(project)) {
            projectElement.classList.add("default-project");
        }
        if (project.id === currentProjectId) {
            projectElement.classList.add("selected");
        }

        projectsContainer.appendChild(projectElement);
    });
}
export function renderTasks(project) {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.textContent = "";

    if (!project) return;   // لا مشروع مفتوح، فلا شيء يُرسم

    // عنوان المشروع (يخص project وليس task، فمكانه خارج الحلقة)
    const heading = document.createElement("h2");
    heading.textContent = project.title;
    tasksContainer.appendChild(heading);

    // مشروع بلا مهام
    if (project.tasks.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("empty");
        empty.textContent = "No tasks yet";
        tasksContainer.appendChild(empty);
        return;
    }

    project.tasks.forEach((task) => {
        // كل ما يستعمل task يجب أن يبقى داخل هذه الحلقة
        const taskElement = document.createElement("div");
        taskElement.classList.add("task", `priority-${task.priority}`);
        // Which task this element represents. Read by index.js on click to find the Task object.
        taskElement.dataset.taskId = task.id;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const desc = document.createElement("p");
        desc.textContent = task.desc;

        const dueDate = document.createElement("p");
        dueDate.textContent = task.duedate;

        const priority = document.createElement("p");
        priority.textContent = task.priority;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.checked = task.completed;

        const label = document.createElement("label");
        label.htmlFor = `task-${task.id}`;
        label.textContent = task.completed ? "Completed" : "Not Completed";

        taskElement.append(title, desc, dueDate, priority, checkbox, label);
        tasksContainer.appendChild(taskElement);
    });
}