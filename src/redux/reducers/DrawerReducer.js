import React from "react";
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_FUNCTION, OPEN_FORM_CREATE_TASK } from "../constants/AwesomeBugs";

const initialState = {
  visible: false,
  title: "",
  componentContentDrawer: <p>componentContentDrawer</p>,
  callBackSubmit: () => {
    alert("click demo");
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      state.visible = true;
    }; break;

    case CLOSE_DRAWER: {
      state.visible = false;
    }; break;

    case OPEN_FORM_EDIT_PROJECT: {
      state.visible = true;
      state.title = action.title;
      state.componentContentDrawer = action.Component;
    }; break;

    case SET_SUBMIT_FUNCTION: {
      state.callBackSubmit = action.submitFunction;
    }; break;

    case OPEN_FORM_CREATE_TASK: {
      state.visible = true;
      state.title = action.title;
      state.componentContentDrawer = action.Component;
    }; break;    
  }
  return {...state};
}
