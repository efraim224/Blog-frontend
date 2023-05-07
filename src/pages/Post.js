import { getPostById } from "../content/posts"
import { useParams } from "react-router-dom";


const Post = () => {

    const params = useParams();
    const post = getPostById(params.id);
    return (
        <div className="post">
            <div className="content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            <img src={post.img} alt={post.alt}></img>
        </div>
    )
}

export default Post