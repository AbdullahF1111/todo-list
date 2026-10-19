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