import { call, delay, put, takeLatest } from "redux-saga/effects";
import { awesomeBugsService } from "../../services/AwesomeBugsService";
import { ACCESS_TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
import { USER_SIGNIN_API } from "../constants/AwesomeBugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/AwesomeBugs";
import history from "./../../util/history";

function * signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return awesomeBugsService.signin(action.userLogin);
    });

    // lưu dữ liệu đăng nhập thành công vào localStorage
    localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USER_LOGIN,
      userLogin: data.content
    })

    // let history = yield select(state => state.HistoryReducer.history);
    history.push("/awesomebugs");

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