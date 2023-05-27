import React from 'react';
import {Dialog, DialogTitle, DialogContent, CardMedia, Typography,
    DialogContentText, Box,} from '@mui/material';
import CartButton from "./CartButton";
import {Rating} from "@mui/lab";

const PRICE = '$3.99';

/*
    ModalComponent component is used to display the modal on the mobile view.
 */
const ModalComponent = ({open, handleClose, data}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: 'md',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: '20px',
                },
            }}
        >
            <CardMedia
                component="img"
                image={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
                alt="random"
                sx={{
                    width: '30%',
                    objectFit: 'contain',
                    position: 'sticky',
                    left: 0,
                }}
            />

            <DialogContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    marginLeft: '20px', // Adjust the value to move the data to the left
                }}
            >
                <DialogTitle sx={{margin: '0 auto 0 auto', letterSpacing: 6, fontWeight: 'bold'}}>
                    {data.title}
                </DialogTitle>

                <DialogContentText sx={{flexGrow: 1}}>
                    <Typography variant="p" color="text.secondary">
                        {data.overview}
                    </Typography>
                </DialogContentText>

                <Box sx={{display: 'flex', justifyContent: 'center',alignItems: 'center', gap: 3}} >
                    <Box color="text.secondary">
                        <b>Release Date:</b> {data.release_date}
                    </Box>
                    <Box color="text.secondary">
                        <b>Price:</b> {PRICE}
                    </Box>
                    <CartButton data={data}/>
                    <Rating name="half-rating" defaultValue={data.vote_average} precision={0.5} readOnly />

                </Box>
            </DialogContent>
        </Dialog>

    );
};

export default ModalComponent;
