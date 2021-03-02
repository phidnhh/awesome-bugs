import { call, cancel, delay, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../services/UserService";
import { taskService } from "../../services/TaskService";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../util/constants/settingSystem";
import { GET_USER_BY_PROJECT_ID_API, GET_USER_SEARCH_API, SET_USER_SEARCH, USER_SIGNIN_API, SET_USER_BY_PROJECT_ID, SET_USER_LOGIN, USER_SIGNUP_API, TEST_TOKEN, SET_ALREADY_lOGGED } from "../constants/AwesomeBugs";
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
        type: SET_USER_LOGIN,
        userLogin: data.content,
      })

      history.push("/");

      notification["success"]({
        message: "Login successfully!",
        description: `Hello ${data.content.name}! Have a lucky day with Awesome Bugs.`
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


// sign up new user awesome bugs
function * signupSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return userService.signup(action.newUser);
    });

    if(status === STATUS_CODE.SUCCESS) {
      history.push("/login");
      notification["success"]({
        message: "Signup successfully!",
      });
    }

    yield put({
      type: HIDE_LOADING
    });
  } catch (error) {
    notification["error"]({
      message: "Signup failed!"
    });
    console.log("~ error", error.response.data);
  }
}

export function * watchSignupSaga() {
  yield takeLatest(USER_SIGNUP_API, signupSaga)
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


// Test token to check login, signup
function * testTokenSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return userService.getUser("xyz");
    });

    if(status === STATUS_CODE.SUCCESS) {
      // token ok
      if(history.location.pathname === "/login") {
        notification["warning"]({
          message: "You are already logged in, you need to log out before logging in as different user.",
          duration: 0
        });
        history.goBack();
      };

      if(history.location.pathname === "/signup") {
        notification["warning"]({
          message: "You are already logged in, you need to log out before create AwesomeBugs user.",
          duration: 0
        });
        history.goBack();
      };      
    }
  } catch (error) {
    console.log("~ error", error); 
    if(history.location.pathname !== "/login" && history.location.pathname !== "/signup") {
      notification["error"]({
        message: "You are not logged in. Please log in and try again.",
        duration: 0
      });
      history.push("/login");
    } else {
      
    }
  }
}

export function * watchTestTokenSaga() {
  yield takeLatest(TEST_TOKEN, testTokenSaga);
}

