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


const Cart = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const cart = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);

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

