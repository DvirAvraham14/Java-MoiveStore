import React, { useState } from 'react';
import {TextField, FormControl, InputLabel, Select, Button, Menu, MenuItem} from '@mui/material';
import useFetch from "../hooks/useFetch";

const API_KEY = process.env.REACT_APP_RMDB_KEY;

function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedPubDate, setSelectedPubDate] = useState('');

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handlePubDateChange = (event) => {
        setSelectedPubDate(event.target.value);
    };

    const RenderGenreOptions = () => {
        const { response: genres, error: g_error, isLoading: g_isLoading } = useFetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            { method: 'GET' }
        );

        return (
            <>
                <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                    label="Genre"
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                            },
                        },
                    }}
                    renderMenu={(menuProps) => (
                        <Menu
                            elevation={1}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            {...menuProps}
                        />
                    )}
                >
                    {g_isLoading ? (
                        <MenuItem disabled>Loading Genres...</MenuItem>
                    ) : (
                        genres &&
                        genres['genres'].map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Search Text: ${searchText}, Genre: ${selectedGenre}, Publication Date: ${selectedPubDate}`);
        if (searchText) {
            const searchData = {
                searchText,
                selectedGenre,
                selectedPubDate
            };
            onSearch(searchData);
        }
    };

    return (
        <form noValidate autoComplete="on" onSubmit={handleSubmit}>
            <TextField id="search-text" label="Search" variant="outlined" value={searchText} onChange={handleSearchTextChange} />
            <FormControl variant="outlined">
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <RenderGenreOptions />
            </FormControl>
            <TextField
                id="pubdate-input"
                label="Publication Date"
                type="date"
                variant="outlined"
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
