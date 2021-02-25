import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskService } from "../../services/TaskService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_TASK_PRIORITY_API, GET_TASK_TYPE_API, SET_TASK_TYPE_LIST, SET_TASK_PRIORITY_LIST, SET_TASK_STATUS_LIST, GET_TASK_STATUS_API, CREATE_TASK_API, DISPLAY_LOADING, HIDE_LOADING, CLOSE_DRAWER } from "../constants/AwesomeBugs";
import history from "./../../util/history";
import { notification } from 'antd';

// Get task type
function * getTaskTypeSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getTaskType();
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_TASK_TYPE_LIST,
        taskTypeList: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }
}

export function * watchGetTaskTypeSaga() {
  yield takeLatest(GET_TASK_TYPE_API, getTaskTypeSaga);
}


// Get task type
function * getTaskPrioritySaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getTaskPriority();
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_TASK_PRIORITY_LIST,
        taskPriorityList: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }
}

export function * watchGetTaskPrioritySaga() {
  yield takeLatest(GET_TASK_PRIORITY_API, getTaskPrioritySaga);
}


// Get task status
function * getTaskStatusSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getTaskStatus();
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_TASK_STATUS_LIST,
        taskStatusList: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response.data);
  }
}

export function * watchGetTaskStatusSaga() {
  yield takeLatest(GET_TASK_STATUS_API, getTaskStatusSaga);
}


// Create task
function * createTaskSaga(action) {
  console.log("~ action", action);
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const {data, status} = yield call(() => {
      return taskService.createTask(action.newTask);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({ type: CLOSE_DRAWER });
      notification["success"]({
        message: "Create task successfully!"
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

export function * watchCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_API, createTaskSaga);
}
