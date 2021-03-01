import { all } from "redux-saga/effects";
import * as User from "./UserSaga";
import * as Project from "./ProjectSaga";
import * as Task from "./TaskSaga";
import * as Comment from "./CommentSaga";

export function * rootSaga() {
  yield all([
    User.watchSigninSaga(),
    User.watchSignupSaga(),
    User.watchTestTokenSaga(),
    User.watchGetUserSaga(),
    User.watchGetUserByProjectIdSaga(),
    
    Project.watchProjectCategorySaga(),
    Project.watchCreateProjectSaga(),
    Project.watchGetProjectListSaga(),
    Project.watchUpdateProjectSaga(),
    Project.watchDeleteProjectSaga(),
    Project.watchAssignUserProjectSaga(),
    Project.watchRemoveUserFromProjectSaga(),
    Project.watchGetProjectDetailSaga(),
    
    Task.watchGetTaskTypeSaga(),
    Task.watchGetTaskPrioritySaga(),
    Task.watchGetTaskStatusSaga(),
    Task.watchCreateTaskSaga(),
    Task.watchGetTaskDetailSaga(),
    Task.watchUpdateTaskSaga(),
    Task.watchHandleChangeSaga(),
    Task.watchUpdateTaskStatusSaga(),

    Comment.watchInsertCommentSaga(),
    Comment.watchDeleteCommentSaga()
  ]);
}
