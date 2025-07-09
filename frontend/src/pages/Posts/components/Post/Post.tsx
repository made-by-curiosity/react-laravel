import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPost } from "../../../../api/getPost";
import type { IPostModel } from "../../../../api/types";

const Post = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPostModel | null>(null)

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

    return (
        <div>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Created at: {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading post...</p>
            )}
        </div>
    );
};

export default Post;