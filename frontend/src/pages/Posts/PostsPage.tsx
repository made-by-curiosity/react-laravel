import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import { getPosts } from "../../api/getPosts";
import type { IPostModel } from "../../api/types";
import { validationSchema } from "./validationSchema";
import { createPost } from "../../api/createPost";
import { routes } from "../../config/routes";
import { deletePost } from "../../api/deletePost";

const PostsPage = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);

      try {
        const response = await createPost({
          title: values.title,
          content: values.content,
        });

        setPosts((prevPosts) => {
          if (prevPosts) {
            return [response.post, ...prevPosts];
          }
          return [response.post];
        });

        formik.resetForm();
        toast.success("Post has been successfuly created!");
      } catch (error: any) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    },
  });

  const [posts, setPosts] = useState<IPostModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);


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

  const handlePostDelete = (postId: number) => {
    return async () => {
      try {
        await deletePost(postId);
        setPosts((prevPosts) => prevPosts?.filter((post) => post.id !== postId) || null);
        toast.success("Post has been successfuly deleted!");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
  }

  return (
    <div>
      <div>
        {error && <div className="error">{error}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>
              <span>Title: </span>
              <input
                type="title"
                name="title"
                placeholder="My story"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </label>
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
          </div>
          <div>
            <label>
              <span>Content: </span>
              <textarea
                name="content"
                placeholder="Once upon a time..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
              />
            </label>
            {formik.touched.content && formik.errors.content ? <div>{formik.errors.content}</div> : null}
          </div>
          <button type="submit">Add new post</button>
        </form>
      </div>
      {!posts && 'Loading...'}
      <ul>
        {posts && posts.map((post) => (
          <li key={post.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link to={`${routes.posts}/${post.id}`}>
              <h2>
                {post.title}
              </h2>
            </Link>
            <button type="button" onClick={handlePostDelete(post.id)}>Remove</button>
          </li>
        ))}
        {posts?.length === 0 && <p>No posts available.</p>}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PostsPage;
