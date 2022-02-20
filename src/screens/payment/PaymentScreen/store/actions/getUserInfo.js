import { setError } from "./setError";
import { TransactionsActionTypes } from "../../../../../shared/constants/actionTypes/transaction/transactionsActionTypes";
import { axiosInstance } from "../../../../../app/api/axiosInstance";

export const getUserInfo = () => async (dispatch) => {
  try {
    const {
      data: { user_info_token },
    } = await axiosInstance.get("api/protected/user-info");

    dispatch({
      type: TransactionsActionTypes.GET_USER_INFO,
      payload: user_info_token,
    });
  } catch (err) {
    const { data } = await err.response;
    dispatch(setError(data));
  }
};
