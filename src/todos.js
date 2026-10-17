export class Todos {

    projects = [];
    
     addProject(project) {
         this.projects.push(project);
    }
     deleteProject(id) {
        const index = this.projects.findIndex((project) => project.id === id);

        if (index === -1) return;


        else if (this.isDefaultProject(this.projects[index]) ) {
            throw new Error("Cannot delete the default project.");
        }

        this.projects.splice(index, 1);
    }

    isDefaultProject(project) {
        return project === this.projects[0];
    }

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }

}