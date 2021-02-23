import { USER_LOGIN } from "../../util/constants/settingSystem";
import { SET_USER_SEARCH } from "./../constants/AwesomeBugs";

let userLogin = {};
if(localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
  userLogin: userLogin,
  userSearch: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      state.userLogin = action.userLogin;
    }; break;

    case SET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
    }
  }
  return { ...state };
}
