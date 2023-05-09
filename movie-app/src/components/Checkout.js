import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Box, Paper} from '@mui/material';

import {
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Checkbox,
    FormControlLabel,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: 200,
        margin: theme.spacing(1),
    },
}));

const Checkout = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [saveCard, setSaveCard] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSaveCardChange = (event) => {
        setSaveCard(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle checkout form submission
    };

    return (
        <Paper sx={{p: 2, borderRadius: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <Typography variant="h5" gutterBottom>
                        Checkout
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField required id="name" name="name" label="Name" fullWidth value={name}
                                       onChange={handleNameChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required id="email" name="email" label="Email" fullWidth value={email}
                                       onChange={handleEmailChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="address" name="address" label="Address" fullWidth value={address}
                                       onChange={handleAddressChange}/>
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
                                control={<Checkbox color="primary" checked={saveCard} onChange={handleSaveCardChange}/>}
                                label="Save card details for future purchases"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Place Order
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Paper>
    );
};

export default Checkout;
