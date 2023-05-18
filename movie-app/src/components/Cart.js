import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Paper, Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useTheme} from '@mui/material/styles';
import {CartContext} from "./MovieShoping";
import Collapse from '@mui/material/Collapse';


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
}));


const Item = ({data}) => {
    const cart = useContext(CartContext);
    const theme = useTheme();
    const [quantity, setQuantity] = useState(data.quantity);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleCartUpdate = async (type) => {
        const updatedQuantity = type ? quantity + 1 : quantity - 1;
        const response = await fetch(`api/cart/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuantity),
        });
        const responseData = await response.json();

        if (Array.isArray(responseData)) {
            cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
        }
    };


    const handleDecrease = () => {
        if (quantity > 1) {
            handleCartUpdate(false).then(() => {
                setQuantity(prevQuantity => prevQuantity - 1);
            });
        }
    };

    const handleIncrease = () => {
        handleCartUpdate(true).then(() => setQuantity(quantity + 1));
    };

    const handleDelete = async () => {
        const response = await fetch(`api/cart/${data.id}`, {
            method: 'DELETE',
        });
        const responseData = await response.json();

        if (Array.isArray(responseData)) {
            cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
        }
        setIsDeleted(true);
    }

    return (
        <Collapse in={!isDeleted} collapsedSize={0} timeout={300}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Card sx={{display: 'flex', flexGrow: 1}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {data.product.name}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                            <IconButton aria-label="minus" onClick={handleDecrease}>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {quantity}
                            </Typography>
                            <IconButton aria-label="add" onClick={handleIncrease}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton aria-label="next" onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
                <CardMedia
                    component="img"
                    sx={{width: 151, alignSelf: 'center'}}
                    image={data.product.image ? `https://image.tmdb.org/t/p/w500/${data.product.image}` : '/Image_not_available.png'}
                    alt="Live from space album cover"
                />
            </Box>
        </Collapse>
    )
};


const Cart = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const cart = useContext(CartContext);

    const getCart = async () => {
        const response = await fetch(`api/cart`);
        const data = await response.json();
        setData(data);
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
                <Grid item xs={12} md={8}>
                    <Grid container gap={2}>
                        {data && data.map((item) => (
                            <Grid item key={item.id} xs={12} md={6} lg={4}>
                                <Item data={item}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Summary
                        </Typography>
                        <div className={classes.totalSection}>
                            <Typography variant="body1">
                                Total:
                            </Typography>
                            <Typography variant="h6" className={classes.totalPrice}>
                                ${calculateTotalPrice().toFixed(2)}
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

