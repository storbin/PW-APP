import { AuthActionTypes } from "../../../../../shared/constants/actionTypes/auth/authActionTypes";

export const setError = (err) => ({
  type: AuthActionTypes.SET_ERROR,
  payload: err,
});
