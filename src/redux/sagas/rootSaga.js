import { all } from "redux-saga/effects";
import * as User from "./UserSaga";
import * as Project from "./ProjectSaga";
import * as Task from "./TaskSaga";

export function * rootSaga() {
    yield all([
      User.watchSigninSaga(),
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
      Task.watchCreateTaskSaga()
    ]);
}
