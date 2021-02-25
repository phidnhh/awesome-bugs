import { SET_TASK_PRIORITY_LIST, SET_TASK_STATUS_LIST, SET_TASK_TYPE_LIST } from "../constants/AwesomeBugs"

const initialState = {
  taskTypeList: [],
  taskPriorityList: [],
  taskStatusList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_TYPE_LIST: {
      state.taskTypeList = action.taskTypeList;
    }; break;
    
    case SET_TASK_PRIORITY_LIST: {
      state.taskPriorityList = action.taskPriorityList;
    }; break;
    
    case SET_TASK_STATUS_LIST: {
      state.taskStatusList = action.taskStatusList;
    }; break;

  }
  return {...state};
}
