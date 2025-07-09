import { useEffect, useState } from "react";
import { getPosts } from "../../api/getPosts";
import { toast } from 'react-toastify';
import type { IPostModel } from "../../api/types";

const PostsPage = () => {
  const [posts, setPosts] = useState<IPostModel[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPosts();
        setPosts(response.posts);
      } catch (error) {
        toast.error("We couldn't load your posts, try again later.");
      }
    })()
  }, []);

  return (
    <div>
      <ul>
        {!posts && 'Loading...'}
        {posts && posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
          </li>
        ))}
        {posts?.length === 0 && <p>No posts available.</p>}
      </ul>
    </div>
  );
};

export default PostsPage;
