import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import AppMenu from './menuCom/AppMenu';
import CartIconButton from './menuCom/CartIconButton';
import PageButtons from './menuCom/PageButtons';

const WEBSITE = 'TMDB';

/*
    MenuBar component is used to display the menu bar on the top of the page.
    It is used in the App component.
    in thi

 */
function MenuBar() {
    const [anchorElNav, setAnchorElNav] = useState(null); // State to store the anchor element of the nav menu

    // Function to open the nav menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // Function to close the nav menu
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Return the menu bar
    return (
        <header>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LocalMoviesIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {WEBSITE}
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <AppMenu anchorElNav={anchorElNav} handleOpenNavMenu={handleOpenNavMenu}
                                     handleCloseNavMenu={handleCloseNavMenu}/>
                        </Box>

                        <LocalMoviesIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {WEBSITE}
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <PageButtons handleCloseNavMenu={handleCloseNavMenu}/>
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <CartIconButton/>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>

    );
}

export default MenuBar;
