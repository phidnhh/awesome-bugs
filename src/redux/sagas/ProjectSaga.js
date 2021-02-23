import { call, delay, put, takeLatest } from "redux-saga/effects";
import { awesomeBugsService } from "../../services/AwesomeBugsService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, GET_PROJECT_LIST_API, HIDE_LOADING, SET_PROJECT_LIST, GET_PROJECT_CATEGORY_API, SET_PROJECT_CATEGORY, CREATE_PROJECT_API, UPDATE_PROJECT_API, CLOSE_DRAWER } from "../constants/AwesomeBugs";
import history from "./../../util/history";

// project category
function * getProjectCategorySaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return awesomeBugsService.getProjectCategory();
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

// create project
function * createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return awesomeBugsService.createProjectAuthorize(action.newProject);
    });

    if(status === STATUS_CODE.SUCCESS) {
      history.push("/projectmanagement");
    }    

  } catch (error) {
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_API, createProjectSaga);
}

// get projectlist
function * getProjectListSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return awesomeBugsService.getProjectList();
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

// update project
function * updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return awesomeBugsService.updateProject(action.projectUpdate);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_PROJECT_LIST_API });
      yield put({ type: CLOSE_DRAWER });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}


export function * watchUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_API, updateProjectSaga);
}
