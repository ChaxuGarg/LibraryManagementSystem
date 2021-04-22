import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import errorReducers from "./errorReducers.js";
import bookReducer from "./bookReducers.js";

export default combineReducers({
  auth: authReducer,
  book: bookReducer,
  errors: errorReducers,
});
