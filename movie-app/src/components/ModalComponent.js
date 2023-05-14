import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    CardMedia,
    Typography,
} from '@mui/material';

const ModalComponent = ({ open, handleClose, data }) => {
    console.log(data);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: 'md',
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <DialogTitle>
                <b>fds</b>
            </DialogTitle>
            <DialogContent sx={{ flexGrow: 1 }}>
                <CardMedia
                    component="img"
                    image={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
                    alt="random"
                    sx={{ flexGrow: 1, objectFit: 'contain' }}
                />
                <Typography variant="body2" color="text.secondary">
                    <b>Overview:</b> das
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Release Date:</b> das
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Price:</b> 3.99$
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ModalComponent;
