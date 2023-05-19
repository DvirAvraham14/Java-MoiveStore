import React, {useEffect, useState, useRef} from 'react';
import Cards from './Cards';
import {
    CircularProgress,
    Typography,
    Grid,
    Pagination
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';

import ModalComponent from './ModalComponent';
import Box from "@mui/material/Box";

const API_KEY = '?api_key=' + process.env.REACT_APP_RMDB_KEY +
                        `&language=en-US&include_adult=false&include_video=false`;
const URL = `https://api.themoviedb.org/3/movie/popular${API_KEY}`;

const MAX_PAGES = 500; // tmdb have a limit of 1000 pages so i choose 500 to be safe
const Search = () => {

    const {response, error, isLoading, setUrl} = useFetch(
        URL
    );
    const [pageUrl, setPageUrl] = useState(URL);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [inSearch, setInSearch] = useState(false);

    const handleSearch = (searchText, genreIds, selectedPubDate) => {
        let searchQuery = (genreIds.length == 0 && !selectedPubDate) ?
            `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${searchText}` :
            `https://api.themoviedb.org/3/discover/movie${API_KEY}` + (searchText ?
                `&with_keywords=${searchText.split(' ').join(',')}` : '');
        searchQuery += (genreIds.length ? `&with_genres=${genreIds.map((genre) => genre)}` : '');
        searchQuery += (selectedPubDate ? `&primary_release_date.lte=${selectedPubDate}` : '');

        setUrl(searchQuery);
        setPageUrl(searchQuery);
        setInSearch(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (data) => {
        setModalData(data);
        setOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setUrl(pageUrl + `&page=${newPage}`);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch}/>
            {isLoading &&
                <Box sx={{justifyContent: 'center'}}>
                    <CircularProgress />
                </Box>}
            {inSearch &&
                <Typography variant="body2"
                            sx={{fontStyle: 'italic', fontSize: '16px', marginTop: '16px', marginBottom: '16px'}}>
                    results for: {response && response.total_results} movies
                </Typography>
            }
            <Grid sx={{py: 2, gap: 2, spacing: 1}} container justifyContent="center">

                {response && response.results.map((movie) => (
                    <Grid item xs={12} sm={12} md={3}  key={movie.id}>
                        <Cards key={movie.id} data={movie} openModal={handleOpen}/>
                    </Grid>
                ))}
                {response?.total_pages > 1 && (
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination count={response.total_pages > MAX_PAGES ? MAX_PAGES : response.total_pages}
                                    onChange={handleChangePage}
                                    variant="outlined" shape="rounded"/>
                    </Grid>
                )}
            </Grid>
            {open && <ModalComponent open={open} handleClose={handleClose} data={modalData}/>}

        </>
    )
        ;
};

export default Search;