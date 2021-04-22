import { ADD_NEW_BOOK } from "../actions/types.js";
import isEmpty from "is-empty";

const initialState = {
  added: false,
};

const addNewBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      return {
        ...state,
        added: !isEmpty(action.payload),
      };
    default:
      return state;
  }
};

export default addNewBookReducer;
