import { SET_INSERT_COMMENT_STATUS, SET_DELETE_COMMENT_STATUS } from "../constants/AwesomeBugs";

const initialState = {
  insertComment: {
    status: false
  },
  deleteComment: {
    status: false
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_INSERT_COMMENT_STATUS: {
      state.insertComment.status = action.status;
    }; break;
    
    case SET_DELETE_COMMENT_STATUS: {
      state.deleteComment.status = action.status;
    }; break;
  };
  return { ...state };
}
