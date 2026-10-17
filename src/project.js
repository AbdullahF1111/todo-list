import { createId } from "./id.js";

export class Project {

    tasks = [];

    constructor(title) {
        this.id = createId();
        this.title = title;
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