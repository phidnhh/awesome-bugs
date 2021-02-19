import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/AwesomeBugs";

const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
        state.isLoading = true;
    } break;
    case HIDE_LOADING: {
        state.isLoading = false;
    } break;
  }
  return { ...state };
}
