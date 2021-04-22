import validator from "validator";
import isEmpty from "is-empty";

const validateBookData = (data) => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.ISBN = !isEmpty(data.ISBN) ? data.ISBN : "";
  data.availableCopies = !isEmpty(data.availableCopies) ? data.availableCopies : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (validator.isEmpty(data.ISBN)) {
    errors.ISBN = "ISBN no. is required";
  }

  if (validator.isEmpty(data.availableCopies)) {
    errors.availableCopies = "No. of copies available is required";
  } else if (data.availableCopies < 0) {
    errors.availableCopies = "No. of copies available can't be negative";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateBookData;
