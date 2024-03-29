// import { getPostById } from "../content/posts"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Comment from "../components/Comment";
import AddComment from "../components/AddComment";
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography } from "@mui/material";

const default_img = `data:image/jpeg;base64,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`
const fox_img = require('../static/images/red_fox.jpg');

const Post = () => {

    const params = useParams();
    const postId = params.id;
    const getPostLink = `${process.env.REACT_APP_BACK_API}/posts/${postId}`
    const getCommentsLink = `${process.env.REACT_APP_BACK_API}/comments/${postId}`
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPostData = async () => {
        const { data } = await axios.get(getPostLink);
        setPost(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                getPostData();
                setLoading(false);
            }
            catch (e) {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const [comments, setcomments] = useState([]);



    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getCommentsData = async () => {
            const { data } = await axios.get(getCommentsLink);
            setcomments(data);
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                await getCommentsData();
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        };

        fetchData();
    }, [getCommentsLink, refresh]);



    // const handleCommentAdded = () => {
    //     setRefresh(!refresh);
    // };

    
// const handleRefresh = () => {
//     setRefresh(prevState => !prevState); // this toggles the state, triggering a re-render
// }

    return (
        <>
            {loading ?
                <CircularProgress />
                :
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Grid item minWidth={0.5} maxWidth={0.5} >
                        <Box width={1} style={{ textAlign: 'left' }}>
                            <h2>{post.title}</h2>
                        </Box>
                    </Grid>

                    <Grid item  >
                        <Box width={1}>
                            <img src={post.img ?? fox_img} alt={post.alt} height={'200'} width={'400'} style={{ display: 'block', margin: '0 auto' }}></img>
                        </Box>
                    </Grid>

                    <Grid item width={'400px'} minWidth={0.5} maxWidth={0.5} >
                        <Box style={{ textAlign: 'left' }}>
                            <Typography variant="body1" gutterBottom>{post.content}</Typography>
                        </Box>
                    </Grid>

                    <Grid item minWidth={0.5} maxWidth={0.5}>
                        <Box width={1} style={{ textAlign: 'left' }}>
                            <h2>Comments:</h2>
                            <AddComment postId={postId} setRefresh={setRefresh} />
                            {comments.map((item, index) => {
                                return <Comment {...item} key={index} />
                            })}
                        </Box>
                    </Grid>
                </Grid>
            }
        </>


    )
}


export default Post