
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Paper, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    c_root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
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
}));

const Cart = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);

    const getCart = async () => {
        const response = await fetch(`api/cart`);
        const data = await response.json();
        setData(data);
        console.log(data);
    }

    useEffect(() => {
        getCart();
}, []);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        data.map((item) => {
            totalPrice += item.product.price * item.quantity;
        });
        return totalPrice;
    };


    return (
        <div className={classes.c_root}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    {data && data.map((item) => (
                        <Paper key={item.id} className={classes.paper}>
                            <div className={classes.cartItem}>
                                <Typography variant="h6" className={classes.cartItemTitle}>
                                    {item.product.name}
                                </Typography>
                                <Typography variant="body1" className={classes.cartItemPrice}>
                                    ${item.product.price}
                                </Typography>
                            </div>
                        </Paper>
                    ))}
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
                                ${calculateTotalPrice()}
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

