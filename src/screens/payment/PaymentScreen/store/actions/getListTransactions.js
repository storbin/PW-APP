import { setError } from "./setError";
import { TransactionsActionTypes } from "../../../../../shared/constants/actionTypes/transaction/transactionsActionTypes";
import { axiosInstance } from "../../../../../app/api/axiosInstance";

export const getListTransactions = () => async (dispatch) => {
  try {
    const {
      data: { trans_token },
    } = await axiosInstance.get("api/protected/transactions");

    dispatch({
      type: TransactionsActionTypes.GET_LIST_TRANSACTIONS,
      payload: trans_token,
    });
  } catch (err) {
    const { data } = await err.response;
    dispatch(setError(data));
  }
};
