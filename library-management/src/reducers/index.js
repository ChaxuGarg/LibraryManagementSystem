import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import errorReducers from "./errorReducers.js";

export default combineReducers({
  auth: authReducer,
  errors: errorReducers,
});
