import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { getPost } from "../../../../api/getPost";
import type { IPostModel } from "../../../../api/types";
import { validationSchema } from "../../validationSchema";
import { updatePost } from "../../../../api/updatePost";

const Post = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPostModel | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            title: post?.title || "",
            content: post?.content || "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await updatePost(post!.id, {
                    title: values.title,
                    content: values.content,
                });

                setPost(response.post);

                formik.resetForm();
                toggleEdit();
                toast.success("Post has been successfuly updated!");
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        },
    });

    useEffect(() => {
        (async () => {
            setPost(null);

            if (!id) {
                toast.error("Post ID is missing.");
                return;
            }

            try {
                const response = await getPost(+id);
                setPost(response.post);
            } catch (error: any) {
                toast.error(error.response.data.message);
                setPost(null);
            }
        })();
    }, [id]);

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
        if (!isEditing) {
            formik.setValues({
                title: post?.title || "",
                content: post?.content || "",
            });
        }
    };

    return (
        <div>
            {post ? (
                <>
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
                        <button type="button" onClick={toggleEdit}>{isEditing ? 'Cancel' : 'Edit post'}</button>
                    </div>
                    {isEditing && <form onSubmit={formik.handleSubmit}>
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
                        <button type="submit">Save</button>
                    </form>

                    }
                </>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
};

export default Post;