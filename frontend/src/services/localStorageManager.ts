import type { IAuthResponse } from "../api/types";
import storage from "./localStorage";

export const LOCAL_STORAGE_AUTH_KEY = "react-laravel-auth";

const saveToken = ({ token }: IAuthResponse): void => {
  storage.save(LOCAL_STORAGE_AUTH_KEY, { token });
};

const getToken = (): string => {
  const authSavedInfo = storage.load(LOCAL_STORAGE_AUTH_KEY);

  return authSavedInfo?.token;
};

const eraseUserInfo = () => {
  storage.remove(LOCAL_STORAGE_AUTH_KEY);
};

export const localStorageManager = {
  saveToken,
  getToken,
  eraseUserInfo
};
