import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Paper, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {CartContext} from "./MovieShoping";
import CartItem from "./CartItem";


const useStyles = makeStyles((theme) => ({
    c_root: {

        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3),
    },
    cartItem: {
        marginBottom: theme.spacing(2),
    },
    cartItemTitle: {
        fontWeight: 'bold',
    },
    cartItemPrice: {
        marginLeft: theme.spacing(2),
    },
    totalSection: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPrice: {
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginTop: theme.spacing(2),
        marginLeft: 'auto',
    },
    emptyCart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

/*
    Cart component is used to display the cart page.
    It is used in the App component.
 */
const Cart = () => {
    const classes = useStyles(); // Custom styles
    const [data, setData] = useState([]); // State to store the cart data
    const cart = useContext(CartContext);  // Cart context to get the cart size
    const [totalPrice, setTotalPrice] = useState(0); // State to store the total price of the cart

    // Function to get the cart data from the server
    const getCart = async () => {
        const response = await fetch(`api/cart`);
        const data = await response.json();
        setData(data);
        let price = 0;
        data.map((item) => {
            price += item.product.price * item.quantity;
        });
        setTotalPrice(price);
    }
    useEffect(() => {
        getCart();
    }, []);



    // If the cart is empty, display the empty cart message
    if(cart.cartSize === 0) {
        return (
            <div className={classes.emptyCart}>
                <Typography variant="h4" gutterBottom>
                    You're cart is empty
                </Typography>
                <Button component={Link} to="/search" variant="contained" color="primary">
                    Go Shopping
                </Button>
            </div>
        )
    }

    // If the cart is not empty, display the cart items
    return (
        <div className={classes.c_root}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container gap={2}>
                        {data && data.map((item) => (
                            <Grid item key={item.id} xs={12}>
                                <CartItem data={item} updatePrice={setTotalPrice}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Summary
                        </Typography>
                        <div className={classes.totalSection}>
                            <Typography variant="body1">
                                Total:
                            </Typography>
                            <Typography variant="h6" className={classes.totalPrice}>
                                ${totalPrice.toFixed(2)}
                            </Typography>
                        </div>
                        <Button component={Link} to="/checkout" variant="contained" color="primary"
                                className={classes.checkoutButton}>
                            Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Cart;

