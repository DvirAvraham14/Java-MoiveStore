import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './link.css';
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import Box from "@mui/material/Box";

const pages = [
    { name: 'Home', path: '' },
    { name: 'Search', path: 'search' },
    { name: 'Checkout', path: 'checkout' },
];

/*
    AppMenu component is used to display the menu icon on the mobile view.
    It is used in the AppHeader component.
    It takes the following props:
        anchorElNav: The anchor element for the menu.
        handleOpenNavMenu: The function to open the menu.
        handleCloseNavMenu: The function to close the menu.
 */
const WEBSITE = 'TMDB';
function AppMenu({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link to={page.path} className="nav-link">
                            <Typography textAlign="center">{page.name}</Typography>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
            <LocalMoviesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        color: 'white',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    component="div"
                >
                    <Link to="/" onClick={handleCloseNavMenu} className="menu-link" style={{ color: 'white' }}>
                        {WEBSITE}
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default AppMenu;
