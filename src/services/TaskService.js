import service from "./baseService";

export const taskService = {
  getTaskType: () => {
    return service.get("TaskType/getAll");
  },
  
  getTaskPriority: () => {
    return service.get("Priority/getAll");
  },
  
  getTaskStatus: () => {
    return service.get("Status/getAll");
  },

  createTask: (newTask) => {
    return service.post("Project/createTask", newTask);
  }
}
