import React, {useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import {CartContext} from "../MovieShoping";

/*
    CartIconButton component is used to display the cart icon on the mobile view.
    It is used in the AppHeader component.
    It takes the following props:
        anchorElCart: The anchor element for the cart.
        handleOpenCartMenu: The function to open the cart.
        handleCloseCartMenu: The function to close the cart.
 */
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
