import React, {useContext, useState} from "react";
import {CartContext} from "./MovieShoping";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import useSnackbar from "../hooks/useSnackBar";

/*
    CartItem component is used to display the cart item.
    It is used in the Cart component.
    It takes the following props:
        data: The cart item data.
        updatePrice: The function to update the total price.
 */
const CartItem = ({data, updatePrice}) => {
    const cart = useContext(CartContext); // used to update the cart size
    const [quantity, setQuantity] = useState(data.quantity); // used to update the quantity
    const [isDeleted, setIsDeleted] = useState(false); // used to delete the cart item
    const {openSnackbar, SnackbarComponent} = useSnackbar(); // used to open the snackbar

    // handleCartUpdate function is used to update the cart item.
    const handleCartUpdate = async (type) => {
        const updatedQuantity = type ? quantity + 1 : quantity - 1;
        const response = await fetch(`api/cart/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuantity),
        });
        if(!response.ok) {
            openSnackbar('error', 'Not enough stock');
        }else{
            openSnackbar('success', 'Cart updated');
        }
        const responseData = await response.json(); // the updated cart
        // update the cart size and the total price
        if (Array.isArray(responseData)) {
            cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
            updatePrice(responseData.reduce((acc, item) => acc + item.quantity * item.product.price, 0));
        }
    };

    // handleDecrease function is used to decrease the quantity of the cart item.
    const handleDecrease = () => {
        if (quantity > 1) {
            handleCartUpdate(false).then(() => {
                setQuantity(prevQuantity => prevQuantity - 1);
            });
        }
    };

    // handleIncrease function is used to increase the quantity of the cart item.
    const handleIncrease = () => {
        handleCartUpdate(true).then(() => setQuantity(quantity + 1));
    };

    // handleDelete function is used to delete the cart item.
    const handleDelete = async () => {
        const response = await fetch(`api/cart/${data.id}`, {
            method: 'DELETE',
        });

        if(!response.ok) {
            openSnackbar('error', 'The operation could not be completed please try again later');
        }else{
            openSnackbar('success', 'Item deleted');
        }
        const responseData = await response.json();
        if (Array.isArray(responseData)) {
            cart.setCartSize(responseData.reduce((acc, item) => acc + item.quantity, 0));
            updatePrice(responseData.reduce((acc, item) => acc + item.quantity * item.product.price, 0));

        }
        setIsDeleted(true);
    }

    // return the cart item
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
                    sx={{width: 150, alignSelf: 'center'}}
                    image={data.product.image ? `https://image.tmdb.org/t/p/w500/${data.product.image}` : '/Image_not_available.png'}
                    alt="Live from space album cover"
                />
            </Box>
            <SnackbarComponent />
        </Collapse>
    )
};

export default CartItem;