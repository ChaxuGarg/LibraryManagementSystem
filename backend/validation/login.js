import validator from "validator";
import isEmpty from "is-empty";

const validateLoginInput = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!validator.matches(data.username, "^[a-zA-Z0-9_\.\-]*$")) {
    errors.username = "Username is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;
