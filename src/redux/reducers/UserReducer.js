import { USER_LOGIN } from "../../util/constants/settingSystem";

let userLogin = {};
if(localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
  userLogin: userLogin
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      state.userLogin = action.userLogin;
      return { ...state };

    default:
      return { ...state };
    }
}
