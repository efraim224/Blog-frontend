import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

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

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    const handleTitlechange = (event) => {
        setTitle(event.target.value)
    }


    return (
        // <form onSubmit={handleSubmit}>
        //     <label>
        //         Title:
        //         <input type="text" id="form_title" value={title} onChange={e => setTitle(e.target.value)} />
        //     </label>
        //     <label>
        //         Content:
        //         <textarea id="form_content" rows={5} cols={5} value={content} onChange={e => setContent(e.target.value)} />
        //     </label>

        // </form>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
<Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    Write a new post:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* <TextareaAutosize
                    aria-label="Post title"
                    minRows={1}
                    placeholder="Post title"
                    onChange={e => setTitle(e.target.value)}
                /> */}

                <textarea style={{ resize: "none"}}
                rows={1}
                cols={50}
                placeholder="Post title"
                onChange={e => setTitle(e.target.value)}
                maxLength={50}
                />
            </Grid>
            <Grid item xs={12}>

                {/* <TextareaAutosize
                    aria-label="post content"
                    minRows={7}
                    placeholder="Your post content"
                    onChange={e => setContent(e.target.value)}

                /> */}
                <textarea style={{ resize: "none"}}
                rows={20}
                cols={50}
                placeholder="Your post content"
                onChange={e => setContent(e.target.value)}
                maxLength={2000}
                />
            
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained"  onClick={handleSubmit}>
                    Submit
                    </Button>
            </Grid>
        </Grid>
    )
}


export default NewPost