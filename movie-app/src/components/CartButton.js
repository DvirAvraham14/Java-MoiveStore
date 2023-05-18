import * as React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useContext} from "react";
import {CartContext} from "./MovieShoping";

const CartButton = ({data}) => {
    const cart = useContext(CartContext);
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
        const responseData = await response.json();
        cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
    }

    return (
                <Button size="small" onClick={() => addItemToCart()}>
                    <AddShoppingCartIcon/>
                </Button>
    );
};

export default CartButton;
