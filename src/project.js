import { Task } from "./task.js";
import { createId } from "./id.js";

function validateTitle(title) {
    if (typeof title !== "string" || title.trim() === "") {
        throw new Error("Title cannot be empty.");
    }
}

export class Project {

    tasks = [];

    constructor(title) {
        validateTitle(title);
        this.id = createId();
        this.title = title.trim();
    }
    static fromJSON(data) {
        const project = new Project(data.title);
        project.id = data.id;
        // داخل Project.fromJSON
        data.tasks.forEach((t) => {
            try {
                project.addTask(Task.fromJSON(t));
            } catch (error) {
                console.warn("Skipped a corrupted task", t, error);
            }
        });
        return project;
    }
    edit(title) {
        validateTitle(title);
        this.title = title.trim();
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) return;
        this.tasks.splice(index, 1);
    }

    getTaskById(id) {
        return this.tasks.find((task) => task.id === id);
    }

}