import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../services/TaskService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_TASK_PRIORITY_API, GET_TASK_TYPE_API, SET_TASK_TYPE_LIST, SET_TASK_PRIORITY_LIST, SET_TASK_STATUS_LIST, GET_TASK_STATUS_API, CREATE_TASK_API, DISPLAY_LOADING, HIDE_LOADING, CLOSE_DRAWER, SET_TASK_DETAIL_MODAL, GET_TASK_DETAIL_MODAL_API, UPDATE_TASK_API, HANDLE_CHANGE_SAGA, UPDATE_TASK_DETAIL_MODAL, UPDATE_TASK_ASSIGNESS, REMOVE_TASK_ASSIGNEE, GET_PROJECT_DETAIL_API, UPDATE_STATUS_TASK_API, SET_INSERT_COMMENT_STATUS } from "../constants/AwesomeBugs";
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
    console.log("~ error", error.response?.data);
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
    console.log("~ error", error.response?.data);
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
    console.log("~ error", error.response?.data);
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
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: action.projectId
      });
      yield put({ type: CLOSE_DRAWER });      
      notification["success"]({
        message: "Create task successfully!"
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Create task failed!"
    });
    console.log("~ error", error.response?.data);
  }

  yield put({
    type: HIDE_LOADING
  });
}

export function * watchCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_API, createTaskSaga);
}


// Get task detail
function * getTaskDetailModalSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.getTaskDetail(action.taskId);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SET_TASK_DETAIL_MODAL,
        taskDetailModal: data.content
      });
    }

  } catch (error) {
    console.log("~ error", error.response?.data);
  }
}

export function * watchGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_MODAL_API, getTaskDetailModalSaga);
}


// Update task
function * updateTaskSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return taskService.updateTask(action.taskUpdate);
    });

    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        projectId: action.taskUpdate.projectId
      });

      yield put({
        type: GET_TASK_DETAIL_MODAL_API,
        taskId: action.taskUpdate.taskId
      });
    }

  } catch (error) {
    notification["error"]({
      message: "Update task failed!"
    });
    console.log("~ error", error.response?.data);
  }
}

export function * watchUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_API, updateTaskSaga);
}


// Handle change & call api ~~> synchronized
function * handleChangeSaga(action) {
  // step 01: handle change
  switch(action.actionType) {
    case UPDATE_TASK_DETAIL_MODAL: {
      yield put({
        type: UPDATE_TASK_DETAIL_MODAL,
        name: action.name,
        value: action.value
      })
    }; break;
   
    case UPDATE_TASK_ASSIGNESS: {
      yield put({
        type: UPDATE_TASK_ASSIGNESS,
        assignee: action.assignee
      });
    }; break;
    
    case REMOVE_TASK_ASSIGNEE: {
      yield put({
        type: REMOVE_TASK_ASSIGNEE,
        userId: action.userId
      });
    }; break;
  }

  // step 02: call api after update taskDetailModal in reducer
  let taskDetailModal = yield select(state => state.TaskReducer.taskDetailModal);
  console.log("~ taskDetailModal Saga", taskDetailModal);

  let listUserAsign = taskDetailModal.assigness?.map((item, index) => item.id);
  console.log("~ listUserAsign", listUserAsign);
  
  let taskUpdate = {
    listUserAsign: [...listUserAsign],
    taskId: taskDetailModal.taskId.toString(),
    taskName: taskDetailModal.taskName,
    description: taskDetailModal.description,
    statusId: taskDetailModal.statusId,
    originalEstimate: taskDetailModal.originalEstimate,
    timeTrackingSpent: taskDetailModal.timeTrackingSpent,
    timeTrackingRemaining: taskDetailModal.timeTrackingRemaining,
    projectId: taskDetailModal.projectId,
    typeId: taskDetailModal.typeId,
    priorityId: taskDetailModal.priorityId
  };

  console.log("~ taskUpdate", taskUpdate);
  yield put({
    type: UPDATE_TASK_API,
    taskUpdate: taskUpdate
  });
}


export function * watchHandleChangeSaga() {
  yield takeLatest(HANDLE_CHANGE_SAGA, handleChangeSaga);
}


// Update task status
function * updateTaskStatusSaga(action) {
  try {
      const { data, status } = yield call(() => {
        return taskService.updateStatus(action.taskStatus);
      });

      if (status == STATUS_CODE.SUCCESS) {
        yield put({
          type: GET_PROJECT_DETAIL_API,
          projectId: action.projectId
        });
  
        yield put({
          type: GET_TASK_DETAIL_MODAL_API,
          taskId: action.taskStatus.taskId
        });
        
        yield put({
          type: SET_INSERT_COMMENT_STATUS,
          status: true
        });
      }
  } catch (error) {
    notification["error"]({
      message: "Update task status failed!"
    });
    console.log("~ error", error);
  }
}

export function * watchUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_API, updateTaskStatusSaga)
}
