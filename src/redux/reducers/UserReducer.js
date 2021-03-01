import { USER_LOGIN } from "../../util/constants/settingSystem";
import { SET_USER_BY_PROJECT_ID, SET_USER_SEARCH, GET_USER_LOGIN, SET_USER_LOGIN } from "./../constants/AwesomeBugs";

let userLogin = {};
if(localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: userLogin,
  userSearch: [],
  userByProjectId: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN: {
      state.userLogin = action.userLogin;
    }; break;

    case SET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
    }; break;
    
    case SET_USER_BY_PROJECT_ID: {
      state.userByProjectId = action.userByProjectId;
    }; break;
  }
  return { ...state };
}
