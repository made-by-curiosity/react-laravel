import { apiClient } from "../services/apiClient";
import { POSTS_ROUTE } from "./constants";

export const deletePost = async (id: number): Promise<void> => {
  const res = await apiClient.delete(`${POSTS_ROUTE}/${id}`);

  return res.data;
};
