import { createId } from "./id.js";

const validPriorities = ["low", "medium", "high"];

export class Task {

    constructor(title, desc, duedate, priority) {
        this.id = createId();
        this.title = title;
        this.desc = desc;
        this.duedate = duedate;
        this.priority = this.setPriority(priority);
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    setPriority(priority) {
        if (!validPriorities.includes(priority)) {
            throw new Error(`Invalid priority: ${priority}. Valid priorities are: ${validPriorities.join(", ")}`);
        }
        this.priority = priority;
        return priority;
        
    }
    

}