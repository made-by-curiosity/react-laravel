import { apiClient } from "../services/apiClient";
import { POSTS_ROUTE } from "./constants";
import type { IPostModel, IPostResponse } from "./types";

type Post = Partial<Pick<IPostModel, 'title' | 'content'>>;

export const updatePost = async (id: number, data: Post): Promise<IPostResponse> => {
  const res = await apiClient.patch(`${POSTS_ROUTE}/${id}`, data);

  return res.data;
};
