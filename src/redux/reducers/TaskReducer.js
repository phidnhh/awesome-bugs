import { REMOVE_TASK_ASSIGNEE, SET_TASK_DETAIL_MODAL, SET_TASK_PRIORITY_LIST, SET_TASK_STATUS_LIST, SET_TASK_TYPE_LIST, UPDATE_TASK_ASSIGNESS, UPDATE_TASK_DETAIL_MODAL } from "../constants/AwesomeBugs"

const initialState = {
  taskTypeList: [],
  taskPriorityList: [],
  taskStatusList: [],
  taskDetailModal: {}
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
    
    case SET_TASK_DETAIL_MODAL: {
      state.taskDetailModal = action.taskDetailModal;
    }; break;
    
    case UPDATE_TASK_DETAIL_MODAL: {
      state.taskDetailModal = {
        ...state.taskDetailModal,
        [action.name]: action.value
      }
    }; break;
    
    case UPDATE_TASK_ASSIGNESS: {
      let assigness = state.taskDetailModal.assigness;
      state.taskDetailModal.assigness = [
        ...assigness,
        action.assignee
      ];
    }; break;
    
    case REMOVE_TASK_ASSIGNEE: {
      let assigness = state.taskDetailModal.assigness.filter(item => item.id !== action.userId);
      state.taskDetailModal.assigness = [...assigness];
    }; break;
  }
  return {...state};
}
