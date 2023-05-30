import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import AppMenu from './menuCom/AppMenu';
import CartIconButton from './menuCom/CartIconButton';
import PageButtons from './menuCom/PageButtons';

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
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <AppMenu anchorElNav={anchorElNav} handleOpenNavMenu={handleOpenNavMenu}
                                     handleCloseNavMenu={handleCloseNavMenu}/>
                        </Box>
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
