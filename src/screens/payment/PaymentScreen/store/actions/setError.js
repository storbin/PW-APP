import { TransactionsActionTypes } from "../../../../../shared/constants/actionTypes/transaction/transactionsActionTypes";

export const setError = (err) => ({
  type: TransactionsActionTypes.SET_ERROR,
  payload: err,
});
