import React, {useState, createContext, useEffect} from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Outlet} from 'react-router-dom';
import useFetch from "../hooks/useFetch";

const theme = createTheme();
export const CartContext = createContext();

const MovieShoping = () => {
    const [cartSize, setCartSize] = useState(0);
    const {response, error, isLoading, setUrl} = useFetch(`api/cart`);

    useEffect(() => {
        // setCartSize(response.reduce((acc, item) => acc + item.quantity, 0));
        if(!isLoading && response)
            setCartSize(response.reduce((acc, item) => acc + item.quantity, 0));
    }, [response]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <CartContext.Provider value={{cartSize, setCartSize}}>
                        <MenuBar/>
                        <main>
                            <Grid
                                container
                                sx={{py: 8}}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={10}>
                                    <Outlet/>
                                </Grid>
                            </Grid>
                        </main>
                        <Footer/>
                    </CartContext.Provider>
                </Box>
            </ThemeProvider>
        </>
    );

}

export default MovieShoping;