import React from 'react';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';

const leftButtones = [
    {
        "name": 'Home',
        "link": "/"
    },
    {
        "name": 'About me',
        "link": "/about"
    },
    {
        "name": 'Contact',
        "link": "/contact"
    }
]

const rightButtons = [
    {
        "name": 'Signup',
        "link": "/signup"
    },
    {
        "name": 'Login',
        "link": "/login"
    }
]


export const NavbarCard = () => {

    const navigate = useNavigate()
    const handlePageClick = (link) => {
        navigate(link)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {leftButtones.map((page) => {
                            return <Button onClick={() => handlePageClick(page.link)} color="inherit">{page.name}</Button>
                        })}
                    </Typography>
                    <Box sx={{ marginLeft: 'auto' }}>
                        {rightButtons.map((page) => {
                            return <Button onClick={() => handlePageClick(page.link)} color="inherit">{page.name}</Button>
                        })}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavbarCard;