import React, { useEffect, useState, useRef } from 'react';
import Cards from './Cards';
import Grid from '@mui/material/Grid';
import {
    CircularProgress,
    Typography,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CardMedia from '@mui/material/CardMedia';
import ModalComponent from './ModalComponent';

const API_KEY = process.env.REACT_APP_RMDB_KEY;
const PAGE_SIZE = 20; // Number of movies to load per page

const Search = () => {
    const [searchP, setSearchP] = useState([]);
    const [page, setPage] = useState(1); // Current page for pagination
    const [popularMovies, setPopularMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false); // Flag to track whether data is being fetched
    const loaderRef = useRef(null); // Ref for the intersection observer target

    const { response: p_data, error: p_error, isLoading: p_isLoading } = useFetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    const { response: res, error: g_error, isLoading: g_isLoading } = useFetch(
        searchP.url
    );
    useEffect(() => {
        // Reset the page when search parameters change
        setPage(1);
    }, [searchP]);

    useEffect(() => {
        // Load popular movies on initial render
        if (p_data) {
            setPopularMovies(p_data.results);
        }
    }, [p_data]);

    useEffect(() => {
        // Load searched movies when search results change
        if (res) {
            if (page === 1) {
                setSearchedMovies(res.results);
            } else {
                setSearchedMovies((prevMovies) => [...prevMovies, ...res.results]);
            }
            setIsFetching(false);
        }
    }, [res, page]);

    useEffect(() => {
        // Create the intersection observer and observe the loaderRef
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        // Clean up the observer
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
            setIsFetching(true);
        }
    };

    const handleSearch = (searchText, genreIds, selectedPubDate) => {
        let searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`;

        if (genreIds.length > 0) {
            console.log(genreIds);
            searchQuery += `&with_genres=${genreIds.map((genre) => genre )}`;
        }

        if (selectedPubDate) {
            searchQuery += `&primary_release_date.gte=${selectedPubDate}`;
        }

        if (page) {
            searchQuery += `&page=${page}`;
        }

        setSearchP({ text: searchText,url: searchQuery});
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

            {!searchP.text && p_data && (
                <>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>Popular Movies</Typography>
                    <Grid sx={{ py: 2 }} container spacing={
                        2} justifyContent="center">
                        {popularMovies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Cards data={movie} openModal={handleOpen} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
            {searchP.text && searchedMovies && (
                <>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>Search: {searchP.text}</Typography>
                    <Grid sx={{ py: 2 }} container spacing={2} justifyContent="center">
                        {searchedMovies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <Cards data={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {isFetching && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>Loading...</Typography>
            )}
            {/* Intersection observer target */}
            <div ref={loaderRef} />

        </>
    );
};

export default Search;