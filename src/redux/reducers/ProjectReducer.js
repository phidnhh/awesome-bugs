import { SET_PROJECT_CATEGORY } from "../constants/AwesomeBugs";

const initialState = {
  projectCategory: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_CATEGORY: {
      state.projectCategory = action.projectCategory;
    }
  }
  return {...state};
}
