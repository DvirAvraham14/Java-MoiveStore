import React, {useState, createContext, useEffect} from "react";
import MenuBar from "./MenuBar";
import Footer from "./Footer";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {Outlet} from 'react-router-dom';
import useFetch from "../hooks/useFetch";

const theme = createTheme();  // Create a theme instance for the Material UI components
export const CartContext = createContext(undefined);  // Create a context for the cart size
export const HistoryContext = createContext(undefined);  // Create a context for the cart size

/*
    MovieShoping component is used to display the main page of the app.
    this component is used in the App component.
    it uses the MenuBar and Footer components.
    and Outlet component to display the child components.
 */
const MovieShoping = () => {
    const [cartSize, setCartSize] = useState(0); // State to store the cart size
    const [history, setHistory] = useState([]); // State to store the cart size
    const {response, error, isLoading} = useFetch(`api/cart`); // Custom hook to fetch the cart data from the server

    // Set the cart size when the cart data is fetched from the server
    useEffect(() => {
        // setCartSize(response.reduce((acc, item) => acc + item.quantity, 0));
        if(!isLoading && response)
            setCartSize(response.reduce((acc, item) => acc + item.quantity, 0));
    }, [response]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <CartContext.Provider value={{ cartSize, setCartSize }}>
                        <MenuBar />
                        <main style={{ marginTop: '16px' }}>
                            <Grid container sx={{ py: 8 }} justifyContent="center" alignItems="center">
                                <Grid item xs={10}>
                                    <HistoryContext.Provider value={{ history, setHistory }}>
                                        <Outlet />
                                    </HistoryContext.Provider>
                                </Grid>
                            </Grid>
                        </main>
                        <Footer />
                    </CartContext.Provider>

                </Box>
            </ThemeProvider>
        </>
    );

}

export default MovieShoping;