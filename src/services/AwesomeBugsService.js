import axios from "axios"
import { ACCESS_TOKEN, DOMAIN_AWESOMEBUGS } from "../util/constants/settingSystem"

export const awesomeBugsService = {
  signin: (userLogin) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/Users/signin`,
      method: "POST",
      data: userLogin
    });
  },

  getProjectCategory: () => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/ProjectCategory`,
      method: "GET"
    });
  },

  createProject: (newProject) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/Project/createProject`,
      method: "POST",
      data: newProject
    });
  },

  createProjectAuthorize: (newProject) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    });
  },

  getProjectList: () => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/Project/getAllProject`,
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }
    });
  },
}
