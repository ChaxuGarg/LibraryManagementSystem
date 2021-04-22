import validator from "validator";
import isEmpty from "is-empty";

const validateRegisterInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  
    if (validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }

    if(validator.isEmpty(data.username)) {
      errors.username = "Username is required";
    } else if(!validator.matches(data.username, "^[a-zA-Z0-9_\.\-]*$")) {
      errors.username = "Invalid username";
    }
  
    if (validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  
    if (validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
  
    if (validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    }
  
    if (!validator.isLength(data.password, { max: 30 })) {
      errors.password =
        "Password must be at least 6 characters and at most 30 characters";
    }
  
    if (!validator.equals(data.password2, data.password)) {
      errors.password2 = "Passwords must match";
    }
  
    return {
      errors,
      isValid: isEmpty(errors),
    };
};

export default validateRegisterInput;