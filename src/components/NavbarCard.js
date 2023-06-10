import React, { useEffect, useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

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

const backLink = "http://localhost:5000/logout"

const settings = [
    {
        "name": 'Profile',
        "link": "/"
    },
    {
        "name": 'Account',
        "link": "/"
    },
    {
        "name": 'Dashboard',
        "link": "/"
    },
    {
        "name": 'Logout',
        "link": backLink
    },
    
]


export const NavbarCard = () => {

    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const [cookie, setCookie, removeCookie] = useCookies(['session_id']);

    const handleLogout = (link) => {
        try {
            axios.post(link, { withCredentials: true })
            removeCookie('session_id')
            logOut()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
  
    const { isAuthenticated, logOut } = React.useContext(AuthContext);

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
                        {!isAuthenticated ? (rightButtons.map((page) => {
                            return <Button onClick={() => handlePageClick(page.link)} color="inherit">{page.name}</Button>
                        })) : (

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={() => {
                                            handleCloseUserMenu()
                                            if (setting.name === 'Logout') {
                                                handleLogout(setting.link)
                                            }
                                            }}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavbarCard;