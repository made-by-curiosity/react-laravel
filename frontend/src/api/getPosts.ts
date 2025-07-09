import { apiClient } from "../services/apiClient";
import { POSTS_ROUTE } from "./constants";
import type { IPostsResponse } from "./types";

export const getPosts = async (): Promise<IPostsResponse> => {
  const res = await apiClient.get(POSTS_ROUTE);

  return res.data;
};
