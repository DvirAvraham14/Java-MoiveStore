import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useContext} from "react";
import {CartContext} from "./MovieShoping";
import useSnackbar from "../hooks/useSnackBar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CartButton = ({data}) => {
    const cart = useContext(CartContext);
    const {openSnackbar, SnackbarComponent} = useSnackbar();

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
        }
        const responseData = await response.json();
        cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
    }

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
