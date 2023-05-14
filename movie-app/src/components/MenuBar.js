import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link, Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';

import AppMenu from './menuCom/AppMenu';
import CartIconButton from './menuCom/CartIconButton';
import PageButtons from './menuCom/PageButtons';
import Footer from './Footer';

const theme = createTheme();

const WEBSITE = 'TMDB';

function MenuBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <header>
                        <AppBar position="static">
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
                                        component="a"
                                        href="/"
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
                    <main>
                        <Grid
                            container
                            sx={{ py: 8 }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={12} lg={10} xl={10}>
                                <Outlet />
                            </Grid>
                        </Grid>
                    </main>

                    <Footer/>

                </Box>
            </ThemeProvider>
        </>
    );
}

export default MenuBar;
