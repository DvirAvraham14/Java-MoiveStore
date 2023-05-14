import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function CartIconButton() {
    return (
        <IconButton component={Link} to="/cart" size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
}

export default CartIconButton;
