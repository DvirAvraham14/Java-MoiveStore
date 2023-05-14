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
    Typography,
} from '@mui/material';

import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '../hooks/useFetch';
import MultiSelect from './MultiSelect';

const useStyles = makeStyles((theme) => ({
    s_root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
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
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedPubDate, setSelectedPubDate] = useState('');
    const [value, setValue] = useState([]);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleGenreChange = ( values) => {
        setSelectedGenres(values);
    };

    const handlePubDateChange = (event) => {
        setSelectedPubDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const genreIds = genres.genres.filter(function(genre) {
            return selectedGenres.includes(genre.name);
        }).map(function(genre) {
            return genre.id;
        });

        onSearch(searchText, genreIds, selectedPubDate);
    };


    const { response: genres, error: g_error, isLoading: g_isLoading } = useFetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
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

            <MultiSelect
                id="genre-select"
                options={genres ? genres.genres : []}
                label="Genres"
                value={selectedGenres}
                onChange={handleGenreChange}
            />

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

export default SearchBar;
