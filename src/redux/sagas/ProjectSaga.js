import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../services/ProjectService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, GET_PROJECT_LIST_API, HIDE_LOADING, SET_PROJECT_LIST, GET_PROJECT_CATEGORY_API, SET_PROJECT_CATEGORY, CREATE_PROJECT_API, UPDATE_PROJECT_API, CLOSE_DRAWER, DELETE_PROJECT_API, ASSIGN_USER_PROJECT_API, REMOVE_USER_PROJECT_API, GET_PROJECT_DETAIL_API, SET_PROJECT_DETAIL } from "../constants/AwesomeBugs";
import history from "./../../util/history";
import { notification } from 'antd';

// Get project category
function * getProjectCategorySaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.getProjectCategory();
    });

    yield put({
      type: SET_PROJECT_CATEGORY,
      projectCategory: data.content
    })

  } catch (error) {
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchProjectCategorySaga() {
  yield takeLatest(GET_PROJECT_CATEGORY_API, getProjectCategorySaga);
}


// Create project
function * createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.createProjectAuthorize(action.newProject);
    });

    if(status === STATUS_CODE.SUCCESS) {
      history.push("/projectmanagement");
      notification["success"]({
        message: "Create project successfully!"
      });
    }    

  } catch (error) {
    notification["error"]({
      message: "Create project failed!"
    });
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_API, createProjectSaga);
}


// Get projectlist
function * getProjectListSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.getProjectList();
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_PROJECT_LIST,
        projectList: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchGetProjectListSaga() {
  yield takeLatest(GET_PROJECT_LIST_API, getProjectListSaga);
}


// Update project
function * updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.updateProject(action.projectUpdate);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_LIST_API });
      yield put({ type: CLOSE_DRAWER });
      notification["success"]({
        message: "Update project successfully!"
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Update project failed!"
    });
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}


export function * watchUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_API, updateProjectSaga);
}

// Delete project
function * deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.deleteProject(action.projectId);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_LIST_API });
      notification["success"]({
        message: "Delete project successfully!"
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Delete project failed!"
    });
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}


export function * watchDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_API, deleteProjectSaga);
}


// Add user to members project
function * assignUserProject(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.assignUserProject(action.userProject);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_LIST_API });
      notification["success"]({
        message: "Add member to project successfully!"
      });
    }    

  } catch (error) {
    notification["error"]({
      message: "Add member to project failed!"
    });
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchAssignUserProjectSaga() {
  yield takeLatest(ASSIGN_USER_PROJECT_API, assignUserProject);
}


// Remove user from members of project
function * removeUserFromProject(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.removeUserFromProject(action.userProject);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_LIST_API });
      notification["success"]({
        message: "Remove user from members of project successfully!"
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Remove user from members of project failed!"
    });
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchRemoveUserFromProjectSaga() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserFromProject);
}


// Get project detail
function * getProjectDetailSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return projectService.getProjectDetail(action.projectId);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_PROJECT_DETAIL,
        projectDetail: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
    notification["error"]({
      message: "Get project detail failed, please try again!"
    });
    history.push("/projectmanagement");
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetailSaga);
}
