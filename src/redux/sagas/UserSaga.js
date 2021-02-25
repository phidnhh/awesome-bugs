import { call, delay, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../services/UserService";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../util/constants/settingSystem";
import { GET_USER_BY_PROJECT_ID_API, GET_USER_SEARCH_API, SET_USER_SEARCH, USER_SIGNIN_API, SET_USER_BY_PROJECT_ID } from "../constants/AwesomeBugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/AwesomeBugs";
import history from "./../../util/history";
import { notification } from 'antd';

function * signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return userService.signin(action.userLogin);
    });

    if(status === STATUS_CODE.SUCCESS) {
      // lưu dữ liệu đăng nhập thành công vào localStorage
      localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

      yield put({
        type: USER_LOGIN,
        userLogin: data.content
      })
            
      history.push("/awesomebugs");

      notification["success"]({
        message: "Login successfully!",
        description: `Hello ${data.content.name}! Have a lucky day with awesome bugs.`
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchSigninSaga() {
  yield takeLatest(USER_SIGNIN_API, signinSaga)
}


// Get user by keyword
function * getUserSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return userService.getUser(action.keyword);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_USER_SEARCH,
        listUserSearch: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }
}

export function * watchGetUserSaga() {
  yield takeLatest(GET_USER_SEARCH_API, getUserSaga);
}


// Get user by project id
function * getUserByProjectIdSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return userService.getUserByProjectId(action.projectId);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_USER_BY_PROJECT_ID,
        userByProjectId: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
    if(error.response.data.statusCode = STATUS_CODE.NOT_FOUND) {
      yield put({
        type: SET_USER_BY_PROJECT_ID,
        userByProjectId: []
      });
    }
  }
}

export function * watchGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_API, getUserByProjectIdSaga);
}
