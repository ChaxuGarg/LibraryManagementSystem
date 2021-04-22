import axios from "../axios.js";

import { ADD_NEW_BOOK, GET_ERRORS } from "./types.js";

export const addNewBook = (bookData) => (dispatch) => {
  axios
    .post("/api/books/addnew", bookData)
    .then((res) => {
      dispatch({
        type: ADD_NEW_BOOK,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
