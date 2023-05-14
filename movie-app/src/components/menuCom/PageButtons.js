import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const pages = [
    { name: 'Home', path: '' },
    { name: 'Search', path: 'search' },
    { name: 'Checkout', path: 'checkout' },
];

function PageButtons({ handleCloseNavMenu }) {
    return (
        <>
            {pages.map((page) => (
                <Button
                    component={Link}
                    to={page.path}
                    style={{ textDecoration: 'none' }}
                    key={page.name} // Corrected the typo here
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.name}
                </Button>
            ))}
        </>
    );
}


export default PageButtons;
