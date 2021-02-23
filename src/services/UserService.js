import service from "./baseService";

export const userService = {
  signin: (userLogin) => {
    return service.post("Users/signin", userLogin);
  },
  
  getUser: (keyword) => {
    return service.get(`Users/getUser?keyword=${keyword}`);
  },

}
