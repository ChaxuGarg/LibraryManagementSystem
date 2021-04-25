import validator from "validator";
import isEmpty from "is-empty";

const validateBookData = (data) => {
  let errors = {};

  data.ISBN = !isEmpty(data.ISBN) ? data.ISBN : "";
  data.due = !isEmpty(data.due) ? data.due : "";

  if (validator.isEmpty(data.ISBN.toString())) {
    errors.ISBN = "ISBN no. is required";
  }

  if (validator.isEmpty(data.due)) {
    errors.due = "Date is required";
  } 

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateBookData;
