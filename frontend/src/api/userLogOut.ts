import { apiClient } from "../services/apiClient";
import { USER_LOG_OUT_ROUTE } from "./constants";

export const logOutUser = async () => {
  const res = await apiClient.post(USER_LOG_OUT_ROUTE);

  return res.data;
};
