

const Comment = (props) => {
    return (
        <div className="comment" style={{backgroundColor:'#d4d1cb',  margin:5}}>
            <div className="comment-user">{props.user}</div>
            <div className="comment-content" dangerouslySetInnerHTML={{ __html: props.content }} />
            {props.children}
        </div>
    );
}

export default Comment;