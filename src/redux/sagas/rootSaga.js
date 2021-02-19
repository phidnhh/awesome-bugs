import { all } from "redux-saga/effects";
import * as AwesomeBugs from "./UserSaga";

export function * rootSaga() {
    yield all([
      AwesomeBugs.watchSigninSaga()
    ]);
}
