import React, {useState} from 'react';
import Cards from './Cards';
import {CircularProgress, Typography, Grid, Pagination} from '@mui/material';
import useFetch from '../hooks/useFetch';
import SearchBar from './SearchBar';
import ModalComponent from './ModalComponent';
import Box from "@mui/material/Box";

const API_KEY = `?api_key=${process.env.REACT_APP_RMDB_KEY}&language=en-US&include_adult=false&include_video=false`;
const URL = `https://api.themoviedb.org/3/movie/popular${API_KEY}`;
const MAX_PAGES = 500; // tmdb have a limit of 1000 pages so i choose 500 to be safe

/*
    Search component is used to display the search bar and the movies.
    it also handles the pagination and the modal.
    all the data is fetched from the tmdb api.
 */
const Search = () => {

    const [pageUrl, setPageUrl] = useState(URL); // the url of the current page
    const [open, setOpen] = useState(false); // the state of the modal
    const [modalData, setModalData] = useState([]); // the data of the modal
    const [inSearch, setInSearch] = useState(false); // the state of the search
    const {response, error, isLoading, setUrl} = useFetch(URL); // Custom hook to fetch the data from the server

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    // Handle the pagination change event and set the new url
    const handleSearch = (searchText, genreIds, selectedPubDate) => {
        let searchQuery = (genreIds.length === 0 && !selectedPubDate) ?
            `https://api.themoviedb.org/3/search/movie${API_KEY}&query=${searchText}` :
            `https://api.themoviedb.org/3/discover/movie${API_KEY}` + (searchText ?
                `&with_keywords=${searchText.split(' ').join(',')}` : '');
        searchQuery += (genreIds.length ? `&with_genres=${genreIds.map((genre) => genre)}` : '');
        searchQuery += (selectedPubDate ? `&primary_release_date.lte=${selectedPubDate}` : '');

        setUrl(searchQuery);
        setPageUrl(searchQuery);
        setInSearch(true);
    };

    // Handle the pagination change event and set the new url
    const handleClose = () => {
        setOpen(false);
    };
    // Handle the pagination change event and set the new url
    const handleOpen = (data) => {
        setModalData(data);
        setOpen(true);
    };
    // Handle the pagination change event and set the new url
    const handleChangePage = (event, newPage) => {
        setUrl(pageUrl + `&page=${newPage}`);
        scrollToTopSmoothly();
    };
    // Handle the pagination change event and set the new url
    const scrollToTopSmoothly = () => {
        const scrollDuration = 2000; // Adjust the duration as per your preference
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
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
                    <Grid item xs={12} sm={5} md={3}  key={movie.id}>
                        <Cards key={movie.id} data={movie} openModal={handleOpen}/>
                    </Grid>
                ))}
                {response?.total_pages > 1 && (
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={response.total_pages > MAX_PAGES ? MAX_PAGES : response.total_pages}
                            onChange={handleChangePage}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Grid>
                )}
            </Grid>
            {open && <ModalComponent open={open} handleClose={handleClose} data={modalData}/>}
        </>
    );
};

export default Search;