import service from "./baseService";

export const projectService = {
  getProjectCategory: () => {
    return service.get("ProjectCategory");
  },

  createProject: (newProject) => {
    return service.post("Project/createProject", newProject);
  },

  createProjectAuthorize: (newProject) => {
    return service.post("Project/createProjectAuthorize", newProject);
  },

  getProjectList: () => {
    return service.get("Project/getAllProject");
  },

  updateProject: (projectUpdate) => {
    return service.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
  },

  deleteProject: (id) => {
    return service.delete(`Project/deleteProject?projectId=${id}`);
  },

  assignUserProject: (userProject) => {
    return service.post("Project/assignUserProject", userProject);
  },

  removeUserFromProject: (userProject) => {
    return service.post("Project/removeUserFromProject", userProject);
  },

  getProjectDetail: (id) => {
    return service.get(`Project/getProjectDetail?id=${id}`);
  }
}
