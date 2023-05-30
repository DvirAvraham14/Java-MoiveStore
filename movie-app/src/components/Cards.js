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
