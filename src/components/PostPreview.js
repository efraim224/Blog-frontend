import { useNavigate } from "react-router-dom"

const PostPreview = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/posts/${props.id}`)
    }
    return (
        <div className="post" onClick={handleClick}>
            <div className="content">
                <h2>{props.title}</h2>
                <p>{props.content}</p>
            </div>
            <img src={props.img} alt={props.alt}></img>
        </div>
    )
}

export default PostPreview