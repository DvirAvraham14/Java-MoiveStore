import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {
    TextField,
    FormControl,
    InputLabel,
    Button,
    CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '../hooks/useFetch';

const useStyles = makeStyles((theme) => ({
    s_root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
        '& > *': {
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
}));

const API_KEY = process.env.REACT_APP_RMDB_KEY;

function SearchBar({ onSearch }) {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]); // Use an array to store selected genres
    const [selectedPubDate, setSelectedPubDate] = useState('');


    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleGenreChange = (event, values) => {
        setSelectedGenres(values); // Update the selected genres
    };

    const handlePubDateChange = (event) => {
        setSelectedPubDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchText, selectedGenres, selectedPubDate);
    };

    const { response: genres, error: g_error, isLoading: g_isLoading } = useFetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        { method: 'GET' }
    );

    return (
        <form
            className={classes.s_root}
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit}
        >
            <TextField
                id="search-text"
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="genre-select-label"></InputLabel>
                <Autocomplete
                    multiple
                    id="genre-select"
                    options={genres ? genres.genres : []}
                    getOptionLabel={(option) => option.name}
                    value={selectedGenres}
                    onChange={handleGenreChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Genres"
                        />
                    )}
                />
            </FormControl>

            <TextField
                id="pubdate-input"
                label="Publication Date"
                type="date"
                variant="outlined"
                className={classes.formControl}
                value={selectedPubDate}
                onChange={handlePubDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <Button variant="contained" color="primary" type="submit">
                Search
            </Button>
        </form>
    );
}

/**
 * This component is used to display the header
 * @returns {JSX.Element}
 * @constructor
 */


const Search = () => {
    const [searchP, setSearchP] = useState([]);

    const handleSearch = (searchText,selectedGenres, selectedPubDate) => {
        setSearchP({text: searchText, genres: selectedGenres, pubDate: selectedPubDate});
    };

    const { response: res, error: g_error, isLoading: g_isLoading } = useFetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchP.text}`,
        { method: 'GET' }
    );

    console.log(res);

    return (
        <>
            <SearchBar onSearch={handleSearch} />
            <Grid container spacing={4}>

                { res && res.total_results > 0 && res.results.map((movie) => (  <Cards data={movie} />))}
                { res && res.total_results == 0 && "not data found"}

            </Grid>

            { g_isLoading && <CircularProgress /> }
        </>
    );
};

export default Search;
