import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import {Link, Outlet} from "react-router-dom";
import {Badge} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "./Footer";

const theme = createTheme();

const pages = [{name: 'Home', path: ''},
    {name: 'Search', path: 'search'}, {name: 'Checkout', path: 'checkout'}];

function ResponsiveAppBar() {

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar >
                    <LocalMoviesIcon
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            fontSize: '2.5rem',
                            color: 'black'
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Our
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={`/${page.path}`} key={page.name}  underline="none">
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page.name}</Button>
                            </Link>
                        ))}
                    </Box>

                        <IconButton component={Link} to='/cart' size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCartIcon  />
                            </Badge>
                        </IconButton>



                </Toolbar>
            </Container>
        </AppBar>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container sx={{ py: 8 }} maxWidth="md">
                     <Outlet/>
                </Container>
                <Footer />
            </ThemeProvider>
        </>

    );
}
export default ResponsiveAppBar;