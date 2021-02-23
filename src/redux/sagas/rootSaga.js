import { all } from "redux-saga/effects";
import * as User from "./UserSaga";
import * as Project from "./ProjectSaga";

export function * rootSaga() {
    yield all([
      User.watchSigninSaga(),
      User.watchGetUserSaga(),
      
      Project.watchProjectCategorySaga(),
      Project.watchCreateProjectSaga(),
      Project.watchGetProjectListSaga(),
      Project.watchUpdateProjectSaga(),
      Project.watchDeleteProjectSaga(),
      Project.watchAssignUserProjectSaga(),
      Project.watchRemoveUserFromProjectSaga(),
    ]);
}
