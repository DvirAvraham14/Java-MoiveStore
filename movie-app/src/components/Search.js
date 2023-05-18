import React, {useEffect, useState, useRef} from 'react';
import Cards from './Cards';
// import Grid from '@mui/material/Grid';
import {
    CircularProgress,
    Typography,
    Grid,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';

import ModalComponent from './ModalComponent';

const API_KEY = '?api_key=' + process.env.REACT_APP_RMDB_KEY + `&language=en-US&include_adult=false&include_video=false`;

const Search = () => {

    const {response, error, isLoading, setUrl} = useFetch(
        `https://api.themoviedb.org/3/movie/popular${API_KEY}`
    );

    const [inSearch, setInSearch] = useState(false);

    const handleSearch = (searchText, genreIds, selectedPubDate) => {
        let searchQuery =  (genreIds.length == 0 && !selectedPubDate) ?
            `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${searchText}`:
            `https://api.themoviedb.org/3/discover/movie${API_KEY}` + (searchText ? `&with_keywords=${searchText.split(' ').join(',')}` : '');
        searchQuery += (genreIds.length ? `&with_genres=${genreIds.map((genre) => genre)}` : '');
        searchQuery += (selectedPubDate ? `&primary_release_date.lte=${selectedPubDate}` : '');

        setUrl(searchQuery);
        setInSearch(true);
    console.log(searchQuery);
    };


    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (data) => {
        setModalData(data);
        setOpen(true);
    };

    return (
        <>
            <Grid item sm={12}><SearchBar onSearch={handleSearch}/></Grid>
            {inSearch &&
                <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '16px', marginTop: '16px', marginBottom: '16px' }}>
                    results for: {response && response.total_results} movies
                </Typography>
            }
            <Grid sx={{py: 2, gap: 2}} container spacing={1} justifyContent="center">
                {response && response.results.map((movie) => (
                    <Cards key={movie.id} data={movie} openModal={handleOpen}/>
                ))}
            </Grid>
            { open &&
                <ModalComponent open={open} handleClose={handleClose} data={modalData} /> }
            {isLoading && <CircularProgress/>}
        </>
    );
};

export default Search;