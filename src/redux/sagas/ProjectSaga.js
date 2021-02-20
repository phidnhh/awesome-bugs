import { call, delay, put, takeLatest } from "redux-saga/effects";
import { awesomeBugsService } from "../../services/AwesomeBugsService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/AwesomeBugs";

import { GET_PROJECT_CATEGORY_API, SET_PROJECT_CATEGORY, CREATE_PROJECT_API } from "./../constants/AwesomeBugs";

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
      console.log("~ data", data);
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
