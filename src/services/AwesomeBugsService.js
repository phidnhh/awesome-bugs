import axios from "axios"
import { DOMAIN_AWESOMEBUGS } from "../util/constants/settingSystem"

export const awesomeBugsService = {
  signin: (userLogin) => {
    return axios({
      url: `${DOMAIN_AWESOMEBUGS}/Users/signin`,
      method: "POST",
      data: userLogin
    });
  }
}
