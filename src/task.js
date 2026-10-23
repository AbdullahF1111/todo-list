import { createId } from "./id.js";

const validPriorities = ["low", "medium", "high"];

function validate(title, duedate, priority) {
  if (title.trim() === "") {
    throw new Error("Title cannot be empty.");
  }
  if (!duedate) {
    throw new Error("Due date cannot be empty.");
  }
  if (!validPriorities.includes(priority)) {
    throw new Error(
      `Invalid priority: ${priority}. Valid priorities are: ${validPriorities.join(", ")}`
    );
  }
}


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

  static fromJSON(data) {
    const task = new Task(data.title, data.desc, data.duedate, data.priority);
    task.id = data.id;                  // استرجع الهوية الأصلية
    task.completed = data.completed;    // واسترجع حالة الإنجاز
    return task;
  }

  edit(title, desc, duedate, priority) {
    validate(title, duedate, priority);
    this.title = title;
    this.desc = desc;
    this.duedate = duedate;
    this.priority = priority;
  }

}