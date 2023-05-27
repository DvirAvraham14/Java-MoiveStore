// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CartButton from './CartButton';
// import { Rating } from '@mui/lab';
//
// const PRICE = '$3.99';
//
// const Cards = ({ data, openModal }) => {
//     const handleOpenModal = () => {
//         openModal(data);
//     };
//
//     return (
//         <Card sx={{ maxWidth: 300, height: '100%', position: 'relative' }}>
//             <div style={{ position: 'relative' }}>
//                 <CardMedia
//                     component="img"
//                     alt="green iguana"
//                     style={{ objectFit: 'contain', width: '100%' }}
//                     image={
//                         data.poster_path
//                             ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
//                             : '/Image_not_available.png'
//                     }
//                 />
//                 <div
//                     style={{
//                         position: 'absolute',
//                         bottom: '8px',
//                         right: '8px',
//                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                         color: '#fff',
//                         padding: '4px 8px',
//                         borderRadius: '4px',
//                     }}
//                 >
//                     {PRICE}
//                 </div>
//             </div>
//             <CardContent sx={{ pt: 1, pb: 0 }}>
//                 <Typography
//                     gutterBottom
//                     variant="h6"
//                     component="div"
//                     sx={{
//                         fontSize: '1.2rem',
//                         height: '2.8rem',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                     }}
//                 >
//                     {data.original_title}
//                 </Typography>
//                 <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                         maxHeight: '2.4rem',
//                         overflow: 'hidden',
//                         display: '-webkit-box',
//                         WebkitLineClamp: 4,
//                         WebkitBoxOrient: 'vertical',
//                     }}
//                 >
//                     {data.release_date}
//                 </Typography>
//             </CardContent>
//             <CardActions sx={{ pt: 0, flexWrap: 'wrap', justifyContent: 'space-between' }}>
//                 <Button size="small" onClick={handleOpenModal}>
//                     View
//                 </Button>
//                 <CartButton data={data} />
//                 <Rating name="half-rating" defaultValue={data.vote_average} precision={0.5} readOnly />
//             </CardActions>
//         </Card>
//     );
// };
//
// export default Cards;


import React from 'react';
import { Rating } from '@mui/lab';
import CartButton from "./CartButton";
import cards from "../cards.css";

const PRICE = '$3.99';

/*
* The Cards component is responsible for rendering the movie cards.
* It receives the data prop from the Canvas component and passes it to the CartButton component.
* The CartButton component is responsible for adding the movie to the cart.
* The Cards component also receives the openModal prop from the Canvas component.
* The openModal prop is a function that opens the modal and passes the data of the movie to the Modal component.
 */
const Cards = ({ data, openModal }) => {
    const handleOpenModal = () => {
        openModal(data);
    };

    return (
        <div className="card">
            <div className="image-container">
                <img
                    className="image"
                    src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : '/Image_not_available.png'}
                    alt="Movie Poster"
                />
                <div className="price">{PRICE}</div> {/* Added price */}
            </div>
            <h2 className="title">{data.original_title}</h2>
            <p className="date">{data.release_date}</p>
            <div className="rating">
                <Rating name={`rating-${data.id}`} value={data.vote_average} precision={0.5} readOnly />
            </div>
            <div className="buttons">
                <button className="view-button" onClick={handleOpenModal}>
                    View
                </button>
                <CartButton data={data} />
            </div>
        </div>
    );
};

export default Cards;
