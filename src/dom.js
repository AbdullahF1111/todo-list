export function renderProjects(todos, currentProjectId) {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.textContent = "";

    todos.projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.dataset.projectId = project.id;

        const title = document.createElement("span");
        title.textContent = project.title;
        projectElement.append(title);

        if (todos.isDefaultProject(project)) {
            projectElement.classList.add("default-project");
        } else {
            // The default project cannot be deleted, so it gets no delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.classList.add("delete-project");
            deleteBtn.textContent = "Delete";
            projectElement.append(deleteBtn);
        }

        if (project.id === currentProjectId) {
            projectElement.classList.add("selected");
        }

        projectsContainer.appendChild(projectElement);
    });
}

export function renderTasks(project, expandedIds = new Set()) {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.textContent = "";

    if (!project) return;   // no open project, nothing to draw

    const heading = document.createElement("h2");
    heading.textContent = project.title;
    tasksContainer.appendChild(heading);

    if (project.tasks.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("empty");
        empty.textContent = "No tasks yet";
        tasksContainer.appendChild(empty);
        return;
    }

    project.tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task", `priority-${task.priority}`);
        taskElement.classList.toggle("expanded", expandedIds.has(task.id));
        taskElement.classList.toggle("completed", task.completed);
        // Which task this element represents. Read by index.js on click to find the Task object.
        taskElement.dataset.taskId = task.id;

        // ---- Summary: always visible (checkbox, title, due date) ----
        const summary = document.createElement("div");
        summary.classList.add("task-summary");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.checked = task.completed;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const dueDate = document.createElement("span");
        dueDate.classList.add("task-date");
        dueDate.textContent = task.duedate;

        summary.append(checkbox, title, dueDate);

        // ---- Details: visible only when the task is expanded ----
        const details = document.createElement("div");
        details.classList.add("task-details");

        const desc = document.createElement("p");
        desc.textContent = task.desc;

        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;

        const label = document.createElement("label");
        label.htmlFor = `task-${task.id}`;
        label.textContent = task.completed ? "Completed" : "Not Completed";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("edit-task");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-task");
        deleteBtn.textContent = "Delete";

        const actions = document.createElement("div");
        actions.classList.add("task-actions");
        actions.append(editBtn, deleteBtn);

        details.append(desc, priority, label, actions);

        taskElement.append(summary, details);
        tasksContainer.appendChild(taskElement);
    });
}