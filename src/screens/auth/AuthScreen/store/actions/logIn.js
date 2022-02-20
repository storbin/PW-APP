import { axiosInstance } from "../../../../../app/api/axiosInstance";
import { authenticate } from "./authenticate";

export const logIn =
  ({ email, password, username }) =>
  async (dispatch) => {
    try {
      const response = username
        ? await axiosInstance.post("users", {
            username,
            password,
            email,
          })
        : await axiosInstance.post("sessions/create", {
            email,
            password,
          });

      await dispatch(authenticate({ id_token: response.data.id_token }));
    } catch (err) {
      throw err;
    }
  };
