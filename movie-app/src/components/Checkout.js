import React, {useContext, useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Paper } from '@mui/material';
import {Typography, TextField, Button, Grid, FormControl,
    InputLabel, MenuItem, Select, Checkbox, FormControlLabel,} from '@mui/material';
import {CartContext} from "./MovieShoping";
import useSnackbar from "../hooks/useSnackBar";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: 200,
        margin: theme.spacing(1),
    },
    totalPrice: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        borderRadius: theme.shape.borderRadius,
    },
}));

const PRICE = 3.99;

/*
    Checkout component is used to display the checkout page.
    It is used in the App component.
    add the payment and user details to the database
 */
const Checkout = () => {
    const cart = useContext(CartContext); // Cart context to get the cart size
    const { openSnackbar, SnackbarComponent } = useSnackbar(); // Custom snackbar hook
    const classes = useStyles(); // Custom styles

    const [firstName, setFirstName] = useState(''); // State to store the first name
    const [lastName, setLastName] = useState(''); // State to store the last name
    const [email, setEmail] = useState(''); // State to store the email
    const [paymentMethod, setPaymentMethod] = useState(''); // State to store the payment method
    const [saveCard, setSaveCard] = useState(false); // State to store the save card option

    // Function to handle the first name change
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    // Function to handle the last name change
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    // Function to handle the email change
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    // Function to handle the payment method change
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    // Function to handle the save card change
    const handleSaveCardChange = (event) => {
        setSaveCard(event.target.checked);
    };
    // Function to post the checkout data to the server
    async function postCheckout() {
        const response = await fetch('checkout/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                payment: (cart.cartSize * PRICE).toFixed(2),
            }),
        });
        if (response.ok) {
            openSnackbar('success', 'order placed successfully');
            await handleDelete();
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }else {
            openSnackbar('error', 'The operation could not be completed please try again later');
        }

    }
    // Function to handle the delete cart data from the server after the checkout
    const handleDelete = async () => {
        const response = await fetch(`api/deleteCart`, {
            method: 'DELETE',
        });
        const responseData = await response.json();
        if(!response.ok) {
            openSnackbar('error', 'The operation could not be completed');
        }
        if (Array.isArray(responseData)) {
            cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
        }
    };
    // Function to handle the submit event
    const handleSubmit = async (event) => {
        event.preventDefault();
        await postCheckout();
    }

    // Checkout component return
    return (
        <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>
                        Checkout
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                fullWidth
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                fullWidth
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="payment-method-select-label">Payment Method</InputLabel>
                                <Select
                                    labelId="payment-method-select-label"
                                    id="payment-method-select"
                                    value={paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                    label="Payment Method"
                                >
                                    <MenuItem value="credit-card">Credit Card</MenuItem>
                                    <MenuItem value="paypal">PayPal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox color="primary" checked={saveCard} onChange={handleSaveCardChange} />}
                                label="Save card details for future purchases"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Place Order
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Total Price Area */}
                    <div className={classes.totalPrice}>
                        <Typography variant="h6" gutterBottom>
                            Total Price
                        </Typography>
                        <Typography variant="h5">${(cart.cartSize * PRICE).toFixed(2)}</Typography> {/* Replace with the actual total price */}
                    </div>
                </form>
                <SnackbarComponent />
            </Box>
        </Paper>
    );
};

export default Checkout;
