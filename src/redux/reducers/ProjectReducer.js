import { SET_PROJECT_CATEGORY, SET_PROJECT_LIST } from "../constants/AwesomeBugs";

const initialState = {
  projectCategory: [],
  projectList: [],
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: 2    
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_CATEGORY: {
      state.projectCategory = action.projectCategory;
    }
    
    case SET_PROJECT_LIST: {
      state.projectList = action.projectList;
    }
  }
  return {...state};
}
