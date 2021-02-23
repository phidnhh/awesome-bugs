import { SET_PROJECT_CATEGORY, SET_PROJECT_EDIT, SET_PROJECT_LIST } from "../constants/AwesomeBugs";

const initialState = {
  projectCategory: [],
  projectList: [],
  projectEdit: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_CATEGORY: {
      state.projectCategory = action.projectCategory;
    }; break;
    
    case SET_PROJECT_LIST: {
      state.projectList = action.projectList;
    }; break;

    case SET_PROJECT_EDIT: {
      state.projectEdit = action.projectEdit;
    }; break;
  }
  return {...state};
}
