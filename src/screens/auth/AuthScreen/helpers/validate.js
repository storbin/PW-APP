import { isEmpty } from "../../../../shared/functions";

export const authValidate = (values, isSignUp, setIsValid) => {
  const errors = {};
  const minimumPasswordLength = 4;

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < minimumPasswordLength) {
    errors.password = `Minimum password length is ${minimumPasswordLength} symbols`;
  }

  if (isSignUp) {
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
      errors.username = "Wrong username!";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords must be the same!";
    }
  }

  if (isEmpty(errors)) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }

  return errors;
};
