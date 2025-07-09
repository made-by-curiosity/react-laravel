import { apiClient } from "../services/apiClient";
import { POSTS_ROUTE } from "./constants";
import type { IPostModel, IPostResponse } from "./types";

type Post = Pick<IPostModel, 'title' | 'content'>;

export const createPost = async (data: Post): Promise<IPostResponse> => {
  const res = await apiClient.post(POSTS_ROUTE, data);

  return res.data;
};
