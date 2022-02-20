import { TransactionsActionTypes } from "../../../../shared/constants/actionTypes/transaction/transactionsActionTypes";

const initialState = {
  transactions_list: [],
  user_info: undefined,
  users_list: [],
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TransactionsActionTypes.GET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };
    case TransactionsActionTypes.GET_LIST_TRANSACTIONS:
      return {
        ...state,
        transactions_list: action.payload?.reverse(),
      };
    case TransactionsActionTypes.GET_FILTERED_USER_LIST:
      return {
        ...state,
        users_list: action.payload,
      };
    case TransactionsActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
