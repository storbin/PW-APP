import { setError } from "./setError";
import { TransactionsActionTypes } from "../../../../../shared/constants/actionTypes/transaction/transactionsActionTypes";
import { axiosInstance } from "../../../../../app/api/axiosInstance";

export const getFilteredUserList =
  ({ query }) =>
  async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("api/protected/users/list", {
        filter: query,
      });

      dispatch({
        type: TransactionsActionTypes.GET_FILTERED_USER_LIST,
        payload: data,
      });
    } catch (err) {
      const { data } = await err.response;
      dispatch(setError(data));
    }
  };
