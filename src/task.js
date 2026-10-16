const createId = () => {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export class Task {

    constructor(title, desc, duedate, priority) {
        this.id = createId();
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    

}