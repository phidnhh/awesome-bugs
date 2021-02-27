import service from "./baseService";

export const taskService = {
  getTaskType: () => 
    service.get("TaskType/getAll"),

  getTaskPriority: () => 
    service.get("Priority/getAll"),

  getTaskStatus: () => 
    service.get("Status/getAll"),

  createTask: (newTask) => 
    service.post("Project/createTask", newTask),

  getTaskDetail: (id) => 
    service.get(`Project/getTaskDetail?taskId=${id}`),

  updateTask: (taskUpdate) => 
    service.post("Project/updateTask", taskUpdate)
}
