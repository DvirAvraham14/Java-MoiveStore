import React, { useEffect, useState, useRef } from 'react';
import Cards from './Cards';
import Grid from '@mui/material/Grid';
import {
    CircularProgress,
    Typography,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';

import ModalComponent from './ModalComponent';

const API_KEY = process.env.REACT_APP_RMDB_KEY;
const PAGE_SIZE = 20; // Number of movies to load per page

const Search = () => {


    const { response, error, isLoading , setUrl} = useFetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );


    const handleSearch = (searchText, genreIds, selectedPubDate) => {
        let searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`;
        if (genreIds.length > 0) {
            searchQuery += `&with_genres=${genreIds.map((genre) => genre )}`;
        }

        if (selectedPubDate) {
            searchQuery += `&primary_release_date.gte=${selectedPubDate}`;
        }
        setUrl(searchQuery);
    };


    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (data) => {
        setModalData(data);
        console.log(modalData);
        setOpen(true);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            <ModalComponent open={open} handleClose={handleClose} data={modalData} />

                <>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>Search: </Typography>
                    <Grid sx={{ py: 2 }} container spacing={2} justifyContent="center">
                        {response && response.results.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Cards data={movie} openModal={handleOpen} />
                            </Grid>
                        ))}
                    </Grid>
                </>

            {isLoading & <CircularProgress />
            }
    </>
    );
};

export default Search;