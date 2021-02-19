import { USER_SIGNIN_API } from "../constants/AwesomeBugs";

export const signinAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email,
      password
    }    
  }
};
