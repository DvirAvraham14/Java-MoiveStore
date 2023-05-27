import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useContext} from "react";
import {CartContext} from "./MovieShoping";
import useSnackbar from "../hooks/useSnackBar";

/*
    CartButton component is used to display the cart button on the movie card.
    It is used in the MovieCard component.
    It takes the following props:
        data: The movie data.
 */
const CartButton = ({data}) => {
    const cart = useContext(CartContext); // used to update the cart size
    const {openSnackbar, SnackbarComponent} = useSnackbar(); // used to open the snackbar

    // addItemToCart function is used to add the movie to the cart.
    async function addItemToCart() {
        const response = await fetch("api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.id,
                name: data.original_title,
                price: 3.99,
                image: data.poster_path
            }),
        });
        if (response.ok) {
            openSnackbar( 'success',  'The Item has been added to your cart!' );
        } else {
            openSnackbar( 'error',  'The Item has not been added to your cart! please try again later' );
        }
        const responseData = await response.json();
        cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
    }

    // The CartButton component returns a button with an icon.
    return (
        <>
            <Button size="small" onClick={() => addItemToCart()}>
                <AddShoppingCartIcon/>
            </Button>
            <SnackbarComponent/>
        </>
)
    ;
};

export default CartButton;
