import { apiClient } from "../services/apiClient";
import { USER_LOG_IN_ROUTE, } from "./constants";
import type { ILoginCredentials, IAuthResponse } from "./types";

export const logInUser = async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
  const res = await apiClient.post(USER_LOG_IN_ROUTE, credentials);

  return res.data;
};
