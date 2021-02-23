import { call, delay, put, takeLatest } from "redux-saga/effects";
import { awesomeBugsService } from "../../services/AwesomeBugsService";
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from "../../util/constants/settingSystem";
import { USER_SIGNIN_API } from "../constants/AwesomeBugs";
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
      return awesomeBugsService.signin(action.userLogin);
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