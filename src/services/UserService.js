import service from "./baseService";

export const userService = {
  signin: (userLogin) => 
    service.post("Users/signin", userLogin),
  
  signup: (newUser) => 
    service.post("Users/signup", newUser),

  testToken: () => 
    service.post("Users/TestToken"),
  
  getUser: (keyword) => 
    service.get(`Users/getUser?keyword=${keyword}`),

  getUserByProjectId: (id) => 
    service.get(`Users/getUserByProjectId?idProject=${id}`)
}
