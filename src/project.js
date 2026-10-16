const createId = () => {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

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
         this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
    }

}