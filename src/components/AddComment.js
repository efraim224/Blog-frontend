
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Input, { inputClasses } from '@mui/base/Input';

const AddComment = (props) => {
    const backLink = `${process.env.REACT_APP_BACK_API}/comments/${props.postId}`

    const handleClick = async () => {
        await axios.post(backLink, {commentData}, {
            withCredentials: true, // This allows cookies to be sent
        })

        props.setRefresh(true);
    }

    const [commentData, setCommentData] = useState('')
    const commentRef = useRef(null);


    const handleChange = (event) => {
        event.preventDefault();
        setCommentData(event.target.value)
    }


    // was a form before the stack
    return (
            <Stack direction={"row"} width={1}>
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
                
{/* 
                 <Input width={1}
                ref={commentRef}
                placeholder='write a comment'
                 id="outlined-start-adornment"
                 /> */}
            </Box>
            <Button variant="contained" color="primary" onClick={handleClick}>
                save
            </Button>
            </Stack>
    );
}


export default AddComment;
