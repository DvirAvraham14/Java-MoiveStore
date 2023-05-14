import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const pages = [
    { name: 'Home', path: '' },
    { name: 'Search', path: 'search' },
    { name: 'Checkout', path: 'checkout' },
];

function AppMenu({ anchorElNav,handleOpenNavMenu, handleCloseNavMenu }) {
    return (
        <>
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
                    <MenuItem component={Link} to={page.path} key={page.name} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default AppMenu;
