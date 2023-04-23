
const Post = (props) => {
    return (
        <div className="post">
            <div className="content">
                <h2>{props.title}</h2>
                <p>{props.content}</p>
            </div>
            <img src={props.img} alt={props.alt}></img>
        </div>
    )
}

export default Post