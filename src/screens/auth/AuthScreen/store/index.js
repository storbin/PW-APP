import { AuthActionTypes } from "../../../../shared/constants/actionTypes/auth/authActionTypes";

const initialState = {
  id_token: undefined,
  didTryAutoLogin: false,
  isLoading: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
      return {
        ...state,
        id_token: action.payload?.id_token,
        didTryAutoLogin: true,
      };
    case AuthActionTypes.SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case AuthActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
