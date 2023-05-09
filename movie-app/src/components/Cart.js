
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

    const cartItems = [
        { id: 1, title: 'Movie 1', price: 10 },
        { id: 2, title: 'Movie 2', price: 15 },
        { id: 3, title: 'Movie 3', price: 20 },
    ];

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price;
        });
        return totalPrice;
    };

    return (
        <div className={classes.c_root}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {cartItems.map((item) => (
                        <Paper key={item.id} className={classes.paper}>
                            <div className={classes.cartItem}>
                                <Typography variant="h6" className={classes.cartItemTitle}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" className={classes.cartItemPrice}>
                                    ${item.price}
                                </Typography>
                            </div>
                            {/* Add any additional item details here */}
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
                        <Button variant="contained" color="primary" className={classes.checkoutButton}>
                            Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Cart;



// import { makeStyles } from '@material-ui/core/styles';
// import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
// import {Link} from "react-router-dom";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: theme.spacing(3),
//         marginBottom: theme.spacing(3),
//     },
//     title: {
//         marginBottom: theme.spacing(2),
//     },
//     tableContainer: {
//         maxWidth: 800,
//     },
//     table: {
//         minWidth: 650,
//     },
//     buttonContainer: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         marginTop: theme.spacing(2),
//         marginBottom: theme.spacing(2),
//     },
//     checkoutButton: {
//         marginLeft: theme.spacing(2),
//     },
// }));
//
// // function Cart({ cartItems, onCartItemRemove, onCheckout }) {
// function Cart() {
//     const cartItems = [{
//         id: 1,
//         title: "The Lord of the Rings",
//         price: 15.99,
//         quantity: 2,
//         image: "https://www.example.com/lord-of-the-rings.jpg",
//     }];
//     const classes = useStyles();
//
//     // const handleRemoveClick = (cartItem) => {
//     //     onCartItemRemove(cartItem);
//     // };
//     //
//     // const handleCheckoutClick = () => {
//     //     onCheckout();
//     // };
//
//     return (
//         <div className={classes.root}>
//             <Typography variant="h4" className={classes.title}>
//                 Your Cart
//             </Typography>
//             <TableContainer component={Paper} className={classes.tableContainer}>
//                 <Table className={classes.table} aria-label="cart table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Movie Title</TableCell>
//                             <TableCell align="right">Price</TableCell>
//                             <TableCell align="right">Quantity</TableCell>
//                             <TableCell align="right">Total</TableCell>
//                             <TableCell align="right"></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {cartItems.map((cartItem) => (
//                             <TableRow key={cartItem.id}>
//                                 <TableCell component="th" scope="row">
//                                     {cartItem.title}
//                                 </TableCell>
//                                 <TableCell align="right">${cartItem.price.toFixed(2)}</TableCell>
//                                 <TableCell align="right">{cartItem.quantity}</TableCell>
//                                 <TableCell align="right">${(cartItem.price * cartItem.quantity).toFixed(2)}</TableCell>
//                                 <TableCell align="right">
//                                     {/*<Button color="secondary" onClick={() => handleRemoveClick(cartItem)}>*/}
//                                     <Button color="secondary">
//                                         Remove
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                         {cartItems.length === 0 && (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     Your cart is empty.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <div className={classes.buttonContainer}>
//                 <Typography variant="h6">
//                     Total: ${cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0).toFixed(2)}
//                 </Typography>
//                 {/*<Button variant="contained" color="primary" onClick={handleCheckoutClick} disabled={cartItems.length === 0} className={classes.checkoutButton}>*/}
//                 <Button component={Link} to='/checkout' variant="contained" color="primary"  disabled={cartItems.length === 0} className={classes.checkoutButton}>
//                     Checkout
//                 </Button>
//             </div>
//         </div>
//     );
// }
//
// export default Cart;