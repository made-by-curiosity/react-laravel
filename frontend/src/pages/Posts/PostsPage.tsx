import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import { getPosts } from "../../api/getPosts";
import type { IPostModel } from "../../api/types";
import { validationSchema } from "./validationSchema";
import { createPost } from "../../api/createPost";

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
