import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthActionTypes } from "../../../../../shared/constants/actionTypes/auth/authActionTypes";

export const logOut = () => {
  AsyncStorage.removeItem("token");
  return { type: AuthActionTypes.LOGOUT };
};
