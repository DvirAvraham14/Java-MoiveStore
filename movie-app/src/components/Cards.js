import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Cards = ({ data, openModal}) => {
    const handleOpenModal = () => {
        console.log(data)
        openModal(data);
    };
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                style={{ objectFit: 'cover', height: '100%' }} // Set height to '100%' to make the image fit the container
                image={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.2rem', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {data.original_title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxHeight: '4.8rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                    {data.overview}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpenModal}>
                                        View
                </Button>
                <Button size="small">
                    <AddShoppingCartIcon />
                </Button>
            </CardActions>
        </Card>
    );
    //         <Dialog
    //             open={open}
    //             onClose={handleClose}
    //             sx={{
    //                 '& .MuiDialog-paper': {
    //                     width: '100%',
    //                     maxWidth: 'md',
    //                     height: '90vh',
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                 },
    //             }}
    //         >
    //             <DialogTitle>
    //                 <b>{data.original_title}</b>
    //             </DialogTitle>
    //             <DialogContent sx={{ flexGrow: 1 }}>
    //                 <CardMedia
    //                     component="img"
    //                     image={'https://image.tmdb.org/t/p/w500/' + data.poster_path}
    //                     alt="random"
    //                     sx={{ flexGrow: 1, objectFit: 'contain' }}
    //                 />
    //                 <Typography variant="body2" color="text.secondary">
    //                     <b>Overview:</b> {data.overview}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     <b>Release Date:</b> {data.release_date}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     <b>Price:</b> 3.99$
    //                 </Typography>
    //             </DialogContent>
    //         </Dialog>
    //
    // );
};

export default Cards;
