import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { commentService } from "../../services/CommentService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { notification } from 'antd';
import { DELETE_COMMENT_API, GET_PROJECT_DETAIL_API, GET_TASK_DETAIL_MODAL_API, INSERT_COMMENT_API, SET_DELETE_COMMENT_STATUS, SET_INSERT_COMMENT_STATUS } from "../constants/AwesomeBugs";

// Insert comment in task detail modal
function * insertCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return commentService.insertComment(action.newComment);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: action.projectId
      });

      yield put({
        type: GET_TASK_DETAIL_MODAL_API,
        taskId: action.taskId
      });
     
      yield put({
        type: SET_INSERT_COMMENT_STATUS,
        status: true
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Task comment failed!"
    });
    console.log("~ error", error.response?.data);
  }
}

export function * watchInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_API, insertCommentSaga);
}


// Delete comment in task detail modal
function * deleteCommentSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return commentService.deleteComment(action.idComment);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: action.projectId
      });

      yield put({
        type: GET_TASK_DETAIL_MODAL_API,
        taskId: action.taskId
      });

      notification["success"]({
        message: "Delete comment successfully!",
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Delete comment failed!"
    });
    console.log("~ error", error.response?.data);
  }
}

export function * watchDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_API, deleteCommentSaga);
}
