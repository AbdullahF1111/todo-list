export class Todos {

    projects = [];
    
     addProject(project) {
         this.projects.push(project);
    }
     deleteProject(id) {
         this.projects.splice(this.projects.findIndex(project => project.id === id), 1);
    }

}