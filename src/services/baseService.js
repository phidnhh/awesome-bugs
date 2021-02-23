import axios from "axios"
import { ACCESS_TOKEN, DOMAIN_AWESOMEBUGS } from "../util/constants/settingSystem"

const baseService = {
  get: (url) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/${url}`,
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }      
    });
  },

  put: (url, model) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }      
    });
  },

  post: (url, model) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/${url}`,
      method: "POST",
      data: model,
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }      
    });
  },

  delete: (url) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/${url}`,
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      }      
    });
  }
}

export default baseService;
