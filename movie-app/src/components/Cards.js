import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CartButton from "./CartButton";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useContext} from "react";
import {CartContext} from "./MovieShoping";

const Cards = ({data, openModal}) => {
    // const cart = useContext(CartContext);
    // async function addItemToCart() {
    //     const response = await fetch("api/cart", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: data.id,
    //             name: data.original_title,
    //             price: 3.99,
    //             image: data.poster_path
    //         }),
    //     });
    //     const responseData = await response.json();
    //     cart.setCartSize(responseData.length);
    // }

    const handleOpenModal = () => {
        openModal(data);
    };
    return (
        <Card sx={{maxWidth: 300}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height={140}
                style={{objectFit: 'cover'}} // Set height to '100%' to make the image fit the container
                image={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : '/Image_not_available.png'}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{
                    fontSize: '1.2rem',
                    height: '3rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {data.original_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    maxHeight: '4.8rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {data.overview}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpenModal}>
                    View
                </Button>
                <CartButton data={data}/>
            </CardActions>
        </Card>
    );
};

export default Cards;
