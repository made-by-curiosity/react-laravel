import { apiClient } from "../services/apiClient";
import { POSTS_ROUTE } from "./constants";
import type { IPostResponse } from "./types";

export const getPost = async (id: number): Promise<IPostResponse> => {
  const res = await apiClient.get(`${POSTS_ROUTE}/${id}`);

  return res.data;
};
