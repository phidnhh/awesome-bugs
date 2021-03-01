import service from "./baseService";

export const commentService = {
  insertComment: (newComment) => 
    service.post("Comment/insertComment", newComment),

  deleteComment: (id) =>
    service.delete(`Comment/deleteComment?idComment=${id}`),
}
