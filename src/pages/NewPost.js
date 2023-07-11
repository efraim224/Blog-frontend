import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewPost = () => {

    const location = useLocation();


    const initialState = location.state || {};
    const initialTitle = initialState.title || "";
    const initialContent = initialState.content || "";

    const postId = initialState.postId || null;
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setTitle(initialTitle);
        setContent(initialContent);
    }, [initialTitle, initialContent]);


    const navigate = useNavigate();

    const link = `${process.env.REACT_APP_BACK_API}/posts/`
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatePostAsync = async () => {
            try {
                let data = {
                    "title": title,
                    "content": content
                }

                if (postId !== null) {
                    data.postId = postId;
                }

                await axios.post(link, data, { withCredentials: true })
                if (window.history.state?.key) {
                    navigate(-1); // Go back to previous page
                } else {
                    navigate('/'); // Navigate to root page
                }
            }
            catch (e) {
                console.log(e)
            }
        }

        updatePostAsync();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" id="form_title" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Content:
                <textarea id="form_content" rows={5} cols={5} value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}


export default NewPost