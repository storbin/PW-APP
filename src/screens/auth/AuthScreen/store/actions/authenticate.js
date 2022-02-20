import { getUserInfo } from "../../../../payment/PaymentScreen/store/actions/getUserInfo";
import { getListTransactions } from "../../../../payment/PaymentScreen/store/actions/getListTransactions";
import { logOut } from "./logOut";
import { AuthActionTypes } from "../../../../../shared/constants/actionTypes/auth/authActionTypes";

export const authenticate =
  ({ id_token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: AuthActionTypes.AUTHENTICATE, payload: { id_token } });
      dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: true });

      await dispatch(getUserInfo());
      await dispatch(getListTransactions());

      dispatch({ type: AuthActionTypes.SET_IS_LOADING, payload: false });
    } catch (err) {
      dispatch(logOut());

      throw err;
    }
  };
