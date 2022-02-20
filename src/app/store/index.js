import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import authReducer from "../../screens/auth/AuthScreen/store/index";
import transactionsReducer from "../../screens/payment/PaymentScreen/store";

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
