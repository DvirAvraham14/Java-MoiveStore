import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const pages = [
    { name: 'Home', path: '' },
    { name: 'Search', path: 'search' },
    { name: 'Checkout', path: 'checkout' },
];

/*
    PageButtons component is used to display the menu icon on the mobile view.
    It is used in the AppHeader component.
    It takes the following props:
        handleCloseNavMenu: The function to close the menu.
 */
const WEBSITE = 'TMDB';
function PageButtons({ handleCloseNavMenu }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LocalMoviesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                    <Link to="/" onClick={handleCloseNavMenu} className="menu-link" style={{ color: 'white', textDecoration: 'none' }}>
                        {WEBSITE}
                    </Link>
                </Typography>
            </Box>

            {pages.map((page) => (
                <React.Fragment key={page.name}>
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
                        <Link
                            to={page.path}
                            onClick={handleCloseNavMenu}
                            className="menu-link"
                            style={{ color: 'white', textDecoration: 'none' }}
                        >
                            {page.name}
                        </Link>
                    </Typography>
                </React.Fragment>
            ))}
        </Box>
    );
}

export default PageButtons;
