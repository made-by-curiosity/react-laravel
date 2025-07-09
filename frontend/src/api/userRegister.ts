import { apiClient } from "../services/apiClient";
import { USER_REGISTER_ROUTE } from "./constants";
import type { IAuthResponse, IRegisterCredentials } from "./types";

export const registerUser = async (credentials: IRegisterCredentials): Promise<IAuthResponse> => {
  const res = await apiClient.post(USER_REGISTER_ROUTE, credentials);

  return res.data;
};
