import { axiosInstance } from "../../../../../app/api/axiosInstance";
import { setError } from "./setError";

export const createTransaction =
  ({ name, amount }) =>
  async (dispatch) => {
    try {
      await axiosInstance.post("api/protected/transactions", {
        name,
        amount,
      });

      dispatch(setError(""));
    } catch (err) {
      const { data } = await err.response;
      dispatch(setError(data));
    }
  };
