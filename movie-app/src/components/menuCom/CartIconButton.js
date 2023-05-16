import React, {useEffect, useState, useContext, createContext} from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import {CartContext} from "../MovieShoping";


function CartIconButton() {
    const cart = useContext(CartContext);

    return (
        <IconButton component={Link} to="/cart" size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={cart.cartSize} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
}

export default CartIconButton;
