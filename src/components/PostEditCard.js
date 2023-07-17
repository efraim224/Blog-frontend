import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { useState } from 'react';
import Tooltip from "@mui/material/Tooltip";


const fox_img = require('../static/images/red_fox.jpg');

const PostEditCard = (props) => {
    const { isAuthenticated } = React.useContext(AuthContext);
    const navigate = useNavigate();

    // tooltip
    const [open, setOpen] = React.useState(false);
    const [copyFeedback, setCopyFeedback] = React.useState("Share link");

    const [favColor, setColor] = useState(props.color ?? '');


    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        navigate(`/posts/${props.id}`);
    };

    const handleFavoriveClick = async () => {
        if (!isAuthenticated) {
            navigate('/login');
        }

        setColor(getColor(favColor))
    }

    const getColor = (current) => {
        if (current === 'error') {
            return ''
        }
        else {
            return 'error'
        }
    }

    const showCopyFeedback = () => {
        setCopyFeedback("Copied Successfully");
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
            setCopyFeedback("Share link")
        }, 5000);
    }

    const handleShareClick = async () => {
        try {
            await navigator.clipboard.writeText(`${process.env.REACT_APP_BACK_API}/posts/${props.id}`)
            showCopyFeedback();
        } catch (error) {
            setCopyFeedback("Failed to copy. Please check browser persmissions");
            setOpen(true);
        }
    }

    const handleDeleteClick = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACK_API}/delete_post/${props.id}`, {}, { withCredentials: true })
            navigate('/myposts');
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatusChange = async (event) => {
        try {
            const data = {
                status: event.target.value,
                post_id: props.id
            }
            await axios.post(`${process.env.REACT_APP_BACK_API}/update_status`, data, { withCredentials: true })
            setPostStatus(event.target.value);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = async () => {
        navigate('/add', { state: { content: props.content, title: props.title, postId: props.id } });
    }

    const [postStatus, setPostStatus] = useState(props.status ?? 'draft');

    return (
        <Card>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={2}>

                    <CardMedia
                        sx={{ height: 140 }}
                        image={props.img ?? fox_img}
                        title={props.title}
                        onClick={handleClick}
                    />
                </Grid>
                <Grid item xs={6}>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {props.content}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        {/* <Button size="small">Share</Button> */}
                        <Button size="small" onClick={handleClick}>Learn More</Button>
                        {/* <IconButton aria-label="add to favorites">
                            {isAuthenticated && <Tooltip title="Add to favorites">
                                <FavoriteIcon onClick={handleFavoriveClick} color={favColor} />
                            </Tooltip>
                            }
                        </IconButton> */}
                        <IconButton aria-label="share">
                            <Tooltip title={copyFeedback}>

                                <ShareIcon onClick={handleShareClick} />
                            </Tooltip>

                        </IconButton>
                    </CardActions>
                </Grid>
                <Grid>
                    <Grid sx={2} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            style={{backgroundColor: postStatus === "draft" ? '#bdbbb5' : '#a8f078'}}
                                // label="Status"

                                defaultValue={props.status || 'draft'}
                                onChange={handleStatusChange}
                                value={postStatus}
                            >
                                <MenuItem value={"draft"}>Draft</MenuItem>
                                <MenuItem value={"publish"}>Publish</MenuItem>
                                
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid sx={2}>
                        <Button value="DELETE" sx={{backgroundColor: 'blue'}} variant="contained" color="primary" onClick={handleEditClick}>
                            EDIT
                        </Button>

                    </Grid>

                    <Grid sx={2}>  
                        <Button value="DELETE" sx={{backgroundColor: 'red'}} variant="contained" color="primary" onClick={handleDeleteClick}>
                            DELETE
                        </Button>

                    </Grid>
                </Grid>
            </Grid>


        </Card >
    );
}


export default PostEditCard