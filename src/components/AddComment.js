
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const AddComment = (props) => {
    const backLink = `${process.env.REACT_APP_BACK_API}/comments/${props.postId}`

    const handleClick = () => {
        console.log(backLink)
        axios.post(backLink, {commentData}, {
            withCredentials: true, // This allows cookies to be sent
        })
    }

    const [commentData, setCommentData] = useState('')

    const handleChange = (event) => {
        event.preventDefault();
        console.log(backLink)
        setCommentData(event.target.value)
    }

    return (
        <form>
            <Box
                color={'grey'}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                    />
                </div>
            </Box>
            <Button  sx={{ display: 'inline' }} variant="contained" color="primary" onClick={handleClick}>
                save
            </Button>
        </form>
    );
}


export default AddComment;
